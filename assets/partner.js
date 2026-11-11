/* ---------- Wejha: partners (hotels / DMCs that load their own contracts; the agency sets the margin) ---------- */
(function () {
  if (typeof ROUTES === 'undefined' || typeof Cloud === 'undefined') return;
  const AR = {
    nav_partners: ['Partners', 'الشركاء'],
    paSub: ['Hotels and companies that load their own contracts. They see only their contracts and bookings — never your margin. You review each contract, set your margin and approve it.', 'فنادق وشركات ترفع عقودها بنفسها. يشوفون عقودهم وحجوزاتهم فقط — وما يشوفون هامش ربحك. أنت تراجع كل عقد وتحط هامشك وتعتمده.'],
    paAdd: ['Add partner', 'إضافة شريك'], paEdit: ['Edit partner', 'تعديل الشريك'], paName: ['Company name', 'اسم الشركة'], paContact: ['Contact person', 'الشخص المسؤول'],
    paPhone: ['WhatsApp for booking alerts', 'واتساب لتنبيهات الحجز'], paEmail: ['Email', 'الإيميل'], paNotes: ['Notes (internal)', 'ملاحظات (داخلية)'], paActive: ['Active', 'مفعّل'],
    paUsers: ['Portal users', 'مستخدمو البوابة'], paInvite: ['Invite by email', 'دعوة بالإيميل'], paInviteHint: ['They sign up at {u} with this email (leave the agency name empty) and land in their portal.', 'يسجّلون حساب على {u} بنفس الإيميل (يتركون اسم الشركة فاضي) ويدخلون بوابتهم مباشرة.'],
    paInvited: ['invited', 'مدعو'], paJoined: ['joined', 'مسجّل'], paEmpty: ['No partners yet.', 'لا يوجد شركاء بعد.'], paContracts: ['Contracts', 'العقود'], paPending: ['waiting review', 'بانتظار المراجعة'],
    paInvMsg: ['Hello {n}, you are invited to the {a} partner portal to upload your contracts and confirm bookings.\n1) Open {u}\n2) Choose "Create account" and sign up with this email: {e} (leave the agency name empty)\n3) Confirm the email we send you, then sign in.', 'مرحباً {n}، تمت دعوتكم لبوابة شركاء {a} لرفع عقودكم وتأكيد الحجوزات.\n1) افتحوا {u}\n2) اختاروا "إنشاء حساب" وسجّلوا بهذا الإيميل: {e} (اتركوا اسم الشركة فاضي)\n3) أكّدوا الإيميل اللي يوصلكم، ثم سجّلوا الدخول.'],
    paSendWa: ['Send invite on WhatsApp', 'إرسال الدعوة واتساب'], paCopyInv: ['Copy invite', 'نسخ الدعوة'], paNoEmailSent: ['Wejha does not email the invite — send it to them with the buttons below.', 'وجهة ما ترسل إيميل دعوة — أرسلها لهم بالأزرار تحت.'],
    paNeedName: ['Company name is required.', 'اسم الشركة مطلوب.'], paDelQ: ['Remove this user from the portal?', 'إزالة هذا المستخدم من البوابة؟'],
    // portal
    ppTitle: ['Partner portal', 'بوابة الشركاء'], ppFor: ['{p} · with {a}', '{p} · مع {a}'], ppContracts: ['My contracts', 'عقودي'], ppBookings: ['Booking requests', 'طلبات الحجز'],
    ppSub: ['Upload your contracts. {a} reviews each one before it is sold. You can close dates (stop sale) at any time without review.', 'ارفع عقودك. {a} تراجع كل عقد قبل البيع. تقدر تقفل تواريخ (إيقاف بيع) في أي وقت بدون مراجعة.'],
    ppNoBk: ['No booking requests yet.', 'لا توجد طلبات حجز بعد.'], ppGuests: ['Guests', 'الضيوف'], ppNet: ['Your net price', 'سعرك (نت)'], ppConfirm: ['Confirm', 'تأكيد'], ppReject: ['Not available', 'غير متاح'],
    ppConfNo: ['Confirmation number', 'رقم التأكيد'], ppNote: ['Note', 'ملاحظة'], ppAwaiting: ['Waiting for you', 'بانتظارك'], ppConfirmed: ['Confirmed', 'مؤكد'], ppRejected: ['Not available', 'غير متاح'],
    ppConfNeed: ['Enter the confirmation number.', 'اكتب رقم التأكيد.'], ppDone: ['Sent to {a}', 'تم الإرسال إلى {a}'], ppFlights: ['Flights', 'الطيران'], ppDates: ['Dates', 'التواريخ']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }
  const appUrl = () => (Cloud.cfg && Cloud.cfg.appUrl) || (location.origin + location.pathname.replace(/[^/]*$/, ''));

  /* ================= agency side: Partners page ================= */
  ROLE_CAN.partners = ['owner', 'agent'];
  if (!ROUTES.includes('partners')) ROUTES.push('partners');
  let PA = null, PU = null, PE = null;
  async function load() {
    const [p, m, i, c] = await Promise.all([
      Cloud.sb.from('partners').select('*').eq('agency_id', Cloud.agencyId).order('created_at'),
      Cloud.sb.from('partner_members').select('partner_id,email,name'),
      Cloud.sb.from('partner_invites').select('partner_id,email'),
      Cloud.sb.from('package_contracts').select('partner_id,status').eq('agency_id', Cloud.agencyId).not('partner_id', 'is', null).neq('status', 'archived')]);
    PA = (p.data || []);
    PU = { m: m.data || [], i: i.data || [], c: c.data || [] };
    if (S.ui.view === 'partners') rerenderSafe();
  }
  function vPartners() {
    if (!PA) { load(); return `<div class="head"><div><h1>${t('nav_partners')}</h1></div></div><p class="muted">${t('loading')}</p>`; }
    const cards = PA.map(p => {
      const users = PU.m.filter(x => x.partner_id === p.id).map(x => `<span class="tag">${esc(x.email || x.name || '')} · ${t('paJoined')}</span>`)
        .concat(PU.i.filter(x => x.partner_id === p.id).map(x => `<span class="tag">${esc(x.email)} · ${t('paInvited')}</span>`)).join(' ');
      const cs = PU.c.filter(x => x.partner_id === p.id), pend = cs.filter(x => x.status === 'pending').length;
      return `<div class="card" style="margin-bottom:10px"><div class="row between" style="gap:10px;flex-wrap:wrap">
        <div><b>${esc(p.name)}</b>${p.active ? '' : ` <span class="pill st-lost">${t('svOff') || 'Off'}</span>`}<div class="small muted">${esc([p.contact_name, p.phone, p.email].filter(Boolean).join(' · '))}</div>
          <div class="small" style="margin-top:6px">${t('paContracts')}: <b>${cs.length}</b>${pend ? ` · <span style="color:var(--warn)">${pend} ${t('paPending')}</span>` : ''}</div>
          <div class="row" style="gap:4px;margin-top:6px;flex-wrap:wrap">${users || ''}</div></div>
        <div class="row" style="gap:6px"><button class="btn sm" data-act="paOpen" data-id="${p.id}">${ic('edit', 'sm')} ${t('edit')}</button>${pend ? `<button class="btn primary sm" data-act="go" data-v="contracts">${t('nav_contracts')}</button>` : ''}</div></div></div>`;
    }).join('');
    return `<div class="head"><div><h1>${t('nav_partners')}</h1><p>${t('paSub')}</p></div><button class="btn primary" data-act="paOpen">${ic('plus', 'sm')} ${t('paAdd')}</button></div>
      ${cards || `<div class="card"><p class="muted">${t('paEmpty')}</p></div>`}`;
  }
  function editDlg(p) {
    PE = p ? Object.assign({}, p) : { id: null, name: '', contact_name: '', phone: '', email: '', notes: '', active: true };
    const users = p ? PU.m.filter(x => x.partner_id === p.id).map(x => ({ email: x.email, st: t('paJoined') })).concat(PU.i.filter(x => x.partner_id === p.id).map(x => ({ email: x.email, st: t('paInvited') }))) : [];
    const f = (id, lbl, v, extra = '') => `<div class="f"><label for="${id}">${lbl}</label><input id="${id}" class="inp" value="${esc(v || '')}" ${extra}></div>`;
    modal(p ? t('paEdit') : t('paAdd'), `<div class="grid g2">
        ${f('pa-name', t('paName'), PE.name)}${f('pa-contact', t('paContact'), PE.contact_name)}
        ${f('pa-phone', t('paPhone'), PE.phone, 'dir="ltr" placeholder="9665…"')}${f('pa-email', t('paEmail'), PE.email, 'dir="ltr"')}
        <div class="f span2"><label for="pa-notes">${t('paNotes')}</label><input id="pa-notes" class="inp" value="${esc(PE.notes || '')}"></div>
        <label class="row small" style="gap:6px"><input type="checkbox" id="pa-active" ${PE.active ? 'checked' : ''}> ${t('paActive')}</label></div>
      ${p ? `<h3 class="small" style="margin:14px 0 6px">${t('paUsers')}</h3>
        ${users.map(u => `<div class="row between small" style="padding:4px 0;border-bottom:1px solid var(--line)"><span>${esc(u.email)} · <span class="muted">${u.st}</span></span><button class="icon-btn" data-act="paRmUser" data-email="${esc(u.email)}" aria-label="${t('delete')}">${ic('x', 'sm')}</button></div>`).join('')}
        <div class="row" style="gap:6px;margin-top:8px"><input id="pa-inv" class="inp" dir="ltr" placeholder="name@hotel.com" type="email"><button class="btn" data-act="paInvite">${ic('plus', 'sm')} ${t('paInvite')}</button></div>
        <p class="small muted">${t('paInviteHint', { u: esc(appUrl()) })}</p>
        ${users.length ? (() => { const em = users[users.length - 1].email, msg = t('paInvMsg', { n: PE.contact_name || PE.name, a: (S.brand && S.brand.name) || '', u: appUrl(), e: em }); return `<div class="warn-box" style="margin-top:8px">${ic('alert', 'sm')}<span>${t('paNoEmailSent')}</span></div>
          <div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap"><button class="btn sm" data-act="copy" data-text="${esc(msg)}">${ic('copy', 'sm')} ${t('paCopyInv')}</button>${PE.phone ? `<a class="btn primary sm" target="_blank" rel="noopener" href="https://wa.me/${esc(String(PE.phone).replace(/[^\d]/g, ''))}?text=${encodeURIComponent(msg)}">${ic('chat', 'sm')} ${t('paSendWa')}</a>` : ''}</div>`; })() : ''}` : ''}`,
      `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="paSave">${t('save')}</button>`, { wide: true });
  }
  Object.assign(ACT, {
    paOpen: el => editDlg(el.dataset.id ? PA.find(x => x.id === el.dataset.id) : null),
    paSave: async () => {
      const row = { agency_id: Cloud.agencyId, name: $('#pa-name').value.trim(), contact_name: $('#pa-contact').value.trim() || null, phone: $('#pa-phone').value.replace(/[^\d]/g, '') || null,
        email: $('#pa-email').value.trim() || null, notes: $('#pa-notes').value.trim() || null, active: $('#pa-active').checked };
      if (!row.name) return toast(t('paNeedName'));
      const q = PE.id ? Cloud.sb.from('partners').update(row).eq('id', PE.id).select().single() : Cloud.sb.from('partners').insert(row).select().single();
      const { data, error } = await q; if (error) return toast(friendlyErr(error));
      if (!PE.id && data && row.email) { try { await Cloud.rpc('invite_partner_user', { p_partner: data.id, p_email: row.email }); } catch (e) { } }
      if (PE.id && row.email && !PU.m.concat(PU.i).some(x => x.partner_id === PE.id)) { try { await Cloud.rpc('invite_partner_user', { p_partner: PE.id, p_email: row.email }); } catch (e) { } }
      toast(t('saved')); await load();
      editDlg(PA.find(x => x.id === (PE.id || (data && data.id))));
    },
    paInvite: async () => {
      const em = $('#pa-inv').value.trim(); if (!em) return;
      try { await Cloud.rpc('invite_partner_user', { p_partner: PE.id, p_email: em }); toast(t('saved')); await load(); editDlg(PA.find(x => x.id === PE.id)); } catch (e) { toast(friendlyErr(e)); }
    },
    paRmUser: el => { const em = el.dataset.email, pid = PE.id; confirmBox(t('paDelQ'), async () => { try { await Cloud.rpc('remove_partner_user', { p_partner: pid, p_email: em }); await load(); editDlg(PA.find(x => x.id === pid)); } catch (e) { toast(friendlyErr(e)); } }, t('delete')); }
  });
  window.EXTRA_VIEWS = window.EXTRA_VIEWS || {};
  window.EXTRA_VIEWS.partners = vPartners;
  const prevNav = window.extraNav;
  window.extraNav = () => { const a = typeof prevNav === 'function' ? prevNav() : []; const i = a.findIndex(x => x && x[0] === 'contracts'); const item = can('partners') ? ['partners', 'users', t('nav_partners')] : null; if (item) a.splice(i >= 0 ? i + 1 : a.length, 0, item); return a; };

  /* ================= partner side: portal ================= */
  let PP = null, BK = null, PV = 'contracts';
  function startPortal(p) {
    PP = p; window.WJ_PARTNER = p;
    Cloud.on = true; Cloud.role = 'partner'; Cloud.agencyId = null;
    if (p.brand) S.brand = Object.assign(defaultBrand(), p.brand);
    try { applyBrand(); } catch (e) { }
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { }
    route = portalRoute; // rerenderSafe() and the contracts page call route()
    shell();
  }
  function shell() {
    document.title = t('ppTitle') + ' · ' + PP.agency;
    $('#app').innerHTML = `<div style="min-height:100vh;background:var(--bg)">
      <header class="row between" style="padding:14px 22px;border-bottom:1px solid var(--line);background:var(--surface);gap:10px;flex-wrap:wrap">
        <div class="row" style="gap:10px"><div class="logo" style="width:38px;height:38px">${logoHTML()}</div><div><b>${t('ppTitle')}</b><div class="small muted">${esc(t('ppFor', { p: PP.partner, a: PP.agency }))}</div></div></div>
        <div class="row" style="gap:6px"><button class="btn sm ${PV === 'contracts' ? 'primary' : ''}" data-act="ppTab" data-v="contracts">${ic('layers', 'sm')} ${t('ppContracts')}</button>
          <button class="btn sm ${PV === 'bookings' ? 'primary' : ''}" data-act="ppTab" data-v="bookings">${ic('cal', 'sm')} ${t('ppBookings')}</button>
          <button class="btn sm ghost" data-act="ppLang">${ic('globe', 'sm')} ${L() === 'ar' ? 'English' : 'العربية'}</button>
          <button class="btn sm ghost" data-act="signOut">${t('signOut')}</button></div></header>
      <main id="view" style="max-width:1100px;margin:0 auto;padding:22px"></main></div><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
    portalRoute();
  }
  function portalRoute() {
    const v = $('#view'); if (!v) return;
    S.ui.view = PV === 'contracts' ? 'contracts' : 'pbookings';
    if (PV === 'contracts') {
      let html = window.EXTRA_VIEWS.contracts();
      html = html.replace(/<p>[^<]*<\/p>/, `<p>${esc(t('ppSub', { a: PP.agency }))}</p>`);
      v.innerHTML = `<div class="view-inner">${html}</div>`;
    } else v.innerHTML = `<div class="view-inner">${vBookingsP()}</div>`;
  }
  async function loadBk() { try { BK = await Cloud.rpc('partner_requests'); } catch (e) { BK = []; } if (PV === 'bookings') portalRoute(); }
  const pst = s => s === 'confirmed' ? `<span class="pill st-confirmed">${t('ppConfirmed')}</span>` : s === 'rejected' ? `<span class="pill st-lost">${t('ppRejected')}</span>` : `<span class="pill st-sent">${t('ppAwaiting')}</span>`;
  function vBookingsP() {
    if (!BK) { loadBk(); return `<div class="head"><div><h1>${t('ppBookings')}</h1></div></div><p class="muted">${t('loading')}</p>`; }
    const fmtN = (n, c) => (Number(n) || 0).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ' + esc(c || '');
    const rows = BK.map(r => {
      const g = Array.isArray(r.guests) ? r.guests.map(x => typeof x === 'string' ? x : [x.title, x.first_name || x.first, x.last_name || x.last].filter(Boolean).join(' ') || x.name || '').filter(Boolean).join('، ') : '';
      const open = !r.partner_status || r.partner_status === 'awaiting';
      return `<div class="card" style="margin-bottom:10px"><div class="row between" style="gap:10px;flex-wrap:wrap">
        <div><b>${esc(r.contract || '')}</b> ${r.ref ? `<span class="tiny muted">#${esc(r.ref)}</span>` : ''}
          <div class="small">${t('ppDates')}: ${esc(r.checkin || '')} → ${esc(r.checkout || '')}${r.option ? ' · ' + esc(r.option) : ''}${r.rooms ? ' · ' + esc(r.rooms) : ''}</div>
          ${g ? `<div class="small">${t('ppGuests')}: ${esc(g)}</div>` : ''}${r.flights ? `<div class="small muted">${t('ppFlights')}: ${esc(r.flights)}</div>` : ''}
          ${r.net_total ? `<div class="small" style="margin-top:4px">${t('ppNet')}: <b>${fmtN(r.net_total, r.currency)}</b></div>` : ''}
          ${r.partner_conf_no ? `<div class="small">${t('ppConfNo')}: <b>${esc(r.partner_conf_no)}</b></div>` : ''}${r.partner_note ? `<div class="small muted">${esc(r.partner_note)}</div>` : ''}</div>
        <div style="text-align:end">${pst(r.partner_status)}
          ${open ? `<div class="stack" style="gap:6px;margin-top:8px;min-width:220px"><input class="inp" id="cf-${r.id}" placeholder="${t('ppConfNo')}"><input class="inp" id="nt-${r.id}" placeholder="${t('ppNote')}">
            <div class="row" style="gap:6px;justify-content:flex-end"><button class="btn sm" data-act="ppRespond" data-id="${r.id}" data-ok="0">${t('ppReject')}</button><button class="btn primary sm" data-act="ppRespond" data-id="${r.id}" data-ok="1">${ic('check', 'sm')} ${t('ppConfirm')}</button></div></div>` : ''}</div></div></div>`;
    }).join('');
    return `<div class="head"><div><h1>${t('ppBookings')}</h1></div><button class="btn sm" data-act="ppReload">${ic('refresh', 'sm')}</button></div>${rows || `<div class="card"><p class="muted">${t('ppNoBk')}</p></div>`}`;
  }
  Object.assign(ACT, {
    ppTab: el => { PV = el.dataset.v; if (PV === 'bookings') BK = null; shell(); },
    ppLang: () => { S.ui.lang = L() === 'ar' ? 'en' : 'ar'; try { localStorage.setItem(KEY + '-ui', JSON.stringify({ lang: S.ui.lang })); } catch (e) { } try { applyBrand(); } catch (e) { } shell(); },
    ppReload: () => { BK = null; portalRoute(); },
    ppRespond: async el => {
      const ok = el.dataset.ok === '1', id = el.dataset.id, conf = ($('#cf-' + id) || {}).value || '', note = ($('#nt-' + id) || {}).value || '';
      if (ok && !conf.trim()) return toast(t('ppConfNeed'));
      try { await Cloud.rpc('partner_respond', { p_id: id, p_confirm: ok, p_conf_no: conf, p_note: note }); toast(t('ppDone', { a: PP.agency })); BK = null; portalRoute(); } catch (e) { toast(friendlyErr(e)); }
    }
  });
  window.WJ_startPortal = startPortal;
  if (window.WJ_PARTNER_PENDING && !PP) startPortal(window.WJ_PARTNER_PENDING);
  try { if (Cloud.on && !window.WJ_PARTNER && document.querySelector('#side')) { renderShell(); route(); } } catch (e) { }
})();
