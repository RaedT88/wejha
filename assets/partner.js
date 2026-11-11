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
    ppHome: ['Overview', 'نظرة عامة'], ppStatement: ['Statement', 'كشف الحساب'], ppWith: ['Partner of {a}', 'شريك {a}'],
    ppHello: ['Welcome, {p}', 'أهلاً {p}'], ppHomeSub: ['Your contracts and bookings with {a} at a glance.', 'عقودك وحجوزاتك مع {a} في نظرة وحدة.'],
    ppK_live: ['Live contracts', 'عقود معتمدة'], ppK_pending: ['Waiting for review', 'بانتظار المراجعة'], ppK_await: ['Bookings to confirm', 'حجوزات تحتاج تأكيد'], ppK_month: ['Confirmed this month (net)', 'المؤكد هذا الشهر (نت)'],
    ppK_conf: ['Confirmed bookings', 'حجوزات مؤكدة'], ppK_total: ['Total net due to you', 'إجمالي مستحقاتك (نت)'],
    ppNeedAction: ['Needs your action', 'يحتاج إجراء منك'], ppNothing: ['Nothing waiting. 👌', 'لا يوجد شيء بانتظارك. 👌'], ppAlerts: ['Contract alerts', 'تنبيهات العقود'],
    ppStopActive: ['Stop sale in the next 30 days', 'إيقاف بيع خلال 30 يوم'], ppEnding: ['Ends / last booking {d}', 'ينتهي / آخر حجز {d}'], ppNoCt: ['No contracts yet.', 'لا توجد عقود بعد.'], ppAllGood: ['All contracts are fine.', 'كل العقود سليمة.'],
    ppHow: ['How it works', 'طريقة العمل'], ppHow1: ['Upload your contract (PDF or Excel). The AI reads it — check the prices and submit.', 'ارفع عقدك (PDF أو Excel). الذكاء الاصطناعي يقرأه — راجع الأسعار واضغط إرسال.'],
    ppHow2: ['{a} reviews and approves it; from then on their WhatsApp agent sells your rooms.', '{a} تراجعه وتعتمده؛ ومن بعدها وكيل الواتساب يبيع غرفك.'],
    ppHow3: ['When a booking comes in you get it here — confirm it with your confirmation number.', 'لما يجي حجز يوصلك هنا — أكّده برقم التأكيد.'],
    ppHow4: ['Close dates any time with Stop sale inside the contract.', 'اقفل أي تواريخ في أي وقت من إيقاف البيع داخل العقد.'],
    ppStatementSub: ['Confirmed bookings and the net amounts {a} owes you.', 'الحجوزات المؤكدة والمبالغ (نت) المستحقة لك من {a}.'], ppNoConf: ['No confirmed bookings yet.', 'لا توجد حجوزات مؤكدة بعد.'],
    ppBkSub: ['Bookings {a} made on your contracts. Confirm each with your confirmation number.', 'حجوزات {a} على عقودك. أكّد كل حجز برقم التأكيد.'],
    ppF_awaiting: ['To confirm', 'بانتظار التأكيد'], ppF_confirmed: ['Confirmed', 'مؤكدة'], ppF_rejected: ['Not available', 'غير متاحة'], ppF_all: ['All', 'الكل'],
    ppAvailable: ['Available', 'متاح'], ppAvailState: ['Available — send the confirmation number', 'متاح — أرسل رقم التأكيد'], ppSendConf: ['Send confirmation number', 'إرسال رقم التأكيد'], ppNoteAlt: ['Note or alternative (optional)', 'ملاحظة أو بديل (اختياري)'], ppAvailHint: ['Tap Available as soon as you can hold the room; add the hotel confirmation number later.', 'اضغط متاح أول ما تقدر تثبّت الغرفة، وأضف رقم تأكيد الفندق بعدين.'],
    ppConfNeed: ['Enter the confirmation number.', 'اكتب رقم التأكيد.'], ppDone: ['Sent to {a}', 'تم الإرسال إلى {a}'], ppFlights: ['Flights', 'الطيران'], ppDates: ['Dates', 'التواريخ']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }
  const ALERT_URL = 'https://luxecheck-ai.app.n8n.cloud/webhook/wejha-partner-update';
  const appUrl = () => location.origin + '/';

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
  let PP = null, BK = null, PV = 'home';
  function startPortal(p) {
    PP = p; window.WJ_PARTNER = p;
    Cloud.on = true; Cloud.role = 'partner'; Cloud.agencyId = null;
    if (p.brand) S.brand = Object.assign(defaultBrand(), p.brand);
    try { applyBrand(); } catch (e) { }
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { }
    route = portalRoute; // rerenderSafe() and the contracts page call route()
    shell();
  }
  const NAVP = () => [['home', 'dashboard', t('ppHome')], ['contracts', 'layers', t('ppContracts')], ['bookings', 'cal', t('ppBookings'), (BK || []).filter(r => !r.partner_status || r.partner_status === 'awaiting').length], ['statement', 'wallet', t('ppStatement')]];
  function shell() {
    document.title = t('ppTitle') + ' · ' + PP.agency;
    const nm = (Cloud.user && ((Cloud.user.user_metadata && Cloud.user.user_metadata.name) || Cloud.user.email)) || PP.email || '';
    $('#app').innerHTML = `
    <aside class="side" id="side">
      <div class="agency"><div class="logo">${logoHTML()}</div><div><b>${esc(PP.partner)}</b><span>${esc(t('ppWith', { a: PP.agency }))}</span></div></div>
      <nav class="nav">${NAVP().map(n => `<button data-act="ppTab" data-v="${n[0]}" class="${PV === n[0] ? 'on' : ''}">${ic(n[1])}<span>${n[2]}</span>${n[3] ? `<span class="count">${n[3]}</span>` : ''}</button>`).join('')}</nav>
      <div class="side-foot">
        <button class="btn sm" data-act="ppLang">${ic('globe', 'sm')} ${L() === 'ar' ? 'English' : 'العربية'}</button>
        <div class="me"><b>${esc(nm)}</b><span>${t('ppTitle')}</span></div>
        <button class="btn ghost sm" data-act="signOut">${ic('back', 'sm flip')} ${t('signOut')}</button>
        <div class="powered"><span>${t('poweredBy')}</span><span class="wj">wejha<i>.</i></span></div>
      </div>
    </aside>
    <div class="main">
      <header class="top"><button class="icon-btn menu-btn" data-act="toggleSide" aria-label="${t('menu')}">${ic('menu')}</button>
        <b style="font-size:15px">${t('ppTitle')}</b><div class="grow"></div>
        <button class="btn sm" data-act="ppReload">${ic('refresh', 'sm')}</button>
        <button class="btn primary" data-act="ctUploadDlg">${ic('upload', 'sm')} ${t('ctUpload')}</button></header>
      <section class="view" id="view"></section>
    </div>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
    portalRoute();
  }
  function portalRoute() {
    const v = $('#view'); if (!v) return;
    $$('#side .nav button').forEach(b => b.classList.toggle('on', b.dataset.v === PV));
    if (!BK) { loadBk(); }
    if (!window.WJ_CT_LIST) loadCt();
    S.ui.view = PV === 'contracts' ? 'contracts' : 'p_' + PV;
    let html;
    if (PV === 'contracts') { html = window.EXTRA_VIEWS.contracts().replace(/<p>[^<]*<\/p>/, `<p>${esc(t('ppSub', { a: PP.agency }))}</p>`); }
    else if (PV === 'bookings') html = vBookingsP();
    else if (PV === 'statement') html = vStatement();
    else html = vHome();
    v.innerHTML = `<div class="view-inner">${html}</div>`;
  }
  let CTL = null;
  async function loadCt() { window.WJ_CT_LIST = true; try { CTL = await Cloud.rpc('partner_contracts'); } catch (e) { CTL = []; } if (PV !== 'contracts') portalRoute(); }
  const fmtN = (n, c) => (Number(n) || 0).toLocaleString(L() === 'ar' ? 'ar-EG' : 'en-US', { maximumFractionDigits: 0 }) + (c ? ' ' + esc(c) : '');
  const today = () => new Date().toISOString().slice(0, 10);
  function vHome() {
    const C = CTL || [], B = BK || [], td = today(), m = td.slice(0, 7);
    const awaiting = B.filter(r => !r.partner_status || r.partner_status === 'awaiting');
    const conf = B.filter(r => r.partner_status === 'confirmed');
    const confM = conf.filter(r => String(r.created_at || '').slice(0, 7) === m);
    const cur = (conf[0] && conf[0].currency) || (C[0] && C[0].currency) || '';
    const stopNow = C.filter(c => ((c.data && c.data.stop_sales) || []).some(x => x.from <= addDaysP(td, 30) && (x.to || x.from) >= td));
    const soon = C.filter(c => c.status === 'approved' && ((c.valid_to && c.valid_to <= addDaysP(td, 30)) || (c.book_by && c.book_by <= addDaysP(td, 14))));
    const k = [['ppK_live', C.filter(c => c.status === 'approved').length, 'good'], ['ppK_pending', C.filter(c => c.status === 'pending').length, ''], ['ppK_await', awaiting.length, awaiting.length ? 'warn' : ''], ['ppK_month', fmtN(confM.reduce((a, r) => a + (+r.net_total || 0), 0), cur), 'good']];
    const row = (title, sub, act, id) => `<button class="lv-row" data-act="${act}" ${id ? `data-v="${id}"` : ''}><i style="background:#b7975c"></i><span class="grow"><b>${esc(title)}</b><span>${esc(sub)}</span></span></button>`;
    return `<div class="head"><div><h1>${esc(t('ppHello', { p: PP.partner }))}</h1><p>${esc(t('ppHomeSub', { a: PP.agency }))}</p></div></div>
      <div class="lv-kpis">${k.map(([l, v, c]) => `<div class="lv-k ${c}"><span>${t(l)}</span><b>${v}</b></div>`).join('')}</div>
      <div class="pp-grid">
        <div class="card"><b>${t('ppNeedAction')}</b><div class="lv-list">${awaiting.length ? awaiting.slice(0, 8).map(r => row((r.contract || '') + (r.ref ? ' #' + r.ref : ''), `${r.checkin || ''} → ${r.checkout || ''}${r.option ? ' · ' + r.option : ''}`, 'ppTab', 'bookings')).join('') : `<p class="small muted">${t('ppNothing')}</p>`}</div></div>
        <div class="card"><b>${t('ppAlerts')}</b><div class="lv-list">
          ${C.filter(c => c.status === 'pending').map(c => row(c.title, t('cst_pending'), 'ppTab', 'contracts')).join('')}
          ${stopNow.map(c => row(c.title, t('ppStopActive'), 'ppTab', 'contracts')).join('')}
          ${soon.map(c => row(c.title, t('ppEnding', { d: c.book_by && c.book_by <= addDaysP(td, 14) ? c.book_by : c.valid_to }), 'ppTab', 'contracts')).join('')}
          ${!C.length ? `<p class="small muted">${t('ppNoCt')}</p><button class="btn primary sm" data-act="ctUploadDlg">${ic('upload', 'sm')} ${t('ctUpload')}</button>` : ''}
          ${C.length && !C.some(c => c.status === 'pending') && !stopNow.length && !soon.length ? `<p class="small muted">${t('ppAllGood')}</p>` : ''}</div></div>
      </div>
      <div class="card" style="margin-top:14px"><b>${t('ppHow')}</b><ol class="small" style="margin:8px 0 0;padding-inline-start:18px;line-height:1.9">${['ppHow1', 'ppHow2', 'ppHow3', 'ppHow4'].map(x => `<li>${esc(t(x, { a: PP.agency }))}</li>`).join('')}</ol></div>`;
  }
  function addDaysP(d, n) { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); }
  function vStatement() {
    if (!BK) return `<p class="muted">${t('loading')}</p>`;
    const conf = BK.filter(r => r.partner_status === 'confirmed');
    const byM = {}; conf.forEach(r => { const k = String(r.checkin || r.created_at || '').slice(0, 7) || '—'; (byM[k] = byM[k] || []).push(r); });
    const cur = (conf[0] && conf[0].currency) || '';
    const total = conf.reduce((a, r) => a + (+r.net_total || 0), 0);
    return `<div class="head"><div><h1>${t('ppStatement')}</h1><p>${esc(t('ppStatementSub', { a: PP.agency }))}</p></div></div>
      <div class="lv-kpis" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="lv-k"><span>${t('ppK_conf')}</span><b>${conf.length}</b></div><div class="lv-k good"><span>${t('ppK_total')}</span><b>${fmtN(total, cur)}</b></div></div>
      ${Object.keys(byM).sort().reverse().map(k => `<div class="card" style="margin-bottom:10px;padding:6px 8px"><div class="row between" style="padding:6px 8px"><b>${esc(k)}</b><b>${fmtN(byM[k].reduce((a, r) => a + (+r.net_total || 0), 0), cur)}</b></div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>#</th><th>${t('ctTitle')}</th><th>${t('ppDates')}</th><th>${t('ppConfNo')}</th><th>${t('ppNet')}</th></tr></thead><tbody>
        ${byM[k].map(r => `<tr><td class="small">${esc(r.ref || '')}</td><td>${esc(r.contract || '')}</td><td class="small">${esc(r.checkin || '')} → ${esc(r.checkout || '')}</td><td class="small">${esc(r.partner_conf_no || '')}</td><td><b>${fmtN(r.net_total, r.currency)}</b></td></tr>`).join('')}</tbody></table></div></div>`).join('') || `<div class="card"><p class="muted">${t('ppNoConf')}</p></div>`}`;
  }
  async function loadBk() { if (loadBk.busy) return; loadBk.busy = true; try { BK = await Cloud.rpc('partner_requests'); } catch (e) { BK = []; } loadBk.busy = false; const c = $('#side .nav button[data-v="bookings"]'); if (c) shell(); }
  const pst = s => s === 'available' ? `<span class="pill st-sent">${t('ppAvailState')}</span>` : s === 'confirmed' ? `<span class="pill st-confirmed">${t('ppConfirmed')}</span>` : s === 'rejected' ? `<span class="pill st-lost">${t('ppRejected')}</span>` : `<span class="pill st-sent">${t('ppAwaiting')}</span>`;
  function vBookingsP() {
    if (!BK) return `<div class="head"><div><h1>${t('ppBookings')}</h1></div></div><p class="muted">${t('loading')}</p>`;
    const F = S.ui.ppF || 'awaiting';
    const list = BK.filter(r => F === 'all' || (F === 'awaiting' ? (!r.partner_status || r.partner_status === 'awaiting' || r.partner_status === 'available') : r.partner_status === F));
    const rows = list.map(r => {
      const g = Array.isArray(r.guests) ? r.guests.map(x => typeof x === 'string' ? x : [x.title, x.first_name || x.first, x.last_name || x.last].filter(Boolean).join(' ') || x.name || '').filter(Boolean).join('، ') : '';
      const open = !r.partner_status || r.partner_status === 'awaiting', avail = r.partner_status === 'available';
      return `<div class="card" style="margin-bottom:10px"><div class="row between" style="gap:10px;flex-wrap:wrap">
        <div><b>${esc(r.contract || '')}</b> ${r.ref ? `<span class="tiny muted">#${esc(r.ref)}</span>` : ''}
          <div class="small">${t('ppDates')}: ${esc(r.checkin || '')} → ${esc(r.checkout || '')}${r.option ? ' · ' + esc(r.option) : ''}${r.rooms ? ' · ' + esc(r.rooms) : ''}</div>
          ${g ? `<div class="small">${t('ppGuests')}: ${esc(g)}</div>` : ''}${r.flights ? `<div class="small muted">${t('ppFlights')}: ${esc(r.flights)}</div>` : ''}
          ${r.net_total ? `<div class="small" style="margin-top:4px">${t('ppNet')}: <b>${fmtN(r.net_total, r.currency)}</b></div>` : ''}
          ${r.partner_conf_no ? `<div class="small">${t('ppConfNo')}: <b>${esc(r.partner_conf_no)}</b></div>` : ''}${r.partner_note ? `<div class="small muted">${esc(r.partner_note)}</div>` : ''}</div>
        <div style="text-align:end">${pst(r.partner_status)}
          ${open ? `<div class="stack" style="gap:6px;margin-top:8px;min-width:240px"><input class="inp" id="nt-${r.id}" placeholder="${t('ppNoteAlt')}">
            <div class="row" style="gap:6px;justify-content:flex-end"><button class="btn sm" data-act="ppRespond" data-id="${r.id}" data-a="rejected">❌ ${t('ppReject')}</button><button class="btn primary sm" data-act="ppRespond" data-id="${r.id}" data-a="available">✅ ${t('ppAvailable')}</button></div>
            <p class="tiny muted" style="margin:0">${t('ppAvailHint')}</p></div>` : ''}
          ${avail ? `<div class="stack" style="gap:6px;margin-top:8px;min-width:240px"><input class="inp" id="cf-${r.id}" placeholder="${t('ppConfNo')}">
            <div class="row" style="gap:6px;justify-content:flex-end"><button class="btn sm" data-act="ppRespond" data-id="${r.id}" data-a="rejected">${t('ppReject')}</button><button class="btn primary sm" data-act="ppRespond" data-id="${r.id}" data-a="confirmed">🎫 ${t('ppSendConf')}</button></div></div>` : ''}</div></div></div>`;
    }).join('');
    return `<div class="head"><div><h1>${t('ppBookings')}</h1><p>${esc(t('ppBkSub', { a: PP.agency }))}</p></div></div>
      <div class="chips">${['awaiting', 'confirmed', 'rejected', 'all'].map(k => `<button class="chip ${F === k ? 'on' : ''}" data-act="ppF" data-v="${k}">${t('ppF_' + k)} (${k === 'all' ? BK.length : BK.filter(r => k === 'awaiting' ? (!r.partner_status || r.partner_status === 'awaiting' || r.partner_status === 'available') : r.partner_status === k).length})</button>`).join('')}</div>
      ${rows || `<div class="card"><p class="muted">${t('ppNoBk')}</p></div>`}`;
  }
  Object.assign(ACT, {
    ppTab: el => { PV = el.dataset.v; const sd = $('#side'); if (sd) sd.classList.remove('open'); portalRoute(); },
    ppF: el => { S.ui.ppF = el.dataset.v; portalRoute(); },
    ppLang: () => { S.ui.lang = L() === 'ar' ? 'en' : 'ar'; try { localStorage.setItem(KEY + '-ui', JSON.stringify({ lang: S.ui.lang })); } catch (e) { } try { applyBrand(); } catch (e) { } shell(); },
    ppReload: () => { BK = null; CTL = null; window.WJ_CT_LIST = false; if (window.WJ_CT) window.WJ_CT.reload(); portalRoute(); },
    ppRespond: async el => {
      const a = el.dataset.a, id = el.dataset.id, conf = ($('#cf-' + id) || {}).value || '', note = ($('#nt-' + id) || {}).value || '';
      if (a === 'confirmed' && !conf.trim()) return toast(t('ppConfNeed'));
      el.disabled = true;
      try {
        await Cloud.rpc('partner_update_request', { p_id: id, p_action: a, p_conf_no: conf || null, p_note: note || null });
        try { const { data: s } = await Cloud.sb.auth.getSession(); fetch(ALERT_URL, { method: 'POST', headers: { 'content-type': 'text/plain' }, body: JSON.stringify({ access_token: s.session.access_token, request_id: id }) }).catch(() => { }); } catch (e) { }
        toast(t('ppDone', { a: PP.agency })); BK = null; loadBk();
      } catch (e) { el.disabled = false; toast(friendlyErr(e)); }
    }
  });
  const css = document.createElement('style');
  css.textContent = `.pp-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}@media (max-width:900px){.pp-grid{grid-template-columns:1fr}}
  .lv-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:14px}.lv-k{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:12px 16px;display:flex;flex-direction:column;gap:4px}
  .lv-k span{font-size:12.5px;color:var(--muted)}.lv-k b{font-size:24px}.lv-k.warn b{color:#C2410C}.lv-k.good b{color:#15803D}
  .lv-list{display:flex;flex-direction:column;gap:6px;margin-top:10px}.lv-row{all:unset;cursor:pointer;display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:var(--surface)}
  .lv-row:hover{border-color:#b7975c}.lv-row>i{width:10px;height:10px;border-radius:50%;flex:none}.lv-row .grow{min-width:0;display:flex;flex-direction:column}.lv-row b{font-size:13.5px}.lv-row .grow span{font-size:12px;color:var(--muted)}
  @media (max-width:1000px){.lv-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}}`;
  document.head.appendChild(css);
  window.WJ_startPortal = startPortal;
  if (window.WJ_PARTNER_PENDING && !PP) startPortal(window.WJ_PARTNER_PENDING);
  try { if (Cloud.on && !window.WJ_PARTNER && document.querySelector('#side')) { renderShell(); route(); } } catch (e) { }
})();
