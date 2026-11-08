/* ---------- Wejha: LuxeCheck operations console pages inside Orders + classic look ---------- */
(function () {
  const AR = {
    oc_tab_list: ['Orders', 'الطلبات'], oc_tab_issues: ['Payment & booking issues', 'مشاكل الدفع والحجز'], oc_tab_reports: ['Reports', 'التقارير'],
    oc_tab_quality: ['Assistant quality', 'جودة المساعد'], oc_tab_health: ['Connection status', 'حالة الاتصال'], oc_export: ['Export CSV', 'تصدير CSV'],
    oc_classic: ['Classic look', 'المظهر الكلاسيكي'], oc_period: ['Period', 'الفترة'], oc_p7: ['7 days', '7 أيام'], oc_p30: ['30 days', '30 يوم'], oc_pall: ['All time', 'كل الوقت'],
    oc_requests: ['Requests', 'الطلبات'], oc_quoted: ['Got a quote', 'وصلهم عرض'], oc_link: ['Got a payment link', 'وصلهم لينك دفع'], oc_paid: ['Paid', 'مدفوع'],
    oc_revenue: ['Paid amount', 'المبلغ المدفوع'], oc_conv: ['Request → paid', 'من الطلب للدفع'], oc_funnel: ['Booking funnel', 'مسار الحجز'], oc_daily: ['Requests per day', 'الطلبات يومياً'],
    oc_cities: ['Top cities', 'أكثر المدن طلباً'], oc_hotels: ['Top hotels', 'أكثر الفنادق طلباً'], oc_none: ['Nothing here.', 'لا يوجد شيء هنا.'],
    oc_issuesSub: ['Requests stuck at payment or booking, or that the assistant could not finish. Open one to take over.', 'طلبات متوقفة عند الدفع أو الحجز أو ما قدر المساعد يكملها. افتح الطلب لتتولاه.'],
    oc_why: ['Why', 'السبب'], oc_why_staff: ['Needs staff', 'يحتاج موظف'], oc_why_payold: ['Payment link not paid for 30+ min', 'لينك الدفع ما اتدفعش من أكثر من 30 دقيقة'],
    oc_why_fail: ['Assistant could not finish', 'المساعد ما قدر يكمل'], oc_why_search: ['Stuck while confirming rate', 'متوقف عند تأكيد السعر'],
    oc_handoff: ['Needed staff', 'احتاجت موظف'], oc_handRate: ['Handoff rate', 'نسبة التحويل لموظف'], oc_reasons: ['Most common reasons', 'أكثر الأسباب'],
    oc_avgSteps: ['Messages per request', 'رسائل لكل طلب'], oc_lastSync: ['Last update from the assistant', 'آخر تحديث من المساعد'], oc_source: ['Data source', 'مصدر البيانات'],
    oc_ok: ['Working', 'شغال'], oc_stale: ['No update for a while', 'لا تحديث منذ فترة'], oc_down: ['Not reachable', 'غير متاح'],
    oc_parts: ['Parts of the system', 'أجزاء النظام'], oc_part_wa: ['WhatsApp agent (n8n)', 'وكيل واتساب (n8n)'], oc_part_db: ['Wejha database', 'قاعدة بيانات وجهة'], oc_part_bridge: ['Orders bridge', 'جسر الطلبات']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }

  /* classic look (old LuxeCheck operations dashboard) */
  const css = document.createElement('style');
  css.textContent = `
  html[data-skin="classic"]{--bg:#faf9f6;--surface:#ffffff;--surface-2:#f2f0ea;--ink:#192b39;--muted:#6f7a80;--line:#e8e7e1;--accent:#b7975c;--good:#28745c}
  html[data-skin="classic"] .side{background:#101f2c;border-color:#101f2c;color:#e9e4d8}
  html[data-skin="classic"] .side .agency span,html[data-skin="classic"] .side .muted,html[data-skin="classic"] .side .small{color:#9aa6ae}
  html[data-skin="classic"] .nav button{color:#c9cfd3}
  html[data-skin="classic"] .nav button:hover{background:rgb(255 255 255 / .06);color:#fff}
  html[data-skin="classic"] .nav button.on{background:rgb(183 151 92 / .16);color:#e7cf9e;box-shadow:inset -3px 0 0 #b7975c}
  html[data-skin="classic"][dir="ltr"] .nav button.on{box-shadow:inset 3px 0 0 #b7975c}
  html[data-skin="classic"] .nav .count{background:rgb(255 255 255 / .1);color:#e9e4d8}
  html[data-skin="classic"] .side .btn{background:transparent;border-color:rgb(255 255 255 / .18);color:#e9e4d8}
  html[data-skin="classic"] .head h1{font-family:Georgia,'Times New Roman',var(--f-body);font-weight:600}
  html[data-skin="classic"][dir="rtl"] .head h1{font-family:var(--f-body)}
  html[data-skin="classic"] .head p{color:#7b858b}
  html[data-skin="classic"] .card{border-color:#e8e7e1;box-shadow:none}
  html[data-skin="classic"] .grid.g4>.card.tile:first-child{background:#101f2c;color:#fff;border-color:#101f2c}
  html[data-skin="classic"] .grid.g4>.card.tile:first-child .k,html[data-skin="classic"] .grid.g4>.card.tile:first-child .d{color:#b9c2c8}
  html[data-skin="classic"] .tile .k{text-transform:none;letter-spacing:.02em}
  html[data-skin="classic"] .chip.on{background:#101f2c;color:#fff;border-color:#101f2c}
  .oc-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 14px}
  .oc-tabs button{all:unset;cursor:pointer;padding:8px 14px;border-radius:999px;border:1px solid var(--line);background:var(--surface);font-weight:500;font-size:13px}
  .oc-tabs button.on{background:var(--ink);color:var(--surface);border-color:var(--ink)}
  .oc-tabs button:focus-visible{outline:2px solid var(--brand)}
  .oc-bar{height:10px;border-radius:6px;background:var(--surface-2);overflow:hidden}.oc-bar>i{display:block;height:100%;background:var(--brand)}
  .oc-days{display:flex;align-items:flex-end;gap:4px;height:120px;padding-top:6px}
  .oc-days>div{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0}
  .oc-days>div>i{display:block;width:100%;max-width:26px;background:var(--brand);border-radius:4px 4px 0 0;min-height:2px}
  .oc-days small{font-size:10px;color:var(--muted)}
  .oc-dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-inline-end:6px;vertical-align:middle}`;
  document.head.appendChild(css);
  const applySkin = () => { try { document.documentElement.dataset.skin = (S && S.brand && S.brand.theme === 'classic') ? 'classic' : ''; } catch (e) { } };
  applySkin();
  const _applyBrand = window.applyBrand;
  if (typeof applyBrand === 'function') { try { const orig = applyBrand; window.applyBrand = function () { const r = orig.apply(this, arguments); applySkin(); return r; }; } catch (e) { } }

  /* data helpers */
  const OC = { tab: 'list', period: 30 };
  const inPeriod = o => OC.period === 0 || (Date.now() - new Date(o.updated_at)) < OC.period * 864e5;
  const sar = n => (L() === 'ar' ? `${Math.round(n).toLocaleString('en-US')} ر.س` : `SAR ${Math.round(n).toLocaleString('en-US')}`);
  const pct = (a, b) => b ? Math.round(a * 100 / b) + '%' : '—';
  const top = (arr, f, n = 6) => { const m = {}; arr.forEach(o => { const k = String(f(o) || '').trim(); if (k) m[k] = (m[k] || 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n); };
  const reasonOf = o => {
    const r = String(o.last_reply || '');
    if (/مسؤولي الحجوزات|مجموعة|group/i.test(r)) return L() === 'ar' ? 'طلب مجموعة' : 'Group request';
    if (/الدفع|payment/i.test(r)) return L() === 'ar' ? 'مشكلة في الدفع' : 'Payment problem';
    if (/فهم|understood|صياغ/i.test(r)) return L() === 'ar' ? 'ما فهم الطلب' : 'Did not understand';
    if (/البحث|search/i.test(r)) return L() === 'ar' ? 'تعذّر البحث' : 'Search failed';
    if (/مطابق|match/i.test(r)) return L() === 'ar' ? 'السعر أو الفندق اتغير' : 'Rate or hotel changed';
    return L() === 'ar' ? 'أخرى' : 'Other';
  };
  const whyOf = o => {
    if (o.status === 'failed') return t('oc_why_fail');
    if (o.status === 'human_review') return t('oc_why_staff') + ' · ' + reasonOf(o);
    if (o.status === 'payment_pending' && Date.now() - new Date(o.updated_at) > 30 * 60e3) return t('oc_why_payold');
    if (o.status === 'searching' && Date.now() - new Date(o.updated_at) > 15 * 60e3) return t('oc_why_search');
    return '';
  };

  function tabs() {
    const items = ['list', 'issues', 'reports', 'quality', 'health'];
    const issues = opsOrders().filter(whyOf).length;
    return `<div class="oc-tabs" role="tablist">${items.map(k => `<button role="tab" aria-selected="${OC.tab === k}" class="${OC.tab === k ? 'on' : ''}" data-act="ocTab" data-v="${k}">${t('oc_tab_' + k)}${k === 'issues' && issues ? ` · ${issues}` : ''}</button>`).join('')}
      <button data-act="ocExport">${ic('download', 'sm')} ${t('oc_export')}</button>
      ${can('brand') ? `<button data-act="ocSkin" aria-pressed="${S.brand.theme === 'classic'}" class="${S.brand.theme === 'classic' ? 'on' : ''}">${t('oc_classic')}</button>` : ''}</div>`;
  }
  const periodChips = () => `<div class="chips">${[[7, 'oc_p7'], [30, 'oc_p30'], [0, 'oc_pall']].map(([v, k]) => `<button class="chip ${OC.period === v ? 'on' : ''}" data-act="ocPeriod" data-v="${v}">${t(k)}</button>`).join('')}</div>`;

  function vIssues() {
    const rows = opsOrders().filter(whyOf).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return `<div class="card" style="padding:12px 14px"><p class="small muted" style="margin-bottom:10px">${t('oc_issuesSub')}</p>
      ${rows.length ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('oc_customer')}</th><th>${t('oc_request')}</th><th>${t('oc_why')}</th><th>${t('oc_amount')}</th><th>${t('oc_updated')}</th></tr></thead><tbody>
      ${rows.map(o => `<tr class="click row-alert" data-act="opsOpen" data-id="${esc(o.request_id)}" tabindex="0"><td dir="ltr" style="text-align:start">${fmtPhone(o.sender)}</td><td><b>${esc(o.hotel || o.city || '—')}</b><div class="small muted">${esc(String(o.request_text || '').slice(0, 70))}</div></td><td class="small">${esc(whyOf(o))}</td><td class="small">${o.amount_sar ? sar(o.amount_sar) : '—'}</td><td class="small">${opsTime(o.updated_at)}</td></tr>`).join('')}
      </tbody></table></div>` : `<p class="muted">${t('oc_none')}</p>`}</div>`;
  }
  function vReports() {
    const all = opsOrders().filter(inPeriod);
    const quoted = all.filter(o => ['quoted', 'searching', 'payment_pending', 'paid', 'vouchered'].includes(o.status) || /نتائج بحث|search results/i.test(o.last_reply || '')).length;
    const link = all.filter(o => ['payment_pending', 'paid', 'vouchered'].includes(o.status) || o.trip_id).length;
    const paidL = all.filter(o => ['paid', 'vouchered'].includes(o.status));
    const rev = paidL.reduce((a, o) => a + (Number(o.amount_sar) || 0), 0);
    const f = [['oc_requests', all.length], ['oc_quoted', quoted], ['oc_link', link], ['oc_paid', paidL.length]];
    const days = []; for (let i = 13; i >= 0; i--) { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i); days.push(d); }
    const perDay = days.map(d => opsOrders().filter(o => { const u = new Date(o.updated_at); return u >= d && u < new Date(d.getTime() + 864e5); }).length);
    const mx = Math.max(1, ...perDay);
    const list = (rows) => rows.length ? rows.map(([k, v]) => `<div class="row between small" style="padding:6px 0;border-bottom:1px solid var(--line)"><span>${esc(k)}</span><b>${v}</b></div>`).join('') : `<p class="muted small">${t('oc_none')}</p>`;
    return `<div class="row between" style="margin-bottom:12px;flex-wrap:wrap;gap:10px"><b>${t('oc_period')}</b>${periodChips()}</div>
    <div class="grid g4">
      <div class="card tile"><span class="k">${t('oc_requests')}</span><span class="v">${all.length}</span></div>
      <div class="card tile"><span class="k">${t('oc_paid')}</span><span class="v">${paidL.length}</span></div>
      <div class="card tile"><span class="k">${t('oc_revenue')}</span><span class="v">${sar(rev)}</span></div>
      <div class="card tile"><span class="k">${t('oc_conv')}</span><span class="v">${pct(paidL.length, all.length)}</span></div>
    </div>
    <div class="grid g2">
      <div class="card"><h2 style="margin-bottom:12px">${t('oc_funnel')}</h2>${f.map(([k, v]) => `<div style="margin-bottom:10px"><div class="row between small"><span>${t(k)}</span><b>${v} · ${pct(v, all.length)}</b></div><div class="oc-bar"><i style="width:${all.length ? Math.round(v * 100 / all.length) : 0}%"></i></div></div>`).join('')}</div>
      <div class="card"><h2 style="margin-bottom:6px">${t('oc_daily')}</h2><div class="oc-days" role="img" aria-label="${t('oc_daily')}">${perDay.map((n, i) => `<div title="${n}"><small>${n || ''}</small><i style="height:${Math.round(n * 90 / mx)}px"></i><small>${days[i].getDate()}</small></div>`).join('')}</div></div>
      <div class="card"><h2 style="margin-bottom:8px">${t('oc_cities')}</h2>${list(top(all, o => o.city))}</div>
      <div class="card"><h2 style="margin-bottom:8px">${t('oc_hotels')}</h2>${list(top(all, o => o.hotel))}</div>
    </div>`;
  }
  function vQuality() {
    const all = opsOrders().filter(inPeriod);
    const hand = all.filter(o => ['human_review', 'failed'].includes(o.status));
    const msgs = all.reduce((a, o) => a + ((o.events || []).length || 1), 0);
    return `<div class="row between" style="margin-bottom:12px;flex-wrap:wrap;gap:10px"><b>${t('oc_period')}</b>${periodChips()}</div>
    <div class="grid g4">
      <div class="card tile"><span class="k">${t('oc_requests')}</span><span class="v">${all.length}</span></div>
      <div class="card tile ${hand.length ? 'tile-alert' : ''}"><span class="k">${t('oc_handoff')}</span><span class="v">${hand.length}</span></div>
      <div class="card tile"><span class="k">${t('oc_handRate')}</span><span class="v">${pct(hand.length, all.length)}</span></div>
      <div class="card tile"><span class="k">${t('oc_avgSteps')}</span><span class="v">${all.length ? (msgs / all.length).toFixed(1) : '—'}</span></div>
    </div>
    <div class="card"><h2 style="margin-bottom:8px">${t('oc_reasons')}</h2>${top(hand, reasonOf, 8).map(([k, v]) => `<div style="margin-bottom:10px"><div class="row between small"><span>${esc(k)}</span><b>${v}</b></div><div class="oc-bar"><i style="width:${Math.round(v * 100 / Math.max(1, hand.length))}%;background:var(--bad)"></i></div></div>`).join('') || `<p class="muted small">${t('oc_none')}</p>`}</div>`;
  }
  function vHealth() {
    const d = OPS.data || {}; const at = d.synced_at ? new Date(d.synced_at) : null;
    const last = opsOrders().reduce((m, o) => Math.max(m, new Date(o.updated_at).getTime() || 0), 0);
    const st = OPS.err ? 'down' : (last && Date.now() - last > 6 * 3600e3 ? 'stale' : 'ok');
    const col = { ok: 'var(--good)', stale: 'var(--warn)', down: 'var(--bad)' };
    const row = (name, s, extra) => `<div class="row between" style="padding:12px 0;border-bottom:1px solid var(--line)"><span><span class="oc-dot" style="background:${col[s]}"></span>${name}</span><span class="small">${t('oc_' + s)}${extra ? ' · ' + extra : ''}</span></div>`;
    return `<div class="card"><h2 style="margin-bottom:6px">${t('oc_parts')}</h2>
      ${row(t('oc_part_wa'), st, last ? t('oc_lastSync') + ': ' + opsTime(new Date(last).toISOString()) : '')}
      ${row(t('oc_part_bridge'), OPS.err ? 'down' : 'ok', at ? opsTime(at.toISOString()) : '')}
      ${row(t('oc_part_db'), Cloud.on ? 'ok' : 'down', '')}
      <p class="small muted" style="margin-top:10px">${t('oc_source')}: ${esc(d.source || '—')}</p></div>`;
  }

  window.EXTRA_VIEWS = window.EXTRA_VIEWS || {};
  window.EXTRA_VIEWS.orders = function () {
    if (OC.tab === 'list') { const h = vOrders(); const i = h.indexOf('<div id="ops-body">'); return i > 0 ? h.slice(0, i) + tabs() + h.slice(i) : tabs() + h; }
    opsLoad();
    const body = !OPS.data ? `<div class="card"><p class="muted">${t('ordersLoading')}</p></div>` : ({ issues: vIssues, reports: vReports, quality: vQuality, health: vHealth })[OC.tab]();
    return `<div class="head"><div><h1>${t('oc_tab_' + OC.tab)}</h1><p>${t('ordersSub')}</p></div><div class="row"><button class="btn" data-act="opsRefresh">${ic('refresh', 'sm')} ${t('refresh')}</button></div></div>${tabs()}<div id="oc-body">${body}</div>`;
  };
  const _paint = window.opsPaint;
  // refresh sub-tabs after data loads
  const origPaint = opsPaint;
  window.opsPaint = function () { if (OC.tab === 'list') return origPaint(); const b = $('#oc-body'); if (b && OPS.data) b.innerHTML = ({ issues: vIssues, reports: vReports, quality: vQuality, health: vHealth })[OC.tab](); };

  Object.assign(ACT, {
    ocTab: el => { OC.tab = el.dataset.v; route(); },
    ocPeriod: el => { OC.period = Number(el.dataset.v); route(); },
    ocSkin: () => { S.brand.theme = S.brand.theme === 'classic' ? '' : 'classic'; applySkin(); save(); route(); },
    ocExport: () => {
      const cols = ['request_id', 'sender', 'status', 'hotel', 'city', 'checkin', 'checkout', 'amount_sar', 'trip_id', 'request_text', 'updated_at'];
      const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""').replace(/\r?\n/g, ' ') + '"';
      const csv = '﻿' + cols.join(',') + '\n' + opsOrders().map(o => cols.map(c => q(o[c])).join(',')).join('\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      a.download = 'luxecheck-orders-' + new Date().toISOString().slice(0, 10) + '.csv'; document.body.appendChild(a); a.click(); a.remove();
    }
  });
  try { if (S.ui.view === 'orders') route(); } catch (e) { }
})();
