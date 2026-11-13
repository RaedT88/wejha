/* ---------- Wejha: Preferred hotels (ranked per city; the WhatsApp agent shows them first) ---------- */
(function () {
  if (typeof ROUTES === 'undefined') return;
  const AR = {
    nav_preferred: ['Preferred hotels', 'الفنادق المفضلة'],
    phSub: ['City-centre 4-star hotels come first: 2 four-star choices, followed by 4 five-star choices. Upload 6 hotels per city.', 'الأولوية لفنادق 4 نجوم في وسط المدينة: خياران أولًا، ثم 4 فنادق 5 نجوم. ارفع 6 فنادق لكل مدينة.'],
    phAdd: ['Add hotel', 'إضافة فندق'], phEdit: ['Edit hotel', 'تعديل فندق'], phImport: ['Import CSV', 'استيراد CSV'], phExport: ['Export', 'تصدير'],
    phTemplate: ['CSV template', 'نموذج CSV'], phCountry: ['Country', 'الدولة'], phCity: ['City', 'المدينة'], phHotel: ['Hotel', 'الفندق'],
    phPriority: ['Priority', 'الأولوية'], phStars: ['Stars', 'النجوم'], phNotes: ['Notes (internal)', 'ملاحظات (داخلية)'], phActive: ['Active', 'مفعّل'],
    phEmpty: ['No preferred hotels yet. Add one, or import a CSV from Excel with the columns country, city, hotel, priority, stars.', 'لا توجد فنادق مفضلة بعد. أضف فندقاً، أو استورد ملف CSV من Excel بالأعمدة: country, city, hotel, priority, stars.'],
    phNeed: ['City and hotel are required.', 'المدينة واسم الفندق مطلوبان.'], phSaved: ['Hotel saved', 'تم حفظ الفندق'], phDelQ: ['Remove this hotel from the list?', 'حذف هذا الفندق من القائمة؟'],
    phAll: ['All cities', 'كل المدن'], phSearch: ['Search hotel or city', 'ابحث عن فندق أو مدينة'], phOff: ['Off', 'موقوف'],
    phImported: ['{a} added · {u} updated · {s} skipped', '{a} أُضيف · {u} حُدّث · {s} تُخطّي'], phImportErr: ['Could not read the file. Save it from Excel as "CSV UTF-8" with the columns country, city, hotel, priority, stars.', 'تعذّرت قراءة الملف. احفظه من Excel بصيغة "CSV UTF-8" بالأعمدة country, city, hotel, priority, stars.'],
    phTooMany: ['Up to 2,000 rows per file.', 'الحد 2,000 صف في الملف.'], phNoTable: ['The preferred hotels table is not set up yet. Run the migration 20261112_preferred_hotels.sql in Supabase.', 'جدول الفنادق المفضلة غير مُعدّ بعد. شغّل ملف 20261112_preferred_hotels.sql في Supabase.'],
    phCount: ['{n} hotels in {c} cities', '{n} فندق في {c} مدينة'], phUp: ['Move up', 'لأعلى'], phDown: ['Move down', 'لأسفل']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }
  if (!ROUTES.includes('preferred')) ROUTES.push('preferred');
  ROLE_CAN.preferred = ['owner', 'agent'];

  let PH = null, PHF = 'all', PHQ = '', PHE = null, PHERR = null, PHIMPORT = null, PHBUSY = false, PHARCH = false;
  const T = 'preferred_hotels';
  const key = s => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  const nInt = (v, lo, hi) => { const n = parseInt(String(v || '').replace(/[^\d]/g, ''), 10); return isNaN(n) ? null : Math.min(hi, Math.max(lo, n)); };

  async function load() {
    const { data, error } = await Cloud.sb.from(T).select('*').eq('agency_id', Cloud.agencyId).order('city').order('priority').order('hotel');
    PHERR = error ? (/preferred_hotels/.test(error.message || '') || error.code === 'PGRST205' ? 'table' : friendlyErr(error)) : null;
    PH = error ? [] : (data || []);
    if (S.ui.view === 'preferred') rerenderSafe();
  }

  function vPreferred() {
    if (!Cloud.on) return vDashboard();
    const head = (extra = '') => `<div class="head"><div><h1>${t('nav_preferred')}</h1><p>${t('phSub')}</p></div>${extra}</div>`;
    if (!PH) { load(); return head() + `<p class="muted">${t('loading')}</p>`; }
    if (PHERR === 'table') return head() + `<div class="warn-box">${ic('alert', 'sm')} ${t('phNoTable')}</div>`;
    const edit = can('preferred');
    const cities = [...new Set(PH.map(h => h.city))].sort((a, b) => a.localeCompare(b));
    const q = key(PHQ);
    const list = PH.filter(h => (PHARCH || h.active !== false) && (PHF === 'all' || h.city === PHF) && (!q || key(h.hotel + ' ' + h.city + ' ' + (h.country || '')).includes(q)));
    const groups = {}; for (const h of list) (groups[h.city] = groups[h.city] || []).push(h);
    const btns = `<div class="row" style="gap:8px;flex-wrap:wrap">
      <button class="btn" data-act="phTemplate">${ic('download', 'sm')} ${t('phTemplate')}</button>
      ${PH.length ? `<button class="btn" data-act="phExport">${ic('download', 'sm')} ${t('phExport')}</button>` : ''}
      <button class="btn ${PHARCH ? 'primary' : ''}" data-act="phArchived">${L() === 'ar' ? (PHARCH ? 'إخفاء الموقوفة' : 'عرض الموقوفة') : (PHARCH ? 'Hide archived' : 'Show archived')}</button>
      ${edit ? `<label class="btn" style="cursor:pointer">${ic('upload', 'sm')} ${t('phImport')}<input type="file" id="ph-file" accept=".csv,text/csv" style="display:none"></label>
      <button class="btn primary" data-act="phNew">${ic('plus', 'sm')} ${t('phAdd')}</button>` : ''}</div>`;
    const oldCities = cities.filter(c => { const a=PH.filter(h=>h.city===c&&h.active!==false);return a.length!==6||a.filter(h=>h.stars===4).length!==2||a.filter(h=>h.stars===5).length!==4; }).length;
    return head(btns) + `<section class="card" style="padding:20px;margin-bottom:18px;border-inline-start:4px solid var(--brand)">
      <h2 style="font-size:18px;margin:0 0 12px">${L()==='ar'?'الأولوية: 4 نجوم في وسط المدينة':'First choice: city-centre 4-star hotels'}</h2>
      <div class="grid g2"><div style="padding:14px;border-radius:12px;background:var(--brand-soft,#ede9f5)"><b>${L()==='ar'?'الخياران 1 و2 · 4 نجوم':'Choices 1 & 2 · 4 stars'}</b><p class="small" style="margin:6px 0 0">${L()==='ar'?'اختر فندقين 4 نجوم في وسط المدينة. ضع المنطقة في الملاحظات.':'Choose two 4-star hotels in the city centre. Add the neighbourhood in notes.'}</p></div><div style="padding:14px;border-radius:12px;background:var(--surface-2,#f3f4f6)"><b>${L()==='ar'?'الخيارات 3 إلى 6 · 5 نجوم':'Choices 3 to 6 · 5 stars'}</b><p class="small" style="margin:6px 0 0">${L()==='ar'?'أربع بدائل 5 نجوم بعد فنادق الأربع نجوم.':'Four 5-star alternatives after the 4-star choices.'}</p></div></div>
      <p class="small muted" style="margin:12px 0 0">${L()==='ar'?'ارفع الملف بأي ترتيب؛ نرتب الأربع نجوم أولًا تلقائيًا. المدن غير الموجودة بالملف لا تتغير.':'Upload in any order; 4-star hotels are prioritised automatically. Cities outside your file stay unchanged.'}</p>
      ${oldCities?`<p class="small" style="margin:8px 0 0;color:var(--brand)">${L()==='ar'?oldCities+' مدينة ما زالت على القائمة القديمة؛ تستبدل اختياراتها عند رفع ملفك الجديد.':oldCities+' cities still use the previous list; upload your new file to replace their selections.'}</p>`:''}
    </section>
    ${PHERR ? `<div class="warn-box" style="margin-bottom:12px">${ic('alert', 'sm')} ${esc(PHERR)}</div>` : ''}
    ${PH.length ? `<div class="row" style="gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px">
      <input class="inp" id="ph-q" placeholder="${t('phSearch')}" value="${esc(PHQ)}" style="max-width:280px">
      <span class="small muted">${t('phCount', { n: PH.length, c: cities.length })}</span></div>
      ${cities.length > 1 ? `<div class="chips" style="margin-bottom:12px">${['all', ...cities].map(c => `<button class="chip ${PHF === c ? 'on' : ''}" data-act="phCity" data-val="${esc(c)}">${c === 'all' ? t('phAll') : esc(c)} <span class="n">${c === 'all' ? PH.length : PH.filter(h => h.city === c).length}</span></button>`).join('')}</div>` : ''}` : ''}
    ${!PH.length ? `<div class="card"><p class="muted">${t('phEmpty')}</p></div>` : Object.keys(groups).sort((a, b) => a.localeCompare(b)).map(city => {
      const rows = groups[city].sort((a,b)=>(a.stars===4?0:a.stars===5?1:2)-(b.stars===4?0:b.stars===5?1:2)||a.priority-b.priority);
      const active = PH.filter(h => h.city === city && h.active !== false), n4 = active.filter(h => h.stars === 4).length, n5 = active.filter(h => h.stars === 5).length;
      const valid = active.length === 6 && n4 === 2 && n5 === 4;
      return `<div class="card" style="padding:4px 6px;margin-bottom:12px"><div style="padding:10px 10px 4px"><b>${esc(city)}</b> <span class="small muted">${esc(rows[0].country || '')}</span> <span class="pill ${valid ? 'st-confirmed' : 'st-draft'}">${active.length}/6 · 4★ ${n4}/2 · 5★ ${n5}/4</span></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:70px">${t('phPriority')}</th><th>${t('phHotel')}</th><th>${t('phStars')}</th><th>${t('phNotes')}</th>${edit ? '<th></th>' : ''}</tr></thead><tbody>
      ${rows.map((h, i) => `<tr class="${h.active ? '' : 'muted'}">
        <td><span class="pill ${h.priority <= 3 ? 'st-confirmed' : h.priority <= 6 ? 'st-sent' : 'st-draft'}" style="min-width:34px;text-align:center">${h.priority}</span></td>
        <td ${edit ? `data-act="phOpen" data-id="${h.id}" tabindex="0" style="cursor:pointer"` : ''}><b>${esc(h.hotel)}</b>${h.active ? '' : ` <span class="pill st-lost">${t('phOff')}</span>`}</td>
        <td class="small">${h.stars ? '★'.repeat(h.stars) : '—'}</td>
        <td class="small muted">${esc(h.notes || '')}</td>
        ${edit ? `<td style="white-space:nowrap;text-align:end">
          <button class="icon-btn" data-act="phMove" data-id="${h.id}" data-d="-1" aria-label="${t('phUp')}" ${i === 0 ? 'disabled' : ''}>▲</button>
          <button class="icon-btn" data-act="phMove" data-id="${h.id}" data-d="1" aria-label="${t('phDown')}" ${i === rows.length - 1 ? 'disabled' : ''}>▼</button>
          <button class="icon-btn" data-act="phOpen" data-id="${h.id}" aria-label="${t('phEdit')}">${ic('edit', 'sm')}</button></td>` : ''}</tr>`).join('')}
      </tbody></table></div></div>`;
    }).join('')}`;
  }

  function form(h) {
    PHE = h;
    const f = (id, label, val, type = 'text', extra = '') => `<div class="f"><label for="ph-${id}">${label}</label><input class="inp" id="ph-${id}" type="${type}" value="${esc(val ?? '')}" ${extra}></div>`;
    modal(h.id ? t('phEdit') : t('phAdd'), `
      <div class="grid g2">
        ${f('country', t('phCountry'), h.country, 'text', 'placeholder="Saudi Arabia" list="ph-countries"')}
        ${f('city', t('phCity'), h.city, 'text', 'placeholder="Jeddah" list="ph-cities"')}
        <div class="span2">${f('hotel', t('phHotel'), h.hotel, 'text', 'placeholder="Hilton Jeddah"')}</div>
        <div class="f"><label for="ph-priority">${t('phPriority')}</label><select class="inp" id="ph-priority">${[1, 2, 3, 4, 5, 6].map(n => `<option ${Number(h.priority || 5) === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
        <div class="f"><label for="ph-stars">${t('phStars')}</label><select class="inp" id="ph-stars"><option value="">—</option>${[4, 5].map(n => `<option value="${n}" ${Number(h.stars) === n ? 'selected' : ''}>${'★'.repeat(n)}</option>`).join('')}</select></div>
        <div class="f span2"><label for="ph-notes">${t('phNotes')}</label><input class="inp" id="ph-notes" value="${esc(h.notes || '')}"></div>
        <label class="check span2"><input type="checkbox" id="ph-active" ${h.active !== false ? 'checked' : ''}> ${t('phActive')}</label>
      </div>
      <datalist id="ph-cities">${[...new Set((PH || []).map(x => x.city))].map(c => `<option value="${esc(c)}">`).join('')}</datalist>
      <datalist id="ph-countries">${[...new Set((PH || []).map(x => x.country).filter(Boolean))].map(c => `<option value="${esc(c)}">`).join('')}</datalist>`,
      `${h.id ? `<button class="btn" data-act="phDelete" style="margin-inline-end:auto">${ic('trash', 'sm')} ${t('delete')}</button>` : ''}<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="phSave">${t('save')}</button>`);
  }

  /* CSV: country,city,hotel,priority[,stars,notes] — header optional, comma or semicolon, UTF-8 (BOM ok) */
  function parseCSV(txt) {
    txt = String(txt).replace(/^﻿/, '');
    const first = txt.split(/\r?\n/)[0] || '';
    const sep = (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ';' : (first.includes('\t') && !first.includes(',') ? '\t' : ',');
    const rows = []; let row = [], cur = '', q = false;
    for (let i = 0; i < txt.length; i++) {
      const ch = txt[i];
      if (q) { if (ch === '"') { if (txt[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; continue; }
      if (ch === '"') q = true;
      else if (ch === sep) { row.push(cur); cur = ''; }
      else if (ch === '\n' || ch === '\r') { if (ch === '\r' && txt[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
      else cur += ch;
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    if (q) throw Error('unclosed_csv_quote');
    return rows.map(r => r.map(c => c.trim())).filter(r => r.some(Boolean));
  }
  function csvOut(rows) { return '﻿' + rows.map(r => r.map(c => { const s = String(c ?? ''); return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\r\n'); }
  function dl(name, text) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }

  // Validate the complete file before preview or write. Never guess a star rating.
  function validateImport(rows) {
    const errors = [], out = [], groups = new Map(), seen = new Set();
    if (!rows.length) return { errors: [L() === 'ar' ? 'الملف فارغ.' : 'The file is empty.'], rows: [] };
    const hdr = rows[0].map(key);
    let idx = { country: 0, city: 1, hotel: 2, priority: 3, stars: 4, notes: 5 }, offset = 1;
    if (hdr.some(h => ['country', 'city', 'hotel', 'الدولة', 'المدينة', 'الفندق'].includes(h))) {
      const find = (...names) => hdr.findIndex(h => names.includes(h));
      idx = { country: find('country', 'الدولة'), city: find('city', 'المدينة'), hotel: find('hotel', 'hotel name', 'الفندق'), priority: find('priority', 'rank', 'الأولوية', 'الترتيب'), stars: find('stars', 'star', 'rating', 'النجوم', 'التصنيف'), notes: find('notes', 'ملاحظات') };
      rows = rows.slice(1); offset = 2;
      if (['country', 'city', 'hotel', 'stars'].some(k => idx[k] < 0)) return { errors: [t('phImportErr')], rows: [] };
    }
    if (!rows.length || rows.length > 2000) return { errors: [rows.length ? t('phTooMany') : t('phImportErr')], rows: [] };
    const digits = s => String(s).replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632)).replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776));
    rows.forEach((r, i) => {
      const get = k => idx[k] >= 0 ? String(r[idx[k]] || '').trim().replace(/\s+/g, ' ') : '';
      const country = get('country'), city = get('city'), hotel = get('hotel');
      const line = L() === 'ar' ? 'صف ' + (i + offset) + ': ' : 'Row ' + (i + offset) + ': ';
      if (!country || !city || !hotel) { errors.push(line + (L() === 'ar' ? 'الدولة والمدينة واسم الفندق مطلوبة.' : 'Country, city and hotel are required.')); return; }
      const gk = key(country) + '|' + key(city), hk = key(city) + '|' + key(hotel);
      if (seen.has(hk)) { errors.push(line + (L() === 'ar' ? 'فندق مكرر: ' : 'Duplicate hotel: ') + hotel); return; }
      seen.add(hk);
      const group = groups.get(gk) || { country, city, rows: [] }; groups.set(gk, group);
      const stars = Number(digits(get('stars')).replace(/stars?|نجوم|[★☆⭐]/gi, '').trim());
      const priority = get('priority') ? Number(digits(get('priority'))) : group.rows.length + 1;
      if (![4, 5].includes(stars)) errors.push(line + (L() === 'ar' ? 'التصنيف لازم يكون 4 أو 5 نجوم.' : 'Stars must be 4 or 5.'));
      if (!Number.isInteger(priority) || priority < 1 || priority > 10) errors.push(line + (L() === 'ar' ? 'ترتيب الملف يجب أن يكون رقمًا من 1 إلى 10، وسيُعاد ترتيبه تلقائيًا.' : 'Use a rank from 1 to 10; final priority is assigned automatically.'));
      if (country.length > 100 || city.length > 150 || hotel.length > 250 || get('notes').length > 1000) errors.push(line + (L() === 'ar' ? 'النص أطول من الحد المسموح.' : 'A field exceeds the allowed length.'));
      const row = { country, city, hotel, priority, stars, notes: get('notes') || null };
      group.rows.push(row); out.push(row);
    });
    const cityCountries = new Map();
    groups.forEach(g => {
      const prev = cityCountries.get(key(g.city));
      if (prev && prev !== key(g.country)) errors.push(g.city + ': ' + (L() === 'ar' ? 'استخدم اسم مدينة مميزًا لكل دولة.' : 'Use a distinct city label for each country.'));
      cityCountries.set(key(g.city), key(g.country));
      const n4 = g.rows.filter(r => r.stars === 4).length, n5 = g.rows.filter(r => r.stars === 5).length;
      if (g.rows.length !== 6 || n4 !== 2 || n5 !== 4) errors.push(g.city + ': ' + (L() === 'ar' ? 'المطلوب 6 فنادق: 2 أربع نجوم و4 خمس نجوم.' : 'Each city needs 6 hotels: 2 four-star and 4 five-star.'));
      g.rows.sort((a,b)=>a.stars-b.stars || a.priority-b.priority); g.rows.forEach((r,i)=>{r.priority=i+1;});
    });
    return { rows: [...groups.values()].flatMap(g=>g.rows), errors, groups: [...groups.values()] };
  }
  function importError(message) {
    modal(t('phImport'), `<div class="warn-box">${esc(message)}</div>`, `<button class="btn" data-act="closeModal">${t('close') || 'Close'}</button>`);
  }
  async function importFile(file) {
    if (PHBUSY) return;
    let parsed;
    try { parsed = validateImport(parseCSV(await file.text())); } catch (_) { return importError(t('phImportErr')); }
    if (parsed.errors.length) return modal(t('phImport'), `<p>${L() === 'ar' ? 'لم يُحفظ أي تعديل. أصلح التالي وأعد رفع الملف:' : 'Nothing was changed. Fix these items and upload again:'}</p><ul>${parsed.errors.slice(0, 25).map(e => `<li>${esc(e)}</li>`).join('')}</ul>`, `<button class="btn" data-act="closeModal">${t('cancel')}</button>`);
    PHBUSY = true;
    try {
      const { data, error } = await Cloud.sb.rpc('wejha_import_preferred', { p_agency: Cloud.agencyId, p_rows: parsed.rows, p_commit: false });
      if (error) throw error;
      PHIMPORT = { rows: parsed.rows, revision: data.revision };
      modal(L() === 'ar' ? 'معاينة ملف الفنادق' : 'Preview hotel import', `<p>${L() === 'ar' ? 'سيتم اعتماد 6 فنادق لكل مدينة؛ الأربع نجوم في 1 و2، والخمس نجوم في 3 إلى 6 تلقائيًا. الفنادق القديمة غير المختارة ستُوقَف مع الاحتفاظ بها، والمدن غير الموجودة في الملف لن تتغير.' : 'Each city will have 6 active hotels: city-centre 4-star selections at ranks 1–2, then 5-star selections at 3–6. Previous hotels not selected will be archived, and cities outside this file stay unchanged.'}</p><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('phCity')}</th><th>4★</th><th>5★</th><th>${L() === 'ar' ? 'إيقاف قديم' : 'Archive'}</th></tr></thead><tbody>${(data.cities || []).map(g => `<tr><td>${esc(g.city)} · ${esc(g.country)}</td><td>2</td><td>4</td><td>${g.archived}</td></tr>`).join('')}</tbody></table></div><p class="small muted">${data.added} ${L() === 'ar' ? 'جديد' : 'new'} · ${data.updated} ${L() === 'ar' ? 'تحديث' : 'updated'}</p>`, `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="phConfirmImport">${L() === 'ar' ? 'اعتماد الملف' : 'Apply file'}</button>`);
    } catch (e) { importError(friendlyErr(e)); }
    finally { PHBUSY = false; }
  }
  async function confirmImport() {
    if (PHBUSY || !PHIMPORT) return;
    PHBUSY = true;
    const button = document.querySelector('[data-act="phConfirmImport"]'); if (button) button.disabled = true;
    try {
      const { data, error } = await Cloud.sb.rpc('wejha_import_preferred', { p_agency: Cloud.agencyId, p_rows: PHIMPORT.rows, p_commit: true, p_revision: PHIMPORT.revision });
      if (error) throw error;
      PHIMPORT = null; closeModal();
      toast(L() === 'ar' ? `تم اعتماد ${data.hotels} فندق وإيقاف ${data.archived} من الخيارات القديمة.` : `${data.hotels} hotels applied; ${data.archived} previous choices archived.`);
      PH = null; await load();
    } catch (e) { PHIMPORT = null; importError(friendlyErr(e)); }
    finally { PHBUSY = false; }
  }


  Object.assign(ACT, {
    phConfirmImport: confirmImport,
    phArchived: () => { PHARCH = !PHARCH; rerenderSafe(); },
    phNew: () => form({ priority: 1, stars: 4, active: true, city: PHF !== 'all' ? PHF : '', country: PHF !== 'all' ? ((PH || []).find(h => h.city === PHF) || {}).country : '' }),
    phOpen: el => { const h = (PH || []).find(x => x.id === el.dataset.id); if (h) form({ ...h }); },
    phCity: el => { PHF = el.dataset.val || 'all'; rerenderSafe(); },
    phSave: async () => {
      const v = id => String((document.getElementById('ph-' + id) || {}).value || '').trim();
      const row = { agency_id: Cloud.agencyId, country: v('country') || null, city: v('city'), hotel: v('hotel'), priority: nInt(v('priority'), 1, 6) || 1,
        stars: nInt(v('stars'), 1, 5), notes: v('notes') || null, active: document.getElementById('ph-active').checked };
      if (!row.country || !row.city || !row.hotel || (row.active && ![4,5].includes(row.stars))) { toast(L() === 'ar' ? 'الدولة والمدينة والفندق وتصنيف 4 أو 5 نجوم مطلوبة.' : 'Country, city, hotel and a 4- or 5-star rating are required.'); return; }
      if(row.active && ((row.stars===4 && row.priority>2)||(row.stars===5 && row.priority<3))) { toast(L()==='ar'?'الأربع نجوم في الأولوية 1 أو 2، والخمس نجوم من 3 إلى 6.':'4-star hotels use ranks 1–2; 5-star hotels use ranks 3–6.'); return; }
      const all = PH || [], same = all.filter(h => h.active !== false && key(h.city) === key(row.city));
      const after = all.filter(h => (!PHE || h.id !== PHE.id) && h.active !== false && key(h.city) === key(row.city)); if(row.active) after.push(row);
      const violations = a => Math.max(0,a.length-6)+Math.max(0,a.filter(h=>h.stars===4).length-2)+Math.max(0,a.filter(h=>h.stars===5).length-4)+a.filter(h=>![4,5].includes(h.stars)).length;
      if (violations(after)>0 && violations(after)>=violations(same)) { toast(L() === 'ar' ? 'لكل مدينة 6 فنادق فقط: 2 أربع نجوم و4 خمس نجوم. استخدم ملف الاستيراد لتحديث القائمة كاملة.' : 'Use 6 hotels per city: 2 four-star and 4 five-star. Import a full city list to replace the current selection.'); return; }
      const q = PHE && PHE.id ? Cloud.sb.from(T).update(row).eq('id', PHE.id) : Cloud.sb.from(T).insert(row);
      const { error } = await q;
      if (error) { toast(/duplicate|unique/i.test(error.message || '') ? (L() === 'ar' ? 'هذا الفندق موجود في نفس المدينة.' : 'This hotel is already listed for this city.') : friendlyErr(error)); return; }
      closeModal(); toast(t('phSaved')); PH = null; load();
    },
    phDelete: () => { const id = PHE && PHE.id; confirmBox(t('phDelQ'), async () => { const { error } = await Cloud.sb.from(T).delete().eq('id', id); if (error) toast(friendlyErr(error)); else { closeModal(); toast(t('deleted')); PH = null; load(); } }); },
    phMove: async el => {
      const h = (PH || []).find(x => x.id === el.dataset.id); if (!h) return;
      const rows = PH.filter(x => x.city === h.city); const i = rows.indexOf(h); const o = rows[i + Number(el.dataset.d)]; if (!o) return;
      if(h.stars!==o.stars) { toast(L()==='ar'?'تظل فنادق الأربع نجوم قبل الخمس نجوم.':'4-star hotels stay ahead of 5-star hotels.'); return; }
      let a = o.priority, b = h.priority; if (a === b) { a = Math.max(1, Math.min(6, h.priority + Number(el.dataset.d))); }
      const r1 = await Cloud.sb.from(T).update({ priority: a }).eq('id', h.id);
      const r2 = a === o.priority ? await Cloud.sb.from(T).update({ priority: b }).eq('id', o.id) : { error: null };
      if (r1.error || r2.error) toast(friendlyErr(r1.error || r2.error));
      PH = null; load();
    },
    phTemplate: () => dl('preferred-hotels-6-per-city.csv', csvOut([['country', 'city', 'hotel', 'priority', 'stars', 'notes'], ...Array.from({ length: 6 }, (_, i) => ['', '', '', i + 1, i < 2 ? 4 : 5, ''])])),
    phExport: () => dl('preferred-hotels.csv', csvOut([['country', 'city', 'hotel', 'priority', 'stars', 'notes'], ...(PH || []).filter(h => h.active !== false).map(h => [h.country || '', h.city, h.hotel, h.priority, h.stars || '', h.notes || ''])]))
  });

  document.addEventListener('change', e => { if (e.target && e.target.id === 'ph-file' && e.target.files && e.target.files[0]) { const f = e.target.files[0]; e.target.value = ''; importFile(f); } });
  document.addEventListener('input', e => { if (e.target && e.target.id === 'ph-q') { PHQ = e.target.value; const pos = e.target.selectionStart; rerenderSafe(); const n = document.getElementById('ph-q'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) { } } } });

  window.EXTRA_VIEWS = window.EXTRA_VIEWS || {};
  window.EXTRA_VIEWS.preferred = vPreferred;
  const prev = window.extraNav;
  window.extraNav = () => {
    const a = typeof prev === 'function' ? prev() : [];
    if (!can('preferred')) return a;
    let i = a.findIndex(x => x && x[0] === 'services'); if (i < 0) i = a.findIndex(x => x && x[0] === 'contracts');
    a.splice(i >= 0 ? i + 1 : a.length, 0, ['preferred', 'star', t('nav_preferred')]);
    return a;
  };
  try { if (Cloud.on && document.querySelector('#side')) { renderShell(); route(); } } catch (e) { }
})();
