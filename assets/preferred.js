/* ---------- Wejha: Preferred hotels (ranked per city; the WhatsApp agent shows them first) ---------- */
(function () {
  if (typeof ROUTES === 'undefined') return;
  const AR = {
    nav_preferred: ['Preferred hotels', 'الفنادق المفضلة'],
    phSub: ['Rank your hotels in each city from 1 (first) to 10. When a customer asks for a city, the WhatsApp agent shows these hotels first.', 'رتّب فنادقك في كل مدينة من 1 (الأول) إلى 10. لما العميل يطلب مدينة، الوكيل في واتساب يعرض هذه الفنادق أولاً.'],
    phAdd: ['Add hotel', 'إضافة فندق'], phEdit: ['Edit hotel', 'تعديل فندق'], phImport: ['Import CSV', 'استيراد CSV'], phExport: ['Export', 'تصدير'],
    phTemplate: ['CSV template', 'نموذج CSV'], phCountry: ['Country', 'الدولة'], phCity: ['City', 'المدينة'], phHotel: ['Hotel', 'الفندق'],
    phPriority: ['Priority', 'الأولوية'], phStars: ['Stars', 'النجوم'], phNotes: ['Notes (internal)', 'ملاحظات (داخلية)'], phActive: ['Active', 'مفعّل'],
    phEmpty: ['No preferred hotels yet. Add one, or import a CSV from Excel with the columns country, city, hotel, priority.', 'لا توجد فنادق مفضلة بعد. أضف فندقاً، أو استورد ملف CSV من Excel بالأعمدة: country, city, hotel, priority.'],
    phNeed: ['City and hotel are required.', 'المدينة واسم الفندق مطلوبان.'], phSaved: ['Hotel saved', 'تم حفظ الفندق'], phDelQ: ['Remove this hotel from the list?', 'حذف هذا الفندق من القائمة؟'],
    phAll: ['All cities', 'كل المدن'], phSearch: ['Search hotel or city', 'ابحث عن فندق أو مدينة'], phOff: ['Off', 'موقوف'],
    phImported: ['{a} added · {u} updated · {s} skipped', '{a} أُضيف · {u} حُدّث · {s} تُخطّي'], phImportErr: ['Could not read the file. Save it from Excel as "CSV UTF-8" with the columns country, city, hotel, priority.', 'تعذّرت قراءة الملف. احفظه من Excel بصيغة "CSV UTF-8" بالأعمدة country, city, hotel, priority.'],
    phTooMany: ['Up to 2,000 rows per file.', 'الحد 2,000 صف في الملف.'], phNoTable: ['The preferred hotels table is not set up yet. Run the migration 20261112_preferred_hotels.sql in Supabase.', 'جدول الفنادق المفضلة غير مُعدّ بعد. شغّل ملف 20261112_preferred_hotels.sql في Supabase.'],
    phCount: ['{n} hotels in {c} cities', '{n} فندق في {c} مدينة'], phUp: ['Move up', 'لأعلى'], phDown: ['Move down', 'لأسفل']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }
  if (!ROUTES.includes('preferred')) ROUTES.push('preferred');
  ROLE_CAN.preferred = ['owner', 'agent'];

  let PH = null, PHF = 'all', PHQ = '', PHE = null, PHERR = null;
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
    const list = PH.filter(h => (PHF === 'all' || h.city === PHF) && (!q || key(h.hotel + ' ' + h.city + ' ' + (h.country || '')).includes(q)));
    const groups = {}; for (const h of list) (groups[h.city] = groups[h.city] || []).push(h);
    const btns = `<div class="row" style="gap:8px;flex-wrap:wrap">
      <button class="btn" data-act="phTemplate">${ic('download', 'sm')} ${t('phTemplate')}</button>
      ${PH.length ? `<button class="btn" data-act="phExport">${ic('download', 'sm')} ${t('phExport')}</button>` : ''}
      ${edit ? `<label class="btn" style="cursor:pointer">${ic('upload', 'sm')} ${t('phImport')}<input type="file" id="ph-file" accept=".csv,text/csv" style="display:none"></label>
      <button class="btn primary" data-act="phNew">${ic('plus', 'sm')} ${t('phAdd')}</button>` : ''}</div>`;
    return head(btns) + `
    ${PHERR ? `<div class="warn-box" style="margin-bottom:12px">${ic('alert', 'sm')} ${esc(PHERR)}</div>` : ''}
    ${PH.length ? `<div class="row" style="gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px">
      <input class="inp" id="ph-q" placeholder="${t('phSearch')}" value="${esc(PHQ)}" style="max-width:280px">
      <span class="small muted">${t('phCount', { n: PH.length, c: cities.length })}</span></div>
      ${cities.length > 1 ? `<div class="chips" style="margin-bottom:12px">${['all', ...cities].map(c => `<button class="chip ${PHF === c ? 'on' : ''}" data-act="phCity" data-val="${esc(c)}">${c === 'all' ? t('phAll') : esc(c)} <span class="n">${c === 'all' ? PH.length : PH.filter(h => h.city === c).length}</span></button>`).join('')}</div>` : ''}` : ''}
    ${!PH.length ? `<div class="card"><p class="muted">${t('phEmpty')}</p></div>` : Object.keys(groups).sort((a, b) => a.localeCompare(b)).map(city => {
      const rows = groups[city];
      return `<div class="card" style="padding:4px 6px;margin-bottom:12px"><div style="padding:10px 10px 4px"><b>${esc(city)}</b> <span class="small muted">${esc(rows[0].country || '')}</span></div>
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
        <div class="f"><label for="ph-priority">${t('phPriority')}</label><select class="inp" id="ph-priority">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `<option ${Number(h.priority || 5) === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
        <div class="f"><label for="ph-stars">${t('phStars')}</label><select class="inp" id="ph-stars"><option value="">—</option>${[5, 4, 3, 2, 1].map(n => `<option value="${n}" ${Number(h.stars) === n ? 'selected' : ''}>${'★'.repeat(n)}</option>`).join('')}</select></div>
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
    return rows.map(r => r.map(c => c.trim())).filter(r => r.some(Boolean));
  }
  function csvOut(rows) { return '﻿' + rows.map(r => r.map(c => { const s = String(c ?? ''); return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\r\n'); }
  function dl(name, text) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }

  async function importFile(file) {
    let rows;
    try { rows = parseCSV(await file.text()); } catch (e) { toast(t('phImportErr')); return; }
    if (!rows.length) { toast(t('phImportErr')); return; }
    const hdr = rows[0].map(key);
    let idx = { country: 0, city: 1, hotel: 2, priority: 3, stars: 4, notes: 5 };
    if (hdr.includes('hotel') || hdr.includes('city') || hdr.includes('الفندق') || hdr.includes('المدينة')) {
      const find = (...n) => hdr.findIndex(h => n.includes(h));
      idx = { country: find('country', 'الدولة'), city: find('city', 'المدينة'), hotel: find('hotel', 'hotel name', 'الفندق'), priority: find('priority', 'rank', 'الأولوية', 'الترتيب'), stars: find('stars', 'star', 'النجوم'), notes: find('notes', 'ملاحظات') };
      rows = rows.slice(1);
      if (idx.city < 0 || idx.hotel < 0) { toast(t('phImportErr')); return; }
    }
    if (rows.length > 2000) { toast(t('phTooMany')); return; }
    const have = new Map((PH || []).map(h => [key(h.city) + '|' + key(h.hotel), h]));
    const ins = [], upd = []; let skip = 0; const seen = new Set();
    for (const r of rows) {
      const g = k => idx[k] >= 0 ? (r[idx[k]] || '').trim() : '';
      const city = g('city'), hotel = g('hotel');
      if (!city || !hotel) { skip++; continue; }
      const k = key(city) + '|' + key(hotel); if (seen.has(k)) { skip++; continue; } seen.add(k);
      const row = { agency_id: Cloud.agencyId, country: g('country') || null, city, hotel, priority: nInt(g('priority'), 1, 10) || 5 };
      const st = nInt(g('stars'), 1, 5); if (st) row.stars = st;
      const nt = g('notes'); if (nt) row.notes = nt;
      const ex = have.get(k);
      if (ex) upd.push({ id: ex.id, ...row }); else ins.push(row);
    }
    for (let i = 0; i < ins.length; i += 500) { const { error } = await Cloud.sb.from(T).insert(ins.slice(i, i + 500)); if (error) { toast(friendlyErr(error)); PH = null; load(); return; } }
    for (let i = 0; i < upd.length; i += 500) { const { error } = await Cloud.sb.from(T).upsert(upd.slice(i, i + 500)); if (error) { toast(friendlyErr(error)); PH = null; load(); return; } }
    toast(t('phImported', { a: ins.length, u: upd.length, s: skip }));
    PH = null; load();
  }

  Object.assign(ACT, {
    phNew: () => form({ priority: 5, active: true, city: PHF !== 'all' ? PHF : '', country: PHF !== 'all' ? ((PH || []).find(h => h.city === PHF) || {}).country : '' }),
    phOpen: el => { const h = (PH || []).find(x => x.id === el.dataset.id); if (h) form({ ...h }); },
    phCity: el => { PHF = el.dataset.val || 'all'; rerenderSafe(); },
    phSave: async () => {
      const v = id => String((document.getElementById('ph-' + id) || {}).value || '').trim();
      const row = { agency_id: Cloud.agencyId, country: v('country') || null, city: v('city'), hotel: v('hotel'), priority: nInt(v('priority'), 1, 10) || 5,
        stars: nInt(v('stars'), 1, 5), notes: v('notes') || null, active: document.getElementById('ph-active').checked };
      if (!row.city || !row.hotel) { toast(t('phNeed')); return; }
      const q = PHE && PHE.id ? Cloud.sb.from(T).update(row).eq('id', PHE.id) : Cloud.sb.from(T).insert(row);
      const { error } = await q;
      if (error) { toast(/duplicate|unique/i.test(error.message || '') ? (L() === 'ar' ? 'هذا الفندق موجود في نفس المدينة.' : 'This hotel is already listed for this city.') : friendlyErr(error)); return; }
      closeModal(); toast(t('phSaved')); PH = null; load();
    },
    phDelete: () => { const id = PHE && PHE.id; confirmBox(t('phDelQ'), async () => { const { error } = await Cloud.sb.from(T).delete().eq('id', id); if (error) toast(friendlyErr(error)); else { closeModal(); toast(t('deleted')); PH = null; load(); } }); },
    phMove: async el => {
      const h = (PH || []).find(x => x.id === el.dataset.id); if (!h) return;
      const rows = PH.filter(x => x.city === h.city); const i = rows.indexOf(h); const o = rows[i + Number(el.dataset.d)]; if (!o) return;
      let a = o.priority, b = h.priority; if (a === b) { a = Math.max(1, Math.min(10, h.priority + Number(el.dataset.d))); }
      const r1 = await Cloud.sb.from(T).update({ priority: a }).eq('id', h.id);
      const r2 = a === o.priority ? await Cloud.sb.from(T).update({ priority: b }).eq('id', o.id) : { error: null };
      if (r1.error || r2.error) toast(friendlyErr(r1.error || r2.error));
      PH = null; load();
    },
    phTemplate: () => dl('preferred-hotels-template.csv', csvOut([['country', 'city', 'hotel', 'priority', 'stars'], ['Saudi Arabia', 'Jeddah', 'Hilton Jeddah', 1, 5], ['Saudi Arabia', 'Makkah', 'Swissotel Makkah', 1, 5], ['UAE', 'Dubai', 'Atlantis The Palm', 2, 5]])),
    phExport: () => dl('preferred-hotels.csv', csvOut([['country', 'city', 'hotel', 'priority', 'stars', 'notes', 'active'], ...(PH || []).map(h => [h.country || '', h.city, h.hotel, h.priority, h.stars || '', h.notes || '', h.active ? 'yes' : 'no'])]))
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
