// LuxeCheck offline package pricing engine (shared by agent + contracts page)
function pkgEngine(){
const D=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s||''));return m?Date.UTC(+m[1],+m[2]-1,+m[3]):NaN;};
const ISO=t=>new Date(t).toISOString().slice(0,10);
const DAY=864e5;
const r2=n=>Math.round(n*100)/100;
const inRange=(d,from,to)=>{const t=D(d);return (!from||t>=D(from))&&(!to||t<=D(to));};
function band(age,bands){
  if(age==null||age>=18)return 'adult';
  const bs=(Array.isArray(bands)&&bands.length?bands:[{key:'infant',max:1.99},{key:'child',max:11.99},{key:'teen',max:17.99}]).slice().sort((a,b)=>a.max-b.max);
  for(const b of bs)if(age<=b.max)return b.key;
  return 'adult';
}
const amt=(tbl,b)=>{if(!tbl)return 0;const v=tbl[b];return Number.isFinite(+v)?+v:0;};
function applyMargin(net,pkgRow){
  const t=String(pkgRow.margin_type||'percent'),v=Number(pkgRow.margin_value)||0;
  return r2(t==='fixed'?net+v:net*(1+v/100));
}
function guestsOf(req){
  const g=[];for(let i=0;i<(+req.adults||0);i++)g.push({age:null});
  for(const a of (req.children_ages||[]))g.push({age:+a});
  return g;
}
function quoteFixed(p,req,today){
  const out=[],notes=[];
  const nights=(D(req.checkout)-D(req.checkin))/DAY;
  let dep=null;
  for(const d of (p.departures||[])){
    if(Math.abs(D(d.start)-D(req.checkin))<=3*DAY){dep=d;break;}
  }
  if(!dep&&p.flexible&&inRange(req.checkin,p.flexible.from,p.flexible.to))dep={start:req.checkin,end:ISO(D(req.checkin)+(p.nights||nights)*DAY)};
  if(!dep)return {ok:false,reason:'no_departure'};
  if(p.nights&&nights&&p.nights!==nights)notes.push('nights_differ');
  const kids=(req.children_ages||[]).map(Number);
  for(const o of (p.options||[])){
    const row=(o.prices||[]).find(x=>+x.adults===+req.adults&&(x.children==null||+x.children===0));
    if(!row||!(+row.total>0))continue;
    let net=+row.total,kidNote=false;
    for(const a of kids){
      const cp=(p.child_prices||[]).slice().sort((x,y)=>x.max_age-y.max_age).find(c=>a<=c.max_age);
      if(cp)net+=+cp.amount;else kidNote=true;
    }
    out.push({label:o.name,hotel:o.hotel||o.name,rooms:row.rooms||'',net:r2(net),start:dep.start,end:dep.end,needs_staff_children:kidNote});
  }
  if(!out.length)return {ok:false,reason:'no_price_for_pax'};
  return {ok:true,options:out,notes};
}
function seasonOf(p,date){return (p.seasons||[]).find(s=>inRange(date,s.from,s.to));}
function quoteResort(p,req,today){
  const ci=req.checkin,co=req.checkout,N=Math.round((D(co)-D(ci))/DAY);
  if(!(N>0))return {ok:false,reason:'bad_dates'};
  if(p.book_by&&today&&D(today)>D(p.book_by)&&!p.book_by_override)return {ok:false,reason:'book_by_passed'};
  if(p.stay_from&&D(ci)<D(p.stay_from)||p.stay_to&&D(co)-DAY>D(p.stay_to))return {ok:false,reason:'outside_validity'};
  const R=p.restrictions||{};
  if((R.no_checkout_dates||[]).includes(co))return {ok:false,reason:'no_checkout_date'};
  if((R.no_checkin_dates||[]).includes(ci))return {ok:false,reason:'no_checkin_date'};
  const nightsDates=[];for(let i=0;i<N;i++)nightsDates.push(ISO(D(ci)+i*DAY));
  const guests=guestsOf(req).map(g=>({...g,band:band(g.age,p.age_bands)}));
  const promos=(p.promotions||[]).filter(x=>inRange(ci,x.from,x.to));
  const kf=promos.find(x=>x.type==='kids_free');
  let freeLeft=kf?(+kf.max_children||2):0;
  for(const g of guests){g.free=false;if(kf&&g.age!=null&&g.age<(+kf.max_age||12)&&freeLeft>0){g.free=true;freeLeft--;}}
  const covers=k=>kf&&(kf.covers||['accommodation','meal','transfer']).includes(k);
  const extrasMealFree=promos.some(x=>x.type==='extras_meal_free');
  const trDisc=promos.filter(x=>x.type==='transfer_discount').reduce((m,x)=>Math.max(m,+x.pct||0),0);
  const vill=Object.fromEntries((p.villas||[]).map(v=>[v.name,v]));
  // candidate plans: packages (with extension) + single-villa nightly plans
  const plans=[];
  for(const k of (p.packages||[])){
    if((k.valid_from||k.valid_to)&&!(inRange(ci,k.valid_from,k.valid_to)&&inRange(ISO(D(co)-DAY),k.valid_from,k.valid_to)))continue;
    if(+k.nights>N)continue;
    const segs=(k.segments||[]).map(s=>({villa:s.villa,nights:+s.nights}));
    const ext=N-(+k.nights);
    if(ext>0&&segs.length)segs[segs.length-1].nights+=ext;
    plans.push({label:k.name+(ext>0?` +${ext}`:''),segments:segs,pkg:k,ext});
  }
  for(const v of (p.villas||[]))plans.push({label:v.name,segments:[{villa:v.name,nights:N}],pkg:null,ext:0});
  const out=[];
  for(const pl of plans){
    let ok=true,why='',net=0;const br={room:0,extra_person:0,meals:0,transfers:0,green_tax:0,mandatory:0};
    let idx=0;const seq=[];
    for(const s of pl.segments){const v=vill[s.villa];if(!v){ok=false;why='villa_missing';break;}for(let i=0;i<s.nights;i++)seq.push({date:nightsDates[idx++],v});}
    if(!ok||seq.length!==N)continue;
    // min stay per segment
    for(const s of pl.segments){const v=vill[s.villa];const ss=seasonOf(p,nightsDates[0]);const mn=(v.min_nights&&ss&&v.min_nights.by_season&&v.min_nights.by_season[ss.name])||(v.min_nights&&v.min_nights.default)||p.min_nights||0;if(!pl.pkg&&N<mn){ok=false;why='min_stay';}}
    if(!ok)continue;
    // occupancy
    for(const s of pl.segments){const v=vill[s.villa];if(v.max_occupancy&&guests.length>v.max_occupancy)ok=false;if(v.max_adults&&(+req.adults)>v.max_adults)ok=false;}
    if(!ok)continue;
    // room nights
    if(pl.pkg){
      if(!(+pl.pkg.price>0)){continue;}
      br.room+=+pl.pkg.price;
      for(let i=N-pl.ext;i<N;i++){const s=seasonOf(p,seq[i].date);const r=s&&seq[i].v.rates?+seq[i].v.rates[s.name]:NaN;if(!(r>0)){ok=false;break;}br.room+=r;}
    }else{
      for(const n of seq){const s=seasonOf(p,n.date);const r=s&&n.v.rates?+n.v.rates[s.name]:NaN;if(!(r>0)){ok=false;break;}br.room+=r;}
    }
    if(!ok)continue;
    // persons
    const base=+(seq[0].v.base_occupancy||p.base_occupancy||2);
    const ordered=guests.slice().sort((a,b)=>(a.age==null?-1:0)-(b.age==null?-1:0)||((b.age||0)-(a.age||0)));
    const meal=String(seq[0].v.meal_included||p.meal_included||'HB');
    ordered.forEach((g,i)=>{
      const extra=i>=base;
      if(extra){
        if(!(g.free&&covers('accommodation')))br.extra_person+=amt(p.extra_person_per_night,g.band)*N;
        if(!(g.free&&covers('meal'))&&!extrasMealFree)br.meals+=amt((p.meal_supplements_per_night||{})[meal],g.band)*N;
      }
      if(!(g.free&&covers('transfer')))br.transfers+=amt(p.transfer_per_person,g.band)*(1-trDisc/100);
      const ex=+(p.green_tax_exempt_under_age??2);
      if(g.age==null||g.age>=ex)br.green_tax+=(+p.green_tax_pppn||0)*N;
      for(const m of (p.mandatory_charges||[])){if(nightsDates.includes(m.date))br.mandatory+=amt(m.per,g.band);}
    });
    for(const k in br)br[k]=r2(br[k]);
    net=r2(Object.values(br).reduce((a,b)=>a+b,0));
    out.push({label:pl.label,segments:pl.segments,net,breakdown:br,is_package:!!pl.pkg});
  }
  if(!out.length)return {ok:false,reason:'no_valid_villa'};
  out.sort((a,b)=>a.net-b.net);
  return {ok:true,options:out};
}
function quote(row,req,today){
  let p=row.data;if(typeof p==='string'){try{p=JSON.parse(p)}catch{return {ok:false,reason:'bad_json'}}}
  const res=p.kind==='resort'?quoteResort(p,req,today):quoteFixed(p,req,today);
  if(res.ok)for(const o of res.options){o.sell=applyMargin(o.net,row);o.currency=p.currency||row.currency||'USD';}
  res.title=p.title||row.title;res.package_id=row.package_id;res.kind=p.kind;res.inclusions=p.inclusions||[];
  return res;
}
return {quote,band,D,ISO};
}
/* ---------- Wejha: supplier accounts + package contracts (AI agent data) ---------- */
(function () {
  const AR = {
    nav_contracts: ['Contracts & packages', 'العقود والباقات'],
    nav_suppliers: ['Supplier accounts', 'حسابات الموردين'],
    ctSub: ['Upload supplier contracts. The AI reads them, you review, set your margin and approve. The WhatsApp agent quotes only approved contracts.', 'ارفع عقود الموردين. الذكاء الاصطناعي يقرأها، وأنت تراجعها وتحدد هامش ربحك وتعتمدها. وكيل واتساب لا يعرض إلا العقود المعتمدة.'],
    ctUpload: ['Upload contract', 'رفع عقد'], ctReading: ['Reading the contract… this can take up to a minute', 'جاري قراءة العقد… قد يستغرق حتى دقيقة'],
    ctEmpty: ['No contracts yet. Upload your first PDF or Excel contract.', 'لا توجد عقود بعد. ارفع أول عقد PDF أو Excel.'],
    ctTitle: ['Title', 'العنوان'], ctDest: ['Destination', 'الوجهة'], ctKind: ['Type', 'النوع'], ctValidity: ['Validity', 'الصلاحية'], ctBookBy: ['Book by', 'آخر موعد للحجز'],
    ctMargin: ['Your margin', 'هامش الربح'], ctStatus: ['Status', 'الحالة'], ctCurrency: ['Currency', 'العملة'],
    kind_resort: ['Resort contract (per night)', 'عقد منتجع (بالليلة)'], kind_fixed_program: ['Full program (fixed price)', 'برنامج كامل (سعر ثابت)'],
    cst_draft: ['Draft', 'مسودة'], cst_approved: ['Approved', 'معتمد'], cst_stopped: ['Stopped', 'موقوف'], cst_archived: ['Archived', 'مؤرشف'],
    mPercent: ['% of cost', '% من التكلفة'], mFixed: ['Fixed amount per booking', 'مبلغ ثابت لكل حجز'],
    ctReview: ['Review contract', 'مراجعة العقد'], ctWarnings: ['Check before approving', 'راجع قبل الاعتماد'],
    ctSaveDraft: ['Save as draft', 'حفظ كمسودة'], ctApprove: ['Save & approve', 'حفظ واعتماد'], ctStop: ['Stop sale', 'إيقاف البيع'], ctResume: ['Approve', 'اعتماد'],
    ctTest: ['Test a price', 'جرّب تسعيرة'], ctCheckin: ['Check-in', 'الوصول'], ctCheckout: ['Check-out', 'المغادرة'], ctAdults: ['Adults', 'بالغين'], ctKids: ['Children ages (e.g. 5,9)', 'أعمار الأطفال (مثال 5,9)'],
    ctCalc: ['Calculate', 'احسب'], ctNet: ['Cost', 'التكلفة'], ctSell: ['Selling price', 'سعر البيع'],
    ctAdvanced: ['Advanced: contract data (JSON)', 'متقدم: بيانات العقد (JSON)'], ctBadJson: ['Contract data is not valid JSON', 'بيانات العقد غير صالحة'],
    ctSeasons: ['Seasons', 'المواسم'], ctVillas: ['Villas / rooms (per night)', 'الفلل / الغرف (لليلة)'], ctPackages: ['Packages', 'الباقات'], ctSupp: ['Supplements', 'الإضافات'],
    ctPromos: ['Offers', 'العروض'], ctOptions: ['Options (total price by travellers)', 'الخيارات (السعر الإجمالي حسب عدد الأفراد)'], ctDepartures: ['Departures', 'مواعيد الانطلاق'],
    ctReadFail: ['Could not read this file. Try a text PDF or Excel, or paste the text.', 'تعذّرت قراءة الملف. جرّب PDF نصي أو Excel، أو الصق نص العقد.'],
    ctPaste: ['Or paste the contract text', 'أو الصق نص العقد'], ctRead: ['Read with AI', 'اقرأ بالذكاء الاصطناعي'],
    ctFile: ['Contract file (PDF or Excel)', 'ملف العقد (PDF أو Excel)'], ctDelQ: ['Archive this contract? The agent will stop using it.', 'أرشفة هذا العقد؟ الوكيل سيتوقف عن استخدامه.'],
    ctBookByPassed: ['Last booking date has passed — the agent will not quote it until you change it.', 'آخر موعد للحجز انتهى — الوكيل لن يعرضه حتى تغيّر التاريخ.'],
    reason_book_by_passed: ['Last booking date passed', 'انتهى آخر موعد للحجز'], reason_outside_validity: ['Dates outside contract validity', 'التواريخ خارج صلاحية العقد'],
    reason_no_departure: ['No departure on these dates', 'لا يوجد انطلاق في هذه التواريخ'], reason_no_price_for_pax: ['No price for this number of travellers', 'لا يوجد سعر لهذا العدد'],
    reason_no_valid_villa: ['No villa fits (min nights, occupancy or missing rate)', 'لا توجد فيلا مناسبة (أقل ليالي أو السعة أو سعر غير موجود)'],
    reason_no_checkout_date: ['Check-out not allowed on this date', 'المغادرة غير مسموحة في هذا التاريخ'], reason_no_checkin_date: ['Check-in not allowed on this date', 'الوصول غير مسموح في هذا التاريخ'],
    reason_bad_dates: ['Check the dates', 'راجع التواريخ'],
    spSub: ['Your accounts at hotel suppliers. The WhatsApp agent searches all active accounts at the same time and shows the cheapest. Passwords are encrypted; nobody can read them back.', 'حساباتك عند موردي الفنادق. وكيل واتساب يبحث في كل الحسابات المفعّلة في نفس الوقت ويعرض الأرخص. كلمات المرور مشفّرة ولا يمكن لأحد قراءتها.'],
    spAdd: ['Add supplier', 'إضافة مورد'], spSupplier: ['Supplier', 'المورد'], spType: ['Connection', 'طريقة الربط'], spBrowser: ['Website login', 'دخول الموقع'], spApi: ['API', 'API'],
    spUrl: ['Login page / API URL', 'رابط الدخول / الـ API'], spUser: ['Username', 'اسم المستخدم'], spPass: ['Password', 'كلمة المرور'], spPassKeep: ['Leave empty to keep the saved password', 'اتركها فارغة للإبقاء على كلمة المرور المحفوظة'],
    spActive: ['Active', 'مفعّل'], spSaved: ['Password saved', 'كلمة المرور محفوظة'], spNoPass: ['No password', 'بدون كلمة مرور'], spEmpty: ['No supplier accounts yet.', 'لا توجد حسابات موردين بعد.'],
    spDelQ: ['Delete this supplier account?', 'حذف حساب المورد؟'], spOwnerOnly: ['Only the owner can manage supplier accounts.', 'المالك فقط يدير حسابات الموردين.'],
    chTitle: ['WhatsApp numbers answered by the agent', 'أرقام واتساب التي يرد عليها الوكيل'], chNone: ['No number linked yet — LuxeCheck links your WhatsApp Business number.', 'لم يُربط رقم بعد — لوكس تشيك تربط رقم واتساب بيزنس الخاص بك.']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }
  ROLE_CAN.contracts = ['owner', 'agent'];
  ROLE_CAN.suppliers = ['owner'];

  window.extraNav = () => [can('contracts') ? ['contracts', 'layers', t('nav_contracts')] : null, can('suppliers') ? ['suppliers', 'link', t('nav_suppliers')] : null].filter(Boolean);

  const ENG = pkgEngine();
  const today = () => new Date().toISOString().slice(0, 10);
  const fmt = (n, cur) => (Number(n) || 0).toLocaleString(L() === 'ar' ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }) + ' ' + esc(cur || '');
  const cfgUrl = () => (Cloud.cfg && Cloud.cfg.contractExtractUrl) || 'https://luxecheck-ai.app.n8n.cloud/webhook/wejha-contract-extract';

  /* ---------- data ---------- */
  let CT = null, SP = null, CTD = null; // CTD = contract being reviewed
  async function loadContracts() {
    const { data, error } = await Cloud.sb.from('package_contracts').select('*').eq('agency_id', Cloud.agencyId).neq('status', 'archived').order('updated_at', { ascending: false });
    CT = error ? [] : (data || []);
    if (S.ui.view === 'contracts') rerenderSafe();
  }
  async function loadSuppliers() {
    const [a, c] = await Promise.all([
      Cloud.sb.from('supplier_accounts').select('id,supplier,access_type,login_url,username,active,has_secret,updated_at').eq('agency_id', Cloud.agencyId).order('created_at'),
      Cloud.sb.from('agency_channels').select('display_phone,label,active').eq('agency_id', Cloud.agencyId)
    ]);
    SP = { accounts: a.data || [], channels: c.data || [] };
    if (S.ui.view === 'suppliers') rerenderSafe();
  }

  /* ---------- contracts page ---------- */
  const stPill = s => `<span class="pill ${s === 'approved' ? 'st-confirmed' : s === 'stopped' ? 'st-lost' : 'st-draft'}">${t('cst_' + s)}</span>`;
  function vContracts() {
    if (!CT) { loadContracts(); return `<div class="head"><div><h1>${t('nav_contracts')}</h1></div></div><p class="muted">${t('loading')}</p>`; }
    const rows = CT.map(c => {
      const late = c.book_by && c.book_by < today();
      return `<tr data-act="ctOpen" data-id="${c.id}" tabindex="0" style="cursor:pointer">
        <td><b>${esc(c.title)}</b><div class="small muted">${esc((c.data && (c.data.resort || c.data.supplier_name)) || '')}</div></td>
        <td>${esc(c.destination)}</td><td class="small">${t('kind_' + c.kind)}</td>
        <td class="small">${esc(c.valid_from || '—')} → ${esc(c.valid_to || '—')}</td>
        <td class="small ${late ? 'bad' : ''}" style="${late ? 'color:var(--bad)' : ''}">${esc(c.book_by || '—')}</td>
        <td class="small">${c.margin_type === 'fixed' ? fmt(c.margin_value, c.currency) : (Number(c.margin_value) || 0) + '%'}</td>
        <td>${stPill(c.status)}</td></tr>`;
    }).join('');
    return `
    <div class="head"><div><h1>${t('nav_contracts')}</h1><p>${t('ctSub')}</p></div><button class="btn primary" data-act="ctUploadDlg">${ic('upload', 'sm')} ${t('ctUpload')}</button></div>
    ${CT.length ? `<div class="card" style="padding:4px 6px"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('ctTitle')}</th><th>${t('ctDest')}</th><th>${t('ctKind')}</th><th>${t('ctValidity')}</th><th>${t('ctBookBy')}</th><th>${t('ctMargin')}</th><th>${t('ctStatus')}</th></tr></thead><tbody>${rows}</tbody></table></div></div>`
      : `<div class="card"><p class="muted">${t('ctEmpty')}</p></div>`}`;
  }

  /* file → text (PDF via pdf.js, Excel via SheetJS) */
  const loadScript = src => new Promise((res, rej) => { if (document.querySelector(`script[src="${src}"]`)) return res(); const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  async function fileToText(file) {
    const name = file.name.toLowerCase();
    if (name.endsWith('.pdf')) {
      await loadScript('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js');
      const lib = window.pdfjsLib; lib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
      const pdf = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
      let out = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const tc = await (await pdf.getPage(i)).getTextContent();
        let lastY = null, line = '';
        for (const it of tc.items) { const y = Math.round(it.transform[5]); if (lastY !== null && Math.abs(y - lastY) > 2) { out += line + '\n'; line = ''; } line += (line ? ' ' : '') + it.str; lastY = y; }
        out += line + '\n\n--- page ' + i + ' ---\n';
      }
      return out;
    }
    if (/\.(xlsx|xls|csv)$/.test(name)) {
      await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js');
      const wb = XLSX.read(await file.arrayBuffer(), { type: 'array' });
      return wb.SheetNames.map(n => '### ' + n + '\n' + XLSX.utils.sheet_to_csv(wb.Sheets[n])).join('\n\n');
    }
    if (/\.(txt|md)$/.test(name)) return await file.text();
    throw new Error('unsupported');
  }

  function uploadDlg(msg) {
    modal(t('ctUpload'), `${msg ? `<p class="small" style="color:var(--bad)">${esc(msg)}</p>` : ''}
      <div class="f"><label for="ct-file">${t('ctFile')}</label><input id="ct-file" type="file" accept=".pdf,.xlsx,.xls,.csv,.txt"></div>
      <div class="f"><label for="ct-text">${t('ctPaste')}</label><textarea id="ct-text" class="inp" rows="5"></textarea></div>
      <p class="small muted" id="ct-progress"></p>`,
      `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="ctRead" id="ct-go">${ic('spark', 'sm')} ${t('ctRead')}</button>`);
  }

  async function readContract() {
    const f = $('#ct-file').files[0], pasted = $('#ct-text').value.trim();
    const btn = $('#ct-go'); btn.disabled = true; $('#ct-progress').textContent = t('ctReading');
    let text = pasted, path = null, fileName = f ? f.name : 'pasted.txt';
    try {
      if (f) {
        text = await fileToText(f);
        path = `${Cloud.agencyId}/${Date.now()}_${f.name.replace(/[^\w.\-]+/g, '_')}`;
        Cloud.sb.storage.from('contracts').upload(path, f, { upsert: false }).then(() => { }, () => { });
      }
      if (!text || text.trim().length < 40) throw new Error('empty');
      const { data: s } = await Cloud.sb.auth.getSession();
      const r = await fetch(cfgUrl(), { method: 'POST', headers: { 'content-type': 'text/plain' }, body: JSON.stringify({ access_token: s.session.access_token, file_name: fileName, text }) });
      const j = await r.json();
      if (!j.ok || !j.draft) throw new Error(j.error || 'ai');
      const d = j.draft;
      CTD = { id: null, status: 'draft', kind: d.kind === 'resort' ? 'resort' : 'fixed_program', destination: d.destination || '', title: d.title || fileName,
        valid_from: d.valid_from || d.stay_from || null, valid_to: d.valid_to || d.stay_to || null, book_by: d.book_by || null, currency: d.currency || 'USD',
        margin_type: 'percent', margin_value: 10, data: d, source_file: path };
      closeModal(); reviewDlg();
    } catch (e) { console.warn(e); uploadDlg(t('ctReadFail')); }
  }

  /* ---------- review dialog ---------- */
  const tbl = (head, rows) => `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td class="small">${c == null || c === '' ? '—' : esc(String(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  function summary(d) {
    const parts = [];
    if (d.kind === 'resort') {
      const seasons = d.seasons || [];
      parts.push(`<h3 class="small" style="margin:12px 0 6px">${t('ctSeasons')}</h3>` + tbl(['', 'From', 'To'], seasons.map(s => [s.name, s.from, s.to])));
      parts.push(`<h3 class="small" style="margin:12px 0 6px">${t('ctVillas')} · ${esc(d.currency || '')}</h3>` + tbl(['', ...seasons.map(s => s.name), 'Min'], (d.villas || []).map(v => [v.name + (v.meal_included ? ' · ' + v.meal_included : ''), ...seasons.map(s => v.rates ? v.rates[s.name] : null), v.min_nights ? v.min_nights.default : ''])));
      if ((d.packages || []).length) parts.push(`<h3 class="small" style="margin:12px 0 6px">${t('ctPackages')}</h3>` + tbl(['', 'Nights', 'Price', 'Valid'], d.packages.map(p => [p.name + ' — ' + (p.segments || []).map(s => s.nights + 'N ' + s.villa).join(' + '), p.nights, p.price, (p.valid_from || '') + ' → ' + (p.valid_to || '')])));
      const sp = [['Extra person / night', d.extra_person_per_night], ['Transfer / person', d.transfer_per_person], ...Object.entries(d.meal_supplements_per_night || {}).map(([k, v]) => [k + ' / night', v])];
      parts.push(`<h3 class="small" style="margin:12px 0 6px">${t('ctSupp')}</h3>` + tbl(['', 'Adult', 'Teen', 'Child', 'Infant'], [...sp.filter(x => x[1]).map(([n, v]) => [n, v.adult, v.teen, v.child, v.infant]), ['Green tax / person / night', d.green_tax_pppn, '', '', ''], ...(d.mandatory_charges || []).map(m => [m.name + ' (' + m.date + ')', m.per && m.per.adult, m.per && m.per.teen, m.per && m.per.child, m.per && m.per.infant])]));
      if ((d.promotions || []).length) parts.push(`<h3 class="small" style="margin:12px 0 6px">${t('ctPromos')}</h3>` + tbl(['', 'From', 'To', ''], d.promotions.map(p => [p.type, p.from, p.to, p.pct ? p.pct + '%' : p.max_children ? p.max_children + ' kids < ' + p.max_age : ''])));
    } else {
      parts.push(`<h3 class="small" style="margin:12px 0 6px">${t('ctDepartures')}</h3>` + tbl(['Start', 'End'], (d.departures || []).map(x => [x.start, x.end]).concat(d.flexible ? [[d.flexible.from + ' (flexible)', d.flexible.to]] : [])));
      const pax = [...new Set((d.options || []).flatMap(o => (o.prices || []).map(p => p.adults)))].sort((a, b) => a - b);
      parts.push(`<h3 class="small" style="margin:12px 0 6px">${t('ctOptions')} · ${esc(d.currency || '')}</h3>` + tbl(['', ...pax.map(n => n + ' pax')], (d.options || []).map(o => [o.name, ...pax.map(n => { const r = (o.prices || []).find(p => +p.adults === +n); return r ? r.total : null; })])));
    }
    return parts.join('');
  }
  function autoWarnings(c) {
    const w = [...((c.data && c.data.warnings) || [])];
    if (c.book_by && c.book_by < today()) w.unshift(t('ctBookByPassed'));
    return w;
  }
  function reviewDlg() {
    const c = CTD, d = c.data || {};
    const warn = autoWarnings(c);
    modal(t('ctReview'), `
      ${warn.length ? `<div class="card flat" style="border-color:var(--warn);background:color-mix(in oklab,var(--warn) 9%,var(--surface))"><b>${ic('alert', 'sm')} ${t('ctWarnings')}</b><ul class="small" style="margin:6px 0 0;padding-inline-start:18px">${warn.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
      <div class="grid g2">
        <div class="f"><label for="cr-title">${t('ctTitle')}</label><input id="cr-title" value="${esc(c.title)}"></div>
        <div class="f"><label for="cr-dest">${t('ctDest')}</label><input id="cr-dest" value="${esc(c.destination)}"></div>
        <div class="f"><label for="cr-kind">${t('ctKind')}</label><select id="cr-kind">${['resort', 'fixed_program'].map(k => `<option value="${k}" ${k === c.kind ? 'selected' : ''}>${t('kind_' + k)}</option>`).join('')}</select></div>
        <div class="f"><label for="cr-cur">${t('ctCurrency')}</label><input id="cr-cur" value="${esc(c.currency || 'USD')}"></div>
        <div class="f"><label for="cr-from">${t('ctValidity')}</label><div class="row" style="gap:6px"><input id="cr-from" type="date" value="${esc(c.valid_from || '')}"><input id="cr-to" type="date" value="${esc(c.valid_to || '')}"></div></div>
        <div class="f"><label for="cr-bookby">${t('ctBookBy')}</label><input id="cr-bookby" type="date" value="${esc(c.book_by || '')}"></div>
        <div class="f"><label for="cr-mt">${t('ctMargin')}</label><div class="row" style="gap:6px"><select id="cr-mt"><option value="percent" ${c.margin_type !== 'fixed' ? 'selected' : ''}>${t('mPercent')}</option><option value="fixed" ${c.margin_type === 'fixed' ? 'selected' : ''}>${t('mFixed')}</option></select><input id="cr-mv" type="number" step="any" value="${esc(String(c.margin_value ?? 0))}" style="max-width:110px"></div></div>
      </div>
      ${summary(d)}
      <div class="card flat" style="margin-top:14px"><b>${t('ctTest')}</b>
        <div class="grid g3" style="margin-top:8px">
          <div class="f"><label for="ts-in">${t('ctCheckin')}</label><input id="ts-in" type="date" value="${esc((d.departures && d.departures[0] && d.departures[0].start) || '')}"></div>
          <div class="f"><label for="ts-out">${t('ctCheckout')}</label><input id="ts-out" type="date" value="${esc((d.departures && d.departures[0] && d.departures[0].end) || '')}"></div>
          <div class="f"><label for="ts-ad">${t('ctAdults')}</label><input id="ts-ad" type="number" min="1" value="2"></div>
        </div>
        <div class="row" style="gap:8px;align-items:flex-end"><div class="f grow"><label for="ts-kids">${t('ctKids')}</label><input id="ts-kids" placeholder="5,9"></div><button class="btn" data-act="ctTest">${ic('money', 'sm')} ${t('ctCalc')}</button></div>
        <div id="ts-out-box" class="small" style="margin-top:8px"></div>
      </div>
      <details style="margin-top:12px"><summary class="small muted">${t('ctAdvanced')}</summary><textarea id="cr-json" class="inp" rows="12" style="font-family:monospace;font-size:12px" dir="ltr">${esc(JSON.stringify(d, null, 2))}</textarea></details>`,
      `<button class="btn" data-act="closeModal">${t('cancel')}</button>
       ${c.id ? `<button class="btn" data-act="ctArchive">${ic('trash', 'sm')}</button>` : ''}
       <button class="btn" data-act="ctSave" data-st="${c.status === 'approved' ? 'stopped' : 'draft'}">${c.status === 'approved' ? t('ctStop') : t('ctSaveDraft')}</button>
       <button class="btn primary" data-act="ctSave" data-st="approved">${ic('check', 'sm')} ${t('ctApprove')}</button>`, { wide: true });
  }
  function collect() {
    let data; try { data = JSON.parse($('#cr-json').value); } catch (e) { toast(t('ctBadJson')); return null; }
    const v = id => { const x = $('#' + id).value.trim(); return x || null; };
    data.kind = $('#cr-kind').value;
    return Object.assign({}, CTD, { title: v('cr-title') || 'Contract', destination: v('cr-dest') || '', kind: data.kind, currency: (v('cr-cur') || 'USD').toUpperCase(),
      valid_from: v('cr-from'), valid_to: v('cr-to'), book_by: v('cr-bookby'), margin_type: $('#cr-mt').value, margin_value: Number($('#cr-mv').value) || 0, data });
  }

  Object.assign(ACT, {
    ctUploadDlg: () => uploadDlg(),
    ctRead: () => readContract(),
    ctOpen: el => { const c = CT.find(x => x.id === el.dataset.id); if (!c) return; CTD = JSON.parse(JSON.stringify(c)); reviewDlg(); },
    ctTest: () => {
      const c = collect(); if (!c) return;
      const kids = ($('#ts-kids').value || '').split(/[,\s،]+/).filter(Boolean).map(Number).filter(n => n >= 0 && n < 18);
      const data = Object.assign({}, c.data, { book_by: c.book_by, currency: c.currency });
      const res = ENG.quote({ ...c, data }, { checkin: $('#ts-in').value, checkout: $('#ts-out').value, adults: +$('#ts-ad').value || 1, children_ages: kids }, today());
      const box = $('#ts-out-box');
      if (!res.ok) { box.innerHTML = `<span style="color:var(--bad)">${t('reason_' + res.reason)}</span>`; return; }
      box.innerHTML = res.options.slice(0, 5).map(o => `<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding:6px 0;gap:10px">
        <div><b>${esc(o.label)}</b>${o.breakdown ? `<div class="muted">${Object.entries(o.breakdown).filter(([, v]) => v).map(([k, v]) => esc(k) + ' ' + fmt(v, '')).join(' · ')}</div>` : ''}${o.needs_staff_children ? `<div style="color:var(--warn)">children price: staff</div>` : ''}</div>
        <div style="text-align:end;white-space:nowrap"><div class="muted">${t('ctNet')} ${fmt(o.net, o.currency)}</div><b>${t('ctSell')} ${fmt(o.sell, o.currency)}</b></div></div>`).join('');
    },
    ctSave: async el => {
      const c = collect(); if (!c) return;
      c.status = el.dataset.st;
      const row = { agency_id: Cloud.agencyId, status: c.status, kind: c.kind, destination: c.destination, title: c.title, valid_from: c.valid_from, valid_to: c.valid_to, book_by: c.book_by,
        currency: c.currency, margin_type: c.margin_type, margin_value: c.margin_value, data: c.data, source_file: c.source_file || null, updated_at: new Date().toISOString() };
      const q = c.id ? Cloud.sb.from('package_contracts').update(row).eq('id', c.id) : Cloud.sb.from('package_contracts').insert(row);
      const { error } = await q;
      if (error) { toast(friendlyErr(error)); return; }
      closeModal(); toast(t('saved')); CT = null; loadContracts();
    },
    ctArchive: () => confirmBox(t('ctDelQ'), async () => { const { error } = await Cloud.sb.from('package_contracts').update({ status: 'archived', updated_at: new Date().toISOString() }).eq('id', CTD.id); if (error) toast(friendlyErr(error)); else { toast(t('deleted')); CT = null; loadContracts(); } }, t('delete'))
  });

  /* ---------- suppliers page ---------- */
  function vSuppliers() {
    if (!can('suppliers')) return `<div class="head"><div><h1>${t('nav_suppliers')}</h1></div></div><p class="muted">${t('spOwnerOnly')}</p>`;
    if (!SP) { loadSuppliers(); return `<div class="head"><div><h1>${t('nav_suppliers')}</h1></div></div><p class="muted">${t('loading')}</p>`; }
    return `
    <div class="head"><div><h1>${t('nav_suppliers')}</h1><p>${t('spSub')}</p></div><button class="btn primary" data-act="spEdit">${ic('plus', 'sm')} ${t('spAdd')}</button></div>
    ${SP.accounts.length ? `<div class="card" style="padding:4px 6px"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('spSupplier')}</th><th>${t('spType')}</th><th>${t('spUser')}</th><th>${t('spPass')}</th><th>${t('spActive')}</th><th class="r">${t('actions')}</th></tr></thead><tbody>
      ${SP.accounts.map(a => `<tr><td><b>${esc(a.supplier)}</b><div class="small muted" dir="ltr">${esc(a.login_url || '')}</div></td><td class="small">${a.access_type === 'api' ? t('spApi') : t('spBrowser')}</td><td class="small" dir="ltr">${esc(a.username || '—')}</td>
        <td>${a.has_secret ? `<span class="pill st-confirmed">${t('spSaved')}</span>` : `<span class="pill st-lost">${t('spNoPass')}</span>`}</td><td>${a.active ? ic('check', 'sm') : '—'}</td>
        <td class="acts"><button class="btn sm" data-act="spEdit" data-id="${a.id}">${ic('edit', 'sm')}</button><button class="btn sm" data-act="spDel" data-id="${a.id}">${ic('trash', 'sm')}</button></td></tr>`).join('')}
    </tbody></table></div></div>` : `<div class="card"><p class="muted">${t('spEmpty')}</p></div>`}
    <div class="card"><b>${t('chTitle')}</b><p class="small muted" style="margin-top:6px">${SP.channels.length ? SP.channels.map(c => esc((c.display_phone || '') + (c.label ? ' · ' + c.label : ''))).join('<br>') : t('chNone')}</p></div>`;
  }
  Object.assign(ACT, {
    spEdit: el => {
      const a = (SP.accounts || []).find(x => x.id === el.dataset.id) || { access_type: 'browser', active: true };
      modal(a.id ? a.supplier : t('spAdd'), `<div class="grid g2">
        <div class="f"><label for="sp-name">${t('spSupplier')}</label><input id="sp-name" value="${esc(a.supplier || '')}"></div>
        <div class="f"><label for="sp-type">${t('spType')}</label><select id="sp-type"><option value="browser" ${a.access_type !== 'api' ? 'selected' : ''}>${t('spBrowser')}</option><option value="api" ${a.access_type === 'api' ? 'selected' : ''}>${t('spApi')}</option></select></div>
        <div class="f" style="grid-column:1/-1"><label for="sp-url">${t('spUrl')}</label><input id="sp-url" dir="ltr" value="${esc(a.login_url || '')}"></div>
        <div class="f"><label for="sp-user">${t('spUser')}</label><input id="sp-user" dir="ltr" autocomplete="off" value="${esc(a.username || '')}"></div>
        <div class="f"><label for="sp-pass">${t('spPass')}</label><input id="sp-pass" type="password" dir="ltr" autocomplete="new-password" placeholder="${a.has_secret ? esc(t('spPassKeep')) : ''}"></div>
        <label class="row small" style="gap:6px"><input id="sp-active" type="checkbox" ${a.active ? 'checked' : ''}> ${t('spActive')}</label></div>`,
        `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="spSave" data-id="${a.id || ''}">${t('save')}</button>`);
    },
    spSave: async el => {
      try {
        await Cloud.rpc('save_supplier_account', { p_id: el.dataset.id || null, p_supplier: $('#sp-name').value, p_access_type: $('#sp-type').value, p_login_url: $('#sp-url').value.trim() || null, p_username: $('#sp-user').value.trim() || null, p_password: $('#sp-pass').value || null, p_active: $('#sp-active').checked });
        closeModal(); toast(t('saved')); SP = null; loadSuppliers();
      } catch (e) { toast(friendlyErr(e)); }
    },
    spDel: el => confirmBox(t('spDelQ'), async () => { try { await Cloud.rpc('delete_supplier_account', { p_id: el.dataset.id }); toast(t('deleted')); SP = null; loadSuppliers(); } catch (e) { toast(friendlyErr(e)); } }, t('delete'))
  });

  window.EXTRA_VIEWS = { contracts: vContracts, suppliers: vSuppliers };
  window.pkgEngine = pkgEngine;
  try { if (Cloud.on && document.querySelector('#side')) { renderShell(); route(); } } catch (e) { }
})();
