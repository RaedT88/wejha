/* ---------- Wejha shell boosts ----------
   1) "I'm available / I'm closed" switch in the top bar for every staff member (like the old ops dashboard).
   2) Live count of orders waiting for me next to the switch. */
(function () {
  if (typeof renderShell !== 'function' || typeof DSP === 'undefined') return;
  const TX = {
    du_on: ['Open · receiving orders', 'مفتوح · أستقبل الطلبات'], du_off: ['Closed · no new orders', 'مغلق · لا تصلني طلبات'],
    du_onT: ['You are open: new WhatsApp orders can be assigned to you. Click to close.', 'أنت مفتوح: الطلبات الجديدة ممكن تُسند لك. اضغط للإغلاق.'],
    du_offT: ['You are closed: new orders skip you and go to available colleagues. Click to open.', 'أنت مغلق: الطلبات الجديدة تتخطاك وتروح للزملاء المتاحين. اضغط للفتح.'],
    du_opened: ['You are open for new orders', 'تم الفتح — ستصلك الطلبات الجديدة'], du_closed: ['You are closed — new orders go to your colleagues', 'تم الإغلاق — الطلبات الجديدة تروح لزملائك'],
    du_waiting: ['{n} waiting for you', '{n} بانتظارك']
  };
  for (const k in TX) { I18N.en[k] = TX[k][0]; I18N.ar[k] = TX[k][1]; }

  const me = () => (Cloud.on && Cloud.user ? Cloud.user.id : (typeof dspMe === 'function' ? dspMe() : ''));
  const isOn = id => { const m = DSP.rows && DSP.rows.__duty__; return !((m && m.history && m.history.off) || []).includes(id); };
  let busy = false;
  async function ensure() {
    if (busy) return; busy = true;
    try { if (!DSP.team && typeof dspTeam === 'function') await dspTeam(); if (!DSP.loaded && typeof dspLoad === 'function') await dspLoad(); } catch (e) { }
    busy = false; paint();
  }
  function html() {
    const id = me(); if (!id || !Cloud.on) return '';
    if (!DSP.loaded) { ensure(); return ''; }
    if (DSP.team && !DSP.team.some(s => s.id === id)) return '';
    const on = isOn(id);
    let wait = 0;
    try { wait = (typeof opsOrders === 'function' ? opsOrders() : []).filter(o => { const r = DSP.rows[o.request_id]; return r && r.staff_id === id && !r.accepted_at && !(typeof DSP_DONE !== 'undefined' && DSP_DONE.includes(o.status)); }).length; } catch (e) { }
    return `<button class="wj-duty ${on ? 'on' : 'off'}" data-act="wjDuty" title="${t(on ? 'du_onT' : 'du_offT')}" aria-pressed="${on}"><span class="sw"><i></i></span><span class="lbl">${t(on ? 'du_on' : 'du_off')}</span></button>${wait ? `<button class="wj-wait" data-act="wjMine">${t('du_waiting', { n: wait })}</button>` : ''}`;
  }
  function paint() {
    const top = document.querySelector('header.top'); if (!top) return;
    let slot = document.getElementById('wj-duty-slot');
    if (!slot) { slot = document.createElement('span'); slot.id = 'wj-duty-slot'; slot.style.display = 'contents'; const g = top.querySelector('.grow'); if (g) g.after(slot); else top.appendChild(slot); }
    slot.innerHTML = html();
  }
  const _rs = renderShell;
  renderShell = function () { const r = _rs.apply(this, arguments); try { paint(); } catch (e) { } return r; };
  window.wjDutyPaint = paint;
  Object.assign(ACT, {
    wjDuty: async () => {
      const id = me(); if (!id) return;
      const meta = DSP.rows.__duty__ || { request_id: '__duty__', staff_id: null, history: { off: [], rr: 0 } };
      const off = new Set(meta.history.off || []); const turningOn = off.has(id);
      turningOn ? off.delete(id) : off.add(id);
      await dspSave([{ ...meta, history: { ...meta.history, off: [...off] } }]);
      toast(t(turningOn ? 'du_opened' : 'du_closed')); paint(); if (S.ui.view === 'orders') opsPaint();
    },
    wjMine: () => { OPS.f = 'mine'; if (S.ui.view === 'orders') opsPaint(); else go('orders'); }
  });
  // keep the switch in sync when duty is changed from the Team card, and refresh the waiting count every minute
  const _d = ACT.dspDuty; if (_d) ACT.dspDuty = async el => { await _d(el); paint(); };
  setInterval(() => { try { paint(); } catch (e) { } }, 60000);
  try { paint(); } catch (e) { }
})();
