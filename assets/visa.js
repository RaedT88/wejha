/* ---------- Wejha: Hotel bookings for visa applications ----------
   Requests come from the WhatsApp agent (or are added by staff). Staff confirm payment,
   book a free-cancellation room by hand, print the booking file, and cancel before the deadline.
   The owner can switch the whole service on/off at any time (the agent stops offering it). */
(function () {
  if (typeof ROUTES === 'undefined') return;
  const TX = {
    nav_visa: ['Visa hotel bookings', 'حجوزات التأشيرة'],
    vSub: ['Refundable hotel bookings for Schengen, UK, Canada and US visa files. The WhatsApp agent collects the details; your team books, sends the file and cancels before the deadline.', 'حجوزات فنادق قابلة للإلغاء لملفات تأشيرة شنغن وبريطانيا وكندا وأمريكا. الوكيل يجمع البيانات على واتساب، وفريقك يحجز ويرسل الملف ويلغي قبل الموعد.'],
    vTabReq: ['Requests', 'الطلبات'], vTabHotels: ['Hotels per country', 'الفنادق لكل دولة'], vTabSet: ['Settings', 'الإعدادات'],
    vOn: ['Service ON — the agent offers it on WhatsApp', 'الخدمة شغّالة — الوكيل يعرضها على واتساب'], vOff: ['Service OFF — the agent does not offer it', 'الخدمة متوقفة — الوكيل لا يعرضها'],
    vTurnOff: ['Stop service', 'إيقاف الخدمة'], vTurnOn: ['Start service', 'تشغيل الخدمة'], vOffDone: ['Visa bookings stopped', 'تم إيقاف حجوزات التأشيرة'], vOnDone: ['Visa bookings started', 'تم تشغيل حجوزات التأشيرة'],
    vNoTable: ['The visa tables are not set up yet. Run the migration 20261113_visa_bookings.sql in Supabase.', 'جداول التأشيرة غير مُعدّة بعد. شغّل ملف 20261113_visa_bookings.sql في Supabase.'],
    vRef: ['Ref', 'المرجع'], vCustomer: ['Customer', 'العميل'], vCountry: ['Country', 'الدولة'], vCity: ['City', 'المدينة'], vHotel: ['Hotel', 'الفندق'], vDates: ['Dates', 'التواريخ'],
    vPersons: ['Persons', 'الأشخاص'], vRooms: ['Rooms', 'الغرف'], vStatus: ['Status', 'الحالة'], vCancelBy: ['Cancel by', 'الإلغاء قبل'], vFee: ['Fee', 'الرسوم'],
    vs_awaiting_payment: ['Awaiting payment', 'بانتظار الدفع'], vs_paid: ['Paid — to book', 'مدفوع — للحجز'], vs_booked: ['Booked', 'محجوز'], vs_delivered: ['File sent', 'الملف أُرسل'], vs_cancelled: ['Cancelled', 'ملغي'], vs_refused: ['Refused', 'مرفوض'],
    vAll: ['All', 'الكل'], vOpen: ['Open', 'مفتوحة'], vDue: ['Cancel soon', 'إلغاء قريب'], vEmpty: ['No visa booking requests yet. Customers ask on WhatsApp, e.g. “I need a hotel booking for a Schengen visa”.', 'لا توجد طلبات بعد. العميل يطلب على واتساب مثلاً: «أبغى حجز فندق لتأشيرة شنغن».'],
    vNew: ['New request', 'طلب جديد'], vEdit: ['Visa booking', 'حجز تأشيرة'], vGuests: ['Guest names (as in passport, one per line)', 'أسماء النزلاء (كما في الجواز، كل اسم في سطر)'],
    vCheckin: ['Check-in', 'الدخول'], vCheckout: ['Check-out', 'الخروج'], vRoom: ['Room type', 'نوع الغرفة'], vBoard: ['Meals', 'الوجبات'], vAddress: ['Hotel address', 'عنوان الفندق'], vPhone: ['Hotel phone', 'هاتف الفندق'],
    vConf: ['Hotel confirmation no.', 'رقم تأكيد الفندق'], vSupplier: ['Booked with (supplier)', 'تم الحجز عبر (المورد)'], vSupRef: ['Supplier reference', 'مرجع المورد'], vDeadline: ['Free cancellation until', 'الإلغاء المجاني حتى'],
    vPaidNote: ['Payment note (transfer ref, bank…)', 'ملاحظة الدفع (مرجع التحويل، البنك…)'], vNotes: ['Internal notes', 'ملاحظات داخلية'], vStars: ['Stars', 'النجوم'],
    vMarkPaid: ['Payment received', 'تم استلام الدفع'], vMarkBooked: ['Booked', 'تم الحجز'], vMarkSent: ['File sent to customer', 'أُرسل الملف للعميل'], vMarkCancelled: ['Cancelled with hotel', 'تم الإلغاء مع الفندق'], vRefuse: ['Refuse', 'رفض'],
    vFile: ['Booking file', 'ملف الحجز'], vNeedBook: ['Add the hotel, confirmation no. and cancellation deadline first.', 'أضف الفندق ورقم التأكيد وموعد الإلغاء أولاً.'],
    vSaved: ['Saved', 'تم الحفظ'], vNeed: ['Phone, country and dates are required.', 'الجوال والدولة والتواريخ مطلوبة.'], vBadDates: ['Check-out must be after check-in.', 'الخروج لازم يكون بعد الدخول.'],
    vHotelsSub: ['Up to 5 hotels per country are shown to the customer, in this order. Prefer central hotels with free cancellation.', 'يُعرض على العميل حتى 5 فنادق لكل دولة بهذا الترتيب. اختر فنادق مركزية بإلغاء مجاني.'],
    vAddHotel: ['Add hotel', 'إضافة فندق'], vHotelEdit: ['Visa hotel', 'فندق تأشيرة'], vPriority: ['Order', 'الترتيب'], vNoHotels: ['No hotels for this country yet — the agent will tell the customer the team will choose a central hotel.', 'لا توجد فنادق لهذه الدولة بعد — الوكيل يخبر العميل أن الفريق سيختار فندقاً مركزياً.'],
    vCountries: ['{n} of {t} countries have hotels', '{n} من {t} دولة لها فنادق'], vDelQ: ['Delete this hotel?', 'حذف هذا الفندق؟'], vImport: ['Import CSV', 'استيراد CSV'], vTemplate: ['CSV template', 'نموذج CSV'],
    vImported: ['{n} hotels imported', 'تم استيراد {n} فندق'], vImportErr: ['Could not read the file. Columns: country, city, hotel, address, stars, priority', 'تعذّرت قراءة الملف. الأعمدة: country, city, hotel, address, stars, priority'],
    vFeeLbl: ['Service fee per booking', 'رسوم الخدمة لكل حجز'], vPayText: ['Payment instructions sent to the customer', 'تعليمات الدفع التي تُرسل للعميل'],
    vPayPh: ['e.g. Transfer to Al Rajhi IBAN SA00 0000 … (LuxeCheck) and write your booking ref in the transfer note. Then reply “تم التحويل”.', 'مثال: حوّل على آيبان الراجحي SA00 0000 … باسم LuxeCheck واكتب رقم الطلب في ملاحظة التحويل، ثم اكتب «تم التحويل».'],
    vPayHint: ['If empty, the agent tells the customer that the team will send the payment details.', 'لو تركته فاضي، الوكيل يقول للعميل إن الفريق سيرسل طريقة الدفع.'],
    vShowPolicy: ['Show the cancellation policy in the file', 'إظهار سياسة الإلغاء في الملف'], vDueSoon: ['{n} bookings must be cancelled within 48 hours', '{n} حجز لازم يتلغى خلال 48 ساعة'],
    vOverdue: ['Deadline passed', 'فات موعد الإلغاء'], vNights: ['{n} nights', '{n} ليالٍ'], vOwnerOnly: ['Only the owner can change these settings.', 'هذه الإعدادات للمالك فقط.']
  };
  for (const k in TX) { I18N.en[k] = TX[k][0]; I18N.ar[k] = TX[k][1]; }
  if (!ROUTES.includes('visa')) ROUTES.push('visa');
  ROLE_CAN.visa = ['owner', 'agent'];

  const COUNTRIES = [
    ['Austria', 'النمسا'], ['Belgium', 'بلجيكا'], ['Bulgaria', 'بلغاريا'], ['Croatia', 'كرواتيا'], ['Czechia', 'التشيك'], ['Denmark', 'الدنمارك'], ['Estonia', 'إستونيا'], ['Finland', 'فنلندا'],
    ['France', 'فرنسا'], ['Germany', 'ألمانيا'], ['Greece', 'اليونان'], ['Hungary', 'المجر'], ['Iceland', 'آيسلندا'], ['Italy', 'إيطاليا'], ['Latvia', 'لاتفيا'], ['Liechtenstein', 'ليختنشتاين'],
    ['Lithuania', 'ليتوانيا'], ['Luxembourg', 'لوكسمبورغ'], ['Malta', 'مالطا'], ['Netherlands', 'هولندا'], ['Norway', 'النرويج'], ['Poland', 'بولندا'], ['Portugal', 'البرتغال'], ['Romania', 'رومانيا'],
    ['Slovakia', 'سلوفاكيا'], ['Slovenia', 'سلوفينيا'], ['Spain', 'إسبانيا'], ['Sweden', 'السويد'], ['Switzerland', 'سويسرا'], ['United Kingdom', 'المملكة المتحدة'], ['Canada', 'كندا'], ['United States', 'الولايات المتحدة']
  ];
  const cName = en => { const c = COUNTRIES.find(x => x[0] === en); return c ? (L() === 'ar' ? c[1] : c[0]) : (en || '—'); };
  const VB = 'visa_bookings', VH = 'visa_hotels', VS = 'visa_settings';
  let B = null, H = null, SET = null, ERR = null, TAB = 'req', F = 'open', CF = '', ED = null, HE = null;

  async function load() {
    const [b, h, s] = await Promise.all([
      Cloud.sb.from(VB).select('*').eq('agency_id', Cloud.agencyId).order('created_at', { ascending: false }).limit(1000),
      Cloud.sb.from(VH).select('*').eq('agency_id', Cloud.agencyId).order('country').order('priority'),
      Cloud.sb.from(VS).select('*').eq('agency_id', Cloud.agencyId).maybeSingle()
    ]);
    const e = b.error || h.error || s.error;
    ERR = e ? (/visa_/.test(e.message || '') || e.code === 'PGRST205' || e.code === '42P01' ? 'table' : friendlyErr(e)) : null;
    B = b.data || []; H = h.data || []; SET = s.data || { active: true, fee: 35, currency: 'SAR', payment_text: '' };
    if (S.ui.view === 'visa') rerenderSafe();
  }
  const nights = b => Math.max(0, Math.round((Date.parse(b.checkout) - Date.parse(b.checkin)) / 864e5));
  const hoursLeft = b => b.cancel_deadline ? (Date.parse(b.cancel_deadline) - Date.now()) / 36e5 : null;
  const dueSoon = b => ['booked', 'delivered'].includes(b.status) && b.cancel_deadline && hoursLeft(b) <= 48;
  const pill = s => `<span class="pill ${{ awaiting_payment: 'st-draft', paid: 'st-sent', booked: 'st-confirmed', delivered: 'st-confirmed', cancelled: 'st-lost', refused: 'st-lost' }[s] || 'st-draft'}">${t('vs_' + s)}</span>`;

  function vVisa() {
    if (!Cloud.on) return vDashboard();
    const head = (extra = '') => `<div class="head"><div><h1>${t('nav_visa')}</h1><p>${t('vSub')}</p></div>${extra}</div>`;
    if (!B) { load(); return head() + `<p class="muted">${t('loading')}</p>`; }
    if (ERR === 'table') return head() + `<div class="warn-box">${ic('alert', 'sm')} ${t('vNoTable')}</div>`;
    const owner = can('team');
    const on = SET.active !== false;
    const toggle = `<div class="card row between" style="padding:12px 16px;margin-bottom:14px;gap:10px;flex-wrap:wrap;border-color:${on ? 'color-mix(in oklab,var(--good) 40%,var(--line))' : 'var(--line)'}">
      <div class="row" style="gap:10px;align-items:center"><span class="wj-duty ${on ? 'on' : 'off'}" style="pointer-events:none"><span class="sw"><i></i></span></span><b>${t(on ? 'vOn' : 'vOff')}</b></div>
      ${owner ? `<button class="btn ${on ? '' : 'primary'}" data-act="vToggle">${t(on ? 'vTurnOff' : 'vTurnOn')}</button>` : ''}</div>`;
    const tabs = `<div class="chips" style="margin-bottom:12px">${[['req', 'vTabReq', B.filter(b => !['cancelled', 'refused'].includes(b.status)).length], ['hotels', 'vTabHotels', H.length], ['set', 'vTabSet', '']].map(([k, l, n]) => `<button class="chip ${TAB === k ? 'on' : ''}" data-act="vTab" data-v="${k}">${t(l)}${n !== '' ? ` <span class="n">${n}</span>` : ''}</button>`).join('')}</div>`;
    const body = TAB === 'hotels' ? hotelsTab() : TAB === 'set' ? setTab() : reqTab();
    return head(can('visa') && TAB === 'req' ? `<button class="btn primary" data-act="vNew">${ic('plus', 'sm')} ${t('vNew')}</button>` : can('visa') && TAB === 'hotels' ? `<div class="row" style="gap:8px"><button class="btn" data-act="vTpl">${ic('download', 'sm')} ${t('vTemplate')}</button><label class="btn" style="cursor:pointer">${ic('upload', 'sm')} ${t('vImport')}<input type="file" id="vh-file" accept=".csv,text/csv" style="display:none"></label><button class="btn primary" data-act="vHNew">${ic('plus', 'sm')} ${t('vAddHotel')}</button></div>` : '') + toggle + (ERR ? `<div class="warn-box" style="margin-bottom:12px">${esc(ERR)}</div>` : '') + tabs + body;
  }

  function reqTab() {
    const due = B.filter(dueSoon);
    const groups = { open: b => !['cancelled', 'refused'].includes(b.status), awaiting_payment: b => b.status === 'awaiting_payment', paid: b => b.status === 'paid', booked: b => ['booked', 'delivered'].includes(b.status), due: dueSoon, all: () => true };
    const list = B.filter(groups[F] || groups.open);
    return `${due.length ? `<div class="warn-box" style="margin-bottom:12px;color:var(--bad);background:color-mix(in oklab,var(--bad) 9%,var(--surface))">${ic('alert', 'sm')} ${t('vDueSoon', { n: due.length })}</div>` : ''}
    <div class="chips" style="margin-bottom:12px">${[['open', 'vOpen'], ['awaiting_payment', 'vs_awaiting_payment'], ['paid', 'vs_paid'], ['booked', 'vs_booked'], ['due', 'vDue'], ['all', 'vAll']].map(([k, l]) => `<button class="chip ${F === k ? 'on' : ''}" data-act="vF" data-v="${k}">${t(l)} <span class="n">${B.filter(groups[k]).length}</span></button>`).join('')}</div>
    ${!B.length ? `<div class="card"><p class="muted">${t('vEmpty')}</p></div>` : `<div class="card" style="padding:4px 6px"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('vRef')}</th><th>${t('vCustomer')}</th><th>${t('vCountry')}</th><th>${t('vHotel')}</th><th>${t('vDates')}</th><th class="num">${t('vPersons')}</th><th>${t('vStatus')}</th><th>${t('vCancelBy')}</th></tr></thead><tbody>
      ${list.map(b => { const h = hoursLeft(b); const late = h !== null && h < 0 && ['booked', 'delivered'].includes(b.status); return `<tr class="click" data-act="vOpen" data-id="${b.id}" tabindex="0" style="cursor:pointer">
        <td><b class="num">${esc(b.ref)}</b><div class="tiny muted">${opsTime(b.created_at)}</div></td><td class="num" dir="ltr">${fmtPhone(b.customer_phone)}</td><td>${esc(cName(b.country))}${b.city ? `<div class="tiny muted">${esc(b.city)}</div>` : ''}</td>
        <td>${esc(b.hotel || '—')}</td><td class="small">${fmtDate(b.checkin)} → ${fmtDate(b.checkout)}<div class="tiny muted">${t('vNights', { n: nights(b) })}</div></td><td class="num">${b.persons}</td><td>${pill(b.status)}</td>
        <td class="small" style="${dueSoon(b) ? 'color:var(--bad);font-weight:600' : ''}">${b.cancel_deadline && !['cancelled', 'refused'].includes(b.status) ? (late ? t('vOverdue') : new Date(b.cancel_deadline).toLocaleString(L() === 'ar' ? 'ar-SA-u-nu-latn' : 'en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })) : '—'}</td></tr>`; }).join('') || `<tr><td colspan="8" class="muted">—</td></tr>`}
    </tbody></table></div></div>`}`;
  }

  function hotelsTab() {
    const withH = new Set(H.map(h => h.country));
    const countries = COUNTRIES.map(c => c[0]);
    if (!CF) CF = countries.find(c => withH.has(c)) || 'France';
    const list = H.filter(h => h.country === CF);
    return `<p class="small muted" style="margin:-4px 0 10px">${t('vHotelsSub')} · ${t('vCountries', { n: countries.filter(c => withH.has(c)).length, t: countries.length })}</p>
    <div class="chips" style="margin-bottom:12px;flex-wrap:wrap">${countries.map(c => { const n = H.filter(h => h.country === c && h.active).length; return `<button class="chip ${CF === c ? 'on' : ''}" data-act="vCF" data-v="${esc(c)}" style="${n ? '' : 'opacity:.6'}">${esc(cName(c))}${n ? ` <span class="n">${n}</span>` : ''}</button>`; }).join('')}</div>
    <div class="card" style="padding:4px 6px"><div style="padding:10px 10px 4px" class="row between"><b>${esc(cName(CF))}</b>${can('visa') ? `<button class="btn sm" data-act="vHNew">${ic('plus', 'sm')} ${t('vAddHotel')}</button>` : ''}</div>
    ${list.length ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:60px">${t('vPriority')}</th><th>${t('vHotel')}</th><th>${t('vCity')}</th><th>${t('vStars')}</th><th>${t('vAddress')}</th></tr></thead><tbody>
      ${list.map((h, i) => `<tr class="click ${h.active ? '' : 'muted'}" data-act="vHOpen" data-id="${h.id}" style="cursor:pointer"><td><span class="pill ${i < 5 && h.active ? 'st-confirmed' : 'st-draft'}">${h.priority}</span></td><td><b>${esc(h.hotel)}</b></td><td>${esc(h.city || '')}</td><td>${h.stars ? '★'.repeat(h.stars) : ''}</td><td class="small muted">${esc(h.address || '')}</td></tr>`).join('')}
    </tbody></table></div>` : `<p class="muted small" style="padding:6px 10px 12px">${t('vNoHotels')}</p>`}</div>`;
  }

  function setTab() {
    const owner = can('team');
    return `<div class="card" style="max-width:720px"><div class="stack">
      <div class="f"><label for="vs-fee">${t('vFeeLbl')}</label><div class="row" style="gap:8px;align-items:center"><input class="inp" id="vs-fee" type="number" min="0" step="1" value="${esc(SET.fee ?? 35)}" style="max-width:140px" ${owner ? '' : 'disabled'}><span class="muted">${esc(SET.currency || 'SAR')}</span></div></div>
      <div class="f"><label for="vs-pay">${t('vPayText')}</label><textarea class="inp" id="vs-pay" rows="5" dir="auto" placeholder="${esc(t('vPayPh'))}" ${owner ? '' : 'disabled'}>${esc(SET.payment_text || '')}</textarea><div class="tiny muted">${t('vPayHint')}</div></div>
      ${owner ? `<div class="row" style="justify-content:flex-end"><button class="btn primary" data-act="vSaveSet">${t('save')}</button></div>` : `<p class="tiny muted">${t('vOwnerOnly')}</p>`}
    </div></div>`;
  }

  /* ---- request editor ---- */
  function form(b) {
    ED = Object.assign({ status: 'awaiting_payment', persons: 1, rooms: 1, fee: SET.fee ?? 35, currency: SET.currency || 'SAR', guests: [], country: 'France' }, b);
    const f = (id, label, val, type = 'text', extra = '') => `<div class="f"><label for="vb-${id}">${label}</label><input class="inp" id="vb-${id}" type="${type}" value="${esc(val ?? '')}" ${extra}></div>`;
    const dl = ED.cancel_deadline ? new Date(Date.parse(ED.cancel_deadline) - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 16) : '';
    const hotelsOf = H.filter(h => h.country === ED.country && h.active);
    const st = ED.status;
    const steps = [];
    if (ED.id) {
      if (st === 'awaiting_payment') steps.push(['paid', 'vMarkPaid', 'primary']);
      if (st === 'paid') steps.push(['booked', 'vMarkBooked', 'primary']);
      if (st === 'booked') steps.push(['delivered', 'vMarkSent', 'primary']);
      if (['booked', 'delivered'].includes(st)) steps.push(['cancelled', 'vMarkCancelled', '']);
      if (['awaiting_payment', 'paid'].includes(st)) steps.push(['refused', 'vRefuse', '']);
    }
    modal(ED.id ? `${t('vEdit')} ${ED.ref}` : t('vNew'), `
      ${ED.id ? `<div class="row between" style="margin-bottom:12px;gap:8px;flex-wrap:wrap">${pill(st)}<span class="small muted">${t('vFee')}: <b>${esc(ED.fee)} ${esc(ED.currency)}</b>${ED.source === 'whatsapp' ? ' · WhatsApp' : ''}</span></div>` : ''}
      <div class="grid g2">
        ${f('phone', t('vCustomer'), ED.customer_phone, 'tel', 'dir="ltr" placeholder="9665…"')}
        <div class="f"><label for="vb-country">${t('vCountry')}</label><select class="inp" id="vb-country">${COUNTRIES.map(c => `<option value="${c[0]}" ${ED.country === c[0] ? 'selected' : ''}>${esc(L() === 'ar' ? c[1] : c[0])}</option>`).join('')}</select></div>
        ${f('checkin', t('vCheckin'), ED.checkin, 'date')}${f('checkout', t('vCheckout'), ED.checkout, 'date')}
        ${f('persons', t('vPersons'), ED.persons, 'number', 'min="1" max="20"')}${f('rooms', t('vRooms'), ED.rooms, 'number', 'min="1" max="10"')}
        <div class="f span2"><label for="vb-guests">${t('vGuests')}</label><textarea class="inp" id="vb-guests" rows="3" dir="ltr">${esc((ED.guests || []).map(g => g.name || g).join('\n'))}</textarea></div>
        <div class="f span2"><label for="vb-hotel">${t('vHotel')}</label><input class="inp" id="vb-hotel" list="vb-hl" value="${esc(ED.hotel || '')}"><datalist id="vb-hl">${hotelsOf.map(h => `<option value="${esc(h.hotel)}">`).join('')}</datalist></div>
        ${f('city', t('vCity'), ED.city)}${f('stars', t('vStars'), ED.hotel_stars, 'number', 'min="1" max="5"')}
        <div class="span2">${f('address', t('vAddress'), ED.hotel_address)}</div>${f('hphone', t('vPhone'), ED.hotel_phone, 'tel', 'dir="ltr"')}
        ${f('room', t('vRoom'), ED.room_type, 'text', 'placeholder="Standard Double Room"')}${f('board', t('vBoard'), ED.board, 'text', 'placeholder="Room only / Breakfast"')}
        ${f('conf', t('vConf'), ED.confirmation_no, 'text', 'dir="ltr"')}${f('supplier', t('vSupplier'), ED.supplier, 'text', 'placeholder="LuxeCheck / Booking.com / Hotel"')}${f('supref', t('vSupRef'), ED.supplier_ref, 'text', 'dir="ltr"')}
        <div class="f"><label for="vb-deadline">${t('vDeadline')}</label><input class="inp" id="vb-deadline" type="datetime-local" value="${dl}"></div>
        <div class="span2">${f('paid', t('vPaidNote'), ED.paid_note)}</div>
        <div class="f span2"><label for="vb-notes">${t('vNotes')}</label><textarea class="inp" id="vb-notes" rows="2">${esc(ED.notes || '')}</textarea></div>
        ${ED.id ? `<label class="check span2"><input type="checkbox" id="vb-policy"> ${t('vShowPolicy')}</label>` : ''}
      </div>`,
      `${ED.id ? `<button class="btn" data-act="vFile" style="margin-inline-end:auto">${ic('print', 'sm')} ${t('vFile')}</button>` : ''}
       ${steps.map(([s, l, c]) => `<button class="btn ${c}" data-act="vStep" data-v="${s}">${t(l)}</button>`).join('')}
       <button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn ${steps.length ? '' : 'primary'}" data-act="vSave">${t('save')}</button>`, { wide: true });
  }
  function readForm() {
    const v = id => (document.getElementById('vb-' + id) || {}).value || '';
    const dl = v('deadline');
    return {
      customer_phone: v('phone').replace(/[^\d]/g, ''), country: v('country'), city: v('city').trim() || null, hotel: v('hotel').trim() || null,
      hotel_address: v('address').trim() || null, hotel_phone: v('hphone').trim() || null, hotel_stars: parseInt(v('stars'), 10) || null,
      checkin: v('checkin'), checkout: v('checkout'), persons: Math.max(1, parseInt(v('persons'), 10) || 1), rooms: Math.max(1, parseInt(v('rooms'), 10) || 1),
      guests: v('guests').split(/\n+/).map(s => s.trim()).filter(Boolean).map(name => ({ name })), room_type: v('room').trim() || null, board: v('board').trim() || null,
      confirmation_no: v('conf').trim() || null, supplier: v('supplier').trim() || null, supplier_ref: v('supref').trim() || null,
      cancel_deadline: dl ? new Date(dl).toISOString() : null, paid_note: v('paid').trim() || null, notes: v('notes').trim() || null
    };
  }
  async function save(status) {
    const row = readForm();
    if (!row.customer_phone || !row.country || !row.checkin || !row.checkout) return toast(t('vNeed'));
    if (row.checkout <= row.checkin) return toast(t('vBadDates'));
    if (status === 'booked' && (!row.hotel || !row.confirmation_no || !row.cancel_deadline)) return toast(t('vNeedBook'));
    if (status) { row.status = status; if (status === 'cancelled') row.cancelled_at = new Date().toISOString(); }
    // keep the chosen hotel's address/phone/stars when staff pick it from the list
    const hh = H.find(h => h.country === row.country && h.hotel === row.hotel);
    if (hh) { row.hotel_address = row.hotel_address || hh.address || null; row.hotel_phone = row.hotel_phone || hh.phone || null; row.hotel_stars = row.hotel_stars || hh.stars || null; row.city = row.city || hh.city || null; }
    let r;
    if (ED.id) r = await Cloud.sb.from(VB).update(row).eq('id', ED.id);
    else r = await Cloud.sb.from(VB).insert({ ...row, agency_id: Cloud.agencyId, ref: 'VH-' + Date.now().toString(36).toUpperCase().slice(-6), fee: SET.fee ?? 35, currency: SET.currency || 'SAR', source: 'staff' });
    if (r.error) return toast(friendlyErr(r.error));
    closeModal(); toast(t('vSaved')); B = null; load();
  }

  /* ---- printable booking file (save as PDF from the print dialog) ---- */
  function file() {
    const b = Object.assign({}, ED, readForm());
    const policy = document.getElementById('vb-policy') && document.getElementById('vb-policy').checked;
    const br = S.brand || {}; const n = nights(b);
    const d = iso => iso ? new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' }) : '—';
    const row = (k, v) => v ? `<tr><th>${k}</th><td>${esc(String(v))}</td></tr>` : '';
    const logo = br.logo ? `<img src="${esc(br.logo)}" alt="" style="max-height:54px;max-width:200px">` : `<b style="font-size:22px">${esc(br.name || 'LuxeCheck')}</b>`;
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Hotel reservation ${esc(b.ref || '')}</title><style>
      @page{size:A4;margin:16mm}body{font:13px/1.5 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#13201E;margin:0}
      .top{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid ${esc(br.color || '#0F2A4A')};padding-bottom:14px;margin-bottom:18px}
      h1{font-size:20px;margin:0 0 4px}.muted{color:#5B6A67}.ok{display:inline-block;background:#E7F5EC;color:#1E8A4C;font-weight:700;border-radius:999px;padding:4px 12px;font-size:12px}
      table{width:100%;border-collapse:collapse;margin:0 0 16px}th,td{text-align:left;padding:8px 10px;border-bottom:1px solid #E3E8E6;vertical-align:top}th{width:34%;color:#5B6A67;font-weight:600}
      h2{font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#5B6A67;margin:18px 0 6px}.box{border:1px solid #DDE4E2;border-radius:10px;padding:4px 12px}
      .foot{margin-top:26px;font-size:11px;color:#5B6A67;border-top:1px solid #E3E8E6;padding-top:10px}
    </style></head><body>
      <div class="top"><div>${logo}<div class="muted" style="margin-top:6px">${esc([br.phone, br.email, br.domain].filter(Boolean).join(' · '))}</div></div>
        <div style="text-align:right"><h1>Hotel Reservation Confirmation</h1><div class="muted">Booking reference: <b>${esc(b.ref || '')}</b></div><div class="muted">Issued: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</div><div style="margin-top:6px"><span class="ok">CONFIRMED</span></div></div></div>
      <h2>Guest${(b.guests || []).length > 1 ? 's' : ''}</h2><div class="box"><table>${(b.guests || []).map((g, i) => row('Guest ' + (i + 1), g.name || g)).join('') || row('Guest', '—')}<tr><th>Number of guests</th><td>${b.persons} adult${b.persons > 1 ? 's' : ''} · ${b.rooms} room${b.rooms > 1 ? 's' : ''}</td></tr></table></div>
      <h2>Hotel</h2><div class="box"><table>${row('Hotel', b.hotel + (b.hotel_stars ? ' ' + '★'.repeat(b.hotel_stars) : ''))}${row('Address', b.hotel_address)}${row('City / Country', [b.city, b.country].filter(Boolean).join(', '))}${row('Telephone', b.hotel_phone)}</table></div>
      <h2>Stay</h2><div class="box"><table>${row('Check-in', d(b.checkin) + ' (from 15:00)')}${row('Check-out', d(b.checkout) + ' (until 12:00)')}${row('Length of stay', n + ' night' + (n > 1 ? 's' : ''))}${row('Room type', b.room_type || 'Standard Room')}${row('Meals', b.board || 'Room only')}${row('Hotel confirmation number', b.confirmation_no)}${policy && b.cancel_deadline ? row('Cancellation policy', 'Free cancellation until ' + new Date(b.cancel_deadline).toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })) : ''}</table></div>
      <div class="foot">This document confirms a hotel reservation made by ${esc(br.name || 'LuxeCheck')} on behalf of the guest(s) named above. For verification please contact the hotel quoting the confirmation number, or ${esc(br.name || 'LuxeCheck')}${br.phone ? ' at ' + esc(br.phone) : ''}${br.email ? ' · ' + esc(br.email) : ''}.</div>
      <script>setTimeout(function(){window.print()},400)<\/script></body></html>`;
    const w = window.open('', '_blank'); if (!w) return toast(t('errTryAgain'));
    w.document.open(); w.document.write(html); w.document.close();
  }

  /* ---- hotels ---- */
  function hForm(h) {
    HE = Object.assign({ country: CF || 'France', priority: (H.filter(x => x.country === (CF || 'France')).length || 0) + 1, active: true }, h);
    const f = (id, label, val, type = 'text', extra = '') => `<div class="f"><label for="vh-${id}">${label}</label><input class="inp" id="vh-${id}" type="${type}" value="${esc(val ?? '')}" ${extra}></div>`;
    modal(t('vHotelEdit'), `<div class="grid g2">
      <div class="f"><label for="vh-country">${t('vCountry')}</label><select class="inp" id="vh-country">${COUNTRIES.map(c => `<option value="${c[0]}" ${HE.country === c[0] ? 'selected' : ''}>${esc(L() === 'ar' ? c[1] : c[0])}</option>`).join('')}</select></div>
      ${f('city', t('vCity'), HE.city, 'text', 'placeholder="Paris"')}<div class="span2">${f('hotel', t('vHotel'), HE.hotel, 'text', 'placeholder="Novotel Paris Centre Tour Eiffel"')}</div>
      <div class="span2">${f('address', t('vAddress'), HE.address)}</div>${f('phone', t('vPhone'), HE.phone, 'tel', 'dir="ltr"')}
      <div class="f"><label for="vh-stars">${t('vStars')}</label><select class="inp" id="vh-stars"><option value="">—</option>${[5, 4, 3, 2].map(n => `<option value="${n}" ${Number(HE.stars) === n ? 'selected' : ''}>${'★'.repeat(n)}</option>`).join('')}</select></div>
      <div class="f"><label for="vh-priority">${t('vPriority')}</label><select class="inp" id="vh-priority">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `<option ${Number(HE.priority) === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
      <label class="check"><input type="checkbox" id="vh-active" ${HE.active !== false ? 'checked' : ''}> ${t('phActive') || 'Active'}</label></div>`,
      `${HE.id ? `<button class="btn" data-act="vHDel" style="margin-inline-end:auto">${ic('trash', 'sm')} ${t('delete')}</button>` : ''}<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="vHSave">${t('save')}</button>`);
  }
  async function hSave() {
    const v = id => (document.getElementById('vh-' + id) || {}).value || '';
    const row = { agency_id: Cloud.agencyId, country: v('country'), city: v('city').trim() || null, hotel: v('hotel').trim(), address: v('address').trim() || null, phone: v('phone').trim() || null, stars: parseInt(v('stars'), 10) || null, priority: parseInt(v('priority'), 10) || 5, active: document.getElementById('vh-active').checked };
    if (!row.hotel) return toast(t('phNeed') || t('vNeed'));
    const r = HE.id ? await Cloud.sb.from(VH).update(row).eq('id', HE.id) : await Cloud.sb.from(VH).insert(row);
    if (r.error) return toast(friendlyErr(r.error));
    CF = row.country; closeModal(); toast(t('vSaved')); B = null; load();
  }
  function parseCSV(txt) {
    txt = String(txt).replace(/^﻿/, ''); const sep = ((txt.split(/\r?\n/)[0] || '').match(/;/g) || []).length > ((txt.split(/\r?\n/)[0] || '').match(/,/g) || []).length ? ';' : ',';
    const rows = []; let row = [], cur = '', q = false;
    for (let i = 0; i < txt.length; i++) { const ch = txt[i]; if (q) { if (ch === '"') { if (txt[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; continue; }
      if (ch === '"') q = true; else if (ch === sep) { row.push(cur); cur = ''; } else if (ch === '\n' || ch === '\r') { if (ch === '\r' && txt[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; } else cur += ch; }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    return rows.map(r => r.map(c => c.trim())).filter(r => r.some(Boolean));
  }
  const findCountry = s => { const k = String(s || '').trim().toLowerCase(); const c = COUNTRIES.find(x => x[0].toLowerCase() === k || x[1] === s.trim() || (k === 'uk' && x[0] === 'United Kingdom') || ((k === 'usa' || k === 'us') && x[0] === 'United States')); return c ? c[0] : null; };
  async function importFile(f) {
    let rows; try { rows = parseCSV(await f.text()); } catch (e) { return toast(t('vImportErr')); }
    const hdr = (rows[0] || []).map(x => x.toLowerCase()); const has = hdr.includes('hotel');
    const ix = n => has ? hdr.indexOf(n) : ['country', 'city', 'hotel', 'address', 'stars', 'priority'].indexOf(n);
    if (has) rows = rows.slice(1);
    const out = rows.map(r => ({ agency_id: Cloud.agencyId, country: findCountry(r[ix('country')]), city: r[ix('city')] || null, hotel: r[ix('hotel')] || '', address: ix('address') >= 0 ? r[ix('address')] || null : null, stars: parseInt(r[ix('stars')], 10) || null, priority: Math.min(10, Math.max(1, parseInt(r[ix('priority')], 10) || 5)), active: true })).filter(r => r.country && r.hotel).slice(0, 1000);
    if (!out.length) return toast(t('vImportErr'));
    const { error } = await Cloud.sb.from(VH).upsert(out, { onConflict: 'agency_id,country,hotel', ignoreDuplicates: true });
    if (error) { const r2 = await Cloud.sb.from(VH).insert(out); if (r2.error) return toast(friendlyErr(r2.error)); }
    toast(t('vImported', { n: out.length })); B = null; load();
  }

  Object.assign(ACT, {
    vTab: el => { TAB = el.dataset.v; rerenderSafe(); },
    vF: el => { F = el.dataset.v; rerenderSafe(); },
    vCF: el => { CF = el.dataset.v; rerenderSafe(); },
    vNew: () => form({}),
    vOpen: el => { const b = (B || []).find(x => x.id === el.dataset.id); if (b) form(b); },
    vSave: () => save(''),
    vStep: el => save(el.dataset.v),
    vFile: () => file(),
    vHNew: () => hForm({}),
    vHOpen: el => { const h = (H || []).find(x => x.id === el.dataset.id); if (h) hForm(h); },
    vHSave: () => hSave(),
    vHDel: () => { const id = HE.id; confirmBox(t('vDelQ'), async () => { const r = await Cloud.sb.from(VH).delete().eq('id', id); if (r.error) toast(friendlyErr(r.error)); closeModal(); B = null; load(); }, t('delete')); },
    vTpl: () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿country,city,hotel,address,stars,priority\r\nFrance,Paris,Novotel Paris Centre Tour Eiffel,"61 Quai de Grenelle, 75015 Paris",4,1\r\nUnited Kingdom,London,Hilton London Paddington,"146 Praed St, London W2 1EE",4,1\r\n'], { type: 'text/csv;charset=utf-8' })); a.download = 'visa-hotels-template.csv'; document.body.appendChild(a); a.click(); setTimeout(() => a.remove(), 300); },
    vToggle: async () => {
      const on = SET.active !== false;
      const r = await Cloud.sb.from(VS).upsert({ agency_id: Cloud.agencyId, active: !on, fee: SET.fee ?? 35, currency: SET.currency || 'SAR', payment_text: SET.payment_text || null, updated_at: new Date().toISOString() });
      if (r.error) return toast(friendlyErr(r.error)); toast(t(on ? 'vOffDone' : 'vOnDone')); B = null; load();
    },
    vSaveSet: async () => {
      const fee = Math.max(0, Number(document.getElementById('vs-fee').value) || 0);
      const r = await Cloud.sb.from(VS).upsert({ agency_id: Cloud.agencyId, active: SET.active !== false, fee, currency: SET.currency || 'SAR', payment_text: document.getElementById('vs-pay').value.trim() || null, updated_at: new Date().toISOString() });
      if (r.error) return toast(friendlyErr(r.error)); toast(t('vSaved')); B = null; load();
    }
  });
  document.addEventListener('change', e => { if (e.target && e.target.id === 'vh-file' && e.target.files && e.target.files[0]) { const f = e.target.files[0]; e.target.value = ''; importFile(f); } });

  window.EXTRA_VIEWS = window.EXTRA_VIEWS || {};
  window.EXTRA_VIEWS.visa = vVisa;
  const prev = window.extraNav;
  window.extraNav = () => {
    const a = typeof prev === 'function' ? prev() : [];
    if (!can('visa')) return a;
    const i = a.findIndex(x => x && x[0] === 'marketing');
    a.splice(i >= 0 ? i + 1 : a.length, 0, ['visa', 'visa', t('nav_visa')]);
    return a;
  };
  try { if (Cloud.on && document.querySelector('#side')) { renderShell(); route(); } } catch (e) { }
})();
