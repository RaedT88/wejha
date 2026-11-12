/* ---------- Wejha: live requests map as the landing page; the old dashboard moves to "Reports" ---------- */
(function () {
  if (typeof ROUTES === 'undefined') return;
  const AR = {
    nav_live: ['Live requests', 'الطلبات المباشرة'], nav_reports: ['Reports', 'التقارير'],
    lv_title: ['Live requests', 'الطلبات المباشرة'], lv_sub: ['Every WhatsApp request on the map. Glowing points arrived in the last 30 minutes.', 'كل طلبات الواتساب على الخريطة. النقاط المضيئة وصلت خلال آخر 30 دقيقة.'],
    lv_today: ['Requests today', 'طلبات اليوم'], lv_staff: ['Need staff now', 'تحتاج موظف الآن'], lv_pay: ['Awaiting payment', 'بانتظار الدفع'], lv_paid: ['Paid this month', 'مدفوع هذا الشهر'],
    lv_latest: ['Latest requests', 'أحدث الطلبات'], lv_open: ['Open', 'فتح'], lv_all: ['All orders', 'كل الطلبات'], lv_none: ['No requests yet.', 'لا توجد طلبات بعد.'],
    lv_leg_new: ['New (30 min)', 'جديد (30 دقيقة)'], lv_leg_staff: ['Needs staff', 'يحتاج موظف'], lv_leg_active: ['In progress', 'قيد المعالجة'], lv_leg_paid: ['Paid', 'مدفوع'],
    lv_updated: ['Updated', 'آخر تحديث'], lv_nocity: ['Without a city', 'بدون مدينة']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }
  if (!ROUTES.includes('reports')) ROUTES.push('reports');

  const LV = { map: null, layer: null, timer: null };
  const PAID = OPS_GROUPS.done, STAFF = OPS_GROUPS.staff;
  const kindOf = o => STAFF.includes(o.status) ? 'staff' : PAID.includes(o.status) ? 'paid' : 'active';
  const isNew = o => Date.now() - (Date.parse(o.created_at || o.updated_at) || 0) < 30 * 60000;
  const COL = { staff: '#C2410C', active: '#101f2c', paid: '#15803D', fresh: '#E0B860' };

  function kpis(all) {
    const d0 = new Date(); d0.setHours(0, 0, 0, 0); const m = new Date().toISOString().slice(0, 7);
    const sar = n => (L() === 'ar' ? `${Math.round(n).toLocaleString('en-US')} ر.س` : `SAR ${Math.round(n).toLocaleString('en-US')}`);
    const k = [
      ['lv_today', all.filter(o => new Date(o.created_at || o.updated_at) >= d0).length, ''],
      ['lv_staff', all.filter(o => STAFF.includes(o.status)).length, 'warn'],
      ['lv_pay', all.filter(o => o.status === 'payment_pending').length, ''],
      ['lv_paid', sar(all.filter(o => PAID.includes(o.status) && String(o.updated_at).slice(0, 7) === m).reduce((a, o) => a + (Number(o.amount_sar) || 0), 0)), 'good']
    ];
    return `<div class="lv-kpis">${k.map(([l, v, c]) => `<div class="lv-k ${c}"><span>${t(l)}</span><b>${v}</b></div>`).join('')}</div>`;
  }
  function latest(all) {
    const list = all.slice().sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at))).slice(0, 9);
    if (!list.length) return `<p class="muted small">${t('lv_none')}</p>`;
    return list.map(o => { const k = kindOf(o); const city = (typeof dspCityOf === 'function' && dspCityOf(o)) || ''; return `<button class="lv-row" data-act="lvOpen" data-v="${esc(o.request_id || '')}">
      <i style="background:${isNew(o) ? COL.fresh : COL[k]}"></i>
      <div class="grow"><b>${esc(o.hotel || (city ? dspCityName(city) : '') || fmtPhone(o.sender))}</b><span>${esc(reqText(o.request_text).split('\n')[0].slice(0, 60))}</span></div>
      <div class="lv-meta">${opsPill(o.status)}<span>${opsTime(o.updated_at)}</span></div></button>`; }).join('');
  }
  function body() {
    if (!OPS.data && OPS.err) return `<div class="warn-box">${ic('alert', 'sm')} ${t('ordersErr_generic')}</div>`;
    const all = opsOrders();
    return `${kpis(all)}
    <div class="lv-grid">
      <div class="lv-mapcard"><div id="lv-map"></div>
        <div class="lv-legend">${[['fresh', 'lv_leg_new'], ['staff', 'lv_leg_staff'], ['active', 'lv_leg_active'], ['paid', 'lv_leg_paid']].map(([c, l]) => `<span><i style="background:${COL[c]}"></i>${t(l)}</span>`).join('')}</div></div>
      <div class="card lv-feed"><div class="row between"><b>${t('lv_latest')}</b><button class="btn sm" data-act="go" data-v="orders">${t('lv_all')}</button></div>
        <div class="lv-list">${latest(all)}</div>
        <div class="tiny muted" style="margin-top:6px">${t('lv_updated')}: ${OPS.at ? new Date(OPS.at).toLocaleTimeString(locale(), { hour: 'numeric', minute: '2-digit' }) : '—'}</div></div>
    </div>`;
  }
  function draw() {
    const el = document.getElementById('lv-map'); const LL = window.LeafletLib; if (!el || !LL) return;
    if (!LV.map || LV.map.getContainer() !== el) {
      LV.map = LL.map(el, { zoomControl: true, attributionControl: true, worldCopyJump: true, scrollWheelZoom: true }).setView([24, 45], 3);
      LL.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: 'Imagery © Esri' }).addTo(LV.map);
      LL.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, opacity: .85 }).addTo(LV.map);
      LV.layer = LL.layerGroup().addTo(LV.map); LV.fitted = false;
    }
    LV.layer.clearLayers();
    const groups = {};
    for (const o of opsOrders()) { const k = dspCityOf(o); const c = DSP_CITIES[k]; if (!c) continue; const g = groups[k] = groups[k] || { c, k, list: [] }; g.list.push(o); }
    const pts = [];
    for (const g of Object.values(groups)) {
      const n = g.list.length, fresh = g.list.some(isNew), staff = g.list.some(o => STAFF.includes(o.status)), paid = g.list.every(o => PAID.includes(o.status));
      const col = fresh ? COL.fresh : staff ? COL.staff : paid ? COL.paid : COL.active;
      const r = Math.min(30, 11 + Math.sqrt(n) * 4);
      const icon = LL.divIcon({ className: '', html: `<div class="lv-dot ${fresh ? 'fresh' : ''}" style="--c:${col};width:${r * 2}px;height:${r * 2}px"><span>${n}</span></div>`, iconSize: [r * 2, r * 2], iconAnchor: [r, r] });
      const pop = `<div class="lv-pop"><b>${esc(dspCityName(g.k))} · ${n}</b>${g.list.slice(0, 6).map(o => `<div><span>${esc(o.hotel || reqText(o.request_text).split('\n')[0].slice(0, 40))}</span> ${opsPill(o.status)}</div>`).join('')}</div>`;
      LL.marker(g.c, { icon }).bindPopup(pop, { maxWidth: 320 }).bindTooltip(`${esc(dspCityName(g.k))} · ${n}`).addTo(LV.layer);
      pts.push(g.c);
    }
    if (pts.length && !LV.fitted) { LV.map.fitBounds(LL.latLngBounds(pts).pad(.25), { maxZoom: 5 }); LV.fitted = true; }
    setTimeout(() => LV.map && LV.map.invalidateSize(), 60);
  }
  function paint() { const b = document.getElementById('lv-body'); if (!b) return; b.innerHTML = body(); setTimeout(draw, 0); }

  function vLive() {
    if (!(Cloud.on && typeof opsLoad === 'function')) return vDashboard();
    clearInterval(LV.timer); LV.map = null;
    LV.timer = setInterval(async () => { if (S.ui.view !== 'dashboard') return clearInterval(LV.timer); if (document.hidden) return; await opsLoad(true); paint(); }, 30000);
    (async () => { await opsLoad(); paint(); })();
    return `<div class="head"><div><h1>${t('lv_title')}</h1><p>${t('lv_sub')}</p></div>
      <div class="row"><button class="btn" data-act="go" data-v="reports">${ic('trend', 'sm')} ${t('nav_reports')}</button><button class="btn" data-act="lvRefresh">${ic('refresh', 'sm')} ${t('refresh')}</button></div></div>
      <div id="lv-body">${OPS.data ? body() : `<div class="card"><p class="muted">${t('ordersLoading')}</p></div>`}</div>`;
  }
  window.EXTRA_VIEWS = window.EXTRA_VIEWS || {};
  window.EXTRA_VIEWS.dashboard = vLive;
  window.EXTRA_VIEWS.reports = () => vDashboard();
  if (OPS.data) setTimeout(() => { if (S.ui.view === 'dashboard') paint(); }, 0);

  // nav: "Live requests" first, "Reports" second
  const prevExtra = window.extraNav;
  window.extraNav = () => (typeof prevExtra === 'function' ? prevExtra() : []);
  const origShell = window.renderShell;
  window.renderShell = function () {
    origShell.apply(this, arguments);
    const nav = document.querySelector('.nav'); const dash = document.getElementById('nav-dashboard');
    if (!nav || !dash || !Cloud.on) return;
    const sp = dash.querySelector('span'); if (sp) sp.textContent = t('nav_live');
    if (!document.getElementById('nav-reports')) dash.insertAdjacentHTML('afterend', `<button data-act="go" data-v="reports" id="nav-reports">${ic('trend')}<span>${t('nav_reports')}</span></button>`);
  };
  Object.assign(ACT, {
    lvRefresh: async () => { await opsLoad(true); paint(); },
    lvOpen: el => { OPS.q = el.dataset.v || ''; go('orders'); }
  });

  const css = document.createElement('style');
  css.textContent = `
  .lv-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:14px}
  .lv-k{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:12px 16px;display:flex;flex-direction:column;gap:4px}
  .lv-k span{font-size:12.5px;color:var(--muted)}.lv-k b{font-size:24px}.lv-k.warn b{color:#C2410C}.lv-k.good b{color:#15803D}
  .lv-grid{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:14px;align-items:start}
  .lv-mapcard{position:relative;border-radius:16px;overflow:hidden;border:1px solid var(--line);box-shadow:0 8px 24px rgba(16,31,44,.12)}
  #lv-map{height:min(68vh,620px);background:#0b1a26}
  .lv-legend{position:absolute;bottom:12px;inset-inline-start:12px;z-index:500;background:rgba(16,31,44,.85);color:#fff;border-radius:12px;padding:8px 12px;display:flex;gap:14px;font-size:12px;flex-wrap:wrap}
  .lv-legend span{display:flex;align-items:center;gap:6px}.lv-legend i{width:11px;height:11px;border-radius:50%;border:2px solid #fff}
  .lv-dot{border-radius:50%;background:var(--c);border:3px solid #fff;box-shadow:0 4px 14px rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;color:#fff;font:700 13px/1 system-ui,sans-serif;position:relative}
  .lv-dot.fresh{color:#101f2c}
  .lv-dot.fresh::before,.lv-dot.fresh::after{content:'';position:absolute;inset:-8px;border-radius:50%;border:3px solid rgba(224,184,96,.9);box-shadow:0 0 22px 6px rgba(224,184,96,.75);animation:lvPulse 1.8s ease-out infinite}
  .lv-dot.fresh::after{animation-delay:.9s}
  @keyframes lvPulse{0%{transform:scale(.7);opacity:1}100%{transform:scale(2.1);opacity:0}}
  @media (prefers-reduced-motion:reduce){.lv-dot.fresh::before,.lv-dot.fresh::after{animation:none}}
  .lv-feed{padding:12px 12px 10px}.lv-list{display:flex;flex-direction:column;gap:6px;margin-top:10px;max-height:min(60vh,560px);overflow:auto}
  .lv-row{all:unset;cursor:pointer;display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:var(--surface)}
  .lv-row:hover{border-color:#b7975c}.lv-row:focus-visible{outline:2px solid #b7975c}
  .lv-row>i{width:10px;height:10px;border-radius:50%;flex:none}.lv-row .grow{min-width:0;display:flex;flex-direction:column}
  .lv-row b{font-size:13.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lv-row .grow span{font-size:12px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .lv-meta{display:flex;flex-direction:column;align-items:flex-end;gap:3px;font-size:11px;color:var(--muted)}
  .lv-pop b{display:block;margin-bottom:6px}.lv-pop div{display:flex;justify-content:space-between;gap:10px;font-size:12px;margin:3px 0}
  @media (max-width:1000px){.lv-grid{grid-template-columns:1fr}.lv-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}`;
  document.head.appendChild(css);
  try { if (Cloud.on && document.querySelector('#side')) { renderShell(); route(); } } catch (e) { }
})();
