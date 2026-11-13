/* ---------- Wejha: Command center — live KPIs, live map, action queue, charts. The old dashboard moves to "Reports". ---------- */
(function () {
  if (typeof ROUTES === 'undefined') return;
  const AR = {
    nav_live: ['Command center', 'مركز القيادة'], nav_reports: ['Reports', 'التقارير'],
    lv_title: ['Command center', 'مركز القيادة'], lv_sub: ['Everything happening on WhatsApp right now: requests, quotes, bookings and what needs a person.', 'كل ما يحدث على واتساب الآن: الطلبات والعروض والحجوزات وما يحتاج تدخّل موظف.'],
    lv_r_today: ['Today', 'اليوم'], lv_r_7: ['7 days', '7 أيام'], lv_r_30: ['30 days', '30 يوم'],
    k_req: ['Requests', 'الطلبات'], k_quoted: ['Quotes sent', 'عروض مُرسلة'], k_booked: ['Bookings', 'حجوزات'], k_rev: ['Revenue', 'الإيرادات'], k_conv: ['Conversion', 'نسبة التحويل'], k_resp: ['Median reply time', 'متوسط زمن الرد'],
    k_vs: ['vs previous period', 'مقارنة بالفترة السابقة'], k_new: ['new', 'جديد'],
    lv_live: ['Live', 'مباشر'], lv_last30: ['{n} in the last 30 min', '{n} خلال آخر 30 دقيقة'], lv_upd: ['updated {t}', 'آخر تحديث {t}'],
    f_all: ['All', 'الكل'], f_staff: ['Needs staff', 'يحتاج موظف'], f_active: ['In progress', 'قيد المعالجة'], f_booked: ['Booked', 'محجوز'],
    m_dark: ['Night', 'ليلي'], m_sat: ['Satellite', 'قمر صناعي'], m_routes: ['Customer routes', 'مسارات العملاء'],
    leg_new: ['New (30 min)', 'جديد (30 دقيقة)'], leg_staff: ['Needs staff', 'يحتاج موظف'], leg_active: ['In progress', 'قيد المعالجة'], leg_booked: ['Booked', 'محجوز'], leg_fail: ['Failed', 'فشل'],
    q_title: ['Action queue', 'قائمة المهام'], q_sub: ['Orders waiting for a person', 'طلبات تنتظر تدخّل موظف'], q_staff: ['Needs staff', 'يحتاج موظف'], q_fail: ['Search failed', 'بحث فشل'], q_pay: ['Awaiting payment', 'بانتظار الدفع'], q_late: ['Not accepted on time', 'لم تُستلم في الوقت'],
    q_empty: ['Nothing waiting. The agent is handling everything.', 'لا شيء ينتظر. الوكيل يتولى كل الطلبات.'], q_more: ['+{n} more', '+{n} أخرى'],
    c_hours: ['Requests by hour', 'الطلبات حسب الساعة'], c_days: ['Requests by day', 'الطلبات حسب اليوم'], c_funnel: ['Conversion funnel', 'مسار التحويل'],
    fu_req: ['Requests', 'طلبات'], fu_quote: ['Quoted', 'عرض سعر'], fu_pay: ['Payment link', 'رابط دفع'], fu_book: ['Booked', 'محجوز'],
    c_dest: ['Top destinations', 'أكثر الوجهات طلبًا'], c_hotels: ['Top hotels', 'أكثر الفنادق طلبًا'], c_staff: ['Team today', 'أداء الفريق'], c_health: ['Agent health', 'صحة الوكيل'],
    h_auto: ['Answered by the agent', 'رد عليها الوكيل'], h_staff: ['Handed to staff', 'حُوّلت لموظف'], h_fail: ['Failed searches', 'بحث فشل'], h_resp: ['Median reply', 'متوسط الرد'], h_p90: ['Slowest 10%', 'أبطأ 10%'],
    st_open: ['open', 'مفتوح'], st_acc: ['accepted', 'مُستلم'], st_late: ['late', 'متأخر'], st_none: ['No staff yet. Invite your team from Team.', 'لا يوجد موظفون بعد. أضف فريقك من صفحة الفريق.'],
    c_latest: ['Latest activity', 'آخر النشاط'], lv_all: ['All orders', 'كل الطلبات'], lv_none: ['No requests in this period.', 'لا توجد طلبات في هذه الفترة.'],
    lv_nodata: ['No data', 'لا توجد بيانات'], lv_req: ['requests', 'طلب'], lv_bk: ['booked', 'محجوز']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }
  if (!ROUTES.includes('reports')) ROUTES.push('reports');

  const LV = { map: null, layer: null, timer: null, range: 'today', f: 'all', style: 'dark', routes: true, fitted: false, base: null };
  const BOOKED = ['paid', 'vouchered'], QUOTED = ['quoted', 'replied', 'payment_pending', 'hold', 'paid', 'vouchered'];
  const STAFF = ['human_review'], FAIL = ['failed'];
  const COL = { fresh: '#E8B04B', staff: '#E07B2A', fail: '#D9453D', active: '#2FB3A8', booked: '#3CB46E' };
  const created = o => Date.parse((o.events && o.events[0] && o.events[0].at) || o.updated_at) || 0;
  const isNew = o => Date.now() - created(o) < 30 * 60000;
  const kindOf = o => STAFF.includes(o.status) ? 'staff' : FAIL.includes(o.status) ? 'fail' : BOOKED.includes(o.status) ? 'booked' : 'active';
  const replyMs = o => { const ev = o.events || []; if (!ev.length) return null; const t0 = Date.parse(ev[0].at); const r = ev.find((e, i) => i > 0 && /رد|reply|sent|إرسال/i.test(e.text || '')); const t1 = r && Date.parse(r.at); return t0 && t1 && t1 >= t0 ? t1 - t0 : null; };
  const sar = n => (L() === 'ar' ? `${Math.round(n).toLocaleString('en-US')} ر.س` : `SAR ${Math.round(n).toLocaleString('en-US')}`);
  const dur = ms => ms == null ? '—' : ms < 60000 ? Math.round(ms / 1000) + (L() === 'ar' ? ' ث' : 's') : ms < 3600000 ? (ms / 60000).toFixed(ms < 600000 ? 1 : 0) + (L() === 'ar' ? ' د' : 'm') : (ms / 3600000).toFixed(1) + (L() === 'ar' ? ' س' : 'h');
  const med = a => { const s = a.filter(x => x != null).sort((x, y) => x - y); return s.length ? s[Math.floor((s.length - 1) / 2)] : null; };
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;

  function windowOf(r) {
    const now = Date.now(); const d0 = new Date(); d0.setHours(0, 0, 0, 0);
    if (r === 'today') { const a = d0.getTime(); return { a, b: now, pa: a - 864e5, pb: now - 864e5, buckets: 24, unit: 'h' }; }
    const n = r === '7d' ? 7 : 30; const a = d0.getTime() - (n - 1) * 864e5; return { a, b: now, pa: a - n * 864e5, pb: a, buckets: n, unit: 'd' };
  }
  const inRange = (o, a, b) => { const c = created(o); return c >= a && c <= b; };

  /* ---------- KPI strip with sparklines and deltas ---------- */
  function spark(vals) {
    const w = 96, h = 26, mx = Math.max(1, ...vals); const pts = vals.map((v, i) => `${(i / Math.max(1, vals.length - 1) * w).toFixed(1)},${(h - 3 - v / mx * (h - 6)).toFixed(1)}`).join(' ');
    return `<svg class="cc-spark" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  }
  function series(list, W, pick) {
    const out = new Array(W.buckets).fill(0);
    for (const o of list) { const c = created(o); const i = W.unit === 'h' ? new Date(c).getHours() : Math.floor((c - W.a) / 864e5); if (i >= 0 && i < W.buckets) out[i] += pick ? pick(o) : 1; }
    return out;
  }
  function kpis(cur, prev, W) {
    const m = l => ({ req: l.length, quoted: l.filter(o => QUOTED.includes(o.status)).length, booked: l.filter(o => BOOKED.includes(o.status)).length, rev: l.filter(o => BOOKED.includes(o.status)).reduce((a, o) => a + (Number(o.amount_sar) || 0), 0), resp: med(l.map(replyMs)) });
    const c = m(cur), p = m(prev);
    const delta = (a, b, inv) => { if (!b && !a) return ''; if (!b) return `<span class="cc-d up">${t('k_new')}</span>`; const d = Math.round((a - b) / b * 100); if (!d) return `<span class="cc-d">0%</span>`; const good = inv ? d < 0 : d > 0; return `<span class="cc-d ${good ? 'up' : 'down'}">${d > 0 ? '▲' : '▼'} ${Math.abs(d)}%</span>`; };
    const tiles = [
      ['k_req', c.req, delta(c.req, p.req), spark(series(cur, W)), ''],
      ['k_quoted', c.quoted, delta(c.quoted, p.quoted), spark(series(cur.filter(o => QUOTED.includes(o.status)), W)), ''],
      ['k_booked', c.booked, delta(c.booked, p.booked), spark(series(cur.filter(o => BOOKED.includes(o.status)), W)), 'good'],
      ['k_rev', sar(c.rev), delta(c.rev, p.rev), spark(series(cur.filter(o => BOOKED.includes(o.status)), W, o => Number(o.amount_sar) || 0)), 'good'],
      ['k_conv', pct(c.booked, c.req) + '%', delta(pct(c.booked, c.req), pct(p.booked, p.req)), '', ''],
      ['k_resp', dur(c.resp), c.resp != null && p.resp != null ? delta(c.resp, p.resp, true) : '', '', '']
    ];
    return `<div class="cc-kpis">${tiles.map(([l, v, d, s, cls]) => `<div class="cc-k ${cls}"><span class="cc-kl">${t(l)}</span><b class="cc-kv num">${v}</b><div class="cc-kf">${d}${s}</div></div>`).join('')}</div>`;
  }

  /* ---------- Action queue ---------- */
  function queue(all) {
    const open = all.filter(o => !['paid', 'vouchered', 'cancelled'].includes(o.status) && Date.now() - created(o) < 7 * 864e5);
    const late = typeof dspState === 'function' ? open.filter(o => { try { return dspState(o).cls === 'late'; } catch (e) { return false; } }) : [];
    const groups = [['q_staff', open.filter(o => STAFF.includes(o.status)), COL.staff], ['q_fail', open.filter(o => FAIL.includes(o.status)), COL.fail], ['q_pay', open.filter(o => o.status === 'payment_pending'), '#C9962B'], ['q_late', late.filter(o => !STAFF.includes(o.status) && !FAIL.includes(o.status) && Date.now() - created(o) < 864e5), '#7C8A87']];
    const total = groups.reduce((a, g) => a + g[1].length, 0);
    const row = o => `<button class="cc-qi" data-act="lvOpen" data-v="${esc(o.request_id || '')}"><div class="grow"><b>${esc(o.hotel || (dspCityOf(o) ? dspCityName(dspCityOf(o)) : '') || fmtPhone(o.sender))}</b><span>${esc(reqText(o.request_text).split('\n')[0].slice(0, 54))}</span></div><span class="cc-age">${opsTime(o.updated_at)}</span></button>`;
    return `<div class="card cc-queue"><div class="cc-h"><div><b>${t('q_title')}</b><div class="tiny muted">${t('q_sub')}</div></div><span class="cc-badge ${total ? 'hot' : ''}">${total}</span></div>
      ${total ? groups.filter(g => g[1].length).map(([l, list, c]) => `<div class="cc-qg"><div class="cc-qh"><i style="background:${c}"></i>${t(l)} <span class="muted">${list.length}</span></div>
        ${list.sort((a, b) => created(a) - created(b)).slice(0, 4).map(row).join('')}${list.length > 4 ? `<button class="cc-more" data-act="lvGo" data-v="${l === 'q_pay' ? 'active' : 'staff'}">${t('q_more', { n: list.length - 4 })}</button>` : ''}</div>`).join('')
      : `<div class="cc-empty">${ic('check')}<span>${t('q_empty')}</span></div>`}</div>`;
  }

  /* ---------- Charts ---------- */
  function bars(vals, W) {
    const w = 640, h = 170, pad = 22, n = vals.length, mx = Math.max(1, ...vals), bw = (w - pad) / n;
    const now = new Date(); const cur = W.unit === 'h' ? now.getHours() : n - 1;
    const lab = i => W.unit === 'h' ? String(i).padStart(2, '0') : new Date(W.a + i * 864e5).toLocaleDateString(locale(), { day: 'numeric', month: 'short' });
    const every = W.unit === 'h' ? 3 : n > 10 ? 5 : 1;
    const g = [0.5, 1].map(f => `<line x1="${pad}" x2="${w}" y1="${(h - 20 - f * (h - 34)).toFixed(1)}" y2="${(h - 20 - f * (h - 34)).toFixed(1)}" class="cc-grid"/><text x="0" y="${(h - 17 - f * (h - 34)).toFixed(1)}" class="cc-ax">${Math.round(f * mx)}</text>`).join('');
    const b = vals.map((v, i) => { const bh = v / mx * (h - 34); const x = pad + i * bw + 2, y = h - 20 - bh, ww = Math.max(2, bw - 4);
      return `<g class="cc-bar ${i === cur ? 'cur' : ''}" data-tip="${esc(lab(i))} · ${v} ${t('lv_req')}"><rect x="${x - 1}" y="8" width="${ww + 2}" height="${h - 28}" fill="transparent"/>${v ? `<path d="M${x},${h - 20}V${y + 4}q0,-4 4,-4h${ww - 8}q4,0 4,4V${h - 20}z" class="cc-bf"/>` : ''}${i % every === 0 ? `<text x="${x + ww / 2}" y="${h - 4}" text-anchor="middle" class="cc-ax">${lab(i)}</text>` : ''}</g>`; }).join('');
    return `<svg viewBox="0 0 ${w} ${h}" class="cc-chart" role="img" aria-label="${t(W.unit === 'h' ? 'c_hours' : 'c_days')}">${g}<line x1="${pad}" x2="${w}" y1="${h - 20}" y2="${h - 20}" class="cc-base"/>${b}</svg>`;
  }
  function funnel(l) {
    const steps = [['fu_req', l.length], ['fu_quote', l.filter(o => QUOTED.includes(o.status)).length], ['fu_pay', l.filter(o => ['payment_pending', 'hold', 'paid', 'vouchered'].includes(o.status)).length], ['fu_book', l.filter(o => BOOKED.includes(o.status)).length]];
    const mx = Math.max(1, steps[0][1]);
    return `<div class="cc-funnel">${steps.map(([k, v], i) => `<div class="cc-fr" data-tip="${t(k)} · ${v}"><span class="cc-fl">${t(k)}</span><div class="cc-ft"><div class="cc-fb" style="width:${Math.max(v ? 3 : 0, v / mx * 100)}%;opacity:${1 - i * .16}"></div></div><b class="num">${v}</b><span class="cc-fp">${i ? pct(v, steps[0][1]) + '%' : ''}</span></div>`).join('')}</div>`;
  }
  function topList(entries, total) {
    if (!entries.length) return `<p class="muted small">${t('lv_nodata')}</p>`;
    const mx = Math.max(1, ...entries.map(e => e[1]));
    return `<div class="cc-top">${entries.map(([name, n, bk]) => `<div class="cc-tr" data-tip="${esc(name)} · ${n} ${t('lv_req')}${bk ? ' · ' + bk + ' ' + t('lv_bk') : ''}"><span class="cc-tn">${esc(name)}</span><div class="cc-tt"><div style="width:${n / mx * 100}%"></div></div><b class="num">${n}</b></div>`).join('')}</div>`;
  }
  function topDest(l) {
    const m = {}; for (const o of l) { const k = dspCityOf(o); if (!k) continue; const e = m[k] = m[k] || [dspCityName(k), 0, 0]; e[1]++; if (BOOKED.includes(o.status)) e[2]++; }
    return topList(Object.values(m).sort((a, b) => b[1] - a[1]).slice(0, 6));
  }
  function topHotels(l) {
    const m = {}; for (const o of l) { let h = String(o.hotel || '').trim(); if (!h) { const m = reqText(o.request_text).match(/(?:اسم الفندق\s*:?\s*|^)([^\n]*(?:hotel|inn|resort|suites|فندق)[^\n]*)/im); h = m ? m[1].replace(/^\*?\s*/, '').replace(/^فندق\s+/, '').slice(0, 48).trim() : ''; } if (!h) continue; const k = h.toLowerCase(); const e = m[k] = m[k] || [h, 0, 0]; e[1]++; if (BOOKED.includes(o.status)) e[2]++; }
    return topList(Object.values(m).sort((a, b) => b[1] - a[1]).slice(0, 6));
  }
  function team(all) {
    if (typeof DSP_STAFF !== 'function' || !(typeof DSP !== 'undefined')) return `<p class="muted small">${t('st_none')}</p>`;
    const staff = DSP_STAFF(); if (!staff.length) return `<p class="muted small">${t('st_none')}</p>`;
    const open = all.filter(o => !['paid', 'vouchered', 'cancelled'].includes(o.status));
    return `<div class="cc-team">${staff.slice(0, 6).map(s => { const mine = open.filter(o => DSP.rows[o.request_id] && DSP.rows[o.request_id].staff_id === s.id); const acc = mine.filter(o => DSP.rows[o.request_id].accepted_at).length; const late = mine.filter(o => { try { return dspState(o).cls === 'late'; } catch (e) { return false; } }).length;
      return `<div class="cc-tm"><span class="cc-av">${esc((s.name || '?').trim().charAt(0).toUpperCase())}</span><div class="grow"><b>${esc(s.name)}</b><span class="tiny muted">${mine.length} ${t('st_open')} · ${acc} ${t('st_acc')}${late ? ` · <span style="color:${COL.fail}">${late} ${t('st_late')}</span>` : ''}</span></div></div>`; }).join('')}</div>`;
  }
  function health(l) {
    const n = l.length || 1; const auto = l.filter(o => QUOTED.includes(o.status) || o.status === 'cancelled').length; const st = l.filter(o => STAFF.includes(o.status)).length; const fl = l.filter(o => FAIL.includes(o.status)).length;
    const rs = l.map(replyMs).filter(x => x != null).sort((a, b) => a - b); const p90 = rs.length ? rs[Math.min(rs.length - 1, Math.floor(rs.length * .9))] : null;
    const bar = (k, v, c) => `<div class="cc-hr"><span>${t(k)}</span><div class="cc-ht"><div style="width:${pct(v, n)}%;background:${c}"></div></div><b class="num">${pct(v, n)}%</b></div>`;
    return `<div class="cc-health">${bar('h_auto', auto, COL.active)}${bar('h_staff', st, COL.staff)}${bar('h_fail', fl, COL.fail)}
      <div class="cc-hs"><div><span>${t('h_resp')}</span><b class="num">${dur(med(rs))}</b></div><div><span>${t('h_p90')}</span><b class="num">${dur(p90)}</b></div></div></div>`;
  }
  function latest(l) {
    const list = l.slice().sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at))).slice(0, 8);
    if (!list.length) return `<p class="muted small">${t('lv_none')}</p>`;
    return list.map(o => `<button class="cc-li" data-act="lvOpen" data-v="${esc(o.request_id || '')}"><i style="background:${isNew(o) ? COL.fresh : COL[kindOf(o)]}"></i><div class="grow"><b>${esc(o.hotel || (dspCityOf(o) ? dspCityName(dspCityOf(o)) : '') || fmtPhone(o.sender))}</b><span>${esc(reqText(o.request_text).split('\n')[0].slice(0, 60))}</span></div><div class="cc-lm">${opsPill(o.status)}<span>${opsTime(o.updated_at)}</span></div></button>`).join('');
  }

  /* ---------- Body ---------- */
  function body() {
    if (!OPS.data && OPS.err) return `<div class="warn-box">${ic('alert', 'sm')} ${t('ordersErr_generic')}</div>`;
    const all = opsOrders(); const W = windowOf(LV.range);
    const cur = all.filter(o => inRange(o, W.a, W.b)), prev = all.filter(o => inRange(o, W.pa, W.pb));
    const fresh = all.filter(isNew).length;
    return `${kpis(cur, prev, W)}
    <div class="cc-hero">
      <div class="cc-mapcard"><div id="lv-map"></div>
        <div class="cc-ov cc-ov-tl"><span class="cc-live"><i></i>${t('lv_live')}</span><span>${t('lv_last30', { n: fresh })}</span><span class="muted-l">${t('lv_upd', { t: OPS.at ? new Date(OPS.at).toLocaleTimeString(locale(), { hour: 'numeric', minute: '2-digit' }) : '—' })}</span></div>
        <div class="cc-ov cc-ov-tr">${['all', 'staff', 'active', 'booked'].map(f => `<button class="${LV.f === f ? 'on' : ''}" data-act="lvF" data-v="${f}">${t('f_' + f)}</button>`).join('')}</div>
        <div class="cc-ov cc-ov-br"><button class="${LV.style === 'dark' ? 'on' : ''}" data-act="lvStyle" data-v="dark">${t('m_dark')}</button><button class="${LV.style === 'sat' ? 'on' : ''}" data-act="lvStyle" data-v="sat">${t('m_sat')}</button><button class="${LV.routes ? 'on' : ''}" data-act="lvRoutes">${t('m_routes')}</button></div>
        <div class="cc-ov cc-ov-bl">${[['fresh', 'leg_new'], ['staff', 'leg_staff'], ['fail', 'leg_fail'], ['active', 'leg_active'], ['booked', 'leg_booked']].map(([c, l]) => `<span><i style="background:${COL[c]}"></i>${t(l)}</span>`).join('')}</div>
      </div>
      ${queue(all)}
    </div>
    <div class="cc-row2">
      <div class="card cc-card"><div class="cc-h"><b>${t(W.unit === 'h' ? 'c_hours' : 'c_days')}</b><span class="tiny muted">${cur.length} ${t('lv_req')}</span></div>${bars(series(cur, W), W)}</div>
      <div class="card cc-card"><div class="cc-h"><b>${t('c_funnel')}</b></div>${funnel(cur)}</div>
    </div>
    <div class="cc-row4">
      <div class="card cc-card"><div class="cc-h"><b>${t('c_dest')}</b></div>${topDest(cur)}</div>
      <div class="card cc-card"><div class="cc-h"><b>${t('c_hotels')}</b></div>${topHotels(cur)}</div>
      <div class="card cc-card"><div class="cc-h"><b>${t('c_health')}</b></div>${health(cur)}</div>
      <div class="card cc-card"><div class="cc-h"><b>${t('c_staff')}</b><button class="btn sm ghost" data-act="go" data-v="team">${ic('plus', 'sm')}</button></div>${team(all)}</div>
    </div>
    <div class="card cc-card"><div class="cc-h"><b>${t('c_latest')}</b><button class="btn sm" data-act="go" data-v="orders">${t('lv_all')}</button></div><div class="cc-latest">${latest(cur.length ? cur : all)}</div></div>`;
  }

  /* ---------- Map ---------- */
  const CC = { '966': [24.2, 44.5], '971': [24.3, 54.4], '965': [29.3, 47.7], '974': [25.3, 51.2], '973': [26.1, 50.55], '968': [21.5, 57], '20': [27, 30.5], '962': [31, 36.4], '961': [33.9, 35.8], '964': [33, 43.7], '963': [35, 38.5], '967': [15.6, 48], '249': [15.5, 30], '218': [27, 17], '216': [34, 9.5], '213': [28, 2.6], '212': [31.8, -7], '90': [39, 35], '44': [53.5, -1.8], '1': [39, -98], '55': [-10, -52], '49': [51, 10], '33': [46.5, 2.5], '39': [42.8, 12.5], '34': [40.2, -3.6], '92': [30, 70], '91': [21, 78], '880': [23.7, 90.3], '60': [4.2, 101.9], '62': [-2.5, 118], '63': [12.8, 122], '7': [56, 38], '995': [42.2, 43.5], '994': [40.3, 47.7], '86': [35, 104], '27': [-29, 25] };
  const ccOf = s => { const d = String(s || ''); for (const n of [3, 2, 1]) { const p = d.slice(0, n); if (CC[p]) return CC[p]; } return null; };
  function arc(a, b) { const [la1, lo1] = a, [la2, lo2] = b; const mx = (la1 + la2) / 2, my = (lo1 + lo2) / 2; const dx = la2 - la1, dy = lo2 - lo1; const k = .22; const cx = mx - dy * k, cy = my + dx * k; const pts = []; for (let i = 0; i <= 24; i++) { const t2 = i / 24, u = 1 - t2; pts.push([u * u * la1 + 2 * u * t2 * cx + t2 * t2 * la2, u * u * lo1 + 2 * u * t2 * cy + t2 * t2 * lo2]); } return pts; }
  function setBase() {
    const LL = window.LeafletLib; if (!LV.map) return; if (LV.base) LV.base.forEach(l => LV.map.removeLayer(l));
    LV.base = LV.style === 'sat'
      ? [LL.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: 'Imagery © Esri' }), LL.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, opacity: .8 })]
      : [LL.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16, attribution: 'Tiles © Esri' }), LL.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16, opacity: .9 })];
    LV.base.forEach(l => l.addTo(LV.map).bringToBack());
  }
  function draw() {
    const el = document.getElementById('lv-map'); const LL = window.LeafletLib; if (!el || !LL) return;
    if (!LV.map || LV.map.getContainer() !== el) {
      LV.map = LL.map(el, { zoomControl: false, attributionControl: true, worldCopyJump: true, scrollWheelZoom: true, minZoom: 2 }).setView([25, 45], 3);
      LL.control.zoom({ position: L() === 'ar' ? 'topleft' : 'topright' }).addTo(LV.map);
      LV.base = null; setBase(); LV.layer = LL.layerGroup().addTo(LV.map); LV.fitted = false;
    }
    LV.layer.clearLayers();
    const W = windowOf(LV.range);
    let list = opsOrders().filter(o => inRange(o, W.a, W.b) || isNew(o) || (LV.range === 'today' && !['paid', 'vouchered', 'cancelled'].includes(o.status) && STAFF.concat(FAIL).includes(o.status)));
    if (LV.f === 'staff') list = list.filter(o => STAFF.includes(o.status) || FAIL.includes(o.status)); else if (LV.f === 'active') list = list.filter(o => OPS_GROUPS.active.includes(o.status)); else if (LV.f === 'booked') list = list.filter(o => BOOKED.includes(o.status));
    const groups = {}; const pts = [];
    for (const o of list) { const k = dspCityOf(o); const c = DSP_CITIES[k]; if (!c) continue; const g = groups[k] = groups[k] || { c, k, list: [] }; g.list.push(o); }
    if (LV.routes) for (const g of Object.values(groups)) for (const o of g.list.slice(0, 25)) { const from = ccOf(o.sender); if (!from) continue; const k = kindOf(o); LL.polyline(arc(from, g.c), { color: isNew(o) ? COL.fresh : COL[k], weight: isNew(o) ? 2.4 : 1.4, opacity: isNew(o) ? .9 : .45, dashArray: isNew(o) ? '6 6' : null, className: isNew(o) ? 'cc-flow' : '', interactive: false }).addTo(LV.layer); LL.circleMarker(from, { radius: 3, color: '#fff', weight: 1, fillColor: '#9fb3b0', fillOpacity: .9, interactive: false }).addTo(LV.layer); }
    for (const g of Object.values(groups)) {
      const n = g.list.length, fresh = g.list.some(isNew), staff = g.list.some(o => STAFF.includes(o.status)), fail = g.list.some(o => FAIL.includes(o.status)), booked = g.list.filter(o => BOOKED.includes(o.status)).length;
      const col = staff ? COL.staff : fail ? COL.fail : fresh ? COL.fresh : booked === n ? COL.booked : COL.active;
      const r = Math.min(34, 12 + Math.sqrt(n) * 5);
      const icon = LL.divIcon({ className: '', html: `<div class="cc-pin ${fresh ? 'fresh' : ''}" style="--c:${col};width:${r * 2}px;height:${r * 2}px"><span>${n}</span></div>`, iconSize: [r * 2, r * 2], iconAnchor: [r, r] });
      const pop = `<div class="cc-pop"><b>${esc(dspCityName(g.k))}</b><div class="cc-popk"><span>${n} ${t('lv_req')}</span><span>${booked} ${t('lv_bk')}</span></div>${g.list.slice(0, 6).map(o => `<a role="button" tabindex="0" style="cursor:pointer" data-act="lvOpen" data-v="${esc(o.request_id || '')}"><span>${esc(o.hotel || reqText(o.request_text).split('\n')[0].slice(0, 38))}</span> ${opsPill(o.status)}</a>`).join('')}</div>`;
      LL.marker(g.c, { icon, riseOnHover: true }).bindPopup(pop, { maxWidth: 320, className: 'cc-popup' }).bindTooltip(`${esc(dspCityName(g.k))} · ${n}`, { direction: 'top', offset: [0, -r] }).addTo(LV.layer);
      pts.push(g.c);
    }
    if (!LV.fitted) { if (pts.length > 1) LV.map.fitBounds(LL.latLngBounds(pts).pad(.35), { maxZoom: 4 }); else LV.map.setView(pts[0] ? [(pts[0][0] + 25) / 2, (pts[0][1] + 45) / 2] : [25, 45], 3); LV.fitted = true; }
    setTimeout(() => LV.map && LV.map.invalidateSize(), 60);
  }
  function paint() { const b = document.getElementById('lv-body'); if (!b) return; b.innerHTML = body(); setTimeout(draw, 0); }

  /* ---------- Tooltip for charts ---------- */
  let tip = null;
  document.addEventListener('mouseover', e => { const el = e.target.closest && e.target.closest('[data-tip]'); if (!el || !el.closest('#lv-body')) { if (tip) tip.style.opacity = 0; return; } if (!tip) { tip = document.createElement('div'); tip.className = 'cc-tip'; document.body.appendChild(tip); } tip.textContent = el.dataset.tip; tip.style.opacity = 1; });
  document.addEventListener('mousemove', e => { if (tip && tip.style.opacity === '1') { tip.style.left = (e.clientX + 12) + 'px'; tip.style.top = (e.clientY - 34) + 'px'; } });

  function vLive() {
    if (!(Cloud.on && typeof opsLoad === 'function')) return vDashboard();
    clearInterval(LV.timer); LV.map = null;
    LV.timer = setInterval(async () => { if (S.ui.view !== 'dashboard') return clearInterval(LV.timer); if (document.hidden) return; await opsLoad(true); paint(); }, 30000);
    (async () => { await opsLoad(); if (typeof dspTeam === 'function' && (typeof DSP !== 'undefined') && !DSP.team) { try { await dspTeam(); } catch (e) { } } if (typeof dspLoad === 'function' && (typeof DSP !== 'undefined') && !DSP.loaded) { try { await dspLoad(); } catch (e) { } } paint(); })();
    return `<div class="head cc-head"><div><h1>${t('lv_title')}</h1><p>${t('lv_sub')}</p></div>
      <div class="row" style="gap:8px;flex-wrap:wrap"><div class="cc-seg">${['today', '7d', '30d'].map(r => `<button class="${LV.range === r ? 'on' : ''}" data-act="lvRange" data-v="${r}">${t(r === 'today' ? 'lv_r_today' : r === '7d' ? 'lv_r_7' : 'lv_r_30')}</button>`).join('')}</div>
      <button class="btn" data-act="go" data-v="reports">${ic('trend', 'sm')} ${t('nav_reports')}</button><button class="btn icon-only" data-act="lvRefresh" aria-label="${t('refresh')}">${ic('refresh', 'sm')}</button></div></div>
      <div id="lv-body">${OPS.data ? body() : `<div class="card"><p class="muted">${t('ordersLoading')}</p></div>`}</div>`;
  }
  window.EXTRA_VIEWS = window.EXTRA_VIEWS || {};
  window.EXTRA_VIEWS.dashboard = vLive;
  window.EXTRA_VIEWS.reports = () => vDashboard();
  if (OPS.data) setTimeout(() => { if (S.ui.view === 'dashboard') paint(); }, 0);

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
    lvOpen: el => { const id = el.dataset.v || ''; if (id && opsOrders().some(o => o.request_id === id)) { opsOpen(id); if (LV.map) LV.map.closePopup(); return; } OPS.q = id; if (LV.map) LV.map.closePopup(); go('orders'); },
    lvGo: el => { OPS.f = el.dataset.v || 'all'; go('orders'); },
    lvRange: el => { LV.range = el.dataset.v; LV.fitted = false; document.querySelectorAll('.cc-seg button').forEach(b => b.classList.toggle('on', b.dataset.v === LV.range)); paint(); },
    lvF: el => { LV.f = el.dataset.v; LV.fitted = false; paint(); },
    lvStyle: el => { LV.style = el.dataset.v; setBase(); document.querySelectorAll('.cc-ov-br [data-act=lvStyle]').forEach(b => b.classList.toggle('on', b.dataset.v === LV.style)); },
    lvRoutes: () => { LV.routes = !LV.routes; paint(); }
  });

  const css = document.createElement('style');
  css.textContent = `
  .cc-seg{display:inline-flex;background:var(--surface-2,#eef1f0);border:1px solid var(--line);border-radius:999px;padding:3px}
  .cc-seg button{all:unset;cursor:pointer;padding:6px 14px;border-radius:999px;font-size:13px;color:var(--muted)}
  .cc-seg button.on{background:var(--surface);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.12);font-weight:600}
  .cc-kpis{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;margin-bottom:14px}
  .cc-k{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px 16px 12px;display:flex;flex-direction:column;gap:4px;min-width:0}
  .cc-kl{font-size:12.5px;color:var(--muted)}.cc-kv{font-size:26px;line-height:1.15;font-weight:700;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cc-k.good .cc-kv{color:var(--good,#1E8A4C)}
  .cc-kf{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:26px}
  .cc-spark{width:96px;height:26px;color:var(--brand,#0E7C74);opacity:.85;flex:none}
  .cc-d{font-size:12px;font-weight:600;color:var(--muted);white-space:nowrap}.cc-d.up{color:var(--good,#1E8A4C)}.cc-d.down{color:var(--bad,#BF3D37)}
  .cc-hero{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:14px;align-items:stretch;margin-bottom:14px}
  .cc-mapcard{position:relative;border-radius:18px;overflow:hidden;border:1px solid #1b2a28;box-shadow:0 14px 40px rgba(8,20,18,.28);min-height:520px;background:#0b1513}
  #lv-map{position:absolute;inset:0;background:#0b1513}
  .cc-ov{position:absolute;z-index:500;display:flex;gap:6px;align-items:center;flex-wrap:wrap}
  .cc-ov-tl{top:12px;inset-inline-start:12px;background:rgba(10,20,19,.78);backdrop-filter:blur(8px);color:#e6eeec;border-radius:12px;padding:8px 12px;font-size:12.5px;gap:12px;border:1px solid rgba(255,255,255,.08)}
  .cc-ov-tl .muted-l{color:#93a4a0}
  .cc-live{display:inline-flex;align-items:center;gap:6px;font-weight:700;color:#7fe0d4}.cc-live i{width:8px;height:8px;border-radius:50%;background:#2fd1bf;box-shadow:0 0 0 0 rgba(47,209,191,.7);animation:ccPing 1.8s infinite}
  @keyframes ccPing{0%{box-shadow:0 0 0 0 rgba(47,209,191,.7)}100%{box-shadow:0 0 0 10px rgba(47,209,191,0)}}
  .cc-ov-tr{top:12px;inset-inline-end:56px}.cc-ov-br{bottom:28px;inset-inline-end:12px}
  .cc-ov-tr button,.cc-ov-br button{all:unset;cursor:pointer;background:rgba(10,20,19,.78);backdrop-filter:blur(8px);color:#cfdcd9;border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:6px 12px;font-size:12.5px}
  .cc-ov-tr button.on,.cc-ov-br button.on{background:#e6eeec;color:#0b1513;font-weight:600}
  .cc-ov-tr button:focus-visible,.cc-ov-br button:focus-visible{outline:2px solid #2fd1bf}
  .cc-ov-bl{bottom:28px;inset-inline-start:12px;background:rgba(10,20,19,.78);backdrop-filter:blur(8px);color:#e6eeec;border-radius:12px;padding:8px 12px;font-size:12px;gap:12px;border:1px solid rgba(255,255,255,.08)}
  .cc-ov-bl span{display:flex;align-items:center;gap:6px}.cc-ov-bl i{width:10px;height:10px;border-radius:50%;box-shadow:0 0 0 2px rgba(255,255,255,.85)}
  .cc-pin{border-radius:50%;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--c) 70%,#fff),var(--c) 62%);border:2px solid rgba(255,255,255,.95);box-shadow:0 0 0 6px color-mix(in srgb,var(--c) 22%,transparent),0 6px 18px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;color:#fff;font:700 13px/1 system-ui,sans-serif;position:relative;text-shadow:0 1px 2px rgba(0,0,0,.4)}
  .cc-pin.fresh::before,.cc-pin.fresh::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:2px solid var(--c);animation:ccPulse 2s ease-out infinite}
  .cc-pin.fresh::after{animation-delay:1s}
  @keyframes ccPulse{0%{transform:scale(.8);opacity:1}100%{transform:scale(2.2);opacity:0}}
  .cc-flow{animation:ccDash 1.2s linear infinite}@keyframes ccDash{to{stroke-dashoffset:-24}}
  @media (prefers-reduced-motion:reduce){.cc-pin.fresh::before,.cc-pin.fresh::after,.cc-flow,.cc-live i{animation:none}}
  .cc-popup .leaflet-popup-content-wrapper{border-radius:14px}
  .cc-pop b{display:block;font-size:15px;margin-bottom:4px}.cc-popk{display:flex;gap:12px;font-size:12px;color:#5b6a67;margin-bottom:6px}
  .cc-pop a{display:flex;justify-content:space-between;gap:10px;font-size:12px;margin:4px 0;color:inherit;text-decoration:none}.cc-pop a:hover span:first-child{text-decoration:underline}
  .cc-queue{display:flex;flex-direction:column;padding:14px;max-height:560px;overflow:auto}
  .cc-h{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}
  .cc-badge{min-width:28px;height:28px;border-radius:999px;display:grid;place-items:center;background:var(--surface-2,#eef1f0);font-weight:700;font-size:13px;padding:0 8px}.cc-badge.hot{background:#E07B2A;color:#fff}
  .cc-qg{margin-top:6px}.cc-qh{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;margin:8px 0 6px}.cc-qh i{width:9px;height:9px;border-radius:50%}
  .cc-qi,.cc-li{all:unset;cursor:pointer;display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;border:1px solid var(--line);background:var(--surface);margin-bottom:6px;box-sizing:border-box;width:100%}
  .cc-qi:hover,.cc-li:hover{border-color:var(--brand,#0E7C74)}.cc-qi:focus-visible,.cc-li:focus-visible{outline:2px solid var(--brand,#0E7C74)}
  .cc-qi .grow,.cc-li .grow{min-width:0;display:flex;flex-direction:column}
  .cc-qi b,.cc-li b{font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cc-qi span,.cc-li .grow span{font-size:12px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cc-age{font-size:11px;color:var(--muted);white-space:nowrap}
  .cc-more{all:unset;cursor:pointer;font-size:12px;color:var(--brand,#0E7C74);padding:2px 4px}
  .cc-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;color:var(--muted);font-size:13.5px;padding:30px 10px}
  .cc-empty svg{width:34px;height:34px;color:var(--good,#1E8A4C)}
  .cc-row2{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:14px;margin-bottom:14px}
  .cc-row4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:14px}
  .cc-card{padding:14px 16px}
  .cc-chart{width:100%;height:auto;display:block}
  .cc-grid{stroke:var(--line);stroke-width:1;stroke-dasharray:2 4}.cc-base{stroke:var(--line);stroke-width:1}
  .cc-ax{font-size:10px;fill:var(--muted)}
  .cc-bf{fill:var(--brand,#0E7C74);opacity:.55}.cc-bar.cur .cc-bf{opacity:1}.cc-bar:hover .cc-bf{opacity:1}
  .cc-funnel{display:flex;flex-direction:column;gap:12px;margin-top:6px}
  .cc-fr{display:grid;grid-template-columns:92px 1fr 44px 40px;align-items:center;gap:10px;font-size:13px}
  .cc-ft,.cc-tt,.cc-ht{height:12px;background:var(--surface-2,#eef1f0);border-radius:999px;overflow:hidden}
  .cc-fb{height:100%;background:var(--brand,#0E7C74);border-radius:999px}
  .cc-fl{color:var(--muted)}.cc-fp{font-size:12px;color:var(--muted);text-align:end}
  .cc-top{display:flex;flex-direction:column;gap:9px}
  .cc-tr{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr) 30px;align-items:center;gap:8px;font-size:12.5px}
  .cc-tn{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cc-tt div{height:100%;background:var(--brand,#0E7C74);border-radius:999px}
  .cc-tr b,.cc-fr b,.cc-hr b{text-align:end}
  .cc-health{display:flex;flex-direction:column;gap:9px}
  .cc-hr{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr) 40px;align-items:center;gap:8px;font-size:12.5px}.cc-ht div{height:100%;border-radius:999px}
  .cc-hs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px}.cc-hs div{background:var(--surface-2,#eef1f0);border-radius:12px;padding:8px 10px;display:flex;flex-direction:column}.cc-hs span{font-size:11.5px;color:var(--muted)}.cc-hs b{font-size:18px}
  .cc-team{display:flex;flex-direction:column;gap:8px}.cc-tm{display:flex;align-items:center;gap:10px}.cc-tm .grow{min-width:0;display:flex;flex-direction:column}.cc-tm b{font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cc-av{width:30px;height:30px;border-radius:50%;background:var(--brand-soft,#E3F2F0);color:var(--brand-ink,#0A5852);display:grid;place-items:center;font-weight:700;font-size:13px;flex:none}
  .cc-latest{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 12px}
  .cc-li>i{width:10px;height:10px;border-radius:50%;flex:none}.cc-lm{display:flex;flex-direction:column;align-items:flex-end;gap:3px;font-size:11px;color:var(--muted)}
  .cc-tip{position:fixed;z-index:9999;pointer-events:none;background:#13201E;color:#fff;font-size:12px;padding:6px 10px;border-radius:8px;opacity:0;transition:opacity .12s;white-space:nowrap;box-shadow:0 6px 18px rgba(0,0,0,.25)}
  @media (max-width:1280px){.cc-kpis{grid-template-columns:repeat(3,minmax(0,1fr))}.cc-row4{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:1000px){.cc-hero,.cc-row2{grid-template-columns:1fr}.cc-mapcard{min-height:420px}.cc-queue{max-height:none}.cc-latest{grid-template-columns:1fr}}
  @media (max-width:640px){.cc-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.cc-row4{grid-template-columns:1fr}.cc-ov-tr{top:auto;bottom:70px;inset-inline-end:12px}}`;
  document.head.appendChild(css);
  try { if (Cloud.on && document.querySelector('#side')) { renderShell(); route(); } } catch (e) { }
})();
