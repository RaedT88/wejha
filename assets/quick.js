/* ---------- Wejha: quick offer from a ready template — fill the form, get the client link + PDF at once ---------- */
(function () {
  if (typeof ROUTES === 'undefined' || typeof quoteFromPackage !== 'function') return;
  const AR = {
    qfTitle: ['Quick offer', 'عرض سريع'],
    qfHint: ['Fill in the client, dates, hotels and prices. The offer is created with the template design, ready to send as a link and a PDF.', 'عبّئ العميل والتواريخ والفنادق والأسعار. ينشأ العرض بتصميم القالب جاهزاً للإرسال كرابط وPDF.'],
    qfNewClient: ['…or new client name', '…أو اسم عميل جديد'], qfPhone: ['Client WhatsApp', 'واتساب العميل'],
    qfNights: ['Nights', 'الليالي'], qfPrices: ['Hotels & prices', 'الفنادق والأسعار'],
    qfPerNight: ['per room / night', 'للغرفة / الليلة'], qfUnit: ['price', 'السعر'], qfOptional: ['optional extra', 'إضافة اختيارية'],
    qfCreate: ['Create offer · link + PDF', 'إنشاء العرض · رابط + PDF'], qfOpenFull: ['Open full editor', 'فتح المحرر الكامل'],
    qfReady: ['Offer {id} is ready', 'العرض {id} جاهز'], qfReadyHint: ['Send the link on WhatsApp, download the PDF, or keep editing.', 'أرسل الرابط على واتساب، أو حمّل PDF، أو كمّل التعديل.'],
    qfSaving: ['Saving the offer…', 'جارٍ حفظ العرض…'], qfNoLink: ['The link appears once the offer is saved. Try again in a few seconds.', 'يظهر الرابط بعد حفظ العرض. حاول بعد ثوانٍ.'],
    qfRemove: ['Remove', 'حذف'],
    nav_packages: ['Templates', 'قوالب العروض'], easyPackages: ['Ready templates', 'قوالب جاهزة'], usePackage: ['Fill template', 'عبّئ القالب']
  };
  for (const k in AR) { I18N.en[k] = AR[k][0]; I18N.ar[k] = AR[k][1]; }

  const lineLabel = (l, lang) => tx(l.name, lang) || t('kind_' + l.kind);

  usePkgDialog = function (id) {
    const pk = allPackages().find(p => p.id === id); if (!pk) return;
    const g = pk.type === 'GROUP', lang = L();
    const rows = (pk.lines || []).map((l, i) => {
      const hotel = l.kind === 'hotel';
      const val = hotel ? (l.rate ?? (l.rates && l.rates.dbl) ?? 0) : (l.unit ?? l.rate ?? 0);
      return `<tr data-i="${i}">
        <td style="width:28px"><input type="checkbox" class="qf-on" data-i="${i}" checked aria-label="${t('qfRemove')}"></td>
        <td><span class="tiny muted">${t('kind_' + l.kind)}${l.optional ? ' · ' + t('qfOptional') : ''}</span>
          <input class="inp qf-name" data-i="${i}" value="${esc(lineLabel(l, lang))}" style="margin-top:2px"></td>
        <td style="width:150px"><span class="tiny muted">${hotel ? t('qfPerNight') : t('qfUnit')}</span>
          <input class="inp qf-rate" data-i="${i}" type="number" min="0" step="any" value="${esc(String(val))}" style="margin-top:2px"></td></tr>`;
    }).join('');
    modal(t('qfTitle') + ' · ' + pkTitle(pk), `
      <p class="muted small">${t('qfHint')}</p>
      <div class="grid g2">
        <div class="f"><label for="up-client">${t('client')}</label><select id="up-client"><option value="">${t('chooseClient')}</option>${S.clients.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select></div>
        <div class="f"><label for="qf-cname">${t('qfNewClient')}</label><input id="qf-cname" class="inp"></div>
        <div class="f"><label for="qf-cphone">${t('qfPhone')}</label><input id="qf-cphone" class="inp" dir="ltr" placeholder="9665…"></div>
        <div class="f"><label for="up-lang">${t('clientLang')}</label><select id="up-lang"><option value="en" ${lang === 'en' ? 'selected' : ''}>English</option><option value="ar" ${lang === 'ar' ? 'selected' : ''}>العربية</option></select></div>
        <div class="f"><label for="up-start">${t('checkIn')}</label><input type="date" id="up-start" value="${addDays(today(), 30)}"></div>
        <div class="f"><label for="qf-nights">${t('qfNights')}</label><input type="number" min="1" id="qf-nights" value="${pk.nights}"></div>
        ${g ? '' : `<div class="f"><label for="up-ad">${t('adults')}</label><input type="number" min="1" id="up-ad" value="${pk.adults || 2}"></div><div class="f"><label for="up-ch">${t('children')}</label><input type="number" min="0" id="up-ch" value="${pk.children || 0}"></div>`}
      </div>
      <h3 class="small" style="margin:14px 0 6px">${t('qfPrices')}</h3>
      <div class="tbl-wrap"><table class="tbl"><tbody>${rows}</tbody></table></div>`,
      `<button class="btn" data-act="closeModal">${t('cancel')}</button>
       <button class="btn" data-act="qfGo" data-id="${id}" data-full="1">${t('qfOpenFull')}</button>
       <button class="btn primary" data-act="qfGo" data-id="${id}">${ic('check', 'sm')} ${t('qfCreate')}</button>`, { wide: true });
  };

  function readForm(pk) {
    const o = { clientId: $('#up-client').value, start: $('#up-start').value || addDays(today(), 30), lang: $('#up-lang').value };
    if ($('#up-ad')) { o.adults = Math.max(1, num($('#up-ad').value)); o.children = Math.max(0, num($('#up-ch').value)); }
    const nights = Math.max(1, num($('#qf-nights').value) || pk.nights);
    const edits = (pk.lines || []).map((l, i) => ({
      on: !!($(`.qf-on[data-i="${i}"]`) || {}).checked,
      name: (($(`.qf-name[data-i="${i}"]`) || {}).value || '').trim(),
      rate: num(($(`.qf-rate[data-i="${i}"]`) || {}).value)
    }));
    return { o, nights, edits, cname: $('#qf-cname').value.trim(), cphone: $('#qf-cphone').value.trim() };
  }

  async function waitToken(ref, ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      try { await Cloud.flush(); } catch (e) { }
      if (Cloud.offerLink(ref)) return true;
      await new Promise(r => setTimeout(r, 600));
    }
    return !!Cloud.offerLink(ref);
  }

  function readyDlg(q) {
    const link = Cloud.on ? Cloud.offerLink(q.id) : '';
    modal(t('qfReady', { id: q.id }), `<p class="muted small">${t('qfReadyHint')}</p>
      ${link ? `<div class="copybox"><input class="inp" readonly value="${esc(link)}" aria-label="${t('clientLink')}"><button class="btn" data-act="copy" data-text="${esc(link)}">${ic('copy', 'sm')} ${t('copy')}</button></div>` : `<p class="small down">${t('qfNoLink')}</p>`}`,
      `<button class="btn" data-act="qfEdit" data-id="${q.id}">${t('qfOpenFull')}</button>
       <button class="btn" data-act="qfPdf" data-id="${q.id}">${ic('download', 'sm')} PDF</button>
       <button class="btn primary" data-act="qfSend" data-id="${q.id}">${ic('chat', 'sm')} ${t('sendToClient')}</button>`);
  }

  Object.assign(ACT, {
    qfGo: async el => {
      const pk = allPackages().find(p => p.id === el.dataset.id); if (!pk) return;
      const f = readForm(pk);
      if (!f.o.clientId && f.cname) {
        const c = { id: uuid(), notes: '', name: f.cname, phone: f.cphone, email: '', city: '', company: '', tags: [] };
        S.clients.unshift(c); f.o.clientId = c.id;
      } else if (f.o.clientId && f.cphone) {
        const c = S.clients.find(x => x.id === f.o.clientId); if (c && !c.phone) c.phone = f.cphone;
      }
      const q = quoteFromPackage(pk, f.o);
      const oldN = pk.nights; q.nights = f.nights;
      q.lines = q.lines.map((n, i) => {
        const e = f.edits[i]; if (!e) return n;
        if (!e.on) return null;
        if (e.name) n.name = e.name;
        if (n.kind === 'hotel') {
          n.rate = e.rate; n.rates = { sgl: e.rate, dbl: e.rate, tpl: Math.round(e.rate * 1.2), quad: Math.round(e.rate * 1.4) };
          if (!n.nights || n.nights === oldN) n.nights = f.nights;
        } else if ('unit' in n || n.basis) n.unit = e.rate; else n.rate = e.rate;
        return n;
      }).filter(Boolean);
      if (q.days && q.days.length > f.nights + 1) q.days = q.days.slice(0, f.nights).concat(q.days.slice(-1));
      if (!(await assignRef(q))) return;
      S.quotes.unshift(q); save();
      if (el.dataset.full) { closeModal(); toast(t('quoteCreated', { id: q.id })); openQuote(q.id); return; }
      modal(t('qfTitle'), `<p class="muted">${t('qfSaving')}</p>`);
      if (Cloud.on) await waitToken(q.id, 12000);
      route(); readyDlg(q);
    },
    qfPdf: el => { const q = S.quotes.find(x => x.id === el.dataset.id); if (q) printQuote(q, q.lang); },
    qfSend: el => { const q = S.quotes.find(x => x.id === el.dataset.id); if (!q) return; if (Cloud.on && !Cloud.offerLink(q.id)) return toast(t('qfNoLink')); sendDialog(q.id); },
    qfEdit: el => { closeModal(); openQuote(el.dataset.id); }
  });
})();
