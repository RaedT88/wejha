/* Wejha availability and atomic dispatch. Assignment decisions live in Postgres. */
(function () {
  if (typeof DSP === 'undefined' || typeof ACT === 'undefined') return;
  const TT = {
    available: ['Available', 'متاح'], break: ['On a break', 'استراحة'], offline: ['Off duty', 'خارج الدوام'],
    disconnected: ['Disconnected', 'غير متصل'], disabled: ['Closed by manager', 'مغلق من الإدارة'],
    title: ['Automatic assignment', 'التوزيع التلقائي'],
    subtitle: ['New requests go to available colleagues with the lightest workload. Accepted requests stay with their owner.', 'الطلبات الجديدة للأقل انشغالًا من المتاحين. الطلبات المستلمة تظل مع صاحبها.'],
    waiting: ['Waiting for an available colleague', 'بانتظار موظف متاح'],
    noOne: ['Nobody is available. New requests stay in the waiting queue.', 'لا يوجد موظف متاح. الطلبات الجديدة تظل في قائمة الانتظار.'],
    loading: ['Checking availability…', 'جارٍ التحقق من التوفر…'],
    error: ['Availability could not be updated. Please retry.', 'تعذّر تحديث حالة التوفر. أعد المحاولة.'],
    start: ['Receive requests', 'استقبال الطلبات'], pause: ['Take a break', 'بدء استراحة'], end: ['End shift', 'إنهاء الدوام'],
    resume: ['Back · receive requests', 'رجعت · استقبال الطلبات'],
    close: ['Close for today', 'إغلاق الدوام'], enable: ['Allow next shift', 'السماح بالدوام'],
    open: ['open requests', 'طلبات مفتوحة'], accepted: ['accepted', 'مستلمة'],
    me: ['you', 'أنت'], sync: ['Checking connection every 30 seconds', 'التحقق من الاتصال كل 30 ثانية'],
    stopHint: ['No new requests while on a break or off duty.', 'لن تصلك طلبات جديدة أثناء الاستراحة أو خارج الدوام.'],
    updated: ['Availability updated', 'تم تحديث حالة التوفر'],
    unavailable: ['This colleague is not available for a new assignment.', 'هذا الموظف غير متاح لاستلام طلب جديد.'],
    claim: ['This request is assigned to another colleague. Transfer it to yourself first.', 'الطلب مسند لموظف آخر. حوّله لنفسك أولًا.']
  };
  const tx = k => TT[k] ? TT[k][L() === 'ar' ? 1 : 0] : k;
  const online = () => !!(Cloud.on && Cloud.sb && Cloud.agencyId && Cloud.user);
  const me = () => Cloud.user && Cloud.user.id;
  const team = () => DSP.team || [];
  const P = { rows: {}, ready: false, err: false, offset: 0, pulse: false, init: false, mutation: false };
  const saved = { load: dspLoad, tick: dspTick, save: dspSave, card: dspDutyCard, assign: dspAssign };
  const now = () => Date.now() + P.offset;
  function status(id) {
    const p = P.rows[id];
    if (p && p.enabled === false) return 'disabled';
    if (!p || p.state === 'offline') return 'offline';
    if (now() - Date.parse(p.last_seen) > 180000 || !Number.isFinite(Date.parse(p.last_seen))) return 'disconnected';
    return p.state;
  }
  const isAvailable = id => P.ready && !P.err && status(id) === 'available';
  async function rpc(name, args) {
    const { data, error } = await Cloud.sb.rpc(name, args);
    if (error) throw error;
    return data;
  }
  function ingest(data) {
    P.rows = Object.fromEntries((data.presence || []).map(p => [p.staff_id, p]));
    P.offset = (Date.parse(data.server_time) || Date.now()) - Date.now();
    P.ready = true; P.err = false;
    DSP.rows = Object.fromEntries((data.assignments || []).map(r => [r.request_id, r]));
    // Compatibility with old table filters; nobody defaults to being on duty.
    DSP.rows.__duty__ = { request_id: '__duty__', history: { off: team().filter(s => !isAvailable(s.id)).map(s => s.id), rr: 0 } };
    DSP.loaded = true;
  }
  dspTeam = async function () {
    if (!online()) return;
    const { data, error } = await Cloud.sb.from('agency_members').select('user_id,name,email,role').eq('agency_id', Cloud.agencyId).in('role', ['owner', 'agent']).order('created_at');
    if (error) throw error;
    DSP.team = (data || []).map(m => ({ id: m.user_id, name: m.name || m.email || '—', role: m.role }));
    try { localStorage.setItem('wejha_me', me()); } catch (_) { }
  };
  dspLoad = async function () {
    if (!online()) return saved.load();
    if (!DSP.team) await dspTeam();
    ingest(await rpc('wejha_dispatch', { p_agency: Cloud.agencyId, p_orders: [] }));
    paint();
  };
  dspSave = async function (rows) {
    if (!online()) return saved.save(rows);
    const out = rows.filter(r => r.request_id !== '__duty__').map(r => ({ request_id: r.request_id, agency_id: Cloud.agencyId, staff_id: r.staff_id || null, assigned_at: r.assigned_at || null, accepted_at: r.accepted_at || null, history: r.history || {}, updated_at: new Date().toISOString() }));
    if (!out.length) return;
    const { error } = await Cloud.sb.from('ops_assignments').upsert(out);
    if (error) { toast(tx('error')); throw error; }
    out.forEach(r => { DSP.rows[r.request_id] = r; });
    paint();
  };
  dspTick = async function (orders) {
    if (!online()) return saved.tick(orders);
    if (DSP.busy) return;
    DSP.busy = true;
    try {
      if (!DSP.team) await dspTeam();
      const list = (orders || []).filter(o => o.request_id && Number.isFinite(Date.parse(o.updated_at))).slice(-1000).map(o => ({ request_id: o.request_id, status: o.status, updated_at: o.updated_at }));
      ingest(await rpc('wejha_dispatch', { p_agency: Cloud.agencyId, p_orders: list }));
    } catch (e) {
      P.err = true;
      console.warn('dispatch unavailable', e.message);
    } finally { DSP.busy = false; paint(); }
  };
  dspIsOn = isAvailable;
  dspAssign = async function (id, sid) {
    if (online() && sid && sid !== '__none__' && !isAvailable(sid)) return toast(tx('unavailable'));
    return saved.assign(id, sid);
  };
  const openOrders = () => (typeof opsOrders === 'function' ? opsOrders() : []).filter(o => !DSP_DONE.includes(o.status) && Date.now() - Date.parse(o.updated_at) < 3 * 86400000);
  function card() {
    const all = openOrders();
    const available = team().filter(s => isAvailable(s.id)).length;
    const waiting = all.filter(o => !DSP.rows[o.request_id] || !DSP.rows[o.request_id].staff_id).length;
    return `<section class="wj-dispatch card" aria-label="${tx('title')}"><div class="wj-dispatch-head"><div><b>${tx('title')}</b><p>${tx('subtitle')}</p></div><span class="wj-live-count">${available} ${tx('available')}${waiting ? ' · ' + waiting + ' ' + tx('waiting') : ''}</span></div>
      ${!P.ready ? `<p class="muted small" role="status">${tx(P.err ? 'error' : 'loading')}</p>` : ''}
      ${P.ready && !available ? `<p class="wj-dispatch-note" role="status">${tx('noOne')}</p>` : ''}
      <div class="wj-staff-grid">${team().map(s => {
        const mine = all.filter(o => DSP.rows[o.request_id] && DSP.rows[o.request_id].staff_id === s.id);
        const accepted = mine.filter(o => DSP.rows[o.request_id].accepted_at).length;
        const st = P.err ? 'disconnected' : status(s.id);
        const self = s.id === me();
        return `<article class="wj-staff-card"><div class="wj-staff-name"><span class="wj-avatar">${esc((s.name || '?').charAt(0).toUpperCase())}</span><div><b>${esc(s.name)}${self ? ' · ' + tx('me') : ''}</b><span class="wj-status ${st}"><i></i>${tx(st)}</span></div></div><div class="wj-staff-load"><strong>${mine.length}</strong> ${tx('open')} <span>· ${accepted} ${tx('accepted')}</span></div>
        ${can('team') ? `<button class="btn sm ghost" data-act="wjStaffEnabled" data-v="${s.id}" data-enabled="${P.rows[s.id] && P.rows[s.id].enabled === false ? 'true' : 'false'}" ${P.mutation || !P.ready ? 'disabled' : ''}>${tx(P.rows[s.id] && P.rows[s.id].enabled === false ? 'enable' : 'close')}</button>` : ''}</article>`;
      }).join('')}</div><div class="tiny muted wj-dispatch-foot">${tx('sync')} · ${tx('stopHint')}</div></section>`;
  }
  window.wjDispatchPanel = card;
  dspDutyCard = function () { return online() ? card() : saved.card(); };
  function controls() {
    if (!online() || !team().some(s => s.id === me())) return '';
    if (!P.ready) return `<span class="tiny muted" role="status">${tx(P.err ? 'error' : 'loading')}</span>`;
    const st = status(me());
    return `<div class="wj-presence" aria-label="${tx('title')}"><span class="wj-status ${P.err ? 'disconnected' : st}"><i></i>${tx(P.err ? 'disconnected' : st)}</span>${st === 'disabled' ? '' : `<div class="wj-presence-actions" role="group" aria-label="${tx('title')}">${['available', 'break', 'offline'].map(k => `<button class="${st === k ? 'selected' : ''}" data-act="wjPresence" data-v="${k}" aria-pressed="${st === k}" ${P.mutation ? 'disabled' : ''}>${tx(k === 'available' ? st === 'break' ? 'resume' : 'start' : k === 'break' ? 'pause' : 'end')}</button>`).join('')}</div>`}</div>`;
  }
  function paint() {
    const top = document.querySelector('header.top');
    if (top) {
      let slot = document.getElementById('wj-duty-slot');
      if (!slot) { slot = document.createElement('span'); slot.id = 'wj-duty-slot'; const g = top.querySelector('.grow'); if (g) g.after(slot); else top.appendChild(slot); }
      slot.innerHTML = controls();
    }
    document.querySelectorAll('[data-wj-dispatch-slot]').forEach(el => { el.innerHTML = card(); });
    if (online() && !P.init) { P.init = true; setTimeout(pulse, 0); }
  }
  async function pulse() {
    if (!online() || P.pulse) return;
    P.pulse = true;
    try {
      if (!DSP.team) await dspTeam();
      if (team().some(s => s.id === me())) await rpc('wejha_set_presence', { p_agency: Cloud.agencyId });
      if (typeof opsLoad === 'function') await opsLoad(true);
      else await dspLoad();
    } catch (e) { P.err = true; console.warn('presence unavailable', e.message); }
    finally { P.pulse = false; paint(); }
  }
  async function setPresence(args) {
    if (!online() || P.mutation) return;
    P.mutation = true; paint();
    try {
      await rpc('wejha_set_presence', { p_agency: Cloud.agencyId, ...args });
      await dspTick(opsOrders());
      if (P.err) throw Error('dispatch not updated');
      toast(tx('updated'));
      if (S.ui.view === 'orders') opsPaint();
    } catch (_) { toast(tx('error')); }
    finally { P.mutation = false; paint(); }
  }
  Object.assign(ACT, {
    wjPresence: el => setPresence({ p_state: el.dataset.v }),
    wjStaffEnabled: el => setPresence({ p_staff: el.dataset.v, p_enabled: el.dataset.enabled === 'true' }),
    wjDuty: () => setPresence({ p_state: status(me()) === 'available' ? 'break' : 'available' }),
    dspDuty: el => el.dataset.v === me() ? setPresence({ p_state: status(me()) === 'available' ? 'break' : 'available' }) : setPresence({ p_staff: el.dataset.v, p_enabled: P.rows[el.dataset.v] && P.rows[el.dataset.v].enabled === false }),
    dspAutoNow: () => dspTick(opsOrders()),
    dspAccept: async el => {
      if (!online()) return;
      const id = el.dataset.id;
      const { data, error } = await Cloud.sb.from('ops_assignments').update({ accepted_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('agency_id', Cloud.agencyId).eq('request_id', id).eq('staff_id', me()).is('accepted_at', null).select('*');
      if (error) return toast(tx('error'));
      if (!data || !data.length) return toast(tx('claim'));
      DSP.rows[id] = data[0]; opsPaintDetail(); opsPaint(); paint();
    },
    wjMine: () => { OPS.f = 'mine'; if (S.ui.view === 'orders') opsPaint(); else go('orders'); }
  });
  const shell = renderShell;
  renderShell = function () { const r = shell.apply(this, arguments); paint(); return r; };
  window.wjDutyPaint = paint;
  window.wjStaffStatus = status;
  window.addEventListener('online', pulse);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) pulse(); });
  setInterval(pulse, 30000);
  const css = document.createElement('style');
  css.textContent = `.wj-presence{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.wj-status{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--muted)}.wj-status i{width:7px;height:7px;background:#94a3b8;border-radius:50%}.wj-status.available{color:#17734b}.wj-status.available i{background:#24a66a}.wj-status.break{color:#a26710}.wj-status.break i{background:#d89a27}.wj-status.disabled{color:#a13b3b}.wj-status.disabled i{background:#b74c4c}.wj-presence-actions{display:flex;border:1px solid var(--line);border-radius:10px;padding:3px;gap:2px;background:var(--surface)}.wj-presence-actions button{border:0;background:transparent;border-radius:7px;padding:5px 8px;font:inherit;font-size:11px;cursor:pointer;color:var(--muted)}.wj-presence-actions button.selected{background:var(--brand-soft,#ede9f5);color:var(--ink);font-weight:600}.wj-presence-actions button:disabled{opacity:.5;cursor:wait}.wj-presence-actions button:focus-visible{outline:2px solid var(--brand)}.wj-dispatch{padding:18px;margin-bottom:16px}.wj-dispatch-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.wj-dispatch-head b{font-size:15px}.wj-dispatch-head p{font-size:12px;color:var(--muted);margin:5px 0 14px}.wj-live-count{font-size:12px;padding:6px 10px;border-radius:8px;background:var(--surface-2,#f2f4f5);white-space:nowrap}.wj-staff-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.wj-staff-card{padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--surface)}.wj-staff-name{display:flex;gap:10px;align-items:center}.wj-staff-name>div{display:flex;flex-direction:column;gap:5px;min-width:0}.wj-staff-name b{font-size:13px;overflow:hidden;text-overflow:ellipsis}.wj-avatar{display:grid;place-items:center;width:32px;height:32px;flex:none;border-radius:10px;background:var(--brand-soft,#ede9f5);color:var(--ink)}.wj-staff-load{font-size:12px;padding:12px 0 7px;color:var(--muted)}.wj-staff-load strong{font-size:22px;font-weight:650;color:var(--ink);margin-inline-end:4px}.wj-staff-load span{margin-inline-start:6px}.wj-dispatch-note{padding:9px 12px;background:#fff7e8;border:1px solid #f1ddb5;border-radius:9px;color:#8b6019;font-size:12px}.wj-dispatch-foot{margin-top:12px}@media(max-width:900px){.wj-presence>.wj-status{display:none}.wj-dispatch-head{flex-wrap:wrap}.wj-presence-actions button{font-size:10px;padding:5px}}`;
  document.head.appendChild(css);
  paint();
})();
