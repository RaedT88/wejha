/* ---------- Wejha: Services (transfers, meet & assist, car with driver, activities) used to build full packages ---------- */
(function () {
  if (typeof ROUTES === 'undefined') return;
  const AR = {
    nav_services: ['Services', 'الخدمات'],
    svSub: ['Transfers, car with driver and activities you sell in each city. The WhatsApp agent adds them to a hotel to build a full package.', 'التنقلات والسيارة بسائق والأنشطة التي تبيعها في كل مدينة. وكيل واتساب يضيفها للفندق ليكوّن باقة كاملة.'],
    svAdd: ['Add service', 'إضافة خدمة'], svEdit: ['Edit service', 'تعديل خدمة'], svEmpty: ['No services yet. Add your airport transfers first.', 'لا توجد خدمات بعد. ابدأ بتوصيل المطار.'],
    svCity: ['City', 'المدينة'], svCountry: ['Country code', 'رمز الدولة'], svKind: ['Type', 'النوع'], svName: ['Name shown to the customer', 'الاسم الذي يظهر للعميل'],
    svVehicle: ['Vehicle', 'السيارة'], svMaxPax: ['Seats per vehicle', 'عدد المقاعد'], svPrice: ['Cost price', 'سعر التكلفة'], svBasis: ['Price is', 'السعر'],
    svChild: ['Child price', 'سعر الطفل'], svCur: ['Currency', 'العملة'], svMargin: ['Margin', 'هامش الربح'], svToCity: ['To city', 'إلى مدينة'], svHours: ['Hours per day', 'ساعات اليوم'],
    svAuto: ['Add automatically to every package in this city', 'تُضاف تلقائياً لكل باقة في هذه المدينة'], svActive: ['Active', 'مفعّلة'], svNotes: ['Notes (internal)', 'ملاحظات داخلية'],
    svSell: ['Customer price', 'سعر العميل'], svAll: ['All cities', 'كل المدن'], svDelQ: ['Delete this service?', 'حذف هذه الخدمة؟'], svSaved: ['Service saved', 'تم حفظ الخدمة'],
    svNeed: ['City, name and price are required.', 'المدينة والاسم والسعر مطلوبة.'], svAutoTag: ['Auto', 'تلقائي'], svOff: ['Off', 'موقوفة'],
    k_transfer_oneway: ['Transfer (one way)', 'توصيل اتجاه واحد'], k_transfer_roundtrip: ['Transfer (round trip)', 'توصيل ذهاب وعودة'], k_meet_assist: ['Meet & assist', 'استقبال ومساعدة'],
    k_car_driver_day: ['Car with driver (per day)', 'سيارة بسائق (يوم)'], k_intercity_transfer: ['Between cities', 'تنقل بين مدينتين'], k_activity: ['Activity / tour', 'نشاط / جولة'], k_other: ['Other', 'أخرى'],
    b_per_vehicle: ['per vehicle', 'للسيارة'], b_per_person: ['per person', 'للشخص'], b_per_day: ['per day', 'لليوم'], b_per_group: ['per group', 'للمجموعة'],
    v_sedan: ['Sedan', 'سيدان'], v_suv: ['SUV', 'دفع رباعي'], v_van: ['Van', 'فان'], v_minibus: ['Minibus', 'ميني باص'], v_bus: ['Bus', 'باص'], v_none: ['—', '—']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }
  if (!ROUTES.includes('services')) ROUTES.push('services');
  ROLE_CAN.services = ['owner', 'agent'];
  const KINDS = ['transfer_oneway', 'transfer_roundtrip', 'meet_assist', 'car_driver_day', 'intercity_transfer', 'activity', 'other'];
  const BASIS = ['per_vehicle', 'per_person', 'per_day', 'per_group'];
  const VEH = ['sedan', 'suv', 'van', 'minibus', 'bus', 'none'];
  const CUR = ['SAR', 'USD', 'EUR', 'AED', 'TRY', 'MYR', 'GBP'];
  let SV = null, SVF = 'all', SVE = null;
  const num = v => (v === '' || v == null || isNaN(Number(v))) ? null : Number(v);
  const sell = s => { const p = Number(s.price) || 0, m = Number(s.margin_value) || 0; return s.margin_type === 'fixed' ? p + m : p * (1 + m / 100); };
  const money = (n, c) => (Number(n) || 0).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ' + esc(c || '');

  async function load() {
    const { data, error } = await Cloud.sb.from('agency_services').select('*').eq('agency_id', Cloud.agencyId).order('city').order('kind').order('name');
    SV = error ? [] : (data || []);
    if (S.ui.view === 'services') rerenderSafe();
  }
  function vServices() {
    if (!Cloud.on) return vDashboard();
    if (!SV) { load(); return `<div class="head"><div><h1>${t('nav_services')}</h1></div></div><p class="muted">${t('loading')}</p>`; }
    const cities = [...new Set(SV.map(s => s.city))].sort();
    const list = SV.filter(s => SVF === 'all' || s.city === SVF);
    const groups = {}; for (const s of list) (groups[s.city] = groups[s.city] || []).push(s);
    const edit = can('services');
    return `
    <div class="head"><div><h1>${t('nav_services')}</h1><p>${t('svSub')}</p></div>${edit ? `<button class="btn primary" data-act="svNew">${ic('plus', 'sm')} ${t('svAdd')}</button>` : ''}</div>
    ${cities.length > 1 ? `<div class="chips" style="margin-bottom:12px">${['all', ...cities].map(c => `<button class="chip ${SVF === c ? 'on' : ''}" data-act="svCity" data-val="${esc(c)}">${c === 'all' ? t('svAll') : esc(c)} <span class="n">${c === 'all' ? SV.length : SV.filter(s => s.city === c).length}</span></button>`).join('')}</div>` : ''}
    ${!SV.length ? `<div class="card"><p class="muted">${t('svEmpty')}</p></div>` : Object.keys(groups).sort().map(city => `
      <div class="card" style="padding:4px 6px;margin-bottom:12px"><div style="padding:10px 10px 4px"><b>${esc(city)}</b> <span class="small muted">${esc(groups[city][0].country_code || '')}</span></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('svName')}</th><th>${t('svKind')}</th><th>${t('svVehicle')}</th><th>${t('svPrice')}</th><th>${t('svSell')}</th><th></th></tr></thead><tbody>
      ${groups[city].map(s => `<tr ${edit ? `data-act="svOpen" data-id="${s.id}" tabindex="0" style="cursor:pointer"` : ''} class="${s.active ? '' : 'muted'}">
        <td><b>${esc(s.name)}</b>${s.to_city ? `<div class="small muted">→ ${esc(s.to_city)}</div>` : ''}</td>
        <td class="small">${t('k_' + s.kind)}</td>
        <td class="small">${s.vehicle && s.vehicle !== 'none' ? t('v_' + s.vehicle) + (s.max_pax ? ` · ${s.max_pax}` : '') : '—'}</td>
        <td class="small num">${money(s.price, s.currency)} <span class="muted">${t('b_' + s.price_basis)}</span></td>
        <td class="num"><b>${money(sell(s), s.currency)}</b></td>
        <td>${s.auto_include ? `<span class="pill st-sent">${t('svAutoTag')}</span>` : ''}${s.active ? '' : ` <span class="pill st-lost">${t('svOff')}</span>`}</td></tr>`).join('')}
      </tbody></table></div></div>`).join('')}`;
  }
  const opt = (arr, cur, pre) => arr.map(v => `<option value="${v}" ${cur === v ? 'selected' : ''}>${t(pre + v)}</option>`).join('');
  function form(s) {
    SVE = s;
    const f = (id, label, val, type = 'text', extra = '') => `<div class="f"><label for="sv-${id}">${label}</label><input class="inp" id="sv-${id}" type="${type}" value="${esc(val ?? '')}" ${extra}></div>`;
    modal(s.id ? t('svEdit') : t('svAdd'), `
      <div class="grid g2">
        ${f('city', t('svCity'), s.city, 'text', 'placeholder="Istanbul" list="sv-cities"')}
        ${f('cc', t('svCountry'), s.country_code, 'text', 'maxlength="2" placeholder="TR" style="text-transform:uppercase"')}
        <div class="f"><label for="sv-kind">${t('svKind')}</label><select class="inp" id="sv-kind">${opt(KINDS, s.kind, 'k_')}</select></div>
        ${f('name', t('svName'), s.name, 'text', 'placeholder="' + (L() === 'ar' ? 'توصيل من المطار للفندق - سيارة خاصة' : 'Airport → hotel, private car') + '"')}
        <div class="f"><label for="sv-veh">${t('svVehicle')}</label><select class="inp" id="sv-veh">${opt(VEH, s.vehicle || 'sedan', 'v_')}</select></div>
        ${f('pax', t('svMaxPax'), s.max_pax, 'number', 'min="1"')}
        ${f('price', t('svPrice'), s.price, 'number', 'min="0" step="0.01"')}
        <div class="f"><label for="sv-basis">${t('svBasis')}</label><select class="inp" id="sv-basis">${opt(BASIS, s.price_basis || 'per_vehicle', 'b_')}</select></div>
        ${f('child', t('svChild'), s.child_price, 'number', 'min="0" step="0.01"')}
        <div class="f"><label for="sv-cur">${t('svCur')}</label><select class="inp" id="sv-cur">${CUR.map(c => `<option ${(s.currency || 'SAR') === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
        <div class="f"><label for="sv-margin">${t('svMargin')}</label><div class="row" style="gap:6px"><input class="inp" id="sv-margin" type="number" step="0.01" value="${esc(s.margin_value ?? 10)}" style="flex:1"><select class="inp" id="sv-mtype" style="width:auto"><option value="percent" ${s.margin_type !== 'fixed' ? 'selected' : ''}>%</option><option value="fixed" ${s.margin_type === 'fixed' ? 'selected' : ''}>${t('svCur')}</option></select></div></div>
        ${f('to', t('svToCity'), s.to_city)}
        ${f('hours', t('svHours'), s.hours, 'number', 'min="1" step="0.5"')}
        <div class="f span2"><label for="sv-notes">${t('svNotes')}</label><input class="inp" id="sv-notes" value="${esc(s.notes || '')}"></div>
        <label class="check span2"><input type="checkbox" id="sv-auto" ${s.auto_include ? 'checked' : ''}> ${t('svAuto')}</label>
        <label class="check span2"><input type="checkbox" id="sv-active" ${s.active !== false ? 'checked' : ''}> ${t('svActive')}</label>
      </div>
      <datalist id="sv-cities">${[...new Set((SV || []).map(x => x.city))].map(c => `<option value="${esc(c)}">`).join('')}</datalist>`,
      `${s.id ? `<button class="btn" data-act="svDelete" style="margin-inline-end:auto">${ic('trash', 'sm')} ${t('delete')}</button>` : ''}<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="svSave">${t('save')}</button>`, { wide: true });
  }
  Object.assign(ACT, {
    svNew: () => form({ kind: 'transfer_oneway', currency: 'SAR', margin_type: 'percent', margin_value: 10, active: true, city: SVF !== 'all' ? SVF : '' }),
    svOpen: el => { const s = (SV || []).find(x => x.id === el.dataset.id); if (s) form({ ...s }); },
    svCity: el => { SVF = el.dataset.val || 'all'; rerenderSafe(); },
    svSave: async () => {
      const v = id => (document.getElementById('sv-' + id) || {}).value;
      const row = {
        agency_id: Cloud.agencyId, city: String(v('city') || '').trim(), country_code: String(v('cc') || '').trim().toUpperCase() || null,
        kind: v('kind'), name: String(v('name') || '').trim(), vehicle: v('veh'), max_pax: num(v('pax')), price: num(v('price')),
        price_basis: v('basis'), child_price: num(v('child')), currency: v('cur'), margin_type: v('mtype'), margin_value: num(v('margin')) || 0,
        to_city: String(v('to') || '').trim() || null, hours: num(v('hours')), notes: String(v('notes') || '').trim() || null,
        auto_include: document.getElementById('sv-auto').checked, active: document.getElementById('sv-active').checked
      };
      if (!row.city || !row.name || row.price == null) { toast(t('svNeed')); return; }
      const q = SVE && SVE.id ? Cloud.sb.from('agency_services').update(row).eq('id', SVE.id) : Cloud.sb.from('agency_services').insert(row);
      const { error } = await q;
      if (error) { toast(friendlyErr(error)); return; }
      closeModal(); toast(t('svSaved')); SV = null; load();
    },
    svDelete: () => { const id = SVE && SVE.id; confirmBox(t('svDelQ'), async () => { const { error } = await Cloud.sb.from('agency_services').delete().eq('id', id); if (error) toast(friendlyErr(error)); else { closeModal(); toast(t('deleted')); SV = null; load(); } }, t('delete')); }
  });
  window.EXTRA_VIEWS = window.EXTRA_VIEWS || {};
  window.EXTRA_VIEWS.services = vServices;
  const prev = window.extraNav;
  window.extraNav = () => { const a = typeof prev === 'function' ? prev() : []; const i = a.findIndex(x => x && x[0] === 'contracts'); const item = can('services') ? ['services', 'transfer', t('nav_services')] : null; if (item) a.splice(i >= 0 ? i + 1 : a.length, 0, item); return a; };
  try { if (Cloud.on && document.querySelector('#side')) { renderShell(); route(); } } catch (e) { }
})();
