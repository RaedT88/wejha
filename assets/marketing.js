/* ---------- Wejha: Offers & campaigns (moved from the old LuxeCheck operations site) ----------
   Library: text + optional photo / video / PDF + a "Request offer" WhatsApp button.
   Send: one customer at a time, from the order chat after taking over (WhatsApp 24h window).
   Report: accepted → delivered → read → requested, from the n8n ledger via ops-bridge. */
(function () {
  if (typeof ROUTES === 'undefined') return;
  const TX = {
    nav_marketing: ['Offers & campaigns', 'العروض والحملات'],
    mkSub: ['Build offers once, send them to a customer from the WhatsApp chat, and see who opened them and asked for the offer.', 'جهّز العرض مرة واحدة، أرسله للعميل من محادثة واتساب، وتابع مين فتحه وطلب العرض.'],
    mkNew: ['New offer', 'عرض جديد'], mkEdit: ['Edit offer', 'تعديل العرض'], mkTitle: ['Offer name (internal)', 'اسم العرض (داخلي)'],
    mkKind: ['Type', 'النوع'], mk_package: ['Package', 'باقة'], mk_promo: ['Promotion', 'عرض ترويجي'], mk_hotel: ['Hotel deal', 'عرض فندق'], mk_event: ['Event / season', 'مناسبة / موسم'],
    mkBody: ['Message to the customer', 'نص الرسالة للعميل'], mkBodyHint: ['Up to 1,024 characters. Shown as the WhatsApp caption.', 'حتى 1,024 حرف. يظهر كنص رسالة واتساب.'],
    mkCta: ['Button text', 'نص الزر'], mkCtaHint: ['Up to 20 characters. When the customer taps it, the order shows “requested the offer”.', 'حتى 20 حرف. لما العميل يضغطه يظهر في التقرير "طلب العرض".'],
    mkMedia: ['Photo, video or PDF (optional)', 'صورة أو فيديو أو PDF (اختياري)'], mkMediaHint: ['JPG, PNG, MP4 or PDF, up to 4 MB.', 'JPG أو PNG أو MP4 أو PDF، حتى 4 ميجا.'],
    mkMediaBig: ['The file is larger than 4 MB.', 'الملف أكبر من 4 ميجا.'], mkMediaType: ['Use JPG, PNG, MP4 or PDF.', 'استخدم JPG أو PNG أو MP4 أو PDF.'], mkRemoveMedia: ['Remove file', 'حذف الملف'],
    mkValid: ['Valid until', 'صالح حتى'], mkPreview: ['WhatsApp preview', 'معاينة واتساب'],
    mkDraft: ['Draft', 'مسودة'], mkApproved: ['Approved', 'معتمد'], mkArchived: ['Archived', 'مؤرشف'], mkApprove: ['Approve', 'اعتماد'], mkArchive: ['Archive', 'أرشفة'], mkRestore: ['Restore', 'استرجاع'],
    mkOwnerOnly: ['Only the owner can approve offers. Save it and ask the owner to approve.', 'الاعتماد للمالك فقط. احفظ العرض واطلب من المالك اعتماده.'],
    mkNeed: ['Name, message and button text are required.', 'اسم العرض ونص الرسالة ونص الزر مطلوبة.'],
    mkSaved: ['Offer saved', 'تم حفظ العرض'], mkDelQ: ['Delete this offer and its send history?', 'حذف هذا العرض وسجل إرساله؟'],
    mkNoTable: ['The campaigns tables are not set up yet. Run the migration 20261113_marketing.sql in Supabase.', 'جداول الحملات غير مُعدّة بعد. شغّل ملف 20261113_marketing.sql في Supabase.'],
    mkEmpty: ['No offers yet. Create one, approve it, then open any order chat, take over, and press “Send offer”.', 'لا توجد عروض بعد. أنشئ عرضاً واعتمده، ثم افتح محادثة أي طلب، تولَّها، واضغط "إرسال عرض".'],
    mkHow: ['To send: open an order → take over the chat → “Send offer”. WhatsApp only allows it within 24 hours of the customer’s last message.', 'للإرسال: افتح الطلب ← تولَّ المحادثة ← "إرسال عرض". واتساب يسمح بذلك خلال 24 ساعة من آخر رسالة للعميل.'],
    mkReport: ['Performance (last 60 days)', 'الأداء (آخر 60 يوم)'], mkSent: ['Sent', 'أُرسل'], mkDelivered: ['Delivered', 'وصل'], mkRead: ['Read', 'قُرئ'], mkClicked: ['Requested', 'طلب العرض'],
    mkFailed: ['Failed', 'فشل'], mkRate: ['Request rate', 'نسبة الطلب'], mkLast: ['Last sent', 'آخر إرسال'], mkOffer: ['Offer', 'العرض'], mkAll: ['All', 'الكل'],
    mkSendOffer: ['Send offer', 'إرسال عرض'], mkPick: ['Choose an approved offer', 'اختر عرضاً معتمداً'], mkNoApproved: ['No approved offers yet. Create and approve one in “Offers & campaigns”.', 'لا توجد عروض معتمدة. أنشئ عرضاً واعتمده من "العروض والحملات".'],
    mkSendTo: ['Send to {p}', 'إرسال إلى {p}'], mkSentOk: ['Offer sent to WhatsApp', 'تم إرسال العرض على واتساب'], mkBridgeOld: ['Sending offers needs the updated ops-bridge function (v8). Ask the owner to deploy it.', 'إرسال العروض يحتاج تحديث دالة ops-bridge (v8). اطلب من المالك نشرها.'],
    mkCustomers: ['Customers', 'العملاء'], mkNoSends: ['Not sent to anyone yet.', 'لم يُرسل لأحد بعد.'], mkStatusWait: ['Delivery status updates within a few minutes.', 'حالة التسليم تتحدث خلال دقائق.'],
    mkStarter: ['Ready-made offers', 'عروض جاهزة'], mkStarterQ: ['Create {n} draft offers from your packages and seasonal deals? You can edit them before approving.', 'إنشاء {n} عرض (مسودة) من باقاتك والعروض الموسمية؟ تقدر تعدّلها قبل الاعتماد.'],
    mkStarterDone: ['{n} draft offers added', 'تمت إضافة {n} عرض كمسودة'], mkStarterNone: ['All your packages already have offers.', 'كل باقاتك لها عروض بالفعل.'],
    mkApproveAll: ['Approve all drafts', 'اعتماد كل المسودات'], mkApproveAllQ: ['Approve {n} draft offers so staff can send them?', 'اعتماد {n} عرض حتى يقدر الفريق يرسلها؟'], mkApprovedN: ['{n} offers approved', 'تم اعتماد {n} عرض'],
    mkLoadingMedia: ['Preparing the file…', 'تجهيز الملف…'], mkSending: ['Sending…', 'جاري الإرسال…']
  };
  for (const k in TX) { I18N.en[k] = TX[k][0]; I18N.ar[k] = TX[k][1]; }
  if (!ROUTES.includes('marketing')) ROUTES.push('marketing');
  ROLE_CAN.marketing = ['owner', 'agent'];
  ROLE_CAN.mkApprove = ['owner'];

  const T = 'marketing_offers', TS = 'marketing_sends';
  const COLS = 'id,title,kind,status,body,cta_label,media_mime,media_kind,media_name,valid_to,created_at,updated_at';
  const MIMES = { 'image/jpeg': 'image', 'image/png': 'image', 'video/mp4': 'video', 'application/pdf': 'document' };
  const MAXB = 4 * 1024 * 1024;
  let MO = null, MS = null, MERR = null, MF = 'all', ED = null, MEDIA = {};

  async function load() {
    const [o, s] = await Promise.all([
      Cloud.sb.from(T).select(COLS).eq('agency_id', Cloud.agencyId).order('updated_at', { ascending: false }),
      Cloud.sb.from(TS).select('offer_id,sender,request_id,provider_id,ok,error,sent_at').eq('agency_id', Cloud.agencyId).gte('sent_at', new Date(Date.now() - 60 * 864e5).toISOString()).order('sent_at', { ascending: false }).limit(5000)
    ]);
    const e = o.error || s.error;
    MERR = e ? (/marketing_/.test(e.message || '') || e.code === 'PGRST205' || e.code === '42P01' ? 'table' : friendlyErr(e)) : null;
    MO = o.error ? [] : (o.data || []); MS = s.error ? [] : (s.data || []);
    if (S.ui.view === 'marketing') rerenderSafe();
  }

  /* ---- report: join sends (Supabase) with WhatsApp statuses + button taps (n8n ledger) ---- */
  function stats() {
    const mk = (typeof OPS !== 'undefined' && OPS.data && OPS.data.marketing) || {};
    const rc = {}; for (const r of mk.receipts || []) rc[r.rid] = r.p;
    const st = {}; for (const x of mk.statuses || []) st[x.p] = x;
    const clicks = mk.clicks || [];
    const by = {};
    const row = id => by[id] = by[id] || { sent: 0, delivered: 0, read: 0, clicked: 0, failed: 0, last: '', list: [] };
    for (const s of MS || []) {
      const r = row(s.offer_id); const pid = s.provider_id || rc[s.request_id] || '';
      const x = pid ? st[pid] : null;
      const tapped = clicks.some(c => c.item === s.offer_id && (c.rid === s.request_id || (!c.rid && c.snd === s.sender)));
      const failed = !s.ok || (x && x.f);
      const state = failed ? 'failed' : tapped ? 'clicked' : x && x.s === 'read' ? 'read' : x && x.s === 'delivered' ? 'delivered' : 'sent';
      if (s.ok) r.sent++;
      if (failed) r.failed++;
      if (!failed && (tapped || (x && (x.s === 'delivered' || x.s === 'read')))) r.delivered++;
      if (!failed && (tapped || (x && x.s === 'read'))) r.read++;
      if (tapped) r.clicked++;
      if (!r.last || s.sent_at > r.last) r.last = s.sent_at;
      r.list.push({ sender: s.sender, at: s.sent_at, state, err: s.error });
    }
    return by;
  }
  const pct = (a, b) => b ? Math.round(a * 100 / b) + '%' : '—';
  const stPill = s => `<span class="pill ${s === 'approved' ? 'st-confirmed' : s === 'archived' ? 'st-lost' : 'st-draft'}">${t(s === 'approved' ? 'mkApproved' : s === 'archived' ? 'mkArchived' : 'mkDraft')}</span>`;
  const statePill = s => `<span class="pill ${s === 'clicked' ? 'st-confirmed' : s === 'failed' ? 'st-lost' : s === 'read' ? 'st-sent' : 'st-draft'}">${t({ clicked: 'mkClicked', failed: 'mkFailed', read: 'mkRead', delivered: 'mkDelivered', sent: 'mkSent' }[s])}</span>`;
  const mediaIc = k => k === 'video' ? '🎬' : k === 'document' ? '📄' : k === 'image' ? '🖼️' : '';

  function vMarketing() {
    if (!Cloud.on) return vDashboard();
    const edit = can('marketing');
    const head = (extra = '') => `<div class="head"><div><h1>${t('nav_marketing')}</h1><p>${t('mkSub')}</p></div>${extra}</div>`;
    if (!MO) { load(); if (typeof opsLoad === 'function') opsLoad().then(() => { if (S.ui.view === 'marketing') rerenderSafe(); }); return head() + `<p class="muted">${t('loading')}</p>`; }
    if (MERR === 'table') return head() + `<div class="warn-box">${ic('alert', 'sm')} ${t('mkNoTable')}</div>`;
    const by = stats();
    const tot = Object.values(by).reduce((a, r) => { for (const k of ['sent', 'delivered', 'read', 'clicked', 'failed']) a[k] += r[k]; return a; }, { sent: 0, delivered: 0, read: 0, clicked: 0, failed: 0 });
    const list = MO.filter(o => MF === 'all' ? o.status !== 'archived' : o.status === MF);
    const kpi = (lbl, v, sub) => `<div class="card kpi" style="padding:14px 16px"><div class="tiny muted">${lbl}</div><div class="num" style="font-size:24px;font-weight:700">${v}</div>${sub ? `<div class="tiny muted">${sub}</div>` : ''}</div>`;
    const counts = { all: MO.filter(o => o.status !== 'archived').length, draft: MO.filter(o => o.status === 'draft').length, approved: MO.filter(o => o.status === 'approved').length, archived: MO.filter(o => o.status === 'archived').length };
    const drafts = MO.filter(o => o.status === 'draft').length;
    return head(edit ? `<div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn" data-act="mkStarter">${ic('spark', 'sm')} ${t('mkStarter')}</button>${can('mkApprove') && drafts ? `<button class="btn" data-act="mkApproveAll">${ic('check', 'sm')} ${t('mkApproveAll')} <span class="num muted">${drafts}</span></button>` : ''}<button class="btn primary" data-act="mkNew">${ic('plus', 'sm')} ${t('mkNew')}</button></div>` : '') + `
    ${MERR ? `<div class="warn-box" style="margin-bottom:12px">${ic('alert', 'sm')} ${esc(MERR)}</div>` : ''}
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:14px">
      ${kpi(t('mkSent'), tot.sent)}${kpi(t('mkDelivered'), tot.delivered, pct(tot.delivered, tot.sent))}${kpi(t('mkRead'), tot.read, pct(tot.read, tot.sent))}${kpi(t('mkClicked'), tot.clicked, pct(tot.clicked, tot.sent))}${kpi(t('mkFailed'), tot.failed)}
    </div>
    <div class="warn-box ok" style="margin-bottom:14px">${ic('chat', 'sm')} ${t('mkHow')}</div>
    <div class="chips" style="margin-bottom:12px">${['all', 'approved', 'draft', 'archived'].map(k => `<button class="chip ${MF === k ? 'on' : ''}" data-act="mkF" data-val="${k}">${t(k === 'all' ? 'mkAll' : k === 'approved' ? 'mkApproved' : k === 'draft' ? 'mkDraft' : 'mkArchived')} <span class="n">${counts[k]}</span></button>`).join('')}</div>
    ${!MO.length ? `<div class="card"><p class="muted">${t('mkEmpty')}</p></div>` : `
    <div class="card" style="padding:4px 6px"><div style="padding:10px 10px 4px"><b>${t('mkReport')}</b></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('mkOffer')}</th><th></th><th class="num">${t('mkSent')}</th><th class="num">${t('mkDelivered')}</th><th class="num">${t('mkRead')}</th><th class="num">${t('mkClicked')}</th><th class="num">${t('mkRate')}</th><th class="num">${t('mkFailed')}</th><th>${t('mkLast')}</th></tr></thead><tbody>
    ${list.map(o => { const r = by[o.id] || { sent: 0, delivered: 0, read: 0, clicked: 0, failed: 0, last: '' }; return `<tr data-act="mkOpen" data-id="${o.id}" tabindex="0" style="cursor:pointer">
      <td><b>${esc(o.title)}</b> ${o.media_kind ? `<span title="${esc(o.media_name || '')}">${mediaIc(o.media_kind)}</span>` : ''}<div class="tiny muted">${t('mk_' + o.kind)}${o.valid_to ? ' · ' + t('mkValid') + ' ' + fmtDate(o.valid_to) : ''}</div></td>
      <td>${stPill(o.status)}</td><td class="num">${r.sent}</td><td class="num">${r.delivered}</td><td class="num">${r.read}</td><td class="num"><b>${r.clicked}</b></td><td class="num">${pct(r.clicked, r.sent)}</td><td class="num">${r.failed || ''}</td><td class="tiny muted">${r.last ? opsTime(r.last) : '—'}</td></tr>`; }).join('') || `<tr><td colspan="9" class="muted">—</td></tr>`}
    </tbody></table></div></div>`}`;
  }

  /* ---- editor ---- */
  function waPreview(o) {
    const m = MEDIA[o.id || 'new'];
    const media = o.media_kind === 'image' && m ? `<img src="data:${o.media_mime};base64,${m}" alt="" style="width:100%;border-radius:8px;display:block;margin-bottom:6px">`
      : o.media_kind ? `<div class="tiny" style="background:rgba(0,0,0,.06);border-radius:8px;padding:10px;margin-bottom:6px">${mediaIc(o.media_kind)} ${esc(o.media_name || o.media_kind)}</div>` : '';
    return `<div style="background:#E7DDD3;border-radius:12px;padding:14px"><div style="background:#fff;border-radius:10px;padding:8px;max-width:320px;box-shadow:0 1px 1px rgba(0,0,0,.1)">${media}<div dir="auto" style="white-space:pre-wrap;font-size:14px;color:#111">${esc(o.body || '…')}</div>
      <div style="border-top:1px solid #eee;margin-top:8px;padding-top:8px;text-align:center;color:#0A84C6;font-weight:600;font-size:14px">${esc(o.cta_label || t('mkCta'))}</div></div></div>`;
  }
  function form(o) {
    ED = Object.assign({ kind: 'package', status: 'draft', cta_label: L() === 'ar' ? 'اطلب العرض' : 'Request offer' }, o);
    const owner = can('mkApprove');
    modal(o.id ? t('mkEdit') : t('mkNew'), `
      <div class="grid g2" style="align-items:start">
        <div class="stack">
          <div class="f"><label for="mk-title">${t('mkTitle')}</label><input class="inp" id="mk-title" maxlength="120" value="${esc(ED.title || '')}"></div>
          <div class="grid g2">
            <div class="f"><label for="mk-kind">${t('mkKind')}</label><select class="inp" id="mk-kind">${['package', 'promo', 'hotel', 'event'].map(k => `<option value="${k}" ${ED.kind === k ? 'selected' : ''}>${t('mk_' + k)}</option>`).join('')}</select></div>
            <div class="f"><label for="mk-valid">${t('mkValid')}</label><input class="inp" id="mk-valid" type="date" value="${esc(ED.valid_to || '')}"></div>
          </div>
          <div class="f"><label for="mk-body">${t('mkBody')}</label><textarea class="inp" id="mk-body" rows="7" maxlength="1024" dir="auto">${esc(ED.body || '')}</textarea><div class="tiny muted">${t('mkBodyHint')} <span id="mk-n" class="num">${(ED.body || '').length}</span>/1024</div></div>
          <div class="f"><label for="mk-cta">${t('mkCta')}</label><input class="inp" id="mk-cta" maxlength="20" value="${esc(ED.cta_label || '')}"><div class="tiny muted">${t('mkCtaHint')}</div></div>
          <div class="f"><label>${t('mkMedia')}</label>
            <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center"><label class="btn" style="cursor:pointer">${ic('upload', 'sm')} ${t('mkMedia').split('(')[0]}<input type="file" id="mk-file" accept="image/jpeg,image/png,video/mp4,application/pdf" style="display:none"></label>
            <span class="small" id="mk-fname">${ED.media_kind ? mediaIc(ED.media_kind) + ' ' + esc(ED.media_name || '') : ''}</span>
            ${ED.media_kind ? `<button class="btn" data-act="mkNoMedia">${ic('x', 'sm')} ${t('mkRemoveMedia')}</button>` : ''}</div>
            <div class="tiny muted">${t('mkMediaHint')}</div></div>
          <div class="f"><label for="mk-image-url">${L()==='ar'?'صورة من Unsplash':'Photo from Unsplash'}</label><div class="row" style="gap:8px"><input class="inp" id="mk-image-url" type="url" placeholder="https://images.unsplash.com/photo-…" style="min-width:0;flex:1"><button class="btn" data-act="mkImportUnsplash">${L()==='ar'?'إضافة الصورة':'Add photo'}</button></div><div class="tiny muted">${L()==='ar'?'رابط الصورة المباشر. تُحفظ نسخة داخل العرض بعد الاستيراد.':'Use a direct image URL. A copy is saved inside the offer after import.'}</div></div>
          ${!owner ? `<p class="tiny muted">${t('mkOwnerOnly')}</p>` : ''}
        </div>
        <div><div class="tiny muted" style="margin-bottom:6px">${t('mkPreview')}</div><div id="mk-prev">${waPreview(ED)}</div>
          ${o.id ? `<div class="tiny muted" style="margin:14px 0 6px">${t('mkCustomers')}</div><div id="mk-sends">${sendsList(o.id)}</div>` : ''}</div>
      </div>`,
      `${o.id ? `<button class="btn" data-act="mkDelete" style="margin-inline-end:auto">${ic('trash', 'sm')} ${t('delete')}</button>
        ${o.status !== 'archived' ? `<button class="btn" data-act="mkSetStatus" data-val="archived">${t('mkArchive')}</button>` : `<button class="btn" data-act="mkSetStatus" data-val="draft">${t('mkRestore')}</button>`}` : ''}
       <button class="btn" data-act="closeModal">${t('cancel')}</button>
       ${owner && ED.status !== 'approved' ? `<button class="btn" data-act="mkSave" data-val="approved">${ic('check', 'sm')} ${t('mkApprove')}</button>` : ''}
       <button class="btn primary" data-act="mkSave">${t('save')}</button>`, { wide: true });
    if (o.id && o.media_kind === 'image' && !MEDIA[o.id]) fetchMedia(o.id).then(() => paintPrev());
  }
  function sendsList(id) {
    const r = stats()[id];
    if (!r || !r.list.length) return `<p class="tiny muted">${t('mkNoSends')}</p>`;
    return `<div class="stack" style="gap:6px;max-height:220px;overflow:auto">${r.list.slice(0, 80).map(x => `<div class="row between" style="gap:8px"><span class="num small" dir="ltr">${fmtPhone(x.sender)}</span><span class="tiny muted">${opsTime(x.at)}</span>${statePill(x.state)}</div>`).join('')}</div><p class="tiny muted" style="margin-top:6px">${t('mkStatusWait')}</p>`;
  }
  function readForm() {
    ED.title = $('#mk-title').value.trim(); ED.kind = $('#mk-kind').value; ED.valid_to = $('#mk-valid').value || null;
    ED.body = $('#mk-body').value.trim(); ED.cta_label = $('#mk-cta').value.trim();
  }
  function paintPrev() { const p = $('#mk-prev'); if (p && ED) { try { readForm(); } catch (e) { } p.innerHTML = waPreview(ED); } }
  async function fetchMedia(id) {
    if (MEDIA[id]) return MEDIA[id];
    const { data, error } = await Cloud.sb.from(T).select('media_b64').eq('id', id).single();
    if (error) throw error; MEDIA[id] = data.media_b64 || ''; return MEDIA[id];
  }
  function b64(file) { return new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1] || ''); r.onerror = no; r.readAsDataURL(file); }); }

  let importingPhoto = false;
  async function importUnsplash(button) {
    if (importingPhoto || !ED) return;
    let url;
    try {
      url = new URL(String(($('#mk-image-url') || {}).value || '').trim());
      if (url.protocol !== 'https:' || url.hostname !== 'images.unsplash.com' || url.username || url.password) throw Error('invalid_url');
    } catch (_) { return toast(L() === 'ar' ? 'ضع رابط الصورة المباشر من images.unsplash.com.' : 'Use a direct image URL from images.unsplash.com.'); }
    const target = ED;
    importingPhoto = true; button.disabled = true;
    const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 20000);
    try {
      url.searchParams.set('w', '1600'); url.searchParams.set('q', '80'); url.searchParams.set('fit', 'max'); url.searchParams.set('fm', 'jpg');
      const response = await fetch(url.toString(), { signal: controller.signal, redirect: 'error', credentials: 'omit' });
      if (!response.ok) throw Error('image_download_failed');
      const file = await response.blob();
      if (!['image/jpeg', 'image/png'].includes(file.type)) throw Error('image_type');
      if (file.size > MAXB || !file.size) throw Error('image_size');
      const encoded = await b64(file);
      if (ED !== target || !$('#mk-image-url')) return;
      MEDIA[ED.id || 'new'] = encoded;
      const filename = 'Unsplash-' + url.pathname.split('/').pop().slice(0, 80) + '.jpg';
      Object.assign(ED, { media_kind: 'image', media_mime: file.type, media_name: filename, _mediaChanged: true });
      const name = $('#mk-fname'); if (name) name.textContent = '🖼️ ' + filename;
      paintPrev();
    } catch (_) { toast(L() === 'ar' ? 'تعذّر استيراد الصورة. استخدم صورة Unsplash مجانية بصيغة JPG أو PNG وأقل من 4 ميجا.' : 'Could not import the photo. Use a free Unsplash JPG or PNG under 4 MB.'); }
    finally { clearTimeout(timer); importingPhoto = false; button.disabled = false; }
  }


  async function save(status) {
    readForm();
    if (!ED.title || !ED.body || !ED.cta_label) return toast(t('mkNeed'));
    if ([...ED.cta_label].length > 20 || ED.body.length > 1024) return toast(t('mkNeed'));
    const row = { agency_id: Cloud.agencyId, title: ED.title, kind: ED.kind, body: ED.body, cta_label: ED.cta_label, valid_to: ED.valid_to };
    if (status) row.status = status;
    if (ED._mediaChanged) { const m = MEDIA[ED.id || 'new'] || null; Object.assign(row, { media_b64: m, media_mime: m ? ED.media_mime : null, media_kind: m ? ED.media_kind : null, media_name: m ? ED.media_name : null }); }
    const q = ED.id ? Cloud.sb.from(T).update(row).eq('id', ED.id).select('id').single() : Cloud.sb.from(T).insert(row).select('id').single();
    const { data, error } = await q;
    if (error) return toast(/owner_only/.test(error.message || '') ? t('mkOwnerOnly') : friendlyErr(error));
    if (!ED.id && MEDIA.new) { MEDIA[data.id] = MEDIA.new; delete MEDIA.new; }
    closeModal(); toast(t('mkSaved')); MO = null; load();
  }


  /* ---- ready-made offers from the agency's own packages + seasonal deals ---- */
  const AR = v => v && typeof v === 'object' && !Array.isArray(v) ? (v.ar || v.en || '') : (v || '');
  function fromPackage(p) {
    const title = AR(p.title); if (!title) return null;
    const hotels = [...new Set((p.lines || []).filter(l => l.kind === 'hotel' && !l.optional).map(l => AR(l.name)).filter(Boolean))].slice(0, 3);
    const inc = (AR(p.inc) || []).slice ? (AR(p.inc) || []).slice(0, 3) : [];
    const dest = AR(p.dest), sum = AR(p.summary);
    const body = [`✨ *${title}*`, `📍 ${dest || ''}${p.nights ? ` · ${p.nights} ليالٍ` : ''}`.trim(),
      hotels.length ? `🏨 ${hotels.join(' · ')}` : '', inc.length ? `✅ يشمل: ${inc.join('، ')}` : '', sum ? `\n${sum}` : '',
      `\nاضغط «اطلب العرض» ونرسل لك السعر لتواريخك خلال دقائق 👇`].filter(x => x !== '').join('\n').slice(0, 1024);
    const cat = String(p.cat || '');
    return { title: title.slice(0, 120), kind: /umrah|عمرة|hajj/i.test(title + cat) ? 'package' : 'package', body, cta_label: 'اطلب العرض' };
  }
  const SEASONAL = [
    { title: 'البحر الأحمر — شتاء 2026', kind: 'hotel', body: '🌊 *البحر الأحمر — أجمل وجهة هذا الشتاء*\n🏨 جراند حياة البحر الأحمر وأفخم منتجعات الوجهة\n☀️ جو مثالي من نوفمبر إلى مارس، شواطئ خاصة وأنشطة بحرية\n🚐 مع الانتقالات حسب العرض\n\nاضغط «اطلب العرض» ونرسل لك أفضل سعر لتواريخك 👇', cta_label: 'اطلب العرض' },
    { title: 'جزيرة ياس أبوظبي — عائلي', kind: 'promo', body: '🎢 *جزيرة ياس — عطلة العائلة*\n🏨 فنادق على الجزيرة قريبة من فيراري وورلد ووارنر براذرز وسي ورلد\n🎟️ نقدر نضيف تذاكر المدن الترفيهية\n👨‍👩‍👧 مناسب للعائلات وإجازات منتصف السنة\n\nاضغط «اطلب العرض» ونرسل لك السعر لتواريخك 👇', cta_label: 'اطلب العرض' },
    { title: 'عمرة مع الإقامة قرب الحرم', kind: 'package', body: '🕋 *عمرة مريحة قرب الحرم*\n🏨 فنادق 4 نجوم قريبة من الحرم في مكة والمدينة\n🗓️ برامج 8 و10 و12 ليلة\n🚐 تنقلات حسب البرنامج\n\nاضغط «اطلب العرض» ونرسل لك البرنامج والسعر لتواريخك 👇', cta_label: 'اطلب العرض' }
  ];
  function starterRows() {
    const have = new Set((MO || []).map(o => o.title.trim()));
    const own = (S.packages || []).map(fromPackage).filter(Boolean);
    return [...own, ...SEASONAL].filter(o => !have.has(o.title.trim())).filter((o, i, a) => a.findIndex(x => x.title === o.title) === i).slice(0, 25);
  }

  /* ---- send from the order chat ---- */
  function chatButton() {
    const sendBtn = document.querySelector('#od-body [data-act="opsSend"], [data-act="opsSend"]');
    if (!sendBtn || sendBtn.parentElement.querySelector('[data-act="mkPickOffer"]')) return;
    const b = document.createElement('button'); b.className = 'btn'; b.dataset.act = 'mkPickOffer'; b.dataset.s = sendBtn.dataset.s; b.disabled = sendBtn.disabled;
    b.innerHTML = `${ic('spark', 'sm')} ${t('mkSendOffer')}`; b.style.marginInlineEnd = '8px';
    sendBtn.parentElement.insertBefore(b, sendBtn);
  }
  if (typeof window.opsPaintDetail === 'function') {
    const orig = window.opsPaintDetail;
    window.opsPaintDetail = function () { const r = orig.apply(this, arguments); try { if (can('marketing')) chatButton(); } catch (e) { } return r; };
  }
  let PICK = null;
  async function pickOffer(sender) {
    if (!MO) await load();
    const ok = (MO || []).filter(o => o.status === 'approved' && (!o.valid_to || o.valid_to >= isoDate(new Date())));
    PICK = { sender, id: ok[0] && ok[0].id };
    if (!ok.length) return modal(t('mkSendOffer'), `<p class="muted">${MERR === 'table' ? t('mkNoTable') : t('mkNoApproved')}</p>`, `<button class="btn" data-act="closeModal">${t('close')}</button>`);
    modal(t('mkSendTo', { p: fmtPhone(sender) }), `
      <div class="grid g2" style="align-items:start"><div class="stack" style="gap:6px;max-height:420px;overflow:auto">
      <div class="tiny muted">${t('mkPick')}</div>
      ${ok.map((o, i) => `<label class="alert-row" style="background:transparent;border:1px solid var(--line);cursor:pointer"><input type="radio" name="mk-pick" value="${o.id}" ${i === 0 ? 'checked' : ''}><div class="grow"><b>${esc(o.title)}</b> ${mediaIc(o.media_kind)}<div class="tiny muted" dir="auto">${esc(o.body.slice(0, 90))}${o.body.length > 90 ? '…' : ''}</div></div></label>`).join('')}
      </div><div id="mk-pprev">${waPreview(ok[0])}</div></div>`,
      `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="mkSendNow">${ic('send', 'sm')} ${t('od_send')}</button>`, { wide: true });
    if (ok[0].media_kind === 'image') fetchMedia(ok[0].id).then(() => { const p = $('#mk-pprev'); if (p && PICK.id === ok[0].id) p.innerHTML = waPreview(ok[0]); }).catch(() => { });
  }
  async function sendNow(btn) {
    const o = (MO || []).find(x => x.id === PICK.id); if (!o) return;
    const s = PICK.sender;
    btn.disabled = true; btn.textContent = o.media_kind ? t('mkLoadingMedia') : t('mkSending');
    let media = '';
    try { if (o.media_kind) media = await fetchMedia(o.id); } catch (e) { btn.disabled = false; return toast(friendlyErr(e)); }
    btn.textContent = t('mkSending');
    const last = ((OPS.data && OPS.data.messages) || []).filter(m => m.sender === s && m.direction === 'inbound').map(m => m.created_at).sort().pop() || '';
    const extra = { body: o.body, last_inbound_at: last, marketing_item_id: o.id, cta_label: o.cta_label };
    if (media) Object.assign(extra, { media_base64: media, media_mime: o.media_mime, media_kind: o.media_kind, media_filename: o.media_name || 'offer' });
    let r = null, err = '';
    try { r = await opsCall(Object.assign({ op: 'send', sender: s }, extra)); if (r && r.ok === false) err = r.error || 'generic'; }
    catch (e) { err = e.code || e.message || 'generic'; }
    if (!err && r && !r.request_id) err = 'bridge_old';
    if (err) {
      btn.disabled = false; btn.innerHTML = `${ic('send', 'sm')} ${t('od_send')}`;
      return toast(err === 'invalid_campaign' || err === 'bridge_old' ? t('mkBridgeOld') : opsErr(err));
    }
    await Cloud.sb.from(TS).insert({ agency_id: Cloud.agencyId, offer_id: o.id, sender: s, request_id: r.request_id, provider_id: r.provider_id || r.message_id || null, ok: true });
    MS = null; MO = null;
    OPS.data.messages = (OPS.data.messages || []).concat([{ id: 'local-' + Date.now(), sender: s, direction: 'staff', body: (o.media_kind ? mediaIc(o.media_kind) + ' ' : '') + o.body + '\n[' + o.cta_label + ']', created_at: new Date().toISOString() }]);
    closeModal(); toast(t('mkSentOk')); opsPaintDetail();
  }

  Object.assign(ACT, {
    mkStarter: () => { const rows = starterRows(); if (!rows.length) return toast(t('mkStarterNone')); confirmBox(t('mkStarterQ', { n: rows.length }), async () => { const { error } = await Cloud.sb.from(T).insert(rows.map(r => ({ ...r, agency_id: Cloud.agencyId, status: 'draft' }))); closeModal(); if (error) return toast(MERR === 'table' || /marketing_/.test(error.message || '') ? t('mkNoTable') : friendlyErr(error)); toast(t('mkStarterDone', { n: rows.length })); MO = null; load(); }, t('mkStarter')); },
    mkApproveAll: () => { const ids = (MO || []).filter(o => o.status === 'draft').map(o => o.id); confirmBox(t('mkApproveAllQ', { n: ids.length }), async () => { const { error } = await Cloud.sb.from(T).update({ status: 'approved' }).in('id', ids); closeModal(); if (error) return toast(friendlyErr(error)); toast(t('mkApprovedN', { n: ids.length })); MO = null; load(); }, t('mkApprove')); },
    mkNew: () => { MEDIA.new = ''; form({}); },
    mkOpen: el => { const o = (MO || []).find(x => x.id === el.dataset.id); if (o) form(o); },
    mkF: el => { MF = el.dataset.val; rerenderSafe(); },
    mkImportUnsplash: importUnsplash,
    mkSave: el => save(el.dataset.val || ''),
    mkNoMedia: () => { MEDIA[ED.id || 'new'] = ''; Object.assign(ED, { media_kind: null, media_mime: null, media_name: null, _mediaChanged: true }); const f = $('#mk-fname'); if (f) f.textContent = ''; paintPrev(); },
    mkSetStatus: async el => { const { error } = await Cloud.sb.from(T).update({ status: el.dataset.val }).eq('id', ED.id); if (error) return toast(friendlyErr(error)); closeModal(); MO = null; load(); },
    mkDelete: () => { const id = ED.id; confirmBox(t('mkDelQ'), async () => { const { error } = await Cloud.sb.from(T).delete().eq('id', id); if (error) toast(friendlyErr(error)); closeModal(); MO = null; load(); }, t('delete')); },
    mkPickOffer: el => pickOffer(el.dataset.s),
    mkSendNow: el => sendNow(el)
  });

  document.addEventListener('input', e => {
    const id = e.target && e.target.id;
    if (id === 'mk-body' || id === 'mk-cta') { const n = $('#mk-n'); if (n) n.textContent = $('#mk-body').value.length; paintPrev(); }
  });
  document.addEventListener('change', async e => {
    if (e.target && e.target.name === 'mk-pick') { PICK.id = e.target.value; const o = (MO || []).find(x => x.id === PICK.id); const p = $('#mk-pprev'); if (p && o) { p.innerHTML = waPreview(o); if (o.media_kind === 'image') fetchMedia(o.id).then(() => { if (PICK.id === o.id) p.innerHTML = waPreview(o); }).catch(() => { }); } }
    if (e.target && e.target.id === 'mk-file' && e.target.files && e.target.files[0]) {
      const f = e.target.files[0]; e.target.value = '';
      const kind = MIMES[f.type]; if (!kind) return toast(t('mkMediaType'));
      if (f.size > MAXB) return toast(t('mkMediaBig'));
      MEDIA[ED.id || 'new'] = await b64(f);
      Object.assign(ED, { media_kind: kind, media_mime: f.type, media_name: f.name.slice(0, 120), _mediaChanged: true });
      const n = $('#mk-fname'); if (n) n.innerHTML = mediaIc(kind) + ' ' + esc(f.name); paintPrev();
    }
  });

  window.EXTRA_VIEWS = window.EXTRA_VIEWS || {};
  window.EXTRA_VIEWS.marketing = vMarketing;
  const prev = window.extraNav;
  window.extraNav = () => {
    const a = typeof prev === 'function' ? prev() : [];
    if (!can('marketing')) return a;
    let i = a.findIndex(x => x && x[0] === 'orders');
    a.splice(i >= 0 ? i + 1 : a.length, 0, ['marketing', 'target', t('nav_marketing')]);
    return a;
  };
  try { if (Cloud.on && document.querySelector('#side')) { renderShell(); route(); } } catch (e) { }
})();
