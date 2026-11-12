const I18N = { en: {}, ar: {} };
(function () {
  const D = {
    backOffice: ['Back office', 'لوحة الإدارة'],
    agencyOptionalPh: ['Leave empty if you were invited', 'اتركه فارغاً إذا وصلتك دعوة'],
    liveRate: ['Live LuxeCheck price', 'سعر LuxeCheck الحي'], liveTitle: ['Live price from LuxeCheck', 'السعر الحي من LuxeCheck'], liveSearch: ['Search LuxeCheck', 'بحث في LuxeCheck'],
    liveSearching: ['Searching LuxeCheck…', 'جارٍ البحث في LuxeCheck…'], liveSearchingSub: ['A robot signs in and searches like an agent. This takes 10–30 seconds.', 'روبوت يسجّل الدخول ويبحث كأنه وكيل، يستغرق ذلك 10 إلى 30 ثانية.'],
    liveHint: ['Read-only: nothing is booked.', 'للقراءة فقط: لا يتم أي حجز.'], liveUse: ['Use', 'استخدم'], adultsPerRoom: ['Adults / room', 'بالغون / غرفة'], cancellation: ['Cancellation', 'الإلغاء'], perNightLbl: ['Per room night', 'لليلة للغرفة'],
    refundable: ['Refundable', 'قابل للإلغاء'], nonRefundable: ['Non-refundable', 'غير مسترد'], liveFilled: ['Net rate filled from LuxeCheck', 'تمت تعبئة السعر الصافي من LuxeCheck'], liveFrom: ['LuxeCheck · {d}', 'LuxeCheck · {d}'],
    liveMeta: ['{n} offers · {s} s', '{n} عروض · {s} ث'], liveDemo: ['Demo results. Add the n8n webhook address to config.js to search the real portal.', 'نتائج تجريبية. أضف رابط n8n في config.js للبحث في البوابة الحقيقية.'],
    liveFx: ['Some prices are not in {q}. Convert them before sending the quote.', 'بعض الأسعار ليست بعملة {q}، حوّلها قبل إرسال العرض.'],
    liveErr_none: ['No offers for these dates. Try other dates or only the city.', 'لا توجد عروض لهذه التواريخ. جرّب تواريخ أخرى أو المدينة فقط.'], liveErr_not_signed_in: ['Your session ended. Sign in again.', 'انتهت الجلسة، سجّل الدخول مجدداً.'],
    liveErr_luxecheck_login_unavailable: ['The LuxeCheck robot login is not available (check 1Password).', 'بيانات دخول روبوت LuxeCheck غير متاحة (راجع 1Password).'], liveErr_portal_unreachable: ['LuxeCheck did not answer in time. Try again.', 'لم تستجب LuxeCheck في الوقت المحدد، حاول مرة أخرى.'],
    liveErr_bad_request: ['Enter a hotel or city and valid dates.', 'أدخل فندقاً أو مدينة وتواريخ صحيحة.'], liveErr_timeout: ['The search took too long. Try again.', 'استغرق البحث وقتاً طويلاً، حاول مرة أخرى.'],
    liveErr_network: ['Can’t reach the rates service.', 'تعذر الوصول لخدمة الأسعار.'], liveErr_generic: ['The search failed. Try again.', 'فشل البحث، حاول مرة أخرى.'],
    nav_team: ['Team', 'الفريق'], role: ['Role', 'الصلاحية'], role_owner: ['Owner', 'مالك'], role_agent: ['Sales agent', 'موظف مبيعات'], role_accountant: ['Accountant', 'محاسب'],
    roleDesc_owner: ['Everything, including branding, team and settings.', 'كل الصلاحيات، بما فيها الهوية والفريق والإعدادات.'], roleDesc_agent: ['Creates and sends quotations, manages clients and packages.', 'ينشئ العروض ويرسلها، ويدير العملاء والباقات.'], roleDesc_accountant: ['Sees everything, records payments. Cannot edit quotations.', 'يرى كل شيء ويسجل المدفوعات، ولا يعدّل العروض.'],
    trialLeft: ['trial: {n} days left', 'التجربة: متبقٍ {n} يوماً'], signOut: ['Sign out', 'تسجيل الخروج'],
    syncSaved: ['Saved', 'تم الحفظ'], syncSaving: ['Saving…', 'جارٍ الحفظ…'], syncError: ['Not saved, retrying', 'لم يُحفظ، جارٍ إعادة المحاولة'], demoMode: ['Demo mode', 'وضع تجريبي'],
    emptyStart: ['Start with a package or a new quotation. Follow-ups will appear here.', 'ابدأ بباقة جاهزة أو عرض جديد، وستظهر المتابعات هنا.'],
    domainHintCloud: ['Leave empty to use the app address. To use your own domain, point it to the app first (see the setup guide).', 'اتركه فارغاً لاستخدام عنوان التطبيق. لاستخدام نطاقك الخاص وجّهه للتطبيق أولاً (راجع دليل الإعداد).'],
    linkHintDemo: ['Demo mode: this link is an example. Real links work once the app is connected to the database.', 'وضع تجريبي: هذا رابط مثال، والروابط الحقيقية تعمل بعد ربط التطبيق بقاعدة البيانات.'],
    downloadPdf: ['Download PDF', 'تحميل PDF'], pdfHosted: ['PDF download works in the hosted app.', 'تحميل PDF يعمل في النسخة المستضافة من التطبيق.'],
    reloadedConflict: ['{id} was updated by the client, so it was reloaded.', 'تم تحديث {id} من العميل، فأُعيد تحميله.'], liveStatus: ['{id}: {s}', '{id}: {s}'], liveChange: ['{id}: the client asked for changes', '{id}: طلب العميل تعديلات'],
    errNetwork: ['Can’t reach the server. Check your connection.', 'تعذر الاتصال بالخادم. تحقق من الإنترنت.'], errTryAgain: ['Something went wrong. Please try again.', 'حدث خطأ، حاول مرة أخرى.'],
    errLogin: ['Wrong email or password.', 'البريد أو كلمة المرور غير صحيحة.'], errConfirm: ['Confirm your email first, using the link we sent you.', 'أكّد بريدك أولاً من الرابط الذي أرسلناه لك.'], errExists: ['This email already has an account. Sign in instead.', 'هذا البريد مسجل مسبقاً، سجّل الدخول.'],
    errAlreadyMember: ['This person is already in your team.', 'هذا الشخص موجود في فريقك مسبقاً.'], errForbidden: ['Your role doesn’t allow this.', 'صلاحيتك لا تسمح بذلك.'], errLastOwner: ['The agency needs at least one owner.', 'يجب أن يبقى مالك واحد على الأقل.'],
    errRemoveSelf: ['You can’t remove yourself.', 'لا يمكنك حذف نفسك.'], errEmail: ['Enter a valid email.', 'أدخل بريداً صحيحاً.'],
    signIn: ['Sign in', 'تسجيل الدخول'], welcomeBack: ['Welcome back', 'أهلاً بعودتك'], signInSub: ['Sign in to your agency’s back office.', 'سجّل الدخول إلى لوحة وكالتك.'], password: ['Password', 'كلمة المرور'],
    forgotPass: ['Forgot password?', 'نسيت كلمة المرور؟'], createAccount: ['Create account', 'إنشاء حساب'], startTrial: ['Start your 14-day trial', 'ابدأ تجربتك لمدة 14 يوماً'], signUpSub: ['Set up your agency in a minute. No card needed.', 'جهّز وكالتك خلال دقيقة، بدون بطاقة.'],
    yourName: ['Your name', 'اسمك'], workEmail: ['Work email', 'البريد الإلكتروني للعمل'], passwordNew: ['Password (8+ characters)', 'كلمة المرور (8 أحرف أو أكثر)'],
    invitedHint: ['Invited by your agency? Create an account with the email the invite was sent to, and you’ll join automatically.', 'وصلتك دعوة من وكالتك؟ أنشئ حساباً بنفس البريد المدعو وستنضم تلقائياً.'],
    haveAccount: ['Already have an account?', 'لديك حساب؟'], resetPass: ['Reset your password', 'إعادة تعيين كلمة المرور'], resetSub: ['We’ll email you a link to set a new password.', 'سنرسل لك رابطاً لتعيين كلمة مرور جديدة.'],
    sendResetLink: ['Send reset link', 'إرسال الرابط'], backToSignIn: ['Back to sign in', 'العودة لتسجيل الدخول'], newPassTitle: ['Choose a new password', 'اختر كلمة مرور جديدة'], resetSent: ['Check your email for the reset link.', 'تحقق من بريدك لرابط إعادة التعيين.'],
    createAgencyTitle: ['Create your agency', 'أنشئ وكالتك'], createAgencySub: ['Your account isn’t linked to an agency yet.', 'حسابك غير مرتبط بوكالة بعد.'], createAgencyBtn: ['Create agency', 'إنشاء الوكالة'],
    checkEmail: ['Check your email', 'تحقق من بريدك'], checkEmailSub: ['We sent you a confirmation link. Open it, then sign in to finish setting up your agency.', 'أرسلنا لك رابط تأكيد. افتحه ثم سجّل الدخول لإكمال إعداد وكالتك.'],
    authFoot: ['wejha · quotations, packages and bookings for travel agencies', 'wejha · عروض الأسعار والباقات والحجوزات لوكالات السفر'],
    loading: ['Loading…', 'جارٍ التحميل…'], teamSub: ['Invite your staff and choose what each person can do.', 'ادعُ موظفيك وحدد صلاحيات كل شخص.'], inviteMember: ['Invite member', 'دعوة عضو'],
    joined: ['Joined', 'انضم'], you: ['you', 'أنت'], invited: ['Invited', 'مدعو'], inviteText: ['Invite text', 'نص الدعوة'],
    inviteMsgBody: ['You’ve been invited to join {a} on wejha.\n\n1. Open {u}\n2. Choose "Create account"\n3. Sign up with {e}\n\nYou’ll join the team automatically.', 'تمت دعوتك للانضمام إلى {a} على wejha.\n\n1. افتح {u}\n2. اختر "إنشاء حساب"\n3. سجّل بالبريد {e}\n\nستنضم إلى الفريق تلقائياً.'],
    inviteHint: ['They sign up with this email and join your agency automatically.', 'يسجّل بهذا البريد وينضم لوكالتك تلقائياً.'], inviteSent: ['Invitation created', 'تم إنشاء الدعوة'], inviteSendHint: ['Send this message on WhatsApp or email.', 'أرسل هذه الرسالة عبر واتساب أو البريد.'],
    removeMemberQ: ['Remove this person from your agency?', 'إزالة هذا الشخص من وكالتك؟'],
    offerNotFound: ['Offer not found', 'العرض غير موجود'], offerNotFoundSub: ['This link is not valid anymore. Please ask your travel agent for a new one.', 'هذا الرابط لم يعد صالحاً. اطلب رابطاً جديداً من وكيل السفر.'],
    quotationDoc: ['Quotation', 'عرض سعر'], issued: ['Issued', 'تاريخ الإصدار'], accommodation: ['Accommodation', 'الإقامة'], addedExtra: ['added extra', 'إضافة مختارة'],
    nav_dashboard: ['Dashboard', 'الرئيسية'], nav_quotes: ['Quotations', 'عروض الأسعار'], nav_packages: ['Packages', 'الباقات'], nav_bookings: ['Bookings & payments', 'الحجوزات والمدفوعات'], nav_clients: ['Clients', 'العملاء'], nav_branding: ['Branding & settings', 'الهوية والإعدادات'],
    mainNav: ['Main navigation', 'القائمة الرئيسية'], resetDemo: ['Reset demo data', 'إعادة البيانات التجريبية'], poweredBy: ['Powered by', 'مدعوم من'], menu: ['Menu', 'القائمة'],
    searchAll: ['Search quotes, clients, destinations…', 'ابحث في العروض والعملاء والوجهات…'], fromPackage: ['From a package', 'من باقة جاهزة'], newQuote: ['New quotation', 'عرض سعر جديد'],
    close: ['Close', 'إغلاق'], areYouSure: ['Are you sure?', 'هل أنت متأكد؟'], cancel: ['Cancel', 'إلغاء'], yesContinue: ['Yes, continue', 'نعم، متابعة'],
    copied: ['Copied to clipboard', 'تم النسخ'], copyManually: ['Copy this text', 'انسخ هذا النص'], copyManuallyHint: ['Your browser blocked automatic copying. Select the text and copy it.', 'منع المتصفح النسخ التلقائي. حدّد النص وانسخه.'],
    st_draft: ['Draft', 'مسودة'], st_sent: ['Sent', 'مُرسل'], st_viewed: ['Viewed', 'تمت المشاهدة'], st_accepted: ['Accepted', 'مقبول'], st_confirmed: ['Confirmed', 'مؤكد'], st_lost: ['Lost', 'مفقود'],
    fit: ['FIT', 'فردي'], group: ['Group', 'مجموعة'],
    goodMorning: ['Good morning', 'صباح الخير'], goodAfternoon: ['Good afternoon', 'مساء الخير'], goodEvening: ['Good evening', 'مساء الخير'],
    dashSub: ['{n} quotations are waiting on clients · {d}', '{n} عروض بانتظار رد العملاء · {d}'], easyPackages: ['Easy packages', 'باقات جاهزة'],
    kpi_revenue: ['Confirmed revenue, 30 days', 'الإيرادات المؤكدة، 30 يوماً'], kpi_profit: ['Profit, 30 days', 'الأرباح، 30 يوماً'], kpi_pipeline: ['Open pipeline', 'العروض المفتوحة'], kpi_win: ['Win rate', 'نسبة الفوز'], kpi_due: ['Balance to collect', 'مبالغ مستحقة التحصيل'],
    noPrev: ['No sales in the previous 30 days', 'لا مبيعات في الـ 30 يوماً السابقة'], vsLastMonth: ['vs previous 30 days', 'مقارنة بالـ 30 يوماً السابقة'], openQuotes: ['{n} open quotations', '{n} عروض مفتوحة'], fromConfirmed: ['from {n} confirmed bookings', 'من {n} حجوزات مؤكدة'],
    revProfit: ['Revenue & profit', 'الإيرادات والأرباح'], revProfitSub: ['Confirmed bookings, last 6 months', 'الحجوزات المؤكدة، آخر 6 أشهر'], revenue: ['Revenue', 'الإيرادات'], profit: ['Profit', 'الربح'],
    funnel: ['Quotation funnel', 'مسار عروض الأسعار'], funnelSub: ['How far quotations get', 'إلى أين تصل العروض'], fn_created: ['Created', 'تم الإنشاء'], convRate: ['{p}% of quotations become confirmed bookings.', '{p}% من العروض تتحول إلى حجوزات مؤكدة.'],
    needsAttention: ['Needs attention', 'بحاجة إلى متابعة'], needsAttentionSub: ['Follow-ups, expiring offers and payments', 'المتابعات والعروض المنتهية والمدفوعات'],
    att_accepted: ['{c} accepted. Confirm with the supplier.', 'قبل {c} العرض. أكّد الحجز مع المورد.'], att_expiring: ['Offer expires {d}. Follow up today.', 'ينتهي العرض في {d}. تابع اليوم.'], att_expired: ['Offer expired on {d}. Refresh prices or close it.', 'انتهى العرض في {d}. حدّث الأسعار أو أغلقه.'], att_balance: ['Balance of {a} due {d}', 'مبلغ متبقٍ {a} مستحق في {d}'],
    open: ['Open', 'فتح'], allClear: ['Nothing needs your attention right now.', 'لا يوجد ما يحتاج متابعة الآن.'],
    upcoming: ['Upcoming departures', 'الرحلات القادمة'], upcomingSub: ['Confirmed trips in the next 45 days', 'الرحلات المؤكدة خلال 45 يوماً'], nightsN: ['{n} nights', '{n} ليالٍ'], paxN: ['{n} pax', '{n} مسافرين'],
    partPaid: ['Part paid', 'مدفوع جزئياً'], fullyPaid: ['Fully paid', 'مدفوع بالكامل'], noUpcoming: ['No confirmed departures in the next 45 days.', 'لا توجد رحلات مؤكدة خلال 45 يوماً.'],
    topDest: ['Top destinations', 'أكثر الوجهات طلباً'], fitVsGroup: ['FIT vs group', 'فردي مقابل مجموعات'], confirmedRevenueAll: ['Share of all confirmed revenue', 'النسبة من كل الإيرادات المؤكدة'], recentActivity: ['Recent activity', 'آخر النشاطات'],
    act_created: ['quotation created', 'تم إنشاء العرض'], act_sent: ['sent to client', 'أُرسل للعميل'], act_viewed: ['opened by client', 'فتحه العميل'], act_accepted: ['accepted by client', 'قبله العميل'], act_confirmed: ['booking confirmed', 'تم تأكيد الحجز'], act_lost: ['marked as lost', 'تم تحديده كمفقود'], act_payment: ['payment received {a}', 'دفعة مستلمة {a}'], act_change: ['client asked for changes', 'طلب العميل تعديلات'],
    quotesSub: ['Every FIT and group quotation, with live status from your clients.', 'كل عروض الأسعار الفردية والجماعية مع حالتها المباشرة من العملاء.'], all: ['All', 'الكل'], searchQuotes: ['Search…', 'بحث…'],
    quoteClient: ['Client & quote', 'العميل والعرض'], trip: ['Trip', 'الرحلة'], type: ['Type', 'النوع'], travel: ['Travel', 'السفر'], pax: ['Pax', 'المسافرون'], total: ['Total', 'الإجمالي'], status: ['Status', 'الحالة'], validUntil: ['Valid until', 'صالح حتى'], actions: ['Actions', 'إجراءات'],
    noClient: ['No client yet', 'بدون عميل'], untitled: ['Untitled trip', 'رحلة بدون عنوان'], previewClient: ['Client view', 'عرض العميل'], send: ['Send', 'إرسال'], duplicate: ['Duplicate', 'نسخ'], delete: ['Delete', 'حذف'], noQuotes: ['No quotations match these filters.', 'لا توجد عروض مطابقة.'],
    packagesSub: ['Ready-made trips. Pick one, set the client and dates, and the quotation is ready to send.', 'رحلات جاهزة. اختر باقة وحدد العميل والتاريخ ويصبح العرض جاهزاً للإرسال.'],
    cat_all: ['All', 'الكل'], cat_family: ['Family', 'عائلية'], cat_honeymoon: ['Honeymoon', 'شهر عسل'], cat_umrah: ['Umrah', 'عمرة'], cat_groups: ['Groups & MICE', 'مجموعات ومؤتمرات'], cat_adventure: ['Adventure', 'مغامرة'], cat_domestic: ['Saudi', 'داخل السعودية'], cat_custom: ['Your packages', 'باقاتك'],
    yours: ['Your package', 'باقتك'], fromPP: ['From, per person', 'يبدأ من، للشخص'], fromPPdbl: ['From, per person in double', 'يبدأ من، للشخص في غرفة مزدوجة'], preview: ['Preview', 'معاينة'], usePackage: ['Use package', 'استخدم الباقة'],
    noCustomPkgs: ['Open any quotation and choose "Save as package" to build your own library.', 'افتح أي عرض واختر "حفظ كباقة" لبناء مكتبتك الخاصة.'],
    usePkgHint: ['Hotels, services, itinerary and inclusions are copied into a new quotation. You can change anything after.', 'تُنسخ الفنادق والخدمات والبرنامج إلى عرض جديد، ويمكنك تعديل أي شيء لاحقاً.'],
    client: ['Client', 'العميل'], chooseClient: ['Choose a client', 'اختر عميلاً'], checkIn: ['Check-in', 'تاريخ الوصول'], clientLang: ['Client language', 'لغة العميل'], adults: ['Adults', 'بالغون'], children: ['Children', 'أطفال'], createQuote: ['Create quotation', 'إنشاء العرض'],
    bookingsSub: ['Accepted and confirmed trips, with deposits and balances.', 'الرحلات المقبولة والمؤكدة مع العربون والمبالغ المتبقية.'], awaitingConf: ['Accepted, awaiting confirmation', 'مقبولة بانتظار التأكيد'], receivable: ['Balance to collect', 'مبالغ مستحقة'], collectedMonth: ['Collected this month', 'المحصّل هذا الشهر'],
    departure: ['Departure', 'المغادرة'], paid: ['Paid', 'المدفوع'], balanceDue: ['Balance', 'المتبقي'], departed: ['Departed', 'غادر'], inDays: ['in {n} days', 'بعد {n} يوماً'], dueBy: ['due {d}', 'مستحق {d}'], confirmBooking: ['Confirm', 'تأكيد'], recordPayment: ['Record payment', 'تسجيل دفعة'],
    noBookings: ['Accepted quotations appear here.', 'ستظهر العروض المقبولة هنا.'], balance: ['Balance', 'المتبقي'], amount: ['Amount', 'المبلغ'], date: ['Date', 'التاريخ'], note: ['Note', 'ملاحظة'], payNotePh: ['Bank transfer, card, cash…', 'تحويل بنكي، بطاقة، نقداً…'], save: ['Save', 'حفظ'],
    clientsSub: ['Your client list with their quotations and bookings.', 'قائمة عملائك مع عروضهم وحجوزاتهم.'], addClient: ['Add client', 'إضافة عميل'], contact: ['Contact', 'التواصل'], city: ['City', 'المدينة'], quotesN: ['Quotes', 'العروض'], bookedValue: ['Booked value', 'قيمة الحجوزات'], lastTrip: ['Last trip', 'آخر رحلة'], viewQuotes: ['Quotes', 'العروض'], edit: ['Edit', 'تعديل'], editClient: ['Edit client', 'تعديل العميل'],
    fullName: ['Full name', 'الاسم الكامل'], phoneWa: ['Mobile (WhatsApp)', 'الجوال (واتساب)'], email: ['Email', 'البريد الإلكتروني'], company: ['Company', 'الشركة'], tags: ['Tags', 'التصنيفات'],
    tag_vip: ['VIP', 'كبار العملاء'], tag_family: ['Family', 'عائلة'], tag_honeymoon: ['Honeymoon', 'شهر عسل'], tag_corporate: ['Corporate', 'شركات'], tag_groups: ['Groups', 'مجموعات'],
    brandingSub: ['Each agency gets its own name, logo, colors and link. Clients only see your brand.', 'لكل وكالة اسمها وشعارها وألوانها ورابطها. العميل يرى علامتك التجارية فقط.'], identity: ['Identity', 'الهوية'],
    agencyNameEn: ['Agency name (English)', 'اسم الوكالة (إنجليزي)'], agencyNameAr: ['Agency name (Arabic)', 'اسم الوكالة (عربي)'], taglineEn: ['Tagline (English)', 'الوصف المختصر (إنجليزي)'], taglineAr: ['Tagline (Arabic)', 'الوصف المختصر (عربي)'],
    logo: ['Logo', 'الشعار'], uploadLogo: ['Upload logo', 'رفع الشعار'], remove: ['Remove', 'إزالة'], logoHint: ['PNG or SVG, square works best', 'PNG أو SVG، والمربع أفضل'], brandColor: ['Brand color', 'لون العلامة'], customColor: ['Custom color', 'لون مخصص'],
    contactAndLink: ['Contact & client link', 'التواصل ورابط العميل'], phone: ['Phone', 'الهاتف'], whatsapp: ['WhatsApp', 'واتساب'], clientDomain: ['Client link domain', 'نطاق رابط العميل'], domainHint: ['Clients open offers at https://{d}/p/QUOTE-ID', 'يفتح العميل العرض على https://{d}/p/رقم-العرض'],
    pricingDefaults: ['Pricing defaults', 'إعدادات التسعير'], currency: ['Currency', 'العملة'], vatPct: ['VAT % on service fee', 'ضريبة القيمة المضافة % على رسوم الخدمة'], defaultMarkup: ['Default markup %', 'هامش الربح الافتراضي %'], validityDays: ['Offer valid (days)', 'صلاحية العرض (أيام)'], quotePrefix: ['Quote number prefix', 'بادئة رقم العرض'],
    showPowered: ['Show "Powered by wejha" on client pages', 'إظهار "مدعوم من wejha" في صفحات العملاء'], defaultTerms: ['Default terms & conditions', 'الشروط والأحكام الافتراضية'], livePreview: ['Live preview', 'معاينة مباشرة'],
    sellTitle: ['One platform, many agencies', 'منصة واحدة لوكالات متعددة'], sellText: ['Each agency subscribes to its own copy with its brand, team, clients and data. Clients only ever see the agency’s name.', 'تشترك كل وكالة في نسختها الخاصة بعلامتها وفريقها وعملائها وبياناتها، ولا يرى العميل إلا اسم الوكالة.'],
    totalPrice: ['Total price', 'السعر الإجمالي'], acceptOffer: ['Accept this offer', 'قبول العرض'],
    newQuoteHint: ['Choose how you want to start.', 'اختر طريقة البدء.'], fitQuote: ['FIT quotation', 'عرض فردي'], fitQuoteHint: ['Individuals, couples and families. Priced per room.', 'أفراد وأزواج وعائلات، بالتسعير لكل غرفة.'],
    groupQuote: ['Group quotation', 'عرض مجموعة'], groupQuoteHint: ['10+ travellers. Room mix, free places and per-person prices.', '10 مسافرين فأكثر، توزيع الغرف والمقاعد المجانية وسعر الفرد.'], fromPackageHint: ['Start from a ready-made package in one click.', 'ابدأ من باقة جاهزة بنقرة واحدة.'],
    sendToClient: ['Send to client', 'إرسال للعميل'], clientLink: ['Client link', 'رابط العميل'], linkHint: ['The link opens the interactive offer with your branding.', 'يفتح الرابط العرض التفاعلي بهوية وكالتك.'], waMessage: ['WhatsApp message', 'رسالة واتساب'], waTo: ['Opens WhatsApp to {p}', 'يفتح واتساب على {p}'],
    noClientPhone: ['Add a client with a mobile number to send on WhatsApp.', 'أضف عميلاً برقم جوال للإرسال عبر واتساب.'], copy: ['Copy', 'نسخ'], copyMessage: ['Copy message', 'نسخ الرسالة'], openWhatsApp: ['Open WhatsApp', 'فتح واتساب'], markSent: ['Mark as sent', 'تحديد كمُرسل'], markedSent: ['Marked as sent', 'تم التحديد كمُرسل'],
    duplicated: ['Copied as {id}', 'تم النسخ برقم {id}'], deleteQuoteQ: ['Delete quotation {id}? This can’t be undone.', 'حذف العرض {id}؟ لا يمكن التراجع.'], deleted: ['Deleted', 'تم الحذف'], quoteCreated: ['Quotation {id} created', 'تم إنشاء العرض {id}'], deletePkgQ: ['Delete this package from your library?', 'حذف هذه الباقة من مكتبتك؟'],
    bookingConfirmed: ['Booking confirmed', 'تم تأكيد الحجز'], enterAmount: ['Enter an amount', 'أدخل المبلغ'], paymentSaved: ['Payment recorded', 'تم تسجيل الدفعة'], nameRequired: ['Name is required', 'الاسم مطلوب'], saved: ['Saved', 'تم الحفظ'],
    resetConfirm: ['This replaces everything with fresh demo data.', 'سيتم استبدال كل البيانات ببيانات تجريبية جديدة.'], demoReset: ['Demo data restored', 'تمت استعادة البيانات التجريبية'], imageTooBig: ['Choose an image under 1.5 MB', 'اختر صورة أقل من 1.5 ميجابايت'],
    waMsg: ['Hello {n},\n\nYour offer for {t} is ready ({d}).\nTotal: {total}\nValid until {v}.\n\nSee the details, choose your options and confirm here:\n{l}\n\n{a}', 'مرحباً {n}،\n\nعرضك لرحلة {t} جاهز ({d}).\nالإجمالي: {total}\nصالح حتى {v}.\n\nاطّلع على التفاصيل واختر ما يناسبك وأكّد من هنا:\n{l}\n\n{a}'],
    groupSum: ['{p} pax · {f} free', '{p} مسافر · {f} مجاني'], fitSum: ['{a} adults · {c} children', '{a} بالغ · {c} أطفال'], svcSum: ['{n} services · {o} optional', '{n} خدمات · {o} اختيارية'],
    stars: ['Stars', 'النجوم'], board: ['Meal plan', 'الوجبات'], board_RO: ['Room only', 'بدون وجبات'], board_BB: ['Breakfast', 'إفطار'], board_HB: ['Half board', 'نصف إقامة'], board_FB: ['Full board', 'إقامة كاملة'], board_AI: ['All inclusive', 'شامل كلياً'],
    nights: ['Nights', 'الليالي'], rate_sgl: ['SGL / night', 'مفردة / ليلة'], rate_dbl: ['DBL / night', 'مزدوجة / ليلة'], rate_tpl: ['TPL / night', 'ثلاثية / ليلة'], rate_quad: ['QUAD / night', 'رباعية / ليلة'],
    roomType: ['Room type', 'نوع الغرفة'], rooms: ['Rooms', 'الغرف'], netPerNight: ['Net / room night', 'الصافي / ليلة'], details: ['Details', 'التفاصيل'], detailsPh: ['e.g. per day, route…', 'مثال: لكل يوم، المسار…'],
    pricedBy: ['Priced', 'التسعير'], basis_pp: ['Per person', 'للشخص'], basis_group: ['Per group', 'للمجموعة'], basis_unit: ['Per unit', 'للوحدة'], units: ['Units', 'الوحدات'], qty: ['Qty', 'الكمية'], netUnit: ['Net price', 'السعر الصافي'],
    kind_hotel: ['Hotel', 'فندق'], kind_flight: ['Flight', 'طيران'], kind_transfer: ['Transport', 'تنقلات'], kind_visa: ['Visa', 'تأشيرة'], kind_activity: ['Activity', 'نشاط'], kind_meal: ['Meals', 'وجبات'], kind_insurance: ['Insurance', 'تأمين'], kind_other: ['Other', 'أخرى'],
    hotelNamePh: ['Hotel name', 'اسم الفندق'], serviceNamePh: ['Service name', 'اسم الخدمة'], name: ['Name', 'الاسم'], notInTotal: ['Not in the current total', 'غير محسوب في الإجمالي الحالي'],
    optionalAddon: ['Optional add-on (client decides)', 'إضافة اختيارية (يقررها العميل)'], clientChoice: ['Client chooses from', 'يختار العميل من'], fixed: ['Fixed, always included', 'ثابت ومشمول دائماً'], choiceSet: ['Option set {s}', 'مجموعة الخيارات {s}'],
    selectedOption: ['Currently selected', 'المختار حالياً'], notSelectedAddon: ['Add-on not selected by client', 'إضافة لم يخترها العميل'], alternativeOption: ['Alternative, not selected', 'بديل غير مختار'],
    priceSummary: ['Price summary', 'ملخص السعر'], marginPct: ['{p}% margin', 'هامش {p}%'], netCost: ['Net cost', 'التكلفة الصافية'], markupPP: ['Markup ({m} per person)', 'هامش الربح ({m} للشخص)'], markupPct: ['Markup ({m}%)', 'هامش الربح ({m}%)'], vatOnFee: ['VAT {v}% on service fee', 'ضريبة {v}% على رسوم الخدمة'],
    perPayingPerson: ['Per paying person', 'للشخص الدافع'], focNote: ['{n} free place(s), 1 per {f} paying. {p} paying travellers.', '{n} مقعد مجاني، واحد لكل {f}. {p} مسافرين يدفعون.'], ppIn: ['per person, {r}', 'للشخص، {r}'],
    room_sgl: ['Single', 'مفردة'], room_dbl: ['Double', 'مزدوجة'], room_tpl: ['Triple', 'ثلاثية'], room_quad: ['Quad', 'رباعية'], roomMismatch: ['Rooms hold {r} people but the group is {p}.', 'الغرف تتسع لـ {r} أشخاص والمجموعة {p}.'], fix: ['Match', 'مطابقة'],
    depositNow: ['Deposit {p}% on confirmation', 'عربون {p}% عند التأكيد'], balanceBy: ['Balance by {d}', 'المتبقي قبل {d}'], priceReflects: ['Totals use the client’s current hotel choice and {n} selected add-on(s).', 'الإجمالي حسب اختيار العميل الحالي للفندق و{n} إضافات مختارة.'],
    tripTitle: ['Trip title', 'عنوان الرحلة'], tripTitlePh: ['e.g. Dubai Family Escape', 'مثال: دبي للعائلة'], destination: ['Destination', 'الوجهة'], destPh: ['City, country', 'المدينة، الدولة'], checkOut: ['Check-out', 'المغادرة'], coverImage: ['Cover image', 'صورة الغلاف'], uploadPhoto: ['Upload photo', 'رفع صورة'],
    art_dubai: ['Dubai skyline', 'أفق دبي'], art_istanbul: ['Istanbul', 'إسطنبول'], art_umrah: ['Umrah pattern', 'نقوش العمرة'], art_maldives: ['Maldives', 'المالديف'], art_baku: ['Baku', 'باكو'], art_georgia: ['Mountains', 'الجبال'], art_alula: ['AlUla', 'العُلا'], art_riyadh: ['Riyadh', 'الرياض'], art_generic: ['Brand gradient', 'تدرج العلامة'],
    infants: ['Infants', 'رضّع'], infantNote: ['Infants are not counted in per-person prices.', 'لا يُحتسب الرضع في أسعار الأفراد.'], totalPax: ['Total travellers', 'إجمالي المسافرين'], focPolicy: ['Free places (FOC)', 'المقاعد المجانية'], noFoc: ['None', 'لا يوجد'], focEvery: ['1 free per {n} paying', '1 مجاني لكل {n}'],
    payingPax: ['Paying travellers', 'المسافرون الدافعون'], free: ['free', 'مجاني'], roomsByType: ['Rooms by type', 'الغرف حسب النوع'], roomsHint: ['Rooms hold {r} of {p} travellers.', 'الغرف تتسع لـ {r} من {p} مسافرين.'],
    roomingList: ['Rooming list', 'قائمة توزيع الغرف'], syncRooming: ['Update from rooms', 'تحديث من الغرف'], genRooming: ['Create rooming list', 'إنشاء قائمة الغرف'], roomN: ['Room {n}', 'غرفة {n}'], guestNamesPh: ['Up to {n} guest names', 'حتى {n} أسماء'],
    roomingHint: ['Create the list to type guest names per room, then copy it for the hotel.', 'أنشئ القائمة لكتابة أسماء النزلاء لكل غرفة ثم انسخها للفندق.'], noServices: ['No services yet. Add a hotel to start.', 'لا توجد خدمات بعد. أضف فندقاً للبدء.'],
    servicesHint: ['Give two hotels the same option set to let the client pick one. Mark extras as optional add-ons.', 'ضع فندقين في نفس مجموعة الخيارات ليختار العميل أحدهما، وحدد الإضافات كاختيارية.'],
    dayN: ['Day {n}', 'اليوم {n}'], dayTitlePh: ['Title, e.g. Desert safari', 'العنوان، مثال: رحلة سفاري'], dayDescPh: ['What happens today', 'تفاصيل اليوم'], addDay: ['Add day', 'إضافة يوم'], fillDays: ['Fill {n} days', 'إنشاء {n} أيام'],
    included: ['Included', 'مشمول'], notIncluded: ['Not included', 'غير مشمول'], onePerLine: ['One item per line', 'عنصر في كل سطر'], markupType: ['Markup type', 'نوع الهامش'], perPersonShort: ['per person', 'للشخص'], markupAmtPP: ['Markup per person', 'الهامش للشخص'], markupPctLbl: ['Markup %', 'نسبة الهامش %'],
    depositPct: ['Deposit %', 'العربون %'], balanceDays: ['Balance due, days before travel', 'سداد المتبقي، أيام قبل السفر'], showItemPrices: ['Show item prices to the client (otherwise only totals)', 'إظهار أسعار البنود للعميل (وإلا الإجمالي فقط)'],
    vatFromSettings: ['VAT is {v}% on your service fee. Change it in Branding & settings.', 'الضريبة {v}% على رسوم الخدمة، ويمكن تغييرها من الإعدادات.'], termsClient: ['Terms shown to the client', 'الشروط المعروضة للعميل'], internalNotes: ['Internal notes (never shown to the client)', 'ملاحظات داخلية (لا تظهر للعميل)'],
    internalNotesPh: ['Supplier refs, option dates, reminders…', 'مرجع المورد، تواريخ الخيارات، تذكيرات…'], clientAsked: ['Client asked:', 'طلب العميل:'], createdOn: ['created {d}', 'أُنشئ {d}'],
    sec_trip: ['Trip & client', 'الرحلة والعميل'], sec_trav: ['Travellers & rooms', 'المسافرون والغرف'], sec_svc: ['Hotels & services', 'الفنادق والخدمات'], sec_days: ['Day-by-day itinerary', 'البرنامج اليومي'], sec_inc: ['Inclusions', 'المشمولات'], sec_price: ['Pricing & payment', 'التسعير والدفع'], sec_terms: ['Terms & notes', 'الشروط والملاحظات'],
    daysN: ['{n} days', '{n} أيام'], incSum: ['{a} included · {b} excluded', '{a} مشمول · {b} غير مشمول'], sendWhatsApp: ['Send on WhatsApp', 'إرسال عبر واتساب'], saveAsPackage: ['Save as package', 'حفظ كباقة'], autosaved: ['Changes save automatically in this browser.', 'تُحفظ التغييرات تلقائياً في هذا المتصفح.'],
    dayArrival: ['Arrival', 'الوصول'], dayDeparture: ['Departure', 'المغادرة'], dayFree: ['Free day', 'يوم حر'], savePkgHint: ['Saves hotels, services, itinerary and inclusions as a reusable package.', 'يحفظ الفنادق والخدمات والبرنامج والمشمولات كباقة قابلة لإعادة الاستخدام.'],
    packageName: ['Package name', 'اسم الباقة'], category: ['Category', 'التصنيف'], shortDesc: ['Short description', 'وصف مختصر'], pkgSaved: ['Saved to your packages', 'تم الحفظ في باقاتك'], statusUpdated: ['Status updated', 'تم تحديث الحالة'],
    yourExtras: ['Your extras', 'إضافاتك'], yourHotel: ['Your hotel', 'فندقك'], yourOption: ['Your option', 'اختيارك'],
    samePrice: ['Same price', 'نفس السعر'], chooseHotel: ['Choose your hotel', 'اختر فندقك'], chooseOption: ['Choose an option', 'اختر ما يناسبك'], chooseLead: ['Tap an option. The price updates straight away.', 'اضغط على الخيار وسيتحدث السعر مباشرة.'], yourChoice: ['Your choice', 'اختيارك'],
    alsoStaying: ['Also on your trip', 'ضمن رحلتك أيضاً'], whereStay: ['Where you’ll stay', 'مكان إقامتك'], inYourPackage: ['In your package', 'ضمن باقتك'], makeItYours: ['Make it yours', 'أضف ما يناسبك'], addonsLead: ['Optional extras. Switch on what you’d like.', 'إضافات اختيارية، فعّل ما تريده.'],
    perPersonCalc: ['{a} per person × {n}', '{a} للشخص × {n}'], dayByDay: ['Day by day', 'البرنامج يوماً بيوم'], whatsCovered: ['What’s covered', 'ما يشمله العرض'], groupPricing: ['Price per person', 'السعر للشخص'], groupPricingLead: ['For a group of {p} travellers.', 'لمجموعة من {p} مسافرين.'],
    focClient: ['Includes {n} free place(s) for the group leader.', 'يشمل {n} مقعد مجاني لمشرف المجموعة.'], roomsWord: ['rooms', 'غرف'], termsTitle: ['Terms & conditions', 'الشروط والأحكام'], yourPrice: ['Your package price', 'سعر باقتك'],
    avgPerPaying: ['Average {a} per paying traveller ({n})', 'بمتوسط {a} لكل مسافر دافع ({n})'], forTravellers: ['{a} per traveller · {n} travellers', '{a} للمسافر · {n} مسافرين'],
    offerExpired: ['This offer has expired. Ask us to refresh the prices.', 'انتهت صلاحية العرض. اطلب منا تحديث الأسعار.'], validToday: ['Offer valid until today', 'العرض صالح حتى اليوم'], validDays: ['Offer valid {n} more days (until {d})', 'العرض صالح {n} أيام أخرى (حتى {d})'],
    requestChanges: ['Request changes', 'طلب تعديل'], chatWithUs: ['Chat with us on WhatsApp', 'تواصل معنا عبر واتساب'], afterAccept: ['After you accept, we confirm availability with the hotels and send your deposit payment link.', 'بعد قبولك، نؤكد التوفر مع الفنادق ونرسل لك رابط دفع العربون.'],
    cvBanner: ['Client view. This is exactly what your client sees; actions here act as the client.', 'عرض العميل: هذا ما يراه عميلك تماماً، والإجراءات هنا تتم باسم العميل.'], printPdf: ['Print / PDF', 'طباعة / PDF'], backToOffice: ['Back to back office', 'العودة للوحة الإدارة'],
    preparedFor: ['Prepared for {n}', 'مُعد لـ {n}'], samplePackage: ['Sample package', 'باقة نموذجية'], yourTrip: ['Your trip', 'رحلتك'], travellersN: ['{a} adults · {c} children', '{a} بالغين · {c} أطفال'],
    bookingConfirmedTitle: ['Your booking is confirmed', 'تم تأكيد حجزك'], bookingConfirmedText: ['Your trip is confirmed. Your travel documents will follow before departure.', 'رحلتك مؤكدة، وستصلك وثائق السفر قبل موعد الرحلة.'],
    acceptedTitle: ['Thank you! Offer accepted', 'شكراً لك! تم قبول العرض'], acceptedText: ['{a} is confirming your hotels now and will send your deposit link shortly.', 'تقوم {a} الآن بتأكيد الفنادق وسترسل لك رابط العربون قريباً.'],
    waAsk: ['Hello, I have a question about offer {id} ({t}).', 'مرحباً، لدي استفسار عن العرض {id} ({t}).'], samplePkgNote: ['This is a sample. Create a quotation from the package to send it.', 'هذه باقة نموذجية. أنشئ عرضاً منها لإرساله.'],
    changesLabel: ['What would you like to change?', 'ما التعديل الذي تريده؟'], changesPh: ['e.g. one more night, a sea-view room…', 'مثال: ليلة إضافية، غرفة بإطلالة بحرية…'], sendRequest: ['Send request', 'إرسال الطلب'], requestSent: ['Request sent to your agent', 'تم إرسال الطلب']
  };
  for (const k in D) { I18N.en[k] = D[k][0]; I18N.ar[k] = D[k][1]; }
})();

/* Ready-made "easy packages". Net prices are indicative SAR sample rates — agencies replace them with their live supplier rates. */
const B = (en, ar) => ({ en, ar });
const PACKAGES = [
  {
    id: 'pk-dubai', art: 'dubai', cat: 'family', type: 'FIT', nights: 4, adults: 2, children: 2,
    title: B('Dubai Family Escape', 'دبي للعائلة'),
    dest: B('Dubai, UAE', 'دبي، الإمارات'),
    summary: B('Burj Khalifa views, desert safari and theme parks, with a choice of three hotels.', 'إطلالة برج خليفة، رحلة سفاري، ومدن ملاهي، مع اختيار من ثلاثة فنادق.'),
    tags: [B('Kids friendly', 'مناسب للأطفال'), B('Visa-free for GCC', 'بدون تأشيرة لمواطني الخليج')],
    lines: [
      { kind: 'hotel', name: 'Address Sky View', city: B('Downtown Dubai', 'وسط مدينة دبي'), stars: 5, board: 'BB', roomType: B('Deluxe room, Burj view', 'غرفة ديلوكس بإطلالة على البرج'), rooms: 1, rate: 1380, choice: 'A' },
      { kind: 'hotel', name: 'Jumeirah Beach Hotel', city: B('Jumeirah Beach', 'شاطئ جميرا'), stars: 5, board: 'HB', roomType: B('Ocean deluxe room', 'غرفة ديلوكس مطلة على البحر'), rooms: 1, rate: 1640, choice: 'A' },
      { kind: 'hotel', name: 'Rove Downtown', city: B('Downtown Dubai', 'وسط مدينة دبي'), stars: 3, board: 'RO', roomType: B('Rover room', 'غرفة روفر'), rooms: 1, rate: 430, choice: 'A' },
      { kind: 'transfer', name: B('Private airport transfers (return)', 'استقبال وتوديع خاص من وإلى المطار'), basis: 'group', qty: 1, unit: 380 },
      { kind: 'activity', name: B('Burj Khalifa – At the Top, levels 124/125', 'برج خليفة – منصة المشاهدة 124/125'), basis: 'pp', qty: 1, unit: 175 },
      { kind: 'activity', name: B('Desert safari with BBQ dinner', 'رحلة سفاري صحراوية مع عشاء شواء'), basis: 'pp', qty: 1, unit: 210, optional: true },
      { kind: 'activity', name: B('Dubai Parks & Resorts – 1 day pass', 'دبي باركس آند ريزورتس – تذكرة يوم'), basis: 'pp', qty: 1, unit: 295, optional: true },
      { kind: 'insurance', name: B('Travel insurance', 'تأمين السفر'), basis: 'pp', qty: 1, unit: 40 }
    ],
    days: [
      [B('Arrival in Dubai', 'الوصول إلى دبي'), B('Private pickup from DXB and check-in. Evening at Dubai Mall and the fountain show.', 'استقبال خاص من مطار دبي وتسجيل الدخول. أمسية في دبي مول وعرض النافورة.')],
      [B('Downtown & Burj Khalifa', 'وسط المدينة وبرج خليفة'), B('Morning at leisure, afternoon visit to At the Top for sunset views over the city.', 'صباح حر، وزيارة منصة المشاهدة في برج خليفة عصراً لمشاهدة الغروب.')],
      [B('Desert day', 'يوم الصحراء'), B('Dune bashing, camel ride and BBQ dinner under the stars (optional add-on).', 'تطعيس، ركوب الجمال، وعشاء شواء تحت النجوم (إضافة اختيارية).')],
      [B('Theme parks or beach', 'مدن الملاهي أو الشاطئ'), B('A full day at Dubai Parks, or relax at JBR beach.', 'يوم كامل في دبي باركس أو الاسترخاء على شاطئ جي بي آر.')],
      [B('Departure', 'المغادرة'), B('Breakfast, check-out and private transfer to the airport.', 'الإفطار، تسجيل الخروج، والتوصيل الخاص إلى المطار.')]
    ],
    inc: B(['Hotel accommodation as selected', 'Return private airport transfers', 'Burj Khalifa tickets', 'Travel insurance', '24/7 WhatsApp support'], ['الإقامة الفندقية حسب الاختيار', 'استقبال وتوديع خاص', 'تذاكر برج خليفة', 'تأمين السفر', 'دعم على واتساب على مدار الساعة']),
    exc: B(['International flights', 'Tourism Dirham fee (paid at hotel)', 'Personal expenses'], ['تذاكر الطيران', 'رسوم درهم السياحة (تُدفع في الفندق)', 'المصاريف الشخصية'])
  },
  {
    id: 'pk-istanbul', art: 'istanbul', cat: 'family', type: 'FIT', nights: 6, adults: 2, children: 1,
    title: B('Istanbul & Bursa', 'إسطنبول وبورصة'),
    dest: B('Türkiye', 'تركيا'),
    summary: B('Four nights on the Bosphorus and two in green Bursa, with a private Arabic-speaking driver.', 'أربع ليالٍ على البوسفور وليلتان في بورصة الخضراء، مع سائق خاص يتحدث العربية.'),
    tags: [B('Arabic-speaking driver', 'سائق يتحدث العربية'), B('Best seller', 'الأكثر مبيعاً')],
    lines: [
      { kind: 'flight', name: B('Riyadh ⇄ Istanbul, economy', 'الرياض ⇄ إسطنبول، درجة سياحية'), basis: 'pp', qty: 1, unit: 1900, optional: true },
      { kind: 'hotel', name: 'Swissôtel The Bosphorus', city: B('Istanbul', 'إسطنبول'), stars: 5, board: 'BB', roomType: B('Deluxe Bosphorus view', 'ديلوكس بإطلالة على البوسفور'), rooms: 1, nights: 4, rate: 1150, choice: 'A' },
      { kind: 'hotel', name: 'CVK Park Bosphorus', city: B('Istanbul', 'إسطنبول'), stars: 5, board: 'BB', roomType: B('Deluxe room', 'غرفة ديلوكس'), rooms: 1, nights: 4, rate: 960, choice: 'A' },
      { kind: 'hotel', name: 'Almira Hotel', city: B('Bursa', 'بورصة'), stars: 5, board: 'BB', roomType: B('Standard room', 'غرفة قياسية'), rooms: 1, nights: 2, rate: 520 },
      { kind: 'transfer', name: B('Private car with Arabic-speaking driver', 'سيارة خاصة مع سائق يتحدث العربية'), basis: 'unit', qty: 6, unit: 520, detail: B('per day', 'لكل يوم') },
      { kind: 'activity', name: B('Bosphorus dinner cruise', 'عشاء في رحلة بحرية على البوسفور'), basis: 'pp', qty: 1, unit: 220 },
      { kind: 'activity', name: B('Uludağ cable car & snow day', 'تلفريك أولوداغ ويوم في الثلج'), basis: 'pp', qty: 1, unit: 160, optional: true },
      { kind: 'insurance', name: B('Travel insurance', 'تأمين السفر'), basis: 'pp', qty: 1, unit: 55 }
    ],
    days: [
      [B('Welcome to Istanbul', 'أهلاً بك في إسطنبول'), B('Meet your driver at IST and transfer to your hotel.', 'استقبال السائق في مطار إسطنبول والتوجه إلى الفندق.')],
      [B('Old city', 'المدينة القديمة'), B('Hagia Sophia, the Blue Mosque and the Grand Bazaar.', 'آيا صوفيا، الجامع الأزرق، والبازار الكبير.')],
      [B('Bosphorus day', 'يوم البوسفور'), B('Çamlıca Hill and Ortaköy, then a dinner cruise in the evening.', 'تلة تشامليجا وأورتاكوي، ثم عشاء في رحلة بحرية مساءً.')],
      [B('Princes’ Islands', 'جزر الأميرات'), B('Ferry to Büyükada for a slow day by the sea.', 'عبّارة إلى جزيرة بيوك أدا ليوم هادئ على البحر.')],
      [B('Drive to Bursa', 'الطريق إلى بورصة'), B('Scenic drive via Yalova, check in and visit the Green Mosque.', 'طريق جميل عبر يالوفا، تسجيل الدخول وزيارة الجامع الأخضر.')],
      [B('Uludağ mountain', 'جبل أولوداغ'), B('Cable car up the mountain for snow or summer meadows.', 'التلفريك إلى أعلى الجبل للثلج أو المروج الصيفية.')],
      [B('Return & departure', 'العودة والمغادرة'), B('Drive back to Istanbul airport for your flight home.', 'العودة إلى مطار إسطنبول لرحلة العودة.')]
    ],
    inc: B(['Hotels with breakfast', 'Private car & driver for 6 days', 'Bosphorus dinner cruise', 'Travel insurance'], ['فنادق مع الإفطار', 'سيارة وسائق خاص لمدة 6 أيام', 'عشاء الرحلة البحرية', 'تأمين السفر']),
    exc: B(['Entrance fees not mentioned', 'Lunches and dinners', 'Personal expenses'], ['رسوم الدخول غير المذكورة', 'وجبات الغداء والعشاء', 'المصاريف الشخصية'])
  },
  {
    id: 'pk-umrah', art: 'umrah', cat: 'umrah', type: 'GROUP', nights: 5,
    group: { pax: 40, foc: 20, rooms: { sgl: 2, dbl: 7, tpl: 4, quad: 3 } },
    title: B('Umrah Comfort Group', 'برنامج عمرة مريح للمجموعات'),
    dest: B('Makkah & Madinah', 'مكة المكرمة والمدينة المنورة'),
    summary: B('Three nights near the Haram in Makkah and two in Madinah, by private coach with a group leader.', 'ثلاث ليالٍ قرب الحرم في مكة وليلتان في المدينة، بحافلة خاصة مع مشرف للمجموعة.'),
    tags: [B('Group pricing', 'أسعار المجموعات'), B('1 free per 20', 'مجاني لكل 20')],
    lines: [
      { kind: 'hotel', name: 'Swissôtel Makkah', city: B('Makkah', 'مكة المكرمة'), stars: 5, board: 'BB', nights: 3, rates: { sgl: 1450, dbl: 1450, tpl: 1650, quad: 1850 }, choice: 'A' },
      { kind: 'hotel', name: 'Anjum Hotel Makkah', city: B('Makkah', 'مكة المكرمة'), stars: 5, board: 'BB', nights: 3, rates: { sgl: 900, dbl: 900, tpl: 1050, quad: 1200 }, choice: 'A' },
      { kind: 'hotel', name: 'Pullman Zamzam Madinah', city: B('Madinah', 'المدينة المنورة'), stars: 5, board: 'BB', nights: 2, rates: { sgl: 800, dbl: 800, tpl: 950, quad: 1100 } },
      { kind: 'transfer', name: B('Private coach: Jeddah airport → Makkah → Madinah → airport', 'حافلة خاصة: مطار جدة ← مكة ← المدينة ← المطار'), basis: 'group', qty: 1, unit: 6500 },
      { kind: 'transfer', name: B('Haramain high-speed train Makkah → Madinah', 'قطار الحرمين السريع من مكة إلى المدينة'), basis: 'pp', qty: 1, unit: 160, optional: true },
      { kind: 'activity', name: B('Guided ziyarah tours in Makkah & Madinah', 'جولات زيارة مع مرشد في مكة والمدينة'), basis: 'group', qty: 2, unit: 1800 },
      { kind: 'meal', name: B('Daily dinner buffet', 'بوفيه عشاء يومي'), basis: 'pp', qty: 5, unit: 85, optional: true },
      { kind: 'other', name: B('Group leader & bilingual guide', 'مشرف للمجموعة ومرشد بلغتين'), basis: 'group', qty: 1, unit: 2500 }
    ],
    days: [
      [B('Arrival & Umrah', 'الوصول وأداء العمرة'), B('Meet at Jeddah airport, coach to Makkah, check in and perform Umrah with the group leader.', 'الاستقبال في مطار جدة، التوجه بالحافلة إلى مكة، تسجيل الدخول وأداء العمرة مع المشرف.')],
      [B('Makkah ziyarah', 'زيارات مكة'), B('Guided visits to Jabal al-Nour, Arafat and Mina.', 'زيارات مع مرشد إلى جبل النور وعرفات ومنى.')],
      [B('Day for worship', 'يوم للعبادة'), B('Free day for prayers in the Haram.', 'يوم حر للصلاة في الحرم.')],
      [B('Travel to Madinah', 'التوجه إلى المدينة'), B('Coach or Haramain train to Madinah, check in near the Prophet’s Mosque.', 'بالحافلة أو قطار الحرمين إلى المدينة، وتسجيل الدخول قرب المسجد النبوي.')],
      [B('Madinah ziyarah', 'زيارات المدينة'), B('Quba Mosque, Mount Uhud and the Qiblatayn Mosque.', 'مسجد قباء وجبل أحد ومسجد القبلتين.')],
      [B('Departure', 'المغادرة'), B('Transfer to the airport for your return flight.', 'التوصيل إلى المطار لرحلة العودة.')]
    ],
    inc: B(['Hotels with breakfast near the Haram', 'Private coach for all transfers', 'Ziyarah tours with guide', 'Group leader throughout'], ['فنادق مع الإفطار قرب الحرم', 'حافلة خاصة لجميع التنقلات', 'جولات الزيارة مع مرشد', 'مشرف مرافق طوال الرحلة']),
    exc: B(['Flights', 'Umrah visa for non-residents', 'Lunches', 'Personal expenses'], ['تذاكر الطيران', 'تأشيرة العمرة لغير المقيمين', 'وجبات الغداء', 'المصاريف الشخصية'])
  },
  {
    id: 'pk-maldives', art: 'maldives', cat: 'honeymoon', type: 'FIT', nights: 5, adults: 2, children: 0,
    title: B('Maldives Honeymoon', 'شهر العسل في المالديف'),
    dest: B('Maldives', 'المالديف'),
    summary: B('A water villa or a beach studio, seaplane transfers and romantic extras the couple can add.', 'فيلا فوق الماء أو استوديو على الشاطئ، مع طائرة مائية وإضافات رومانسية يختارها العروسان.'),
    tags: [B('Honeymoon', 'شهر عسل'), B('Seaplane', 'طائرة مائية')],
    lines: [
      { kind: 'flight', name: B('Riyadh ⇄ Malé, economy', 'الرياض ⇄ ماليه، درجة سياحية'), basis: 'pp', qty: 1, unit: 2800, optional: true },
      { kind: 'hotel', name: 'Sun Siyam Iru Fushi', city: B('Noonu Atoll', 'جزيرة نونو'), stars: 5, board: 'FB', roomType: B('Water villa with pool', 'فيلا فوق الماء مع مسبح'), rooms: 1, rate: 3900, choice: 'A' },
      { kind: 'hotel', name: 'Kandima Maldives', city: B('Dhaalu Atoll', 'جزيرة داالو'), stars: 4, board: 'HB', roomType: B('Beach studio', 'استوديو على الشاطئ'), rooms: 1, rate: 1650, choice: 'A' },
      { kind: 'transfer', name: B('Seaplane transfers (return)', 'طائرة مائية ذهاباً وعودة'), basis: 'pp', qty: 1, unit: 2150 },
      { kind: 'activity', name: B('Sunset dolphin cruise', 'رحلة غروب لمشاهدة الدلافين'), basis: 'pp', qty: 1, unit: 280, optional: true },
      { kind: 'activity', name: B('Couples spa ritual, 90 min', 'جلسة سبا للزوجين 90 دقيقة'), basis: 'group', qty: 1, unit: 1350, optional: true },
      { kind: 'meal', name: B('Private dinner on the beach', 'عشاء خاص على الشاطئ'), basis: 'group', qty: 1, unit: 1600, optional: true },
      { kind: 'insurance', name: B('Travel insurance', 'تأمين السفر'), basis: 'pp', qty: 1, unit: 60 }
    ],
    days: [
      [B('Arrival in Malé', 'الوصول إلى ماليه'), B('Seaplane over the atolls to your resort, welcome drink at the villa.', 'طائرة مائية فوق الجزر إلى المنتجع، ومشروب ترحيبي في الفيلا.')],
      [B('Reef & lagoon', 'الشعاب والبحيرة'), B('Snorkel the house reef and relax by your private pool.', 'الغطس عند الشعاب المرجانية والاسترخاء في المسبح الخاص.')],
      [B('Dolphins at sunset', 'الدلافين عند الغروب'), B('Optional sunset cruise to spot spinner dolphins.', 'رحلة غروب اختيارية لمشاهدة الدلافين.')],
      [B('Spa & dinner', 'السبا والعشاء'), B('Couples spa in the afternoon, private beach dinner at night.', 'جلسة سبا للزوجين عصراً، وعشاء خاص على الشاطئ ليلاً.')],
      [B('Free day', 'يوم حر'), B('Water sports, a sandbank picnic or simply doing nothing.', 'رياضات مائية أو نزهة على جزيرة رملية أو الاسترخاء.')],
      [B('Departure', 'المغادرة'), B('Seaplane back to Malé for your flight home.', 'العودة بالطائرة المائية إلى ماليه لرحلة العودة.')]
    ],
    inc: B(['Resort stay with meals as selected', 'Return seaplane transfers', 'Honeymoon welcome amenities', 'Travel insurance'], ['الإقامة مع الوجبات حسب الاختيار', 'طائرة مائية ذهاباً وعودة', 'هدايا ترحيبية لشهر العسل', 'تأمين السفر']),
    exc: B(['Green tax (paid at resort)', 'Drinks outside meal plan', 'Personal expenses'], ['الضريبة الخضراء (تُدفع في المنتجع)', 'المشروبات خارج الوجبات', 'المصاريف الشخصية'])
  },
  {
    id: 'pk-baku', art: 'baku', cat: 'family', type: 'FIT', nights: 5, adults: 2, children: 2,
    title: B('Baku & Gabala', 'باكو وقبالة'),
    dest: B('Azerbaijan', 'أذربيجان'),
    summary: B('The Flame Towers and the old city, then mountain air and cable cars in Gabala.', 'أبراج اللهب والمدينة القديمة، ثم هواء الجبال والتلفريك في قبالة.'),
    tags: [B('E-visa included', 'شامل التأشيرة الإلكترونية'), B('Summer favourite', 'مفضل في الصيف')],
    lines: [
      { kind: 'visa', name: B('Azerbaijan e-visa', 'تأشيرة أذربيجان الإلكترونية'), basis: 'pp', qty: 1, unit: 110 },
      { kind: 'hotel', name: 'Hilton Baku', city: B('Baku', 'باكو'), stars: 5, board: 'BB', roomType: B('Family room', 'غرفة عائلية'), rooms: 1, nights: 3, rate: 720 },
      { kind: 'hotel', name: 'Qafqaz Riverside Gabala', city: B('Gabala', 'قبالة'), stars: 5, board: 'BB', roomType: B('Deluxe room', 'غرفة ديلوكس'), rooms: 1, nights: 2, rate: 560 },
      { kind: 'transfer', name: B('Private car with driver', 'سيارة خاصة مع سائق'), basis: 'unit', qty: 5, unit: 420, detail: B('per day', 'لكل يوم') },
      { kind: 'activity', name: B('Tufandag cable car', 'تلفريك توفانداغ'), basis: 'pp', qty: 1, unit: 95 },
      { kind: 'activity', name: B('Gobustan & mud volcanoes tour', 'جولة قوبوستان والبراكين الطينية'), basis: 'pp', qty: 1, unit: 140, optional: true },
      { kind: 'insurance', name: B('Travel insurance', 'تأمين السفر'), basis: 'pp', qty: 1, unit: 45 }
    ],
    days: [
      [B('Arrival in Baku', 'الوصول إلى باكو'), B('Airport pickup and an evening walk on the Boulevard.', 'الاستقبال من المطار ونزهة مسائية على الكورنيش.')],
      [B('Old city & Flame Towers', 'المدينة القديمة وأبراج اللهب'), B('Icherisheher, Maiden Tower and the Highland Park viewpoint.', 'إتشري شهر، برج العذراء، وإطلالة حديقة المرتفعات.')],
      [B('Gobustan (optional)', 'قوبوستان (اختياري)'), B('Rock art and bubbling mud volcanoes south of Baku.', 'النقوش الصخرية والبراكين الطينية جنوب باكو.')],
      [B('Drive to Gabala', 'الطريق إلى قبالة'), B('Through Shamakhi to the mountains, check in by the river.', 'عبر شماخي إلى الجبال، وتسجيل الدخول بجانب النهر.')],
      [B('Tufandag', 'توفانداغ'), B('Cable car, Nohur lake and the Seven Beauties waterfall.', 'التلفريك، بحيرة نوهور، وشلال الجميلات السبع.')],
      [B('Departure', 'المغادرة'), B('Drive back to Baku airport.', 'العودة إلى مطار باكو.')]
    ],
    inc: B(['E-visa', 'Hotels with breakfast', 'Private car & driver', 'Cable car tickets', 'Travel insurance'], ['التأشيرة الإلكترونية', 'فنادق مع الإفطار', 'سيارة وسائق خاص', 'تذاكر التلفريك', 'تأمين السفر']),
    exc: B(['Flights', 'Lunches and dinners', 'Personal expenses'], ['تذاكر الطيران', 'وجبات الغداء والعشاء', 'المصاريف الشخصية'])
  },
  {
    id: 'pk-georgia', art: 'georgia', cat: 'adventure', type: 'FIT', nights: 6, adults: 2, children: 0,
    title: B('Georgia Nature Trail', 'جورجيا بين الطبيعة والجبال'),
    dest: B('Tbilisi & Kazbegi', 'تبليسي وكازبيجي'),
    summary: B('Cobbled Tbilisi, then the high Caucasus with a 4x4 driver and a hike to Gergeti.', 'تبليسي القديمة ثم جبال القوقاز مع سائق دفع رباعي ورحلة مشي إلى جيرجيتي.'),
    tags: [B('Mountains', 'جبال'), B('Active', 'نشاط')],
    lines: [
      { kind: 'hotel', name: 'Radisson Blu Iveria', city: B('Tbilisi', 'تبليسي'), stars: 5, board: 'BB', roomType: B('Superior room', 'غرفة سوبيريور'), rooms: 1, nights: 4, rate: 640 },
      { kind: 'hotel', name: 'Rooms Hotel Kazbegi', city: B('Stepantsminda', 'ستيبانتسميندا'), stars: 4, board: 'BB', roomType: B('Mountain-view room', 'غرفة بإطلالة جبلية'), rooms: 1, nights: 2, rate: 780 },
      { kind: 'transfer', name: B('Private 4x4 with driver', 'سيارة دفع رباعي مع سائق'), basis: 'unit', qty: 6, unit: 380, detail: B('per day', 'لكل يوم') },
      { kind: 'activity', name: B('Gergeti Trinity hike & Dariali gorge', 'مشي إلى كنيسة جيرجيتي ووادي داريالي'), basis: 'pp', qty: 1, unit: 90 },
      { kind: 'activity', name: B('Tandem paragliding in Gudauri', 'طيران شراعي مزدوج في غوداوري'), basis: 'pp', qty: 1, unit: 380, optional: true },
      { kind: 'insurance', name: B('Travel insurance', 'تأمين السفر'), basis: 'pp', qty: 1, unit: 45 }
    ],
    days: [
      [B('Arrival in Tbilisi', 'الوصول إلى تبليسي'), B('Pickup and dinner in the old town.', 'الاستقبال وعشاء في المدينة القديمة.')],
      [B('Old Tbilisi', 'تبليسي القديمة'), B('Narikala fortress by cable car and the sulphur baths.', 'قلعة ناريكالا بالتلفريك والحمامات الكبريتية.')],
      [B('Mtskheta', 'متسخيتا'), B('Day trip to the ancient capital and Jvari monastery.', 'رحلة يومية إلى العاصمة القديمة ودير جفاري.')],
      [B('Military Road to Kazbegi', 'الطريق العسكري إلى كازبيجي'), B('Ananuri fortress and Gudauri viewpoint on the way.', 'قلعة أنانوري وإطلالة غوداوري في الطريق.')],
      [B('Gergeti hike', 'رحلة جيرجيتي'), B('Hike to Gergeti Trinity Church, afternoon in Dariali gorge.', 'المشي إلى كنيسة جيرجيتي، وعصراً في وادي داريالي.')],
      [B('Back to Tbilisi', 'العودة إلى تبليسي'), B('Optional paragliding in Gudauri on the way down.', 'طيران شراعي اختياري في غوداوري أثناء العودة.')],
      [B('Departure', 'المغادرة'), B('Transfer to Tbilisi airport.', 'التوصيل إلى مطار تبليسي.')]
    ],
    inc: B(['Hotels with breakfast', 'Private 4x4 & driver', 'Guided Gergeti hike', 'Travel insurance'], ['فنادق مع الإفطار', 'سيارة دفع رباعي وسائق خاص', 'رحلة جيرجيتي مع مرشد', 'تأمين السفر']),
    exc: B(['Flights', 'Lunches and dinners', 'Personal expenses'], ['تذاكر الطيران', 'وجبات الغداء والعشاء', 'المصاريف الشخصية'])
  },
  {
    id: 'pk-alula', art: 'alula', cat: 'domestic', type: 'FIT', nights: 3, adults: 2, children: 0,
    title: B('AlUla Heritage Weekend', 'عطلة نهاية الأسبوع في العُلا'),
    dest: B('AlUla, Saudi Arabia', 'العُلا، السعودية'),
    summary: B('Hegra, the old town and desert nights, with an optional hot-air balloon at sunrise.', 'الحِجر والبلدة القديمة وليالي الصحراء، مع منطاد اختياري عند الشروق.'),
    tags: [B('Saudi destination', 'وجهة سعودية'), B('Weekend', 'نهاية أسبوع')],
    lines: [
      { kind: 'flight', name: B('Riyadh ⇄ AlUla, economy', 'الرياض ⇄ العُلا، درجة سياحية'), basis: 'pp', qty: 1, unit: 1150, optional: true },
      { kind: 'hotel', name: 'Banyan Tree AlUla', city: B('Ashar Valley', 'وادي عشار'), stars: 5, board: 'BB', roomType: B('Tented pool villa', 'فيلا خيمة مع مسبح'), rooms: 1, rate: 4200, choice: 'A' },
      { kind: 'hotel', name: 'Shaden Resort', city: B('AlUla', 'العُلا'), stars: 4, board: 'BB', roomType: B('Deluxe room', 'غرفة ديلوكس'), rooms: 1, rate: 1450, choice: 'A' },
      { kind: 'transfer', name: B('Airport & sightseeing transfers', 'تنقلات المطار والجولات'), basis: 'group', qty: 1, unit: 950 },
      { kind: 'activity', name: B('Hegra guided tour', 'جولة الحِجر مع مرشد'), basis: 'pp', qty: 1, unit: 300 },
      { kind: 'activity', name: B('Old Town & Maraya visit', 'البلدة القديمة ومرايا'), basis: 'pp', qty: 1, unit: 120 },
      { kind: 'activity', name: B('Hot-air balloon at sunrise', 'منطاد هوائي عند الشروق'), basis: 'pp', qty: 1, unit: 1150, optional: true }
    ],
    days: [
      [B('Arrive in AlUla', 'الوصول إلى العُلا'), B('Pickup from AlUla airport, sunset at Elephant Rock.', 'الاستقبال من مطار العُلا، والغروب عند جبل الفيل.')],
      [B('Hegra', 'الحِجر'), B('Guided tour of the Nabataean tombs, Saudi Arabia’s first UNESCO site.', 'جولة مع مرشد في مقابر الأنباط، أول موقع سعودي في قائمة اليونسكو.')],
      [B('Old Town & Maraya', 'البلدة القديمة ومرايا'), B('Optional balloon at sunrise, then the mud-brick old town and Maraya.', 'منطاد اختياري عند الشروق، ثم البلدة الطينية القديمة ومرايا.')],
      [B('Departure', 'المغادرة'), B('Breakfast and transfer to the airport.', 'الإفطار والتوصيل إلى المطار.')]
    ],
    inc: B(['Hotel with breakfast', 'All transfers', 'Hegra and Old Town tickets'], ['الفندق مع الإفطار', 'جميع التنقلات', 'تذاكر الحِجر والبلدة القديمة']),
    exc: B(['Lunches and dinners', 'Personal expenses'], ['وجبات الغداء والعشاء', 'المصاريف الشخصية'])
  },
  {
    id: 'pk-riyadh', art: 'riyadh', cat: 'groups', type: 'GROUP', nights: 3,
    group: { pax: 30, foc: 0, rooms: { sgl: 20, dbl: 5, tpl: 0, quad: 0 } },
    title: B('Riyadh Conference Group', 'مجموعة مؤتمر في الرياض'),
    dest: B('Riyadh, Saudi Arabia', 'الرياض، السعودية'),
    summary: B('Three nights for a corporate team: hotel, meeting room, coaches and a gala dinner.', 'ثلاث ليالٍ لفريق شركة: فندق، قاعة اجتماعات، حافلات، وعشاء احتفالي.'),
    tags: [B('Corporate', 'شركات'), B('MICE', 'مؤتمرات')],
    lines: [
      { kind: 'hotel', name: 'Hilton Riyadh Hotel & Residences', city: B('Riyadh', 'الرياض'), stars: 5, board: 'BB', nights: 3, rates: { sgl: 950, dbl: 1050, tpl: 0, quad: 0 }, choice: 'A' },
      { kind: 'hotel', name: 'Crowne Plaza Riyadh RDC', city: B('Riyadh', 'الرياض'), stars: 5, board: 'BB', nights: 3, rates: { sgl: 720, dbl: 800, tpl: 0, quad: 0 }, choice: 'A' },
      { kind: 'transfer', name: B('Coach transfers: airport & venue', 'حافلات: المطار وموقع المؤتمر'), basis: 'unit', qty: 3, unit: 1400, detail: B('per day', 'لكل يوم') },
      { kind: 'other', name: B('Meeting room, full day', 'قاعة اجتماعات ليوم كامل'), basis: 'unit', qty: 3, unit: 6500, detail: B('per day', 'لكل يوم') },
      { kind: 'meal', name: B('Gala dinner', 'عشاء احتفالي'), basis: 'pp', qty: 1, unit: 260 },
      { kind: 'activity', name: B('Diriyah evening tour', 'جولة مسائية في الدرعية'), basis: 'pp', qty: 1, unit: 180, optional: true }
    ],
    days: [
      [B('Arrival', 'الوصول'), B('Coach from RUH, check-in and welcome coffee.', 'الحافلة من مطار الرياض، تسجيل الدخول وقهوة ترحيبية.')],
      [B('Conference day 1', 'اليوم الأول للمؤتمر'), B('Full-day meeting room with coffee breaks and lunch.', 'قاعة اجتماعات ليوم كامل مع استراحات قهوة وغداء.')],
      [B('Conference day 2', 'اليوم الثاني للمؤتمر'), B('Sessions all day, gala dinner in the evening.', 'جلسات طوال اليوم، وعشاء احتفالي مساءً.')],
      [B('Departure', 'المغادرة'), B('Optional Diriyah visit before coaches to the airport.', 'زيارة اختيارية للدرعية قبل التوجه إلى المطار.')]
    ],
    inc: B(['Hotel with breakfast', 'Meeting room with AV', 'All coach transfers', 'Gala dinner'], ['الفندق مع الإفطار', 'قاعة اجتماعات مع التجهيزات', 'جميع تنقلات الحافلات', 'العشاء الاحتفالي']),
    exc: B(['Flights', 'Room service and extras'], ['تذاكر الطيران', 'خدمة الغرف والإضافات'])
  }
];

/* ---------- Utilities ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const tx = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] ?? v.en ?? '') : (v ?? '');
const uid = () => Math.random().toString(36).slice(2, 9);
const uuid = () => (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
const clone = o => JSON.parse(JSON.stringify(o));
const num = v => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
const pad = n => String(n).padStart(2, '0');
const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => isoDate(new Date());
const parseD = iso => { const [y, m, d] = String(iso || today()).slice(0, 10).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1); };
const addDays = (iso, n) => { const d = parseD(iso); d.setDate(d.getDate() + n); return isoDate(d); };
const daysBetween = (a, b) => Math.round((parseD(b) - parseD(a)) / 86400000);
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* ---------- Icons (inline SVG, no external icon font) ---------- */
const ICONS = {
  dashboard: '<rect x="3" y="3" width="7.5" height="9" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="5" rx="1.5"/><rect x="13.5" y="11" width="7.5" height="10" rx="1.5"/><rect x="3" y="15" width="7.5" height="6" rx="1.5"/>',
  file: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  box: '<path d="M21 8l-9-5-9 5 9 5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="16.5" cy="15" r="1.2"/>',
  brush: '<path d="M14.5 4.5l5 5L10 19H5v-5z"/><path d="M12 7l5 5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  chat: '<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 9.5c.5 2.5 2.5 4.5 5 5"/>',
  hotel: '<path d="M3 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M15 9h4a2 2 0 0 1 2 2v10M7 7h4M7 11h4M7 15h4M2 21h20"/>',
  flight: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
  transfer: '<path d="M5 17h14v-5l-2-5H7l-2 5z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M5 12h14"/>',
  visa: '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 17h6"/>',
  activity: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 7v2M14 11v2M14 15v2"/>',
  meal: '<path d="M7 2v20M4 2v6a3 3 0 0 0 6 0V2M17 2c-2 2-3 5-3 8h3v12"/>',
  insurance: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  other: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  send: '<path d="M4 12l16-8-6 16-3-7z"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  bed: '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-8v5"/><circle cx="6.5" cy="11" r="1.5"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17.5v.5"/>',
  pin: '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  upload: '<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
  money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  print: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2"/><rect x="6" y="14" width="12" height="7"/>'
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ICONS.other}</svg>`;
const KIND_IC = { hotel: 'hotel', flight: 'flight', transfer: 'transfer', visa: 'visa', activity: 'activity', meal: 'meal', insurance: 'insurance', other: 'other' };

/* ---------- Destination art (drawn, so it works offline and inside any sandbox) ---------- */
let artN = 0;
const ARTS = {
  dubai(u) {
    const r = rng(11); let b = '';
    for (let x = 0; x < 400; x += 18) { const h = 30 + r() * 70; if (x > 170 && x < 230) continue; b += `<rect x="${x}" y="${200 - h}" width="${12 + r() * 6}" height="${h}"/>`; }
    return `<defs><linearGradient id="s${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22305A"/><stop offset=".62" stop-color="#E8875A"/><stop offset="1" stop-color="#F7C77E"/></linearGradient></defs>
    <rect width="400" height="200" fill="url(#s${u})"/><circle cx="305" cy="128" r="34" fill="#FBD38D" opacity=".85"/>
    <g fill="#1A1F33">${b}<polygon points="184,200 191,122 195,74 200,18 205,74 209,122 216,200"/></g>`;
  },
  istanbul(u) {
    const min = (x, h) => `<rect x="${x}" y="${178 - h}" width="6" height="${h}"/><polygon points="${x - 3},${180 - h} ${x + 3},${158 - h} ${x + 9},${180 - h}"/>`;
    return `<defs><linearGradient id="s${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A3B5C"/><stop offset=".65" stop-color="#F2A65A"/><stop offset="1" stop-color="#F5D7A1"/></linearGradient></defs>
    <rect width="400" height="200" fill="url(#s${u})"/><circle cx="80" cy="70" r="22" fill="#FCE3B0" opacity=".8"/>
    <g fill="#1B2236"><path d="M140 152a60 46 0 0 1 120 0z"/><path d="M118 160a24 20 0 0 1 48 0z"/><path d="M234 160a24 20 0 0 1 48 0z"/><rect x="112" y="150" width="176" height="30"/>${min(98, 110)}${min(296, 110)}${min(76, 86)}${min(318, 86)}<rect x="196" y="92" width="8" height="14"/></g>
    <rect y="178" width="400" height="22" fill="#18233A"/><path d="M0 186h400M30 192h120M220 192h140" stroke="#F2A65A" stroke-opacity=".35" stroke-width="2"/>`;
  },
  umrah(u) {
    let p = '';
    for (let y = -10; y < 210; y += 44) for (let x = (y / 44 % 2) * 22 - 10; x < 420; x += 44) p += `<g transform="translate(${x} ${y})"><rect x="-11" y="-11" width="22" height="22"/><rect x="-11" y="-11" width="22" height="22" transform="rotate(45)"/></g>`;
    let a = ''; for (let x = 0; x < 400; x += 40) a += `<path d="M${x} 200V160a20 22 0 0 1 40 0v40z"/>`;
    return `<defs><linearGradient id="s${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B3D3A"/><stop offset="1" stop-color="#16675E"/></linearGradient><radialGradient id="g${u}" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#F3C969" stop-opacity=".55"/><stop offset="1" stop-color="#F3C969" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="200" fill="url(#s${u})"/><g fill="none" stroke="#E9C46A" stroke-opacity=".22" stroke-width="1.2">${p}</g>
    <ellipse cx="200" cy="120" rx="170" ry="110" fill="url(#g${u})"/><g fill="#082B28">${a}</g><rect y="196" width="400" height="4" fill="#E9C46A" opacity=".6"/>`;
  },
  maldives(u) {
    let v = ''; [150, 205, 260, 315].forEach((x, i) => { v += `<path d="M${x - 4} 160v18M${x + 26} 160v18" stroke="#3B2F2A" stroke-width="2"/><rect x="${x - 6}" y="150" width="36" height="11" rx="2" fill="#6B4E3D"/><polygon points="${x - 10},152 ${x + 12},${132 - i % 2 * 4} ${x + 34},152" fill="#3B2F2A"/>`; });
    return `<defs><linearGradient id="s${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4FB6CF"/><stop offset="1" stop-color="#F9E4B7"/></linearGradient><linearGradient id="w${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3CC1C9"/><stop offset="1" stop-color="#0E6E8C"/></linearGradient></defs>
    <rect width="400" height="200" fill="url(#s${u})"/><circle cx="330" cy="96" r="26" fill="#FFF3D6"/><rect y="120" width="400" height="80" fill="url(#w${u})"/>
    <path d="M0 138h400M0 150h400" stroke="#fff" stroke-opacity=".25"/>${v}
    <path d="M60 200C62 160 70 120 92 92" stroke="#3B2F2A" stroke-width="5" fill="none"/>
    <g fill="#1F5E3B"><ellipse cx="74" cy="86" rx="32" ry="8" transform="rotate(-20 74 86)"/><ellipse cx="108" cy="84" rx="30" ry="7" transform="rotate(25 108 84)"/><ellipse cx="92" cy="74" rx="26" ry="7" transform="rotate(-70 92 74)"/><ellipse cx="104" cy="100" rx="26" ry="6" transform="rotate(55 104 100)"/></g>`;
  },
  baku(u) {
    const r = rng(5); let s = ''; for (let i = 0; i < 40; i++) s += `<circle cx="${r() * 400}" cy="${r() * 110}" r="${r() * 1.3 + .3}"/>`;
    const fl = (x, h, w) => `<path d="M${x} 200C${x - w} ${200 - h * .45} ${x - w * .4} ${200 - h * .8} ${x + w * .3} ${200 - h}C${x + w * .9} ${200 - h * .7} ${x + w * 1.4} ${200 - h * .4} ${x + w * 1.1} 200Z"/>`;
    return `<defs><linearGradient id="s${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1530"/><stop offset="1" stop-color="#4A2F66"/></linearGradient><linearGradient id="f${u}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#E4572E"/><stop offset="1" stop-color="#F9B046"/></linearGradient></defs>
    <rect width="400" height="200" fill="url(#s${u})"/><g fill="#fff" opacity=".7">${s}</g>
    <g fill="url(#f${u})">${fl(160, 140, 34)}${fl(205, 165, 38)}${fl(255, 120, 30)}</g>
    <path d="M0 200V178q60-14 120-4t140-2 140 6v22z" fill="#120E24"/>`;
  },
  georgia(u) {
    return `<defs><linearGradient id="s${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FBCDB"/><stop offset="1" stop-color="#EAF2F6"/></linearGradient></defs>
    <rect width="400" height="200" fill="url(#s${u})"/>
    <polygon points="0,150 70,70 120,110 190,40 260,105 320,60 400,130 400,200 0,200" fill="#8AA6BD"/>
    <polygon points="190,40 175,58 185,56 197,62 206,52" fill="#fff"/><polygon points="320,60 308,74 318,72 330,77" fill="#fff"/><polygon points="70,70 60,82 72,80 80,84" fill="#fff"/>
    <polygon points="0,170 80,120 150,150 230,110 300,150 400,120 400,200 0,200" fill="#5E7F96"/>
    <polygon points="0,200 0,182 100,160 200,178 290,158 400,176 400,200" fill="#2F4A5C"/>
    <g fill="#24394A"><rect x="282" y="146" width="16" height="14"/><polygon points="280,148 290,134 300,148"/></g>`;
  },
  alula(u) {
    const r = rng(9); let s = ''; for (let i = 0; i < 28; i++) s += `<circle cx="${r() * 400}" cy="${r() * 70}" r="${r() + .3}"/>`;
    return `<defs><linearGradient id="s${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#36295A"/><stop offset=".6" stop-color="#E6845B"/><stop offset="1" stop-color="#F3B576"/></linearGradient></defs>
    <rect width="400" height="200" fill="url(#s${u})"/><g fill="#fff" opacity=".6">${s}</g>
    <path d="M40 200V120q10-34 40-30t36 34l6 76z" fill="#6B3426"/>
    <path d="M150 200l4-96q4-30 34-30 32 0 40 26 6 22-4 40l-10 26q-8 18 10 34z" fill="#5A2C21"/><path d="M196 200q-8-36 14-46 16-8 20 46z" fill="#F3B576" opacity=".9"/>
    <path d="M290 200l6-70q6-24 30-22 22 2 26 26l4 66z" fill="#6B3426"/>
    <path d="M0 200v-14q100-22 200-6t200-4v24z" fill="#9C5B3B"/>`;
  },
  riyadh(u) {
    const r = rng(3); let b = '';
    for (let x = 0; x < 400; x += 16) { if (x > 168 && x < 232) continue; const h = 20 + r() * 60; b += `<rect x="${x}" y="${200 - h}" width="${10 + r() * 6}" height="${h}"/>`; }
    return `<defs><linearGradient id="s${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1D3557"/><stop offset=".7" stop-color="#C9845A"/><stop offset="1" stop-color="#E9B56E"/></linearGradient></defs>
    <rect width="400" height="200" fill="url(#s${u})"/><g fill="#15213A">${b}<path d="M178 200L183 74Q200 14 217 74L222 200Z"/></g>
    <path d="M188 74Q200 40 212 74L211 86Q200 60 189 86Z" fill="#B47A5A"/><rect x="186" y="80" width="28" height="3" fill="#15213A"/>`;
  },
  generic(u) {
    return `<defs><linearGradient id="s${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--brand)"/><stop offset="1" stop-color="#E9B56E"/></linearGradient></defs>
    <rect width="400" height="200" fill="url(#s${u})"/><circle cx="300" cy="70" r="30" fill="#fff" opacity=".35"/>
    <path d="M0 200v-50q90-40 190-8t210-12v70z" fill="#000" opacity=".18"/><path d="M0 200v-26q120-30 230-4t170-6v36z" fill="#000" opacity=".25"/>`;
  }
};
const ART_KEYS = Object.keys(ARTS);
function artHTML(key, cover, credit) {
  if (cover) return `<img src="${esc(cover)}" alt="" loading="lazy">${credit && credit.author ? `<a class="credit" href="${esc(credit.author_link || 'https://unsplash.com')}" target="_blank" rel="noopener">📷 ${esc(credit.author)} · Unsplash</a>` : ''}`;
  const u = 'a' + (++artN); const f = ARTS[key] || ARTS.generic;
  return `<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${f(u)}</svg>`;
}

/* ---------- State ---------- */
const KEY = 'wejha-demo-v1';
let S = null;
const OCC = { sgl: 1, dbl: 2, tpl: 3, quad: 4 };
const KINDS = ['hotel', 'flight', 'transfer', 'visa', 'activity', 'meal', 'insurance', 'other'];
const BOARDS = ['RO', 'BB', 'HB', 'FB', 'AI'];
const STATUSES = ['draft', 'sent', 'viewed', 'accepted', 'confirmed', 'lost'];
const CUR_AR = { SAR: 'ر.س', AED: 'د.إ', USD: '$', KWD: 'د.ك', QAR: 'ر.ق', BHD: 'د.ب', OMR: 'ر.ع' };

function save() {
  if (window.OFFER) return;                       // public offer page: changes go through offer_* functions
  if (Cloud.on) { Cloud.schedule(); try { localStorage.setItem(KEY + '-ui', JSON.stringify(S.ui)); } catch (e) { } return; }
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage full or blocked: keep working in memory */ }
}
/* Roles: owner (everything), agent (quotes, clients, packages, payments), accountant (view + payments) */
const ROLE_CAN = { edit: ['owner', 'agent'], brand: ['owner'], team: ['owner'], pay: ['owner', 'agent', 'accountant'] };
function can(x) { const r = (Cloud.on) ? Cloud.role : 'owner'; return (ROLE_CAN[x] || []).includes(r); }
function load() { try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } }

function defaultBrand() {
  return {
    name: 'Al Waha Travel', nameAr: 'الواحة للسفر والسياحة',
    tagline: 'Journeys, thoughtfully planned', taglineAr: 'رحلات مُخططة بعناية',
    logo: null, color: '#0E7C74', currency: 'SAR', vat: 15, markup: 12,
    phone: '+966 55 012 3344', whatsapp: '+966 55 012 3344', email: 'trips@alwaha.example',
    domain: 'trips.alwaha.sa', prefix: 'AW', poweredBy: true, validDays: 5,
    termsEn: 'Prices are subject to availability at the time of confirmation. A deposit secures the booking; the balance is due before departure. Cancellation fees follow each hotel’s policy.',
    termsAr: 'الأسعار خاضعة للتوفر وقت التأكيد. يُثبَّت الحجز بدفع العربون، ويُسدَّد المبلغ المتبقي قبل السفر. رسوم الإلغاء حسب سياسة كل فندق.'
  };
}

function blankQuote(type, lang) {
  const b = S.brand;
  return {
    id: `${b.prefix}-${++S.seq}`, type, status: 'draft', clientId: '', lang: lang || S.ui.lang,
    title: '', dest: '', art: 'generic', cover: null, pkg: '',
    start: addDays(today(), 30), nights: 4, validUntil: addDays(today(), b.validDays || 5), created: today(),
    adults: 2, children: 0, infants: 0,
    group: { pax: 20, foc: 0, rooms: { sgl: 0, dbl: 10, tpl: 0, quad: 0 }, rooming: [] },
    lines: [], markupType: 'pct', markup: b.markup, showItemPrices: false,
    days: [], inc: [], exc: [], terms: lang === 'ar' ? b.termsAr : b.termsEn,
    deposit: 30, balanceDays: 21, selection: { choices: {}, addons: [] },
    paid: 0, payments: [], activity: [{ ts: today(), k: 'created' }], notes: '', changeReq: ''
  };
}

function newLine(kind, q) {
  return { id: uid(), kind, name: '', detail: '', city: '', stars: kind === 'hotel' ? 4 : 0, board: 'BB', roomType: '', rooms: 1, nights: q ? q.nights : 1, rate: 0, rates: { sgl: 0, dbl: 0, tpl: 0, quad: 0 }, basis: kind === 'transfer' || kind === 'other' ? 'group' : 'pp', qty: 1, unit: 0, optional: false, choice: '' };
}

function quoteFromPackage(pk, o = {}) {
  const lang = o.lang || S.ui.lang;
  const q = blankQuote(pk.type, lang);
  q.title = tx(pk.title, lang); q.dest = tx(pk.dest, lang); q.art = pk.art || 'generic'; q.cover = pk.cover || null; q.coverCredit = pk.coverCredit || null;
  q.nights = pk.nights; q.pkg = pk.id; q.start = o.start || q.start;
  if (pk.type === 'GROUP') { q.group = Object.assign(clone(q.group), clone(pk.group || {})); q.group.rooming = []; }
  else { q.adults = o.adults ?? pk.adults ?? 2; q.children = o.children ?? pk.children ?? 0; }
  if (o.clientId) q.clientId = o.clientId;
  q.lines = pk.lines.map(l => {
    const n = Object.assign(newLine(l.kind, q), clone(l));
    n.id = uid(); n.name = tx(l.name, lang); n.detail = tx(l.detail, lang) || ''; n.city = tx(l.city, lang) || ''; n.roomType = tx(l.roomType, lang) || '';
    n.nights = l.nights ?? pk.nights;
    n.rates = Object.assign({ sgl: 0, dbl: 0, tpl: 0, quad: 0 }, l.rates || {});
    if (l.kind === 'hotel' && !l.rates) n.rates = { sgl: l.rate || 0, dbl: l.rate || 0, tpl: Math.round((l.rate || 0) * 1.2), quad: Math.round((l.rate || 0) * 1.4) };
    if (l.kind === 'hotel' && !l.rate && l.rates) n.rate = l.rates.dbl || 0;
    if (pk.type === 'FIT' && l.kind === 'hotel') n.rooms = Math.max(1, Math.ceil((q.adults + q.children) / 4));
    return n;
  });
  q.days = (pk.days || []).map(d => Array.isArray(d) ? { t: tx(d[0], lang), d: tx(d[1], lang) } : { t: tx(d.t, lang), d: tx(d.d, lang) });
  q.inc = (tx(pk.inc, lang) || []).slice(); q.exc = (tx(pk.exc, lang) || []).slice();
  return q;
}

/* ---------- Pricing engine ---------- */
const paxOf = q => q.type === 'GROUP' ? num(q.group.pax) : num(q.adults) + num(q.children);
const focCount = q => { if (q.type !== 'GROUP') return 0; const f = num(q.group.foc); return f > 0 ? Math.floor(paxOf(q) / (f + 1)) : 0; };
const payingPax = q => Math.max(1, paxOf(q) - focCount(q));
const choiceSets = q => [...new Set(q.lines.filter(l => l.choice).map(l => l.choice))];
const firstInSet = (q, set) => { const f = q.lines.find(x => x.choice === set); return f && f.id; };
function chosenIn(q, set, sel) { sel = sel || q.selection; const c = sel.choices && sel.choices[set]; return q.lines.some(l => l.id === c && l.choice === set) ? c : firstInSet(q, set); }
function lineActive(q, l, sel) {
  sel = sel || q.selection;
  if (l.optional && !(sel.addons || []).includes(l.id)) return false;
  if (l.choice) return chosenIn(q, l.choice, sel) === l.id;
  return true;
}
function lineCost(q, l) {
  if (l.kind === 'hotel') {
    const n = num(l.nights);
    if (q.type === 'GROUP') return Object.keys(OCC).reduce((a, k) => a + num(q.group.rooms[k]) * num(l.rates && l.rates[k]) * n, 0);
    return num(l.rooms) * num(l.rate) * n;
  }
  const u = num(l.unit), qty = num(l.qty);
  return l.basis === 'pp' ? u * qty * paxOf(q) : u * qty;
}
function price(q, sel) {
  sel = sel || q.selection;
  let net = 0, otherNet = 0;
  q.lines.forEach(l => { if (!lineActive(q, l, sel)) return; const c = lineCost(q, l); net += c; if (l.kind !== 'hotel') otherNet += c; });
  const pax = paxOf(q), paying = payingPax(q), vatR = num(S.brand.vat) / 100, m = num(q.markup);
  const markup = q.markupType === 'pp' ? m * paying : net * m / 100;
  const vat = markup * vatR, total = net + markup + vat;
  const res = { net, markup, vat, total, pp: total / paying, pax, paying, foc: focCount(q), margin: total ? markup / total * 100 : 0 };
  if (q.type === 'GROUP') {
    const factor = pax ? pax / paying : 1;
    const mult = q.markupType === 'pp' ? 1 : 1 + m / 100 * (1 + vatR);
    const add = q.markupType === 'pp' ? m * (1 + vatR) : 0;
    res.occ = {};
    Object.keys(OCC).forEach(k => {
      if (!(num(q.group.rooms[k]) > 0)) return;
      let h = 0; q.lines.forEach(l => { if (l.kind === 'hotel' && lineActive(q, l, sel)) h += num(l.rates && l.rates[k]) * num(l.nights) / OCC[k]; });
      res.occ[k] = (h + (pax ? otherNet / pax : 0)) * factor * mult + add;
    });
    res.roomPax = Object.keys(OCC).reduce((a, k) => a + num(q.group.rooms[k]) * OCC[k], 0);
  }
  return res;
}
/* Selling price of a single line, as the client sees it (net + markup + VAT share) */
function sellOf(q, net) {
  const vatR = num(S.brand.vat) / 100;
  return q.markupType === 'pp' ? net : net * (1 + num(q.markup) / 100 * (1 + vatR));
}
function schedule(q, total) {
  const dep = total * num(q.deposit) / 100;
  let due = addDays(q.start, -num(q.balanceDays));
  if (due < today()) due = today();
  return { deposit: dep, balance: total - dep, balanceDue: due };
}
const endDate = q => addDays(q.start, num(q.nights));
const clientOf = q => S.clients.find(c => c.id === q.clientId);
const allPackages = () => [...PACKAGES, ...(S.packages || [])];

/* Public snapshot for the client offer page: every price is already a SELL price
   (markup + VAT folded in), so net rates, markup and internal notes never reach the client. */
function buildPublic(q) {
  const p = price(q);
  const vatR = num(S.brand.vat) / 100;
  const mult = q.markupType === 'pp' ? (p.net > 0 ? p.total / p.net : 1) : 1 + num(q.markup) / 100 * (1 + vatR);
  const r2 = v => Math.round(num(v) * mult * 100) / 100;
  return {
    type: q.type, lang: q.lang, title: q.title, dest: q.dest, art: q.art, cover: q.cover || null, coverCredit: q.coverCredit || null,
    start: q.start, nights: q.nights, validUntil: q.validUntil,
    adults: q.adults, children: q.children, infants: q.infants,
    group: { pax: q.group.pax, foc: q.group.foc, rooms: clone(q.group.rooms), rooming: [] },
    lines: q.lines.map(l => ({ id: l.id, kind: l.kind, name: l.name, detail: l.detail, city: l.city, stars: l.stars, board: l.board, roomType: l.roomType,
      rooms: l.rooms, nights: l.nights, basis: l.basis, qty: l.qty, optional: l.optional, choice: l.choice,
      rate: r2(l.rate), unit: r2(l.unit), rates: { sgl: r2(l.rates && l.rates.sgl), dbl: r2(l.rates && l.rates.dbl), tpl: r2(l.rates && l.rates.tpl), quad: r2(l.rates && l.rates.quad) } })),
    days: q.days, inc: q.inc, exc: q.exc, terms: q.terms, deposit: q.deposit, balanceDays: q.balanceDays,
    showItemPrices: !!q.showItemPrices, markupType: 'pct', markup: 0, total: Math.round(p.total * 100) / 100
  };
}
/* Turn a public snapshot back into a quote the client page can render (VAT/markup already inside prices) */
function quoteFromPublic(pub) {
  const q = Object.assign(blankQuote(pub.type || 'FIT', pub.lang || 'en'), clone(pub));
  q.id = pub.ref; q.status = pub.status || 'sent'; q.selection = pub.selection || { choices: {}, addons: [] };
  q.selection.choices = q.selection.choices || {}; q.selection.addons = q.selection.addons || [];
  q.markupType = 'pct'; q.markup = 0; q._clientName = pub.clientName || ''; q.activity = []; q.payments = []; q.paid = 0;
  return q;
}

/* Demo data: fictional clients and ~30 quotations spread over the last six months, so the dashboard opens in a realistic working state. */
function seedState() {
  S = { v: 1, seq: 1040, brand: defaultBrand(), clients: [], packages: [], quotes: [], ui: { lang: 'en' } };
  const C = (name, phone, email, city, tags, company) => ({ id: uuid(), name, phone, email, city, tags, company: company || '', notes: '' });
  S.clients = [
    C('Abdullah Al-Qahtani', '+966 50 111 2233', 'abdullah.q@example.com', 'Riyadh', ['VIP']),
    C('Noura Al-Harbi', '+966 55 222 3344', 'noura.h@example.com', 'Jeddah', ['Family']),
    C('Faisal Al-Otaibi', '+966 53 333 4455', 'faisal.o@example.com', 'Riyadh', []),
    C('Sara Al-Dosari', '+966 54 444 5566', 'sara.d@example.com', 'Dammam', ['Honeymoon']),
    C('Khalid Al-Ghamdi', '+966 56 555 6677', 'khalid.g@example.com', 'Jeddah', ['Family']),
    C('Reem Al-Shehri', '+966 59 666 7788', 'reem.s@example.com', 'Abha', []),
    C('Majed Al-Zahrani', '+966 50 777 8899', 'majed.z@example.com', 'Makkah', ['VIP']),
    C('Lama Al-Mutairi', '+966 55 888 9900', 'lama.m@example.com', 'Riyadh', ['Family']),
    C('Turki Al-Anazi', '+966 53 999 0011', 'turki.a@example.com', 'Tabuk', []),
    C('Hessa Al-Subaie', '+966 54 101 2020', 'hessa.s@example.com', 'Khobar', ['Honeymoon']),
    C('Nama Engineering Co.', '+966 11 400 5000', 'travel@nama-eng.example', 'Riyadh', ['Corporate'], 'Nama Engineering'),
    C('Al Noor Umrah Group', '+966 12 530 7000', 'ops@alnoor-umrah.example', 'Makkah', ['Groups'], 'Al Noor')
  ];
  const r = rng(42);
  const pick = a => a[Math.floor(r() * a.length)];
  const fitClients = S.clients.slice(0, 10);
  const pkFor = { family: ['pk-dubai', 'pk-istanbul', 'pk-baku'], honeymoon: ['pk-maldives', 'pk-alula'], other: ['pk-georgia', 'pk-alula', 'pk-dubai'] };
  const quotes = [];
  for (let i = 0; i < 32; i++) {
    let pk, client;
    const roll = r();
    if (roll < .12) { pk = PACKAGES.find(p => p.id === 'pk-umrah'); client = S.clients[11]; }
    else if (roll < .2) { pk = PACKAGES.find(p => p.id === 'pk-riyadh'); client = S.clients[10]; }
    else {
      client = pick(fitClients);
      const pool = client.tags.includes('Honeymoon') ? pkFor.honeymoon : client.tags.includes('Family') ? pkFor.family : pkFor.other.concat(pkFor.family);
      const pid = pick(pool); pk = PACKAGES.find(p => p.id === pid);
    }
    const age = Math.floor(175 * Math.pow(r(), 1.5));
    const created = addDays(today(), -age);
    const lang = r() < .4 ? 'ar' : 'en';
    const o = { lang, clientId: client.id, start: addDays(created, 18 + Math.floor(r() * 60)) };
    if (pk.type === 'FIT') { o.adults = pk.id === 'pk-maldives' ? 2 : 1 + Math.ceil(r() * 3); o.children = pk.cat === 'family' ? Math.floor(r() * 3) : 0; }
    const q = quoteFromPackage(pk, o);
    q.id = `${S.brand.prefix}-${1001 + i}`;
    q.created = created; q.validUntil = addDays(created, 5); q.markup = 8 + Math.floor(r() * 8);
    if (pk.type === 'GROUP') {
      const g = q.group;
      if (pk.id === 'pk-umrah') { g.rooms.dbl = 4 + Math.floor(r() * 6); g.rooms.quad = 2 + Math.floor(r() * 4); }
      else { g.rooms.sgl = 12 + Math.floor(r() * 14); }
      g.pax = Object.keys(OCC).reduce((a, k) => a + g.rooms[k] * OCC[k], 0);
    }
    choiceSets(q).forEach(s => { const opts = q.lines.filter(l => l.choice === s); q.selection.choices[s] = opts[Math.floor(r() * opts.length)].id; });
    q.selection.addons = q.lines.filter(l => l.optional && r() < .5).map(l => l.id);
    let st;
    const x = r();
    if (age > 45) st = x < .58 ? 'confirmed' : x < .86 ? 'lost' : 'accepted';
    else if (age > 12) st = x < .38 ? 'confirmed' : x < .52 ? 'accepted' : x < .7 ? 'viewed' : x < .84 ? 'sent' : 'lost';
    else st = x < .2 ? 'draft' : x < .45 ? 'sent' : x < .7 ? 'viewed' : x < .88 ? 'accepted' : 'confirmed';
    q.status = st;
    q.activity = [{ ts: created, k: 'created' }];
    const order = ['sent', 'viewed', 'accepted', 'confirmed'];
    let ts = created;
    for (const k of order) {
      if (st === 'draft') break;
      if (st === 'lost' && k === 'accepted') { ts = addDays(ts, 2); q.activity.unshift({ ts: ts > today() ? today() : ts, k: 'lost' }); break; }
      ts = addDays(ts, k === 'sent' ? 0 : 1 + Math.floor(r() * 2)); if (ts > today()) ts = today();
      q.activity.unshift({ ts, k });
      if (k === 'confirmed') q.confirmedAt = ts;
      if (k === st) break;
    }
    if (st === 'confirmed' && age < 75) { const ca = addDays(today(), -Math.floor(r() * Math.min(age, 58))); q.confirmedAt = ca; q.activity.forEach(a => { if (a.k === 'confirmed') a.ts = ca; }); }
    if (st === 'confirmed' && age < 100 && r() < .7) q.start = addDays(today(), 3 + Math.floor(r() * 40));
    if (st === 'confirmed') {
      const p = price(q).total, sc = schedule(q, p);
      const full = daysBetween(today(), q.start) < 21;
      const amt = Math.round(full ? p : sc.deposit);
      q.paid = amt; q.payments = [{ date: q.confirmedAt, amount: amt, note: full ? 'Full payment' : 'Deposit' }];
      q.activity.unshift({ ts: q.confirmedAt, k: 'payment', amt });
    }
    quotes.push(q);
  }
  quotes.sort((a, b) => b.created.localeCompare(a.created));
  S.quotes = quotes; S.seq = 1001 + quotes.length;
}

/* ---------- i18n + formatting ---------- */
const L = () => (S && S.ui && S.ui.lang) || 'en';
function t(k, v) { let s = (I18N[L()] && I18N[L()][k]) ?? I18N.en[k] ?? k; if (v) for (const x in v) s = s.split('{' + x + '}').join(v[x]); return s; }
function tl(k, lang, v) { let s = (I18N[lang] && I18N[lang][k]) ?? I18N.en[k] ?? k; if (v) for (const x in v) s = s.split('{' + x + '}').join(v[x]); return s; }
function money(n, lang) {
  lang = lang || L(); const c = S.brand.currency; const s = Math.round(n || 0).toLocaleString('en-US');
  return lang === 'ar' ? `${s} ${CUR_AR[c] || c}` : `${c} ${s}`;
}
function moneyK(n) { const a = Math.abs(n); const s = a >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : a >= 1e4 ? Math.round(n / 1e3) + 'K' : Math.round(n).toLocaleString('en-US'); return L() === 'ar' ? `${s} ${CUR_AR[S.brand.currency] || S.brand.currency}` : `${S.brand.currency} ${s}`; }
const locale = lang => (lang || L()) === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB';
function fmtDate(iso, lang, opt) { if (!iso) return '—'; return parseD(iso).toLocaleDateString(locale(lang), opt || { day: 'numeric', month: 'short', year: 'numeric' }); }
function fmtShort(iso, lang) { return fmtDate(iso, lang, { day: 'numeric', month: 'short' }); }
const statusPill = s => `<span class="pill st-${s}">${t('st_' + s)}</span>`;
const typeTag = ty => ty === 'GROUP' ? `<span class="tag group">${t('group')}</span>` : `<span class="tag fit">${t('fit')}</span>`;
const brandName = lang => (lang || L()) === 'ar' ? (S.brand.nameAr || S.brand.name) : (S.brand.name || S.brand.nameAr);
const brandTag = lang => (lang || L()) === 'ar' ? (S.brand.taglineAr || S.brand.tagline) : (S.brand.tagline || S.brand.taglineAr);
const initials = s => String(s || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const logoHTML = () => S.brand.logo ? `<img src="${S.brand.logo}" alt="">` : esc(initials(S.brand.name));
const waDigits = p => String(p || '').replace(/[^\d]/g, '');
const pkTitle = pk => tx(pk.title, L());

/* ---------- Toast, modal, confirm ---------- */
let toastT;
function toast(msg) { const el = $('#toast'); el.innerHTML = ic('check', 'sm') + `<span>${esc(msg)}</span>`; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2600); }
function modal(title, body, foot, opts = {}) {
  closeModal();
  const bg = document.createElement('div'); bg.className = 'modal-bg'; bg.id = 'modal';
  bg.innerHTML = `<div class="modal ${opts.wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-h"><h2>${esc(title)}</h2><button class="icon-btn" data-act="closeModal" aria-label="${t('close')}">${ic('x')}</button></div><div class="modal-b">${body}</div>${foot ? `<div class="modal-f">${foot}</div>` : ''}</div>`;
  bg.addEventListener('mousedown', e => { if (e.target === bg) closeModal(); });
  document.body.appendChild(bg);
  const f = bg.querySelector('input,select,textarea,button.btn'); if (f) setTimeout(() => f.focus(), 30);
  return bg;
}
function closeModal() { const m = $('#modal'); if (m) m.remove(); }
let confirmCb = null;
function confirmBox(text, cb, yes) { confirmCb = cb; modal(t('areYouSure'), `<p>${esc(text)}</p>`, `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="confirmYes">${esc(yes || t('yesContinue'))}</button>`); }
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); toast(t('copied')); return true; }
  catch (e) { modal(t('copyManually'), `<p class="muted small">${t('copyManuallyHint')}</p><textarea class="inp" rows="6" readonly id="manual-copy">${esc(text)}</textarea>`); setTimeout(() => { const a = $('#manual-copy'); if (a) a.select(); }, 50); return false; }
}

/* ---------- Shell + routing ---------- */
const ROUTES = ['dashboard', 'orders', 'quotes', 'packages', 'contracts', 'bookings', 'clients', 'suppliers', 'branding', 'builder', 'team'];
function applyBrand() {
  const root = document.documentElement;
  root.style.setProperty('--brand', S.brand.color || '#0E7C74');
  root.lang = L(); root.dir = L() === 'ar' ? 'rtl' : 'ltr';
  document.title = `${brandName()} · ${t('backOffice')}`;
}
function renderShell() {
  applyBrand();
  const open = S.quotes.filter(q => ['sent', 'viewed', 'accepted'].includes(q.status)).length;
  const cloud = Cloud.on;
  const nav = [['dashboard', 'dashboard', t('nav_dashboard')], ['orders', 'chat', t('nav_orders'), (typeof opsStaffCount === 'function' ? opsStaffCount() : 0)], ['quotes', 'file', t('nav_quotes'), open], ['packages', 'box', t('nav_packages')], ['bookings', 'wallet', t('nav_bookings')], ['clients', 'users', t('nav_clients')],
    ...(cloud && typeof window.extraNav === 'function' ? window.extraNav() : []),
    can('brand') ? ['branding', 'brush', t('nav_branding')] : null, cloud && can('team') ? ['team', 'user', t('nav_team')] : null].filter(Boolean);
  const trialLeft = cloud && S.agency && S.agency.plan === 'trial' ? daysBetween(today(), S.agency.trialEnds) : null;
  $('#app').innerHTML = `
  <aside class="side" id="side">
    <div class="agency"><div class="logo">${logoHTML()}</div><div><b>${esc(brandName())}</b><span>${esc(brandTag())}</span></div></div>
    <nav class="nav" aria-label="${t('mainNav')}">${nav.map(n => `<button data-act="go" data-v="${n[0]}" id="nav-${n[0]}">${ic(n[1])}<span>${n[2]}</span>${n[3] ? `<span class="count">${n[3]}</span>` : ''}</button>`).join('')}</nav>
    <div class="side-foot">
      <button class="btn sm" data-act="toggleLang">${ic('globe', 'sm')} ${L() === 'ar' ? 'English' : 'العربية'}</button>
      ${cloud ? `<div class="me"><b>${esc((Cloud.user.user_metadata && Cloud.user.user_metadata.name) || Cloud.user.email)}</b><span>${t('role_' + Cloud.role)}${trialLeft !== null ? ' · ' + t('trialLeft', { n: Math.max(0, trialLeft) }) : ''}</span></div>
      <button class="btn ghost sm" data-act="signOut">${ic('back', 'sm flip')} ${t('signOut')}</button>` : `<button class="btn ghost sm" data-act="resetDemo">${ic('refresh', 'sm')} ${t('resetDemo')}</button>`}
      <div class="powered"><span>${t('poweredBy')}</span><span class="wj">wejha<i>.</i></span></div>
    </div>
  </aside>
  <div class="main">
    <header class="top">
      <button class="icon-btn menu-btn" data-act="toggleSide" aria-label="${t('menu')}">${ic('menu')}</button>
      <div class="search">${ic('search', 'sm')}<input id="gsearch" type="search" placeholder="${t('searchAll')}" aria-label="${t('searchAll')}"></div>
      <div class="grow"></div>
      ${cloud ? `<span class="sync saved" id="sync">${ic('check', 'sm')}${t('syncSaved')}</span>` : `<span class="sync demo hide-sm">${t('demoMode')}</span>`}
      ${can('edit') ? `<button class="btn hide-sm" data-act="go" data-v="packages">${ic('box', 'sm')} ${t('fromPackage')}</button>
      <button class="btn primary" data-act="newQuote">${ic('plus', 'sm')} ${t('newQuote')}</button>` : ''}
    </header>
    <section class="view" id="view"></section>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <canvas id="fx"></canvas>`;
  $('#gsearch').addEventListener('keydown', e => { if (e.key === 'Enter') { S.ui.qf = { status: 'all', type: 'all', q: e.target.value }; go('quotes'); } });
}
function go(v) { if (location.hash !== '#' + v) location.hash = v; else route(); }
function route() {
  let v = (location.hash || '').slice(1);
  if (!ROUTES.includes(v)) v = 'dashboard';
  if (v === 'builder' && (!can('edit') || !S.quotes.find(q => q.id === S.ui.current))) v = 'quotes';
  if (v === 'branding' && !can('brand')) v = 'dashboard';
  if (v === 'team' && !(Cloud.on && can('team'))) v = 'dashboard';
  if (v === 'team' && S.ui.view !== 'team') TEAM = null;
  if ((v === 'contracts' || v === 'suppliers') && !(Cloud.on && window.EXTRA_VIEWS && window.EXTRA_VIEWS[v])) v = 'dashboard';
  S.ui.view = v;
  $$('.nav button').forEach(b => b.classList.toggle('on', b.dataset.v === (v === 'builder' ? 'quotes' : v)));
  $('#side').classList.remove('open');
  const view = $('#view');
  view.innerHTML = `<div class="view-inner">${({ dashboard: vDashboard, orders: vOrders, quotes: vQuotes, packages: vPackages, bookings: vBookings, clients: vClients, branding: vBranding, builder: vBuilder, team: vTeam, ...(window.EXTRA_VIEWS || {}) })[v]()}</div>`;
  view.scrollTop = 0;
  if (v === 'builder') afterBuilder();
  if (v !== 'orders' && typeof opsLoad === 'function') opsLoad();
  save();
}

/* ---------- Dashboard ---------- */
function monthKey(iso) { return String(iso).slice(0, 7); }
function lastMonths(n) { const out = []; const d = parseD(today()); d.setDate(1); for (let i = n - 1; i >= 0; i--) { const x = new Date(d.getFullYear(), d.getMonth() - i, 1); out.push(isoDate(x).slice(0, 7)); } return out; }
function niceMax(v) { if (v <= 0) return 1; const p = Math.pow(10, Math.floor(Math.log10(v))); const n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; }
function vDashboard() {
  const Q = S.quotes, months = lastMonths(6);
  const conf = Q.filter(q => q.status === 'confirmed');
  const byM = {}; months.forEach(m => byM[m] = { rev: 0, prof: 0, n: 0 });
  conf.forEach(q => { const m = monthKey(q.confirmedAt || q.created); if (byM[m]) { const p = price(q); byM[m].rev += p.total; byM[m].prof += p.markup; byM[m].n++; } });
  const cur = byM[months[5]];
  const win30 = (a, b) => conf.filter(q => { const d = daysBetween(q.confirmedAt || q.created, today()); return d >= a && d < b; }).reduce((o, q) => { const p = price(q); o.rev += p.total; o.prof += p.markup; return o; }, { rev: 0, prof: 0 });
  const r30 = win30(0, 30), p30 = win30(30, 60);
  const delta = (a, b) => b ? Math.round((a - b) / b * 100) : null;
  const dRev = delta(r30.rev, p30.rev), dProf = delta(r30.prof, p30.prof);
  const open = Q.filter(q => ['sent', 'viewed', 'accepted'].includes(q.status));
  const pipe = open.reduce((a, q) => a + price(q).total, 0);
  const lost = Q.filter(q => q.status === 'lost').length;
  const win = conf.length + lost ? Math.round(conf.length / (conf.length + lost) * 100) : 0;
  const due = conf.reduce((a, q) => a + Math.max(0, price(q).total - num(q.paid)), 0);
  const dl = (d) => d === null ? `<span class="d muted">${t('noPrev')}</span>` : `<span class="d ${d >= 0 ? 'up' : 'down'}">${d >= 0 ? '▲' : '▼'} ${Math.abs(d)}% ${t('vsLastMonth')}</span>`;
  const hr = new Date().getHours();
  const greet = hr < 12 ? t('goodMorning') : hr < 18 ? t('goodAfternoon') : t('goodEvening');

  // Chart
  const W = 620, H = 230, pl = 54, pb = 28, pt = 10, pr = 8;
  const mx = niceMax(Math.max(...months.map(m => byM[m].rev), 1));
  const cw = (W - pl - pr) / months.length, bw = Math.min(26, cw / 3.2);
  const y = v => pt + (H - pt - pb) * (1 - v / mx);
  let g = '';
  for (let i = 0; i <= 4; i++) { const v = mx * i / 4; g += `<line class="grid-l" x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}"/><text x="${pl - 8}" y="${y(v) + 4}" text-anchor="end">${v >= 1000 ? Math.round(v / 1000) + 'K' : Math.round(v)}</text>`; }
  months.forEach((m, i) => {
    const cx = pl + cw * i + cw / 2, d = byM[m], last = i === months.length - 1;
    g += `<rect x="${cx - bw - 2}" y="${y(d.rev)}" width="${bw}" height="${Math.max(0, H - pb - y(d.rev))}" rx="4" fill="var(--brand)" opacity="${last ? 1 : .55}"><title>${money(d.rev)}</title></rect>`;
    g += `<rect x="${cx + 2}" y="${y(d.prof)}" width="${bw}" height="${Math.max(0, H - pb - y(d.prof))}" rx="4" fill="var(--accent)" opacity="${last ? 1 : .6}"><title>${money(d.prof)}</title></rect>`;
    g += `<text x="${cx}" y="${H - 8}" text-anchor="middle">${parseD(m + '-01').toLocaleDateString(locale(), { month: 'short' })}</text>`;
  });
  if (cur.rev) g += `<text x="${pl + cw * 5 + cw / 2 - bw / 2 - 2}" y="${y(cur.rev) - 6}" text-anchor="middle" style="fill:var(--ink);font-weight:600">${moneyK(cur.rev).replace(S.brand.currency + ' ', '')}</text>`;

  // Funnel
  const reached = k => Q.filter(q => k === 'created' || q.activity.some(a => a.k === k)).length;
  const fn = [['created', t('fn_created')], ['sent', t('st_sent')], ['viewed', t('st_viewed')], ['accepted', t('st_accepted')], ['confirmed', t('st_confirmed')]].map(([k, l]) => [l, reached(k)]);
  const fmax = fn[0][1] || 1;

  // Destinations
  const dest = {}; Q.forEach(q => { const k = q.pkg || q.dest; if (!dest[k]) { const pk = allPackages().find(p => p.id === q.pkg); dest[k] = { label: pk ? tx(pk.dest, L()) : q.dest, n: 0, rev: 0 }; } dest[k].n++; if (q.status === 'confirmed') dest[k].rev += price(q).total; });
  const topD = Object.values(dest).sort((a, b) => b.n - a.n).slice(0, 6); const dmax = topD[0] ? topD[0].n : 1;

  // FIT vs Group
  const fitRev = conf.filter(q => q.type === 'FIT').reduce((a, q) => a + price(q).total, 0), grpRev = conf.filter(q => q.type === 'GROUP').reduce((a, q) => a + price(q).total, 0);
  const tot = fitRev + grpRev || 1, fitP = fitRev / tot, C2 = 2 * Math.PI * 40;
  const donut = `<svg viewBox="0 0 100 100" width="120" height="120" class="chart" role="img" aria-label="${t('fitVsGroup')}"><circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" stroke-width="14"/><circle cx="50" cy="50" r="40" fill="none" stroke="var(--brand)" stroke-width="14" stroke-dasharray="${C2 * fitP} ${C2}" transform="rotate(-90 50 50)"/><text x="50" y="54" text-anchor="middle" style="font-size:14px;font-weight:700;fill:var(--ink)">${Math.round(fitP * 100)}%</text></svg>`;

  // Attention
  const att = [];
  Q.filter(q => q.status === 'accepted').forEach(q => att.push({ q, ic: 'check', txt: t('att_accepted', { c: esc(clientOf(q)?.name || '') }) }));
  Q.filter(q => ['sent', 'viewed'].includes(q.status) && daysBetween(today(), q.validUntil) <= 2).forEach(q => att.push({ q, ic: 'clock', txt: daysBetween(today(), q.validUntil) < 0 ? t('att_expired', { d: fmtShort(q.validUntil) }) : t('att_expiring', { d: fmtShort(q.validUntil) }) }));
  conf.forEach(q => { const p = price(q), sc = schedule(q, p.total); if (p.total - num(q.paid) > 1 && daysBetween(today(), sc.balanceDue) <= 14) att.push({ q, ic: 'wallet', txt: t('att_balance', { a: money(p.total - num(q.paid)), d: fmtShort(sc.balanceDue) }) }); });

  const upcoming = conf.filter(q => q.start >= today() && daysBetween(today(), q.start) <= 45).sort((a, b) => a.start.localeCompare(b.start)).slice(0, 5);
  const feed = Q.flatMap(q => q.activity.map(a => ({ ...a, q }))).sort((a, b) => b.ts.localeCompare(a.ts)).slice(0, 7);
  const feedIc = { created: 'file', sent: 'send', viewed: 'eye', accepted: 'check', confirmed: 'check', lost: 'x', payment: 'money', change: 'edit' };

  return `
  <div class="head"><div><h1>${greet}</h1><p>${t('dashSub', { n: open.length, d: fmtDate(today()) })}</p></div>
</div>
  <div class="grid g5">
    <div class="card tile"><span class="k">${ic('money', 'sm')} ${t('kpi_revenue')}</span><span class="v">${moneyK(r30.rev)}</span>${dl(dRev)}</div>
    <div class="card tile"><span class="k">${ic('trend', 'sm')} ${t('kpi_profit')}</span><span class="v">${moneyK(r30.prof)}</span>${dl(dProf)}</div>
    <div class="card tile"><span class="k">${ic('file', 'sm')} ${t('kpi_pipeline')}</span><span class="v">${moneyK(pipe)}</span><span class="d muted">${t('openQuotes', { n: open.length })}</span></div>
    <div class="card tile"><span class="k">${ic('target', 'sm')} ${t('kpi_win')}</span><span class="v">${win}%</span><div class="bar"><i style="width:${win}%"></i></div></div>
    <div class="card tile"><span class="k">${ic('wallet', 'sm')} ${t('kpi_due')}</span><span class="v">${moneyK(due)}</span><span class="d muted">${t('fromConfirmed', { n: conf.filter(q => price(q).total - num(q.paid) > 1).length })}</span></div>
  </div>
  <div class="grid" style="grid-template-columns:minmax(0,1.7fr) minmax(0,1fr)">
    <div class="card"><div class="card-h"><div><h2>${t('revProfit')}</h2><p>${t('revProfitSub')}</p></div><div class="legend"><span><i style="background:var(--brand)"></i>${t('revenue')}</span><span><i style="background:var(--accent)"></i>${t('profit')}</span></div></div>
      <svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${t('revProfit')}">${g}</svg></div>
    <div class="card"><div class="card-h"><div><h2>${t('funnel')}</h2><p>${t('funnelSub')}</p></div></div>
      <div class="funnel">${fn.map(([l, n], i) => `<div class="fr"><span class="small">${l}</span><div><div class="fb" style="width:${n / fmax * 100}%;opacity:${1 - i * .13}"></div></div><b class="num small">${n}</b></div>`).join('')}</div>
      <p class="small muted" style="margin-top:12px">${t('convRate', { p: fn[0][1] ? Math.round(fn[4][1] / fn[0][1] * 100) : 0 })}</p></div>
  </div>
  <div class="grid g2">
    <div class="card"><div class="card-h"><div><h2>${t('needsAttention')}</h2><p>${t('needsAttentionSub')}</p></div></div>
      <div class="stack">${att.length ? att.slice(0, 6).map(a => `<div class="alert-row">${ic(a.ic)}<div class="grow"><b>${esc(a.q.id)}</b> · ${esc(a.q.title)}<div class="small muted">${a.txt}</div></div><button class="btn sm" data-act="open" data-id="${a.q.id}">${t('open')}</button></div>`).join('') : `<p class="muted small">${S.quotes.length ? t('allClear') : t('emptyStart')}</p>`}</div></div>
    <div class="card"><div class="card-h"><div><h2>${t('upcoming')}</h2><p>${t('upcomingSub')}</p></div></div>
      ${upcoming.length ? `<div class="stack">${upcoming.map(q => { const p = price(q); return `<div class="alert-row" style="background:transparent;border:1px solid var(--line)"><div style="text-align:center;min-width:44px"><b style="font-size:16px">${parseD(q.start).getDate()}</b><div class="tiny muted">${parseD(q.start).toLocaleDateString(locale(), { month: 'short' })}</div></div><div class="grow"><b>${esc(clientOf(q)?.name || '')}</b><div class="small muted">${esc(q.title)} · ${t('nightsN', { n: q.nights })} · ${t('paxN', { n: paxOf(q) })}</div></div>${num(q.paid) + 1 < p.total ? `<span class="pill st-viewed">${t('partPaid')}</span>` : `<span class="pill st-confirmed">${t('fullyPaid')}</span>`}</div>`; }).join('')}</div>` : `<p class="muted small">${t('noUpcoming')}</p>`}</div>
  </div>
  <div class="grid g3">
    <div class="card"><div class="card-h"><h2>${t('topDest')}</h2></div><div class="stack">${topD.map(d => `<div class="hbar"><span class="small" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(d.label)}</span><div class="bar"><i style="width:${d.n / dmax * 100}%"></i></div><span class="small num muted">${d.n}</span></div>`).join('')}</div></div>
    <div class="card"><div class="card-h"><h2>${t('fitVsGroup')}</h2></div><div class="row" style="gap:18px">${donut}<div class="stack small"><span class="legend"><span><i style="background:var(--brand)"></i>${t('fit')}</span></span><b class="num">${money(fitRev)}</b><span class="legend"><span><i style="background:var(--accent)"></i>${t('group')}</span></span><b class="num">${money(grpRev)}</b></div></div><p class="small muted" style="margin-top:10px">${t('confirmedRevenueAll')}</p></div>
    <div class="card"><div class="card-h"><h2>${t('recentActivity')}</h2></div><div class="feed">${feed.map(a => `<div class="it"><span class="dot">${ic(feedIc[a.k] || 'file', 'sm')}</span><div><b>${esc(a.q.id)}</b> ${t('act_' + a.k, { a: a.amt ? money(a.amt) : '' })}<div class="tiny muted">${esc(clientOf(a.q)?.name || '')} · ${fmtShort(a.ts)}</div></div></div>`).join('')}</div></div>
  </div>`;
}

/* ---------- Quotes list ---------- */
function vQuotes() {
  const f = S.ui.qf || (S.ui.qf = { status: 'all', type: 'all', q: '' });
  const qq = (f.q || '').toLowerCase();
  const list = S.quotes.filter(q => (f.status === 'all' || q.status === f.status) && (f.type === 'all' || q.type === f.type) && (!qq || [q.id, q.title, q.dest, clientOf(q)?.name].join(' ').toLowerCase().includes(qq)));
  const cnt = s => S.quotes.filter(q => s === 'all' || q.status === s).length;
  return `
  <div class="head"><div><h1>${t('nav_quotes')}</h1><p>${t('quotesSub')}</p></div></div>
  <div class="card flat" style="padding:14px">
    <div class="row between">
      <div class="chips">${['all', ...STATUSES].map(s => `<button class="chip ${f.status === s ? 'on' : ''}" data-act="qf" data-k="status" data-val="${s}">${s === 'all' ? t('all') : t('st_' + s)} <span class="n">${cnt(s)}</span></button>`).join('')}</div>
      <div class="row"><div class="seg">${['all', 'FIT', 'GROUP'].map(x => `<button class="${f.type === x ? 'on' : ''}" data-act="qf" data-k="type" data-val="${x}">${x === 'all' ? t('all') : x === 'FIT' ? t('fit') : t('group')}</button>`).join('')}</div>
      <input class="inp" style="width:220px" type="search" id="qsearch" placeholder="${t('searchQuotes')}" value="${esc(f.q)}" aria-label="${t('searchQuotes')}"></div>
    </div>
  </div>
  <div class="card" style="padding:4px 6px"><div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>${t('quoteClient')}</th><th>${t('trip')}</th><th>${t('type')}</th><th>${t('travel')}</th><th class="r">${t('pax')}</th><th class="r">${t('total')}</th><th>${t('status')}</th><th>${t('validUntil')}</th><th class="r">${t('actions')}</th></tr></thead>
    <tbody>${list.length ? list.map(q => { const p = price(q); const exp = ['sent', 'viewed', 'draft'].includes(q.status) && q.validUntil < today(); return `
      <tr class="click" data-act="open" data-id="${q.id}">
        <td class="who"><b>${esc(clientOf(q)?.name || t('noClient'))}</b><span>${esc(q.id)} · ${q.lang === 'ar' ? 'AR' : 'EN'}</span></td>
        <td class="who"><b>${esc(q.title || t('untitled'))}</b><span>${esc(q.dest)}</span></td>
        <td>${typeTag(q.type)}</td>
        <td class="small">${fmtShort(q.start)} · ${t('nightsN', { n: q.nights })}</td>
        <td class="r num">${paxOf(q)}</td>
        <td class="r num"><b>${money(p.total)}</b><div class="tiny muted">${t('profit')} ${money(p.markup)}</div></td>
        <td>${statusPill(q.status)}</td>
        <td class="small ${exp ? 'down' : 'muted'}">${fmtShort(q.validUntil)}</td>
        <td class="acts"><button class="icon-btn" title="${t('previewClient')}" aria-label="${t('previewClient')}" data-act="preview" data-id="${q.id}">${ic('eye', 'sm')}</button>${can('edit') ? `<button class="icon-btn" title="${t('send')}" aria-label="${t('send')}" data-act="send" data-id="${q.id}">${ic('send', 'sm')}</button><button class="icon-btn" title="${t('duplicate')}" aria-label="${t('duplicate')}" data-act="dup" data-id="${q.id}">${ic('copy', 'sm')}</button><button class="icon-btn bad" title="${t('delete')}" aria-label="${t('delete')}" data-act="delQuote" data-id="${q.id}">${ic('trash', 'sm')}</button>` : ''}</td>
      </tr>`; }).join('') : `<tr><td colspan="9" class="empty">${t('noQuotes')}</td></tr>`}</tbody></table></div></div>`;
}

/* ---------- Packages ---------- */
const CATS = ['all', 'family', 'honeymoon', 'umrah', 'groups', 'adventure', 'domestic', 'custom'];
function fromPrice(pk) { const q = quoteFromPackage(pk, { lang: L() }); S.seq--; const p = price(q); return pk.type === 'GROUP' ? (p.occ && (p.occ.dbl || Object.values(p.occ)[0])) || p.pp : p.total / Math.max(1, num(q.adults) + num(q.children)); }
function vPackages() {
  const c = S.ui.pkCat || 'all';
  const list = allPackages().filter(p => c === 'all' || (c === 'custom' ? p.custom : p.cat === c));
  return `
  <div class="head"><div><h1>${t('easyPackages')}</h1><p>${t('packagesSub')}</p></div></div>
  <div class="chips">${CATS.map(k => `<button class="chip ${c === k ? 'on' : ''}" data-act="pkCat" data-val="${k}">${t('cat_' + k)}</button>`).join('')}</div>
  <div class="pk-grid">${list.length ? list.map(pk => `
    <article class="pk">
      <div class="art">${artHTML(pk.art, pk.cover, pk.coverCredit)}<span class="badge">${t('nightsN', { n: pk.nights })}</span><span class="badge r">${pk.type === 'GROUP' ? t('group') : t('fit')}</span></div>
      <div class="body"><span class="tiny muted">${esc(tx(pk.dest, L()))}${pk.custom ? ` · <b>${t('yours')}</b>` : ''}</span><h3>${esc(pkTitle(pk))}</h3><p>${esc(tx(pk.summary, L()))}</p>
        <div class="row" style="gap:6px">${(pk.tags || []).map(x => `<span class="tag">${esc(tx(x, L()))}</span>`).join('')}</div></div>
      <div class="foot"><div class="price-from">${pk.type === 'GROUP' ? t('fromPPdbl') : t('fromPP')}<b>${money(fromPrice(pk))}</b></div>
        <div class="row" style="gap:4px">${pk.custom && can('edit') ? `<button class="icon-btn bad" data-act="delPkg" data-id="${pk.id}" aria-label="${t('delete')}">${ic('trash', 'sm')}</button>` : ''}<button class="btn sm" data-act="pkPreview" data-id="${pk.id}">${ic('eye', 'sm')} ${t('preview')}</button>${can('edit') ? `<button class="btn primary sm" data-act="usePkg" data-id="${pk.id}">${t('usePackage')}</button>` : ''}</div></div>
    </article>`).join('') : `<p class="muted">${t('noCustomPkgs')}</p>`}</div>`;
}
function usePkgDialog(id) {
  const pk = allPackages().find(p => p.id === id);
  const g = pk.type === 'GROUP';
  modal(t('usePackage') + ' · ' + pkTitle(pk), `
    <p class="muted small">${t('usePkgHint')}</p>
    <div class="grid g2">
      <div class="f span2"><label for="up-client">${t('client')}</label><select id="up-client"><option value="">${t('chooseClient')}</option>${S.clients.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select></div>
      <div class="f"><label for="up-start">${t('checkIn')}</label><input type="date" id="up-start" value="${addDays(today(), 30)}"></div>
      <div class="f"><label for="up-lang">${t('clientLang')}</label><select id="up-lang"><option value="en" ${L() === 'en' ? 'selected' : ''}>English</option><option value="ar" ${L() === 'ar' ? 'selected' : ''}>العربية</option></select></div>
      ${g ? '' : `<div class="f"><label for="up-ad">${t('adults')}</label><input type="number" min="1" id="up-ad" value="${pk.adults || 2}"></div><div class="f"><label for="up-ch">${t('children')}</label><input type="number" min="0" id="up-ch" value="${pk.children || 0}"></div>`}
    </div>`, `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="usePkgGo" data-id="${id}">${t('createQuote')}</button>`);
}

/* ---------- Bookings ---------- */
function vBookings() {
  const list = S.quotes.filter(q => ['accepted', 'confirmed'].includes(q.status)).sort((a, b) => a.start.localeCompare(b.start));
  const conf = list.filter(q => q.status === 'confirmed');
  const recv = conf.reduce((a, q) => a + Math.max(0, price(q).total - num(q.paid)), 0);
  const mk = today().slice(0, 7);
  const coll = S.quotes.flatMap(q => q.payments || []).filter(p => String(p.date).slice(0, 7) === mk).reduce((a, p) => a + num(p.amount), 0);
  return `
  <div class="head"><div><h1>${t('nav_bookings')}</h1><p>${t('bookingsSub')}</p></div></div>
  <div class="grid g3">
    <div class="card tile"><span class="k">${t('awaitingConf')}</span><span class="v">${list.length - conf.length}</span></div>
    <div class="card tile"><span class="k">${t('receivable')}</span><span class="v">${moneyK(recv)}</span></div>
    <div class="card tile"><span class="k">${t('collectedMonth')}</span><span class="v">${moneyK(coll)}</span></div>
  </div>
  <div class="card" style="padding:4px 6px"><div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>${t('quoteClient')}</th><th>${t('departure')}</th><th>${t('status')}</th><th class="r">${t('total')}</th><th style="min-width:160px">${t('paid')}</th><th>${t('balanceDue')}</th><th class="r">${t('actions')}</th></tr></thead>
    <tbody>${list.length ? list.map(q => { const p = price(q), sc = schedule(q, p.total), pd = Math.min(100, num(q.paid) / (p.total || 1) * 100), bal = Math.max(0, p.total - num(q.paid)); return `
      <tr><td class="who"><b>${esc(clientOf(q)?.name || '')}</b><span>${esc(q.id)} · ${esc(q.title)}</span></td>
      <td class="small">${fmtDate(q.start)}<div class="tiny muted">${q.start < today() ? t('departed') : t('inDays', { n: daysBetween(today(), q.start) })}</div></td>
      <td>${statusPill(q.status)}</td><td class="r num"><b>${money(p.total)}</b></td>
      <td><div class="bar"><i style="width:${pd}%;background:${pd >= 99.9 ? 'var(--good)' : 'var(--brand)'}"></i></div><div class="tiny muted num" style="margin-top:4px">${money(q.paid)} · ${Math.round(pd)}%</div></td>
      <td class="small">${bal > 1 ? `<b class="num">${money(bal)}</b><div class="tiny muted">${t('dueBy', { d: fmtShort(sc.balanceDue) })}</div>` : `<span class="up">${t('fullyPaid')}</span>`}</td>
      <td class="acts">${q.status === 'accepted' && can('edit') ? `<button class="btn sm primary" data-act="confirmBk" data-id="${q.id}">${t('confirmBooking')}</button>` : ''}${bal > 1 ? `<button class="btn sm" data-act="payDlg" data-id="${q.id}">${t('recordPayment')}</button>` : ''}<button class="icon-btn" data-act="open" data-id="${q.id}" aria-label="${t('open')}">${ic(can('edit') ? 'edit' : 'eye', 'sm')}</button></td></tr>`; }).join('') : `<tr><td colspan="7" class="empty">${t('noBookings')}</td></tr>`}</tbody></table></div></div>`;
}
function payDialog(id) {
  const q = S.quotes.find(x => x.id === id), p = price(q), bal = Math.max(0, p.total - num(q.paid));
  modal(t('recordPayment') + ' · ' + q.id, `
    <div class="sumrow"><span>${t('total')}</span><span>${money(p.total)}</span></div><div class="sumrow"><span>${t('paid')}</span><span>${money(q.paid)}</span></div><div class="sumrow"><span><b>${t('balance')}</b></span><span><b>${money(bal)}</b></span></div>
    <div class="grid g2"><div class="f"><label for="pay-amt">${t('amount')}</label><input type="number" id="pay-amt" value="${Math.round(bal)}"></div><div class="f"><label for="pay-date">${t('date')}</label><input type="date" id="pay-date" value="${today()}"></div>
    <div class="f span2"><label for="pay-note">${t('note')}</label><input id="pay-note" placeholder="${t('payNotePh')}"></div></div>`,
    `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="paySave" data-id="${id}">${t('save')}</button>`);
}

/* ---------- Clients ---------- */
function vClients() {
  return `
  <div class="head"><div><h1>${t('nav_clients')}</h1><p>${t('clientsSub')}</p></div>${can('edit') ? `<button class="btn primary" data-act="clientDlg">${ic('plus', 'sm')} ${t('addClient')}</button>` : ''}</div>
  <div class="card" style="padding:4px 6px"><div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>${t('client')}</th><th>${t('contact')}</th><th>${t('city')}</th><th class="r">${t('quotesN')}</th><th class="r">${t('bookedValue')}</th><th>${t('lastTrip')}</th><th class="r">${t('actions')}</th></tr></thead>
    <tbody>${S.clients.map(c => { const qs = S.quotes.filter(q => q.clientId === c.id); const conf = qs.filter(q => q.status === 'confirmed'); const val = conf.reduce((a, q) => a + price(q).total, 0); const last = conf.sort((a, b) => b.start.localeCompare(a.start))[0]; return `
      <tr><td class="who"><b>${esc(c.name)}</b><span>${c.tags.map(x => `<span class="tag">${esc(t('tag_' + x.toLowerCase()))}</span>`).join(' ')}</span></td>
      <td class="small">${esc(c.phone)}<div class="tiny muted">${esc(c.email)}</div></td><td class="small">${esc(c.city)}</td>
      <td class="r num">${qs.length}</td><td class="r num">${money(val)}</td><td class="small">${last ? esc(last.title) + '<div class="tiny muted">' + fmtShort(last.start) + '</div>' : '—'}</td>
      <td class="acts"><button class="btn sm" data-act="clientQuotes" data-id="${c.id}">${t('viewQuotes')}</button>${can('edit') ? `<button class="icon-btn" data-act="clientDlg" data-id="${c.id}" aria-label="${t('edit')}">${ic('edit', 'sm')}</button><button class="icon-btn" data-act="newFor" data-id="${c.id}" aria-label="${t('newQuote')}">${ic('plus', 'sm')}</button>` : ''}</td></tr>`; }).join('')}</tbody></table></div></div>`;
}
function clientDialog(id) {
  const c = S.clients.find(x => x.id === id) || { name: '', phone: '', email: '', city: '', tags: [], company: '' };
  const tags = ['VIP', 'Family', 'Honeymoon', 'Corporate', 'Groups'];
  modal(id ? t('editClient') : t('addClient'), `
    <div class="grid g2">
      <div class="f span2"><label for="c-name">${t('fullName')}</label><input id="c-name" value="${esc(c.name)}"></div>
      <div class="f"><label for="c-phone">${t('phoneWa')}</label><input id="c-phone" value="${esc(c.phone)}" placeholder="+966"></div>
      <div class="f"><label for="c-email">${t('email')}</label><input id="c-email" type="email" value="${esc(c.email)}"></div>
      <div class="f"><label for="c-city">${t('city')}</label><input id="c-city" value="${esc(c.city)}"></div>
      <div class="f"><label for="c-company">${t('company')}</label><input id="c-company" value="${esc(c.company)}"></div>
    </div>
    <div class="f"><label>${t('tags')}</label><div class="row">${tags.map(x => `<label class="check"><input type="checkbox" class="c-tag" value="${x}" ${c.tags.includes(x) ? 'checked' : ''}> ${t('tag_' + x.toLowerCase())}</label>`).join('')}</div></div>`,
    `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="clientSave" data-id="${id || ''}">${t('save')}</button>`);
}

/* ---------- Branding / settings ---------- */
const PRESETS = ['#0E7C74', '#1F4E8C', '#7A2E4E', '#B5651D', '#2F6B3B', '#5B3FA0', '#1A1A1A', '#C2410C'];
function vBranding() {
  const b = S.brand;
  const f = (k, lbl, type = 'text', extra = '') => `<div class="f"><label for="b-${k}">${lbl}</label><input id="b-${k}" type="${type}" data-brand="${k}" value="${esc(b[k])}" ${extra}></div>`;
  return `
  <div class="head"><div><h1>${t('nav_branding')}</h1><p>${t('brandingSub')}</p></div></div>
  <div class="builder">
    <div class="stack" style="gap:16px">
      <div class="card"><div class="card-h"><h2>${t('identity')}</h2></div>
        <div class="grid g2">${f('name', t('agencyNameEn'))}${f('nameAr', t('agencyNameAr'), 'text', 'dir="rtl"')}${f('tagline', t('taglineEn'))}${f('taglineAr', t('taglineAr'), 'text', 'dir="rtl"')}</div>
        <div class="f" style="margin-top:14px"><label>${t('logo')}</label><div class="row"><div class="logo" style="width:56px;height:56px">${logoHTML()}</div><label class="btn sm" for="b-logo-file">${ic('upload', 'sm')} ${t('uploadLogo')}</label><input id="b-logo-file" type="file" accept="image/*" hidden data-file="logo">${b.logo ? `<button class="btn ghost sm" data-act="rmLogo">${t('remove')}</button>` : ''}<span class="tiny muted">${t('logoHint')}</span></div></div>
        <div class="f" style="margin-top:14px"><label>${t('brandColor')}</label><div class="row"><div class="swatches">${PRESETS.map(c => `<button class="sw ${b.color.toLowerCase() === c.toLowerCase() ? 'on' : ''}" style="background:${c}" data-act="setColor" data-val="${c}" aria-label="${c}"></button>`).join('')}</div><input type="color" data-brand="color" value="${b.color}" aria-label="${t('customColor')}" style="width:44px;height:32px;border:none;background:none;padding:0"></div></div>
      </div>
      <div class="card"><div class="card-h"><h2>${t('contactAndLink')}</h2></div>
        <div class="grid g2">${f('phone', t('phone'))}${f('whatsapp', t('whatsapp'))}${f('email', t('email'), 'email')}${f('domain', t('clientDomain'))}</div>
        <p class="tiny muted" style="margin-top:8px">${Cloud.on ? t('domainHintCloud') : t('domainHint', { d: esc(b.domain) })}</p></div>
      <div class="card"><div class="card-h"><h2>${t('pricingDefaults')}</h2></div>
        <div class="grid g4">
          <div class="f"><label for="b-currency">${t('currency')}</label><select id="b-currency" data-brand="currency">${Object.keys(CUR_AR).map(c => `<option ${b.currency === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
          ${f('vat', t('vatPct'), 'number')}${f('markup', t('defaultMarkup'), 'number')}${f('validDays', t('validityDays'), 'number')}${f('prefix', t('quotePrefix'))}
        </div>
        <label class="check" style="margin-top:12px"><input type="checkbox" data-brand="poweredBy" ${b.poweredBy ? 'checked' : ''}> ${t('showPowered')}</label></div>
      <div class="card"><div class="card-h"><h2>${t('defaultTerms')}</h2></div>
        <div class="grid g2"><div class="f"><label for="b-termsEn">English</label><textarea id="b-termsEn" data-brand="termsEn" rows="4">${esc(b.termsEn)}</textarea></div><div class="f"><label for="b-termsAr">العربية</label><textarea id="b-termsAr" dir="rtl" data-brand="termsAr" rows="4">${esc(b.termsAr)}</textarea></div></div></div>
    </div>
    <div class="summary">
      <div class="card"><div class="card-h"><h2>${t('livePreview')}</h2></div><div class="preview-frame" id="brand-preview">${brandPreview()}</div></div>
      <div class="card"><h3>${t('sellTitle')}</h3><p class="small muted" style="margin-top:6px">${t('sellText')}</p></div>
    </div>
  </div>`;
}
function brandPreview() {
  const pk = PACKAGES[0];
  return `<div style="display:flex;align-items:center;gap:10px;padding:12px;border-bottom:1px solid var(--line)"><div class="logo" style="width:32px;height:32px;font-size:12px">${logoHTML()}</div><div><b style="font-size:13px">${esc(brandName())}</b><div class="tiny muted">${esc(brandTag())}</div></div></div>
  <div class="art" style="height:120px">${artHTML(pk.art)}</div>
  <div style="padding:14px" class="stack"><b>${esc(pkTitle(pk))}</b><div class="row between"><span class="small muted">${t('totalPrice')}</span><b class="num" style="color:var(--brand-ink)">${money(18450)}</b></div><button class="btn primary block" tabindex="-1">${t('acceptOffer')}</button></div>`;
}

/* ---------- Actions ---------- */
function curQ() { return S.quotes.find(q => q.id === S.ui.current); }
function openQuote(id) { if (!can('edit')) { openClient(id, true); return; } S.ui.current = id; go('builder'); }
function newQuoteDialog(clientId) {
  S.ui.newFor = clientId || '';
  modal(t('newQuote'), `<p class="muted small">${t('newQuoteHint')}</p>
    <div class="choice-cards">
      <button class="cc" data-act="createQ" data-type="FIT"><span class="kind">${ic('user')}</span><b>${t('fitQuote')}</b><span>${t('fitQuoteHint')}</span></button>
      <button class="cc" data-act="createQ" data-type="GROUP"><span class="kind">${ic('users')}</span><b>${t('groupQuote')}</b><span>${t('groupQuoteHint')}</span></button>
      <button class="cc" data-act="go" data-v="packages"><span class="kind">${ic('box')}</span><b>${t('fromPackage')}</b><span>${t('fromPackageHint')}</span></button>
    </div>`, '', { wide: true });
}
function sendDialog(id) {
  const q = S.quotes.find(x => x.id === id), c = clientOf(q), p = price(q), lang = q.lang;
  const cloud = Cloud.on;
  const link = cloud ? Cloud.offerLink(q.id) : `https://${S.brand.domain}/p/${q.id}`;
  const msg = tl('waMsg', lang, { n: (c?.name || '').split(' ')[0], t: q.title, d: fmtDate(q.start, lang), total: money(p.total, lang), v: fmtDate(q.validUntil, lang), l: link, a: tx({ en: S.brand.name, ar: S.brand.nameAr || S.brand.name }, lang) });
  const wa = c?.phone ? `https://wa.me/${waDigits(c.phone)}?text=${encodeURIComponent(msg)}` : '';
  modal(t('sendToClient') + ' · ' + q.id, `
    <div class="f"><label>${t('clientLink')}</label><div class="copybox"><input class="inp" readonly value="${esc(link)}" aria-label="${t('clientLink')}"><button class="btn" data-act="copy" data-text="${esc(link)}">${ic('copy', 'sm')} ${t('copy')}</button></div><span class="hint">${cloud ? t('linkHint') : t('linkHintDemo')}</span></div>
    <div class="f"><label>${t('waMessage')} (${lang === 'ar' ? 'العربية' : 'English'})</label><textarea class="inp" rows="7" id="wa-msg" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">${esc(msg)}</textarea></div>
    ${wa ? `<p class="small muted">${t('waTo', { p: esc(c.phone) })}</p>` : `<p class="small down">${t('noClientPhone')}</p>`}`,
    `<button class="btn" data-act="copyMsg">${ic('copy', 'sm')} ${t('copyMessage')}</button>${wa ? `<a class="btn primary" href="${wa}" target="_blank" rel="noopener" data-act="markSent" data-id="${q.id}">${ic('chat', 'sm')} ${t('openWhatsApp')}</a>` : ''}<button class="btn" data-act="markSentBtn" data-id="${q.id}">${t('markSent')}</button>`);
}
function logAct(q, k, extra) { q.activity.unshift(Object.assign({ ts: today(), k }, extra || {})); }
function setStatus(q, s) {
  if (q.status === s) return; q.status = s; logAct(q, s);
  if (s === 'confirmed') q.confirmedAt = today();
}

const ACT = {
  go: el => { closeModal(); go(el.dataset.v); },
  closeModal: () => closeModal(),
  confirmYes: () => { const cb = confirmCb; closeModal(); if (cb) cb(); },
  toggleSide: () => $('#side').classList.toggle('open'),
  toggleLang: () => { S.ui.lang = L() === 'ar' ? 'en' : 'ar'; renderShell(); route(); },
  resetDemo: () => confirmBox(t('resetConfirm'), () => { const lang = L(); seedState(); S.ui.lang = lang; renderShell(); go('dashboard'); toast(t('demoReset')); }),
  newQuote: () => newQuoteDialog(),
  newFor: el => newQuoteDialog(el.dataset.id),
  createQ: async el => { const q = blankQuote(el.dataset.type, L()); if (!(await assignRef(q))) return; q.clientId = S.ui.newFor || ''; if (q.type === 'GROUP') { q.lines.push(Object.assign(newLine('hotel', q), { rates: { sgl: 0, dbl: 0, tpl: 0, quad: 0 } })); } else q.lines.push(newLine('hotel', q)); S.quotes.unshift(q); closeModal(); openQuote(q.id); },
  open: (el, e) => { if (e.target.closest('.acts') && el.tagName === 'TR') return; openQuote(el.dataset.id); },
  preview: el => openClient(el.dataset.id, true),
  send: async el => { if (Cloud.on) { await Cloud.flush(); if (!Cloud.meta[el.dataset.id]) { toast(t('syncError')); return; } } sendDialog(el.dataset.id); },
  copy: el => copyText(el.dataset.text),
  copyMsg: () => copyText($('#wa-msg').value),
  markSent: el => { const q = S.quotes.find(x => x.id === el.dataset.id); if (q.status === 'draft') setStatus(q, 'sent'); save(); setTimeout(() => { closeModal(); route(); }, 50); },
  markSentBtn: el => { const q = S.quotes.find(x => x.id === el.dataset.id); if (q.status === 'draft') setStatus(q, 'sent'); closeModal(); route(); toast(t('markedSent')); },
  dup: async el => { const q = clone(S.quotes.find(x => x.id === el.dataset.id)); q.id = `${S.brand.prefix}-${++S.seq}`; if (!(await assignRef(q))) return; q.status = 'draft'; q.created = today(); q.validUntil = addDays(today(), S.brand.validDays || 5); q.paid = 0; q.payments = []; q.activity = [{ ts: today(), k: 'created' }]; delete q.confirmedAt; S.quotes.unshift(q); toast(t('duplicated', { id: q.id })); route(); },
  delQuote: el => confirmBox(t('deleteQuoteQ', { id: el.dataset.id }), () => { S.quotes = S.quotes.filter(q => q.id !== el.dataset.id); if (S.ui.view === 'builder') go('quotes'); else route(); toast(t('deleted')); }, t('delete')),
  qf: el => { S.ui.qf[el.dataset.k] = el.dataset.val; route(); },
  pkCat: el => { S.ui.pkCat = el.dataset.val; route(); },
  usePkg: el => usePkgDialog(el.dataset.id),
  usePkgGo: async el => {
    const pk = allPackages().find(p => p.id === el.dataset.id);
    const o = { clientId: $('#up-client').value, start: $('#up-start').value || addDays(today(), 30), lang: $('#up-lang').value };
    if ($('#up-ad')) { o.adults = Math.max(1, num($('#up-ad').value)); o.children = Math.max(0, num($('#up-ch').value)); }
    const q = quoteFromPackage(pk, o); if (!(await assignRef(q))) return; S.quotes.unshift(q); closeModal(); toast(t('quoteCreated', { id: q.id })); openQuote(q.id);
  },
  pkPreview: el => { const pk = allPackages().find(p => p.id === el.dataset.id); const q = quoteFromPackage(pk, { lang: L() }); S.seq--; q.id = 'PREVIEW'; openClient(q, true); },
  delPkg: el => confirmBox(t('deletePkgQ'), () => { S.packages = S.packages.filter(p => p.id !== el.dataset.id); route(); }, t('delete')),
  confirmBk: el => { const q = S.quotes.find(x => x.id === el.dataset.id); setStatus(q, 'confirmed'); route(); toast(t('bookingConfirmed')); },
  payDlg: el => payDialog(el.dataset.id),
  paySave: async el => { const q = S.quotes.find(x => x.id === el.dataset.id); const amt = num($('#pay-amt').value); if (amt <= 0) return toast(t('enterAmount'));
    if (Cloud.on) {
      try { await Cloud.flush(); await Cloud.rpc('record_payment', { p_ref: q.id, p_amount: amt, p_date: $('#pay-date').value || today(), p_note: $('#pay-note').value }); closeModal(); await Cloud.refreshQuote(q.id); toast(t('paymentSaved')); }
      catch (e) { toast(friendlyErr(e)); }
      return;
    } q.paid = num(q.paid) + amt; q.payments.push({ date: $('#pay-date').value || today(), amount: amt, note: $('#pay-note').value }); logAct(q, 'payment', { amt }); if (q.status === 'accepted') setStatus(q, 'confirmed'); closeModal(); route(); toast(t('paymentSaved')); },
  clientDlg: el => clientDialog(el.dataset.id),
  clientSave: el => {
    const name = $('#c-name').value.trim(); if (!name) { $('#c-name').focus(); return toast(t('nameRequired')); }
    const data = { name, phone: $('#c-phone').value, email: $('#c-email').value, city: $('#c-city').value, company: $('#c-company').value, tags: $$('.c-tag').filter(x => x.checked).map(x => x.value) };
    let c = S.clients.find(x => x.id === el.dataset.id);
    if (c) Object.assign(c, data); else { c = Object.assign({ id: uuid(), notes: '' }, data); S.clients.unshift(c); }
    closeModal();
    if (S.ui.view === 'builder' && S.ui.pickClient) { const q = curQ(); q.clientId = c.id; S.ui.pickClient = false; }
    route(); toast(t('saved'));
  },
  clientQuotes: el => { const c = S.clients.find(x => x.id === el.dataset.id); S.ui.qf = { status: 'all', type: 'all', q: c.name }; go('quotes'); },
  setColor: el => { S.brand.color = el.dataset.val; applyBrand(); route(); },
  rmLogo: () => { S.brand.logo = null; renderShell(); route(); }
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const f = ACT[el.dataset.act] || (window.BACT && BACT[el.dataset.act]) || (window.CACT && CACT[el.dataset.act]) || (window.LACT && LACT[el.dataset.act]);
  if (!f) return;
  if (el.tagName === 'BUTTON' || (el.tagName === 'A' && !el.href)) e.preventDefault();
  f(el, e);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if ($('#modal')) closeModal(); else if ($('#cv')) closeClient(); }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('tr[data-act]')) { e.preventDefault(); e.target.click(); }
});
document.addEventListener('input', e => {
  const el = e.target;
  if (el.id === 'qsearch') { S.ui.qf.q = el.value; const pos = el.selectionStart; route(); const n = $('#qsearch'); n.focus(); n.setSelectionRange(pos, pos); return; }
  if (el.dataset.brand) {
    const k = el.dataset.brand;
    S.brand[k] = el.type === 'checkbox' ? el.checked : el.type === 'number' ? num(el.value) : el.value;
    applyBrand();
    const pv = $('#brand-preview'); if (pv) pv.innerHTML = brandPreview();
    const ag = $('.agency'); if (ag) ag.innerHTML = `<div class="logo">${logoHTML()}</div><div><b>${esc(brandName())}</b><span>${esc(brandTag())}</span></div>`;
    save();
  }
});
// Resize uploaded images in the browser so quotes stay small and the back office loads fast.
function shrinkImage(file, maxSide, keepAlpha) {
  return new Promise((res, rej) => {
    const rd = new FileReader();
    rd.onerror = rej;
    rd.onload = () => {
      if (/svg/.test(file.type)) return res(rd.result);
      const img = new Image();
      img.onerror = rej;
      img.onload = () => {
        const k = Math.min(1, maxSide / Math.max(img.width, img.height));
        const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        const out = keepAlpha ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', 0.8);
        res(out.length < rd.result.length ? out : rd.result);
      };
      img.src = rd.result;
    };
    rd.readAsDataURL(file);
  });
}
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.file) {
    const file = el.files && el.files[0]; if (!file) return;
    if (file.size > 15 * 1024 * 1024) return toast(t('imageTooBig'));
    const kind = el.dataset.file;
    shrinkImage(file, kind === 'logo' ? 500 : 1400, kind === 'logo').then(url => {
      if (kind === 'logo') { S.brand.logo = url; renderShell(); route(); }
      else if (kind === 'cover') { const q = curQ(); if (q) { q.cover = url; q.coverCredit = null; route(); } }
    }).catch(() => toast(t('imageTooBig')));
  }
  if (el.dataset.brand && el.tagName === 'SELECT') { S.brand[el.dataset.brand] = el.value; route(); }
});
window.addEventListener('hashchange', route);

async function assignRef(q) {
  if (!(Cloud.on)) return true;
  try { q.id = await Cloud.rpc('next_ref'); return true; } catch (e) { toast(friendlyErr(e)); return false; }
}
function boot() {
  const cfg = window.WEJHA_CONFIG || {};
  const tok = offerToken();
  if (tok) return bootOffer(tok, cfg);
  if (cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase) return Cloud.start(cfg);
  S = load();
  if (!S || S.v !== 1) { seedState(); try { if ((navigator.language || '').startsWith('ar')) S.ui.lang = 'ar'; } catch (e) { } }
  S.ui.qf = S.ui.qf || { status: 'all', type: 'all', q: '' };
  renderShell(); route();
}

/* ---------- Quotation builder (FIT + Group) ---------- */
function getPath(o, p) { return p.split('.').reduce((a, k) => a == null ? a : a[k], o); }
function setPath(o, p, v) { const ks = p.split('.'); const last = ks.pop(); const tgt = ks.reduce((a, k) => a[k], o); tgt[last] = v; }
const secOpen = n => (S.ui.secs || (S.ui.secs = { 1: true, 2: true, 3: true }))[n] ? 'open' : '';
function sec(n, id, title, sum, body) {
  return `<details class="sec" data-sec="${n}" ${secOpen(n)}><summary><span class="n">${n}</span><h3>${title}</h3><span class="sum" id="${id}">${sum}</span>${ic('chev', 'sm chev')}</summary><div class="in">${body}</div></details>`;
}
const fld = (lbl, html, cls = '') => `<div class="f ${cls}"><label>${lbl}</label>${html}</div>`;
const inpQ = (path, val, attrs = '') => `<input class="inp" data-q="${path}" value="${esc(val)}" ${attrs}>`;
const numQ = (path, val, attrs = '') => `<input class="inp num" type="number" min="0" step="any" data-q="${path}" value="${esc(val)}" ${attrs}>`;
const stepper = (path, val, re = true) => `<div class="stepper"><button data-act="step" data-path="${path}" data-d="-1" aria-label="-">−</button><input type="number" min="0" data-q="${path}" ${re ? 'data-re' : ''} value="${esc(val)}" aria-label="${path}"><button data-act="step" data-path="${path}" data-d="1" aria-label="+">+</button></div>`;
const selQ = (path, val, opts, re = true) => `<select class="inp" data-q="${path}" ${re ? 'data-re' : ''}>${opts.map(([v, l]) => `<option value="${esc(v)}" ${String(val) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;

function travSum(q) { const p = price(q); return q.type === 'GROUP' ? t('groupSum', { p: p.pax, f: p.foc }) : t('fitSum', { a: q.adults, c: q.children }); }
function svcSum(q) { return t('svcSum', { n: q.lines.length, o: q.lines.filter(l => l.optional).length }); }

function lineHTML(q, l, i) {
  const P = `lines.${i}`;
  const active = lineActive(q, l);
  let f = '';
  if (l.kind === 'hotel') {
    f += fld(t('city'), inpQ(P + '.city', l.city));
    f += fld(t('stars'), selQ(P + '.stars', l.stars, [1, 2, 3, 4, 5].map(s => [s, '★'.repeat(s)]), false));
    f += fld(t('board'), selQ(P + '.board', l.board, BOARDS.map(b => [b, t('board_' + b)]), false));
    f += fld(t('nights'), numQ(P + '.nights', l.nights));
    if (q.type === 'GROUP') {
      Object.keys(OCC).forEach(k => f += fld(t('rate_' + k), numQ(`${P}.rates.${k}`, l.rates[k])));
    } else {
      f += fld(t('roomType'), inpQ(P + '.roomType', l.roomType));
      f += fld(t('rooms'), numQ(P + '.rooms', l.rooms));
      f += fld(t('netPerNight'), numQ(P + '.rate', l.rate));
    }
  } else {
    f += fld(t('details'), inpQ(P + '.detail', l.detail, `placeholder="${t('detailsPh')}"`));
    f += fld(t('pricedBy'), selQ(P + '.basis', l.basis, [['pp', t('basis_pp')], ['group', t('basis_group')], ['unit', t('basis_unit')]]));
    f += fld(l.basis === 'unit' ? t('units') : t('qty'), numQ(P + '.qty', l.qty));
    f += fld(t('netUnit'), numQ(P + '.unit', l.unit));
  }
  const chosen = l.choice && chosenIn(q, l.choice) === l.id;
  return `<div class="line ${l.optional ? 'opt' : ''} ${l.choice ? 'choice' : ''}" data-line="${l.id}">
    <div class="line-h"><span class="kind">${ic(KIND_IC[l.kind])}</span>
      ${selQ(P + '.kind', l.kind, KINDS.map(k => [k, t('kind_' + k)]))}
      <input class="inp name" data-q="${P}.name" value="${esc(l.name)}" placeholder="${l.kind === 'hotel' ? t('hotelNamePh') : t('serviceNamePh')}" aria-label="${t('name')}">
      <span class="line-t ${active ? '' : 'muted'}" id="lt-${l.id}" title="${active ? '' : t('notInTotal')}">${money(lineCost(q, l))}</span>
      <button class="icon-btn" data-act="dupLine" data-id="${l.id}" aria-label="${t('duplicate')}" title="${t('duplicate')}">${ic('copy', 'sm')}</button>
      <button class="icon-btn bad" data-act="rmLine" data-id="${l.id}" aria-label="${t('delete')}" title="${t('delete')}">${ic('trash', 'sm')}</button>
    </div>
    <div class="fields">${f}</div>
    <div class="line-f">
      <label class="check"><input type="checkbox" data-q="${P}.optional" data-re ${l.optional ? 'checked' : ''}> ${t('optionalAddon')}</label>
      <label class="row" style="gap:6px">${t('clientChoice')} ${selQ(P + '.choice', l.choice, [['', t('fixed')], ['A', t('choiceSet', { s: 'A' })], ['B', t('choiceSet', { s: 'B' })], ['C', t('choiceSet', { s: 'C' })]])}</label>
      ${l.choice ? `<label class="check"><input type="radio" name="def-${l.choice}" data-act="defChoice" data-id="${l.id}" data-set="${l.choice}" ${chosen ? 'checked' : ''}> ${t('selectedOption')}</label>` : ''}
      ${!active ? `<span class="tiny">${l.optional ? t('notSelectedAddon') : t('alternativeOption')}</span>` : ''}
      ${l.kind === 'hotel' ? `<span class="grow" style="flex:1"></span>${l.src ? `<span class="tiny" title="${esc(l.src.cancel || '')}">${t('liveFrom', { d: fmtShort(l.src.at) })}${l.src.demo ? ' · demo' : ''}</span>` : ''}<button class="btn sm" data-act="liveRate" data-id="${l.id}">${ic('spark', 'sm')} ${t('liveRate')}</button>` : ''}
    </div>
  </div>`;
}

function bsumHTML(q) {
  const p = price(q), sc = schedule(q, p.total);
  const vatR = num(S.brand.vat);
  let h = `<div class="card"><div class="card-h"><h2>${t('priceSummary')}</h2><span class="pill nodot ${p.margin >= 8 ? 'st-confirmed' : 'st-viewed'}">${t('marginPct', { p: p.margin.toFixed(1) })}</span></div>
    <div class="sumrow"><span class="muted">${t('netCost')}</span><span>${money(p.net)}</span></div>
    <div class="sumrow"><span class="muted">${q.markupType === 'pp' ? t('markupPP', { m: money(q.markup) }) : t('markupPct', { m: q.markup })}</span><span>${money(p.markup)}</span></div>
    <div class="sumrow"><span class="muted">${t('vatOnFee', { v: vatR })}</span><span>${money(p.vat)}</span></div>
    <div class="sumrow total"><span>${t('total')}</span><span>${money(p.total)}</span></div>
    <div class="sumrow"><span class="muted">${t('perPayingPerson')}</span><span><b>${money(p.pp)}</b></span></div>`;
  if (q.type === 'GROUP') {
    h += p.foc ? `<p class="small muted">${t('focNote', { n: p.foc, f: q.group.foc, p: p.paying })}</p>` : '';
    h += `<div class="occ" style="margin-top:6px">${Object.keys(p.occ).map(k => `<div><b>${money(p.occ[k])}</b><span>${t('ppIn', { r: t('room_' + k) })}</span></div>`).join('')}</div>`;
    if (p.roomPax !== p.pax) h += `<div class="warn-box" style="margin-top:8px">${ic('alert', 'sm')}<span>${t('roomMismatch', { r: p.roomPax, p: p.pax })}</span><button class="btn sm" data-act="fixPax">${t('fix')}</button></div>`;
  }
  h += `<div style="border-top:1px solid var(--line);margin-top:10px;padding-top:10px" class="sched">
      <div><span class="muted">${t('depositNow', { p: q.deposit })}</span><b class="num">${money(sc.deposit)}</b></div>
      <div><span class="muted">${t('balanceBy', { d: fmtShort(sc.balanceDue) })}</span><b class="num">${money(sc.balance)}</b></div></div>`;
  const sets = choiceSets(q);
  if (sets.length || q.lines.some(l => l.optional)) h += `<p class="tiny muted" style="margin-top:10px">${t('priceReflects', { n: q.selection.addons.filter(id => q.lines.some(l => l.id === id && l.optional)).length })}</p>`;
  return h + '</div>';
}

function vBuilder() {
  const q = curQ(); const p = price(q);
  const g = q.type === 'GROUP';
  const clientOpts = [['', t('chooseClient')], ...S.clients.map(c => [c.id, c.name])];
  const trip = `
    <div class="row between"><div class="seg" role="group" aria-label="${t('type')}"><button class="${!g ? 'on' : ''}" data-act="setType" data-val="FIT">${ic('user', 'sm')} ${t('fit')}</button><button class="${g ? 'on' : ''}" data-act="setType" data-val="GROUP">${ic('users', 'sm')} ${t('group')}</button></div><span class="tiny muted">${g ? t('groupQuoteHint') : t('fitQuoteHint')}</span></div>
    <div class="grid g3">
      ${fld(t('client'), `<div class="row" style="flex-wrap:nowrap">${selQ('clientId', q.clientId, clientOpts)}<button class="btn sm" data-act="newClientHere" title="${t('addClient')}">${ic('plus', 'sm')}</button></div>`, 'span2')}
      ${fld(t('clientLang'), selQ('lang', q.lang, [['en', 'English'], ['ar', 'العربية']]))}
      ${fld(t('tripTitle'), inpQ('title', q.title, `placeholder="${t('tripTitlePh')}" id="in-title"`), 'span2')}
      ${fld(t('destination'), inpQ('dest', q.dest, `placeholder="${t('destPh')}"`))}
      ${fld(t('checkIn'), `<input class="inp" type="date" data-q="start" data-re value="${q.start}">`)}
      ${fld(t('nights'), `<input class="inp num" type="number" min="1" data-q="nights" data-re value="${q.nights}">`)}
      ${fld(t('checkOut'), `<input class="inp" disabled value="${fmtDate(endDate(q))}">`)}
      ${fld(t('validUntil'), `<input class="inp" type="date" data-q="validUntil" value="${q.validUntil}">`)}
    </div>
    <div class="f"><label>${t('coverImage')}</label><div class="cover-up"><div class="art">${artHTML(q.art, q.cover)}</div><div class="stack" style="gap:6px">
      ${selQ('art', q.art, ART_KEYS.map(k => [k, t('art_' + k)]))}
      <div class="row" style="gap:6px"><label class="btn sm" for="cover-file">${ic('upload', 'sm')} ${t('uploadPhoto')}</label><input id="cover-file" type="file" accept="image/*" hidden data-file="cover">${q.cover ? `<button class="btn ghost sm" data-act="rmCover">${t('remove')}</button>` : ''}</div></div></div></div>`;
  let trav;
  if (!g) {
    trav = `<div class="row" style="gap:24px">${[['adults', t('adults')], ['children', t('children')], ['infants', t('infants')]].map(([k, l]) => `<div class="f"><label>${l}</label>${stepper(k, q[k])}</div>`).join('')}</div>
      <p class="tiny muted">${t('infantNote')}</p>`;
  } else {
    const rl = q.group.rooming || [];
    trav = `<div class="grid g3">${fld(t('totalPax'), `<input class="inp num" type="number" min="1" data-q="group.pax" data-re value="${q.group.pax}">`)}
      ${fld(t('focPolicy'), selQ('group.foc', q.group.foc, [[0, t('noFoc')], [10, t('focEvery', { n: 10 })], [15, t('focEvery', { n: 15 })], [20, t('focEvery', { n: 20 })], [25, t('focEvery', { n: 25 })]]))}
      ${fld(t('payingPax'), `<input class="inp" disabled value="${p.paying}${p.foc ? ' (+' + p.foc + ' ' + t('free') + ')' : ''}">`)}</div>
      <div class="f"><label>${t('roomsByType')}</label><div class="rooms">${Object.keys(OCC).map(k => `<div class="room-ct"><b>${t('room_' + k)}</b>${stepper('group.rooms.' + k, q.group.rooms[k])}</div>`).join('')}</div>
      <span class="hint">${t('roomsHint', { r: p.roomPax, p: p.pax })}</span></div>
      <div class="row between"><b class="small">${t('roomingList')} <span class="muted">(${rl.length})</span></b><div class="row" style="gap:6px"><button class="btn sm" data-act="genRooming">${ic('bed', 'sm')} ${rl.length ? t('syncRooming') : t('genRooming')}</button>${rl.length ? `<button class="btn sm" data-act="copyRooming">${ic('copy', 'sm')} ${t('copy')}</button>` : ''}</div></div>
      ${rl.length ? `<div class="stack" style="gap:6px;max-height:320px;overflow:auto">${rl.map((r, i) => `<div class="rl"><span class="muted">${t('roomN', { n: i + 1 })}</span><span class="tag">${t('room_' + r.type)}</span><input class="inp" data-q="group.rooming.${i}.names" value="${esc(r.names)}" placeholder="${t('guestNamesPh', { n: OCC[r.type] })}" aria-label="${t('roomN', { n: i + 1 })}"></div>`).join('')}</div>` : `<p class="tiny muted">${t('roomingHint')}</p>`}`;
  }
  const svc = `${q.lines.length ? q.lines.map((l, i) => lineHTML(q, l, i)).join('') : `<p class="muted small">${t('noServices')}</p>`}
    <div class="add-row">${KINDS.map(k => `<button class="btn sm" data-act="addLine" data-kind="${k}">${ic(KIND_IC[k], 'sm')} ${t('kind_' + k)}</button>`).join('')}</div>
    <p class="tiny muted">${t('servicesHint')}</p>`;
  const days = `${q.days.map((d, i) => `<div class="day"><div class="dn">${t('dayN', { n: i + 1 })}<div class="tiny" style="font-weight:400">${fmtShort(addDays(q.start, i))}</div></div><div class="stack">${inpQ(`days.${i}.t`, d.t, `placeholder="${t('dayTitlePh')}" aria-label="${t('dayN', { n: i + 1 })}"`)}<textarea class="inp" rows="2" data-q="days.${i}.d" placeholder="${t('dayDescPh')}" aria-label="${t('dayN', { n: i + 1 })}">${esc(d.d)}</textarea></div><button class="icon-btn bad" data-act="rmDay" data-i="${i}" aria-label="${t('delete')}">${ic('x', 'sm')}</button></div>`).join('')}
    <div class="row"><button class="btn sm" data-act="addDay">${ic('plus', 'sm')} ${t('addDay')}</button>${q.days.length < q.nights + 1 ? `<button class="btn sm" data-act="fillDays">${ic('spark', 'sm')} ${t('fillDays', { n: q.nights + 1 })}</button>` : ''}</div>`;
  const incl = `<div class="grid g2">${fld(t('included'), `<textarea class="inp" rows="6" data-lines="inc" placeholder="${t('onePerLine')}">${esc(q.inc.join('\n'))}</textarea>`)}${fld(t('notIncluded'), `<textarea class="inp" rows="6" data-lines="exc" placeholder="${t('onePerLine')}">${esc(q.exc.join('\n'))}</textarea>`)}</div>`;
  const pricing = `<div class="grid g4">
      ${fld(t('markupType'), `<div class="seg"><button class="${q.markupType === 'pct' ? 'on' : ''}" data-act="setMk" data-val="pct">%</button><button class="${q.markupType === 'pp' ? 'on' : ''}" data-act="setMk" data-val="pp">${t('perPersonShort')}</button></div>`)}
      ${fld(q.markupType === 'pp' ? t('markupAmtPP') : t('markupPctLbl'), numQ('markup', q.markup))}
      ${fld(t('depositPct'), numQ('deposit', q.deposit))}
      ${fld(t('balanceDays'), numQ('balanceDays', q.balanceDays))}</div>
    <label class="check"><input type="checkbox" data-q="showItemPrices" ${q.showItemPrices ? 'checked' : ''}> ${t('showItemPrices')}</label>
    <p class="tiny muted">${t('vatFromSettings', { v: S.brand.vat })}</p>`;
  const terms = `${fld(t('termsClient'), `<textarea class="inp" rows="4" data-q="terms" dir="${q.lang === 'ar' ? 'rtl' : 'ltr'}">${esc(q.terms)}</textarea>`)}${fld(t('internalNotes'), `<textarea class="inp" rows="3" data-q="notes" placeholder="${t('internalNotesPh')}">${esc(q.notes)}</textarea>`)}
    ${q.changeReq ? `<div class="warn-box">${ic('edit', 'sm')}<span><b>${t('clientAsked')}</b> ${esc(q.changeReq)}</span></div>` : ''}`;

  return `
  <div class="head"><div><div class="crumb"><button data-act="go" data-v="quotes">${t('nav_quotes')}</button>${ic('chev', 'sm flip')}<span>${esc(q.id)}</span></div>
    <h1 id="b-title">${esc(q.title || t('untitled'))}</h1><p>${esc(clientOf(q)?.name || t('noClient'))} · ${typeTag(q.type)} · ${t('createdOn', { d: fmtShort(q.created) })}</p></div>
    <div class="row"><label class="row small muted" style="gap:6px">${t('status')} <select class="inp" id="b-status" style="width:auto">${STATUSES.map(s => `<option value="${s}" ${q.status === s ? 'selected' : ''}>${t('st_' + s)}</option>`).join('')}</select></label>
    <button class="btn" data-act="preview" data-id="${q.id}">${ic('eye', 'sm')} ${t('previewClient')}</button><button class="btn primary" data-act="send" data-id="${q.id}">${ic('send', 'sm')} ${t('send')}</button></div></div>
  <div class="builder">
    <div class="stack" style="gap:12px">
      ${sec(1, 'sum-trip', t('sec_trip'), esc(q.dest || ''), trip)}
      ${sec(2, 'sum-trav', t('sec_trav'), travSum(q), trav)}
      ${sec(3, 'sum-svc', t('sec_svc'), svcSum(q), svc)}
      ${sec(4, 'sum-days', t('sec_days'), t('daysN', { n: q.days.length }), days)}
      ${sec(5, 'sum-inc', t('sec_inc'), t('incSum', { a: q.inc.length, b: q.exc.length }), incl)}
      ${sec(6, 'sum-price', t('sec_price'), q.markupType === 'pp' ? money(q.markup) + ' / ' + t('perPersonShort') : q.markup + '%', pricing)}
      ${sec(7, 'sum-terms', t('sec_terms'), '', terms)}
    </div>
    <div class="summary">
      <div id="bsum">${bsumHTML(q)}</div>
      <div id="bitin">${itinBuilderCard(q)}</div>
      <div class="card stack" style="gap:8px">
        <button class="btn primary block" data-act="preview" data-id="${q.id}">${ic('eye', 'sm')} ${t('previewClient')}</button>
        <button class="btn block" data-act="send" data-id="${q.id}">${ic('chat', 'sm')} ${t('sendWhatsApp')}</button>
        <button class="btn block" data-act="savePkg">${ic('box', 'sm')} ${t('saveAsPackage')}</button>
        ${canPrint() ? `<button class="btn block" data-act="pdfQuote">${ic('download', 'sm')} ${t('downloadPdf')}</button>` : ''}
        <div class="row" style="gap:8px"><button class="btn sm" style="flex:1" data-act="dup" data-id="${q.id}">${ic('copy', 'sm')} ${t('duplicate')}</button><button class="btn sm danger" style="flex:1" data-act="delQuote" data-id="${q.id}">${ic('trash', 'sm')} ${t('delete')}</button></div>
        <p class="tiny muted">${t('autosaved')}</p>
      </div>
    </div>
  </div>`;
}
function afterBuilder() { }
function rerender() { const v = $('#view'), st = v.scrollTop; route(); v.scrollTop = st; }
function refreshB() {
  const q = curQ(); if (!q) return;
  q.lines.forEach(l => { const el = $('#lt-' + l.id); if (el) el.textContent = money(lineCost(q, l)); });
  $('#bsum').innerHTML = bsumHTML(q);
  clearTimeout(window.__itinT); window.__itinT = setTimeout(() => { const b = $('#bitin'), cq = curQ(); if (!b || !cq) return; const sig = JSON.stringify(itinStops(cq)); if (b.dataset.sig !== sig) { b.dataset.sig = sig; b.innerHTML = itinBuilderCard(cq); } }, 900);
  const tt = $('#b-title'); if (tt) tt.textContent = q.title || t('untitled');
  const s1 = $('#sum-trip'); if (s1) s1.textContent = q.dest || '';
  const s5 = $('#sum-inc'); if (s5) s5.textContent = t('incSum', { a: q.inc.length, b: q.exc.length });
  const s6 = $('#sum-price'); if (s6) s6.textContent = q.markupType === 'pp' ? money(q.markup) + ' / ' + t('perPersonShort') : q.markup + '%';
  save();
}
function syncRooming(q) {
  const old = q.group.rooming || [], out = [];
  Object.keys(OCC).forEach(k => { const prev = old.filter(r => r.type === k); for (let i = 0; i < num(q.group.rooms[k]); i++) out.push({ type: k, names: prev[i] ? prev[i].names : '' }); });
  q.group.rooming = out;
}

window.BACT = {
  pdfQuote: () => { const q = curQ(); printQuote(q, q.lang); },
  setType: el => {
    const q = curQ(), to = el.dataset.val; if (q.type === to) return;
    if (to === 'GROUP') {
      q.group.pax = Math.max(num(q.group.pax), paxOf(q) || 10);
      q.lines.forEach(l => { if (l.kind === 'hotel' && !Object.values(l.rates || {}).some(v => num(v) > 0)) l.rates = { sgl: l.rate, dbl: l.rate, tpl: Math.round(l.rate * 1.2), quad: Math.round(l.rate * 1.4) }; });
    } else q.lines.forEach(l => { if (l.kind === 'hotel' && !num(l.rate)) l.rate = num(l.rates && l.rates.dbl); });
    q.type = to; rerender();
  },
  setMk: el => { const q = curQ(); q.markupType = el.dataset.val; if (el.dataset.val === 'pp' && q.markup < 50) q.markup = 150; if (el.dataset.val === 'pct' && q.markup > 60) q.markup = S.brand.markup; rerender(); },
  step: el => { const q = curQ(); const v = Math.max(0, num(getPath(q, el.dataset.path)) + num(el.dataset.d)); setPath(q, el.dataset.path, v); rerender(); },
  addLine: el => { const q = curQ(); const l = newLine(el.dataset.kind, q); if (q.type === 'GROUP' && l.kind === 'hotel') l.rooms = 0; q.lines.push(l); S.ui.secs[3] = true; rerender(); const n = $(`[data-line="${l.id}"] .name`); if (n) n.focus(); },
  rmLine: el => { const q = curQ(); q.lines = q.lines.filter(l => l.id !== el.dataset.id); q.selection.addons = q.selection.addons.filter(x => x !== el.dataset.id); rerender(); },
  dupLine: el => { const q = curQ(); const i = q.lines.findIndex(l => l.id === el.dataset.id); const c = clone(q.lines[i]); c.id = uid(); q.lines.splice(i + 1, 0, c); rerender(); },
  defChoice: el => { const q = curQ(); q.selection.choices[el.dataset.set] = el.dataset.id; rerender(); },
  addDay: () => { const q = curQ(); q.days.push({ t: '', d: '' }); rerender(); },
  rmDay: el => { const q = curQ(); q.days.splice(num(el.dataset.i), 1); rerender(); },
  fillDays: () => { const q = curQ(); const lang = q.lang; while (q.days.length < q.nights + 1) { const i = q.days.length; q.days.push({ t: i === 0 ? tl('dayArrival', lang) : i === q.nights ? tl('dayDeparture', lang) : tl('dayFree', lang), d: '' }); } rerender(); },
  genRooming: () => { syncRooming(curQ()); rerender(); },
  copyRooming: () => { const q = curQ(); copyText(q.group.rooming.map((r, i) => `${i + 1}. ${t('room_' + r.type)}: ${r.names || '—'}`).join('\n')); },
  fixPax: () => { const q = curQ(); q.group.pax = price(q).roomPax; rerender(); },
  rmCover: () => { curQ().cover = null; curQ().coverCredit = null; rerender(); },
  newClientHere: () => { S.ui.pickClient = true; clientDialog(); },
  savePkg: () => {
    const q = curQ();
    modal(t('saveAsPackage'), `<p class="small muted">${t('savePkgHint')}</p><div class="grid g2"><div class="f span2"><label for="sp-name">${t('packageName')}</label><input id="sp-name" value="${esc(q.title)}"></div>
      <div class="f"><label for="sp-cat">${t('category')}</label><select id="sp-cat">${CATS.filter(c => c !== 'all' && c !== 'custom').map(c => `<option value="${c}">${t('cat_' + c)}</option>`).join('')}</select></div>
      <div class="f"><label for="sp-sum">${t('shortDesc')}</label><input id="sp-sum" value="${esc(q.days[0]?.d || '')}"></div></div>`,
      `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="savePkgGo">${t('save')}</button>`);
  },
  savePkgGo: () => {
    const q = curQ(); const name = $('#sp-name').value.trim() || q.title || t('untitled');
    const pk = { id: uuid(), custom: true, art: q.art, cover: q.cover, cat: $('#sp-cat').value, type: q.type, nights: q.nights, adults: q.adults, children: q.children,
      group: { pax: q.group.pax, foc: q.group.foc, rooms: clone(q.group.rooms) }, title: name, dest: q.dest, summary: $('#sp-sum').value, tags: [],
      lines: q.lines.map(l => { const c = clone(l); delete c.id; return c; }), days: q.days.map(d => [d.t, d.d]), inc: q.inc.slice(), exc: q.exc.slice() };
    S.packages.push(pk); closeModal(); save(); toast(t('pkgSaved'));
  }
};

document.addEventListener('toggle', e => { const d = e.target; if (d.matches && d.matches('details.sec')) { S.ui.secs = S.ui.secs || {}; S.ui.secs[d.dataset.sec] = d.open; } }, true);
document.addEventListener('input', e => {
  const el = e.target; const q = S.ui.view === 'builder' && curQ(); if (!q) return;
  if (el.dataset.lines) { q[el.dataset.lines] = el.value.split('\n').map(s => s.trim()).filter(Boolean); refreshB(); return; }
  if (!el.dataset.q || el.hasAttribute('data-re')) return;
  const v = el.type === 'checkbox' ? el.checked : el.type === 'number' ? num(el.value) : el.value;
  setPath(q, el.dataset.q, v);
  refreshB();
});
document.addEventListener('change', e => {
  const el = e.target; const q = S.ui.view === 'builder' && curQ(); if (!q) return;
  if (el.id === 'b-status') { setStatus(q, el.value); rerender(); toast(t('statusUpdated')); return; }
  if (!el.dataset.q || !el.hasAttribute('data-re')) return;
  let v = el.type === 'checkbox' ? el.checked : el.type === 'number' ? num(el.value) : el.value;
  if (el.dataset.q === 'group.foc') v = num(v);
  if (el.dataset.q === 'lang') { if (q.terms === S.brand.termsEn && v === 'ar') q.terms = S.brand.termsAr; if (q.terms === S.brand.termsAr && v === 'en') q.terms = S.brand.termsEn; }
  if (el.dataset.q === 'nights') { const old = num(q.nights), hs = q.lines.filter(l => l.kind === 'hotel'); if (hs.every(l => num(l.nights) === old)) hs.forEach(l => l.nights = Math.max(1, num(v))); v = Math.max(1, num(v)); }
  setPath(q, el.dataset.q, v);
  rerender();
});

/* ---------- Interactive client package page ---------- */
let CV = null; // { q, lang, agent }
function openClient(ref, agent) {
  const q = typeof ref === 'string' ? S.quotes.find(x => x.id === ref) : ref;
  if (!q) return;
  if (q.id !== 'PREVIEW' && q.status === 'sent') { setStatus(q, 'viewed'); save(); }
  CV = { q, lang: q.lang || L(), agent: !!agent };
  renderClient(true);
}
function closeClient() { if (CV && CV.offer) return; const el = $('#cv'); if (el) el.remove(); CV = null; if (S.ui.view) rerenderSafe(); }
function rerenderSafe() { if (!$('#view')) return; const v = $('#view'); const st = v ? v.scrollTop : 0; route(); if (v) v.scrollTop = st; }
function selWith(q, patch) { const s = clone(q.selection); if (patch.set) s.choices[patch.set] = patch.id; if (patch.toggle) { s.addons = s.addons.includes(patch.toggle) ? s.addons.filter(x => x !== patch.toggle) : s.addons.concat(patch.toggle); } return s; }
function signed(n, lang) { const r = Math.round(n); if (Math.abs(r) < 1) return tl('samePrice', lang); return (r > 0 ? '+ ' : '− ') + money(Math.abs(r), lang); }

function renderClient(first) {
  const { q, lang } = CV; const T = (k, v) => tl(k, lang, v); const M = n => money(n, lang);
  const p = price(q), sc = schedule(q, p.total), c = clientOf(q) || (q._clientName ? { name: q._clientName } : null);
  const done = ['accepted', 'confirmed'].includes(q.status);
  const left = daysBetween(today(), q.validUntil), expired = left < 0 && !done;
  const name = lang === 'ar' ? (S.brand.nameAr || S.brand.name) : S.brand.name;
  const wa = waDigits(S.brand.whatsapp);
  const waLink = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(T('waAsk', { id: q.id, t: q.title }))}` : '';
  const stars = n => `<span class="stars">${Array.from({ length: num(n) }, () => ic('star')).join('')}</span>`;
  const sets = choiceSets(q);
  const hotelLine = l => `${esc(l.city)}${l.board ? ' · ' + T('board_' + l.board) : ''}${l.roomType && q.type !== 'GROUP' ? ' · ' + esc(l.roomType) : ''} · ${T('nightsN', { n: l.nights })}`;

  // Choice sets
  const choiceHTML = sets.map(set => {
    const cur = chosenIn(q, set); const opts = q.lines.filter(l => l.choice === set && (!done || l.id === cur));
    const allHotels = opts.every(l => l.kind === 'hotel');
    return `<section class="cv-sec"><h2>${done ? (allHotels ? T('yourHotel') : T('yourOption')) : allHotels ? T('chooseHotel') : T('chooseOption')}</h2>${done ? '' : `<p class="lead">${T('chooseLead')}</p>`}
      <div class="opt-cards" role="radiogroup">${opts.map(l => {
        const on = l.id === cur; const d = price(q, selWith(q, { set, id: l.id })).total - p.total;
        return `<div class="oc ${on ? 'on' : ''}" role="radio" tabindex="0" aria-checked="${on}" ${done ? '' : 'data-act="cvChoose"'} data-set="${set}" data-id="${l.id}">
          <span class="tick">${on ? ic('check', 'sm') : ''}</span>
          ${l.kind === 'hotel' ? stars(l.stars) : `<span class="kind">${ic(KIND_IC[l.kind])}</span>`}
          <b>${esc(l.name || T('kind_' + l.kind))}</b>
          <span class="small muted">${l.kind === 'hotel' ? hotelLine(l) : esc(l.detail)}</span>
          <span class="diff ${on ? '' : d > 0 ? 'muted' : 'up'}">${on ? T('yourChoice') : signed(d, lang)}</span>
        </div>`; }).join('')}</div></section>`;
  }).join('');

  const stays = q.lines.filter(l => l.kind === 'hotel' && !l.choice && !l.optional);
  const svcs = q.lines.filter(l => l.kind !== 'hotel' && !l.optional && !l.choice);
  const addons = q.lines.filter(l => l.optional && !l.choice && (!done || q.selection.addons.includes(l.id)));
  const itemPrice = l => q.showItemPrices ? `<b class="num small">${M(sellOf(q, lineCost(q, l)))}</b>` : '';

  const main = `
    ${done ? `<div class="done-panel">${ic('check', 'lg')}<h2>${q.status === 'confirmed' ? T('bookingConfirmedTitle') : T('acceptedTitle')}</h2><p>${q.status === 'confirmed' ? T('bookingConfirmedText') : T('acceptedText', { a: esc(name) })}</p></div>` : ''}
    ${choiceHTML}
    ${stays.length ? `<section class="cv-sec"><h2>${sets.length ? T('alsoStaying') : T('whereStay')}</h2>${stays.map(l => `<div class="stay"><span class="kind">${ic('hotel')}</span><div class="grow" style="flex:1"><div class="row" style="gap:8px"><b>${esc(l.name)}</b>${stars(l.stars)}</div><span class="small muted">${hotelLine(l)}</span></div>${itemPrice(l)}</div>`).join('')}</section>` : ''}
    ${itinSection(q, lang)}
    ${svcs.length ? `<section class="cv-sec"><h2>${T('inYourPackage')}</h2><div class="stack" style="gap:8px">${svcs.map(l => `<div class="stay" style="padding:12px 14px"><span class="kind" style="width:36px;height:36px">${ic(KIND_IC[l.kind])}</span><div style="flex:1;min-width:0"><b>${esc(l.name)}</b>${l.detail ? `<div class="small muted">${esc(l.detail)}${l.qty > 1 ? ' × ' + l.qty : ''}</div>` : ''}</div>${itemPrice(l)}</div>`).join('')}</div></section>` : ''}
    ${addons.length ? `<section class="cv-sec"><h2>${done ? T('yourExtras') : T('makeItYours')}</h2>${done ? '' : `<p class="lead">${T('addonsLead')}</p>`}<div class="stack" style="gap:8px">${addons.map(l => {
      const on = q.selection.addons.includes(l.id); const d = Math.abs(price(q, selWith(q, { toggle: l.id })).total - p.total);
      const per = l.basis === 'pp' ? T('perPersonCalc', { a: M(d / Math.max(1, paxOf(q))), n: paxOf(q) }) : '';
      return `<div class="addon ${on ? 'on' : ''}" role="switch" tabindex="0" aria-checked="${on}" ${done ? '' : 'data-act="cvAddon"'} data-id="${l.id}"><span class="kind">${ic(KIND_IC[l.kind])}</span><div class="grow"><b>${esc(l.name)}</b><br><span>${per || esc(l.detail || '')}</span></div><b class="num">${on ? '' : '+ '}${M(d)}</b><span class="switch" aria-hidden="true"></span></div>`; }).join('')}</div></section>` : ''}
    ${q.days.length ? `<section class="cv-sec"><h2>${T('dayByDay')}</h2><div class="timeline">${q.days.map((d, i) => { const dt = addDays(q.start, i); return `<div class="tl"><div class="dd"><small>${parseD(dt).toLocaleDateString(locale(lang), { month: 'short' })}</small><b>${parseD(dt).getDate()}</b></div><details ${i < 2 ? 'open' : ''}><summary><span>${esc(d.t || T('dayN', { n: i + 1 }))}</span><span class="muted">${T('dayN', { n: i + 1 })}</span></summary>${d.d ? `<p>${esc(d.d)}</p>` : ''}</details></div>`; }).join('')}</div></section>` : ''}
    ${q.inc.length || q.exc.length ? `<section class="cv-sec"><h2>${T('whatsCovered')}</h2><div class="incl"><div class="card flat"><h3 style="margin-bottom:10px">${T('included')}</h3><ul class="yes">${q.inc.map(x => `<li>${ic('check', 'sm')}${esc(x)}</li>`).join('')}</ul></div><div class="card flat"><h3 style="margin-bottom:10px">${T('notIncluded')}</h3><ul class="no">${q.exc.map(x => `<li>${ic('x', 'sm')}${esc(x)}</li>`).join('')}</ul></div></div></section>` : ''}
    ${q.type === 'GROUP' ? `<section class="cv-sec"><h2>${T('groupPricing')}</h2><p class="lead">${T('groupPricingLead', { p: p.pax })}${p.foc ? ' ' + T('focClient', { n: p.foc }) : ''}</p><div class="occ">${Object.keys(p.occ).map(k => `<div style="background:var(--surface);border:1px solid var(--line)"><b style="font-size:17px">${M(p.occ[k])}</b><span>${T('ppIn', { r: T('room_' + k) })} · ${q.group.rooms[k]} ${T('roomsWord')}</span></div>`).join('')}</div></section>` : ''}
    ${q.terms ? `<section class="cv-sec"><h2>${T('termsTitle')}</h2><p class="muted small">${esc(q.terms)}</p></section>` : ''}`;

  const chosenNames = sets.map(s => q.lines.find(l => l.id === chosenIn(q, s))).filter(Boolean).map(l => l.name);
  const addonNames = addons.filter(l => q.selection.addons.includes(l.id)).map(l => l.name);
  const side = `<div class="card pricecard">
      <span class="small muted">${T('yourPrice')}</span>
      <div class="big" id="cv-total">${M(p.total)}</div>
      <span class="small muted">${q.type === 'GROUP' ? T('avgPerPaying', { a: M(p.pp), n: p.paying }) : T('forTravellers', { a: M(p.pp), n: p.pax })}</span>
      ${chosenNames.length || addonNames.length ? `<div class="chips">${chosenNames.concat(addonNames).map(n => `<span class="tag">${esc(n)}</span>`).join('')}</div>` : ''}
      ${!done ? (expired ? `<div class="countdown">${ic('alert', 'sm')} ${T('offerExpired')}</div>` : `<div class="countdown">${ic('clock', 'sm')} ${left === 0 ? T('validToday') : T('validDays', { n: left, d: fmtDate(q.validUntil, lang) })}</div>`) : ''}
      <div class="sched"><div><span class="muted">${T('depositNow', { p: q.deposit })}</span><b class="num">${M(sc.deposit)}</b></div><div><span class="muted">${T('balanceBy', { d: fmtShort(sc.balanceDue, lang) })}</span><b class="num">${M(sc.balance)}</b></div></div>
      ${!done ? `<button class="btn primary lg block" data-act="cvAccept" ${expired ? 'disabled' : ''}>${ic('check', 'sm')} ${T('acceptOffer')}</button>
      <button class="btn block" data-act="cvChanges">${ic('edit', 'sm')} ${T('requestChanges')}</button>` : ''}
      ${waLink ? `<a class="btn block" href="${waLink}" target="_blank" rel="noopener">${ic('chat', 'sm')} ${T('chatWithUs')}</a>` : ''}
      <p class="tiny muted">${T('afterAccept')}</p>
    </div>`;

  const html = `
  ${CV.offer ? `<div class="cv-bar offer no-print" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"><span class="grow"></span>
    <button class="btn sm" data-act="cvLang">${ic('globe', 'sm')} ${lang === 'ar' ? 'English' : 'العربية'}</button>
    ${canPrint() ? `<button class="btn sm" data-act="cvPrint">${ic('download', 'sm')} ${tl('downloadPdf', lang)}</button>` : ''}</div>` : `
  <div class="cv-bar no-print" dir="${L() === 'ar' ? 'rtl' : 'ltr'}">${ic('eye', 'sm')}<span>${tl('cvBanner', L())}</span><span class="grow"></span>
    <button class="btn sm" data-act="cvLang">${ic('globe', 'sm')} ${lang === 'ar' ? 'English' : 'العربية'}</button>
    ${canPrint() ? `<button class="btn sm" data-act="cvPrint">${ic('download', 'sm')} ${tl('downloadPdf', L())}</button>` : ''}
    <button class="btn sm" data-act="closeCv">${ic('back', 'sm flip')} ${tl('backToOffice', L())}</button></div>`}
  <header class="cv-nav"><div class="logo">${logoHTML()}</div><div><b>${esc(name)}</b><div class="tiny muted">${esc(lang === 'ar' ? (S.brand.taglineAr || S.brand.tagline) : S.brand.tagline)}</div></div><span class="grow"></span><span class="small muted hide-sm">${esc(S.brand.phone)}</span></header>
  <section class="hero"><div class="art">${artHTML(q.art, q.cover, q.coverCredit)}</div><div class="hc">
    <span class="eyebrow">${c ? T('preparedFor', { n: esc(c.name) }) + ' · ' : ''}${esc(q.id === 'PREVIEW' ? T('samplePackage') : q.id)}</span>
    <h1>${esc(q.title || T('yourTrip'))}</h1>
    <div class="meta"><span>${ic('pin', 'sm')} ${esc(q.dest)}</span><span>${ic('cal', 'sm')} ${fmtShort(q.start, lang)} – ${fmtDate(endDate(q), lang)}</span><span>${ic('clock', 'sm')} ${T('nightsN', { n: q.nights })}</span><span>${ic('users', 'sm')} ${q.type === 'GROUP' ? T('paxN', { n: p.pax }) : T('travellersN', { a: q.adults, c: q.children })}</span></div></div></section>
  <div class="cv-wrap"><main class="stack" style="gap:34px">${main}</main><aside>${side}</aside></div>
  <footer class="cv-foot">${esc(name)} · ${esc(S.brand.phone)} · ${esc(S.brand.email)}${S.brand.poweredBy ? ` · ${T('poweredBy')} <span class="wj">wejha<i>.</i></span>` : ''}</footer>`;

  let el = $('#cv'); const st = el ? el.scrollTop : 0;
  if (!el) { el = document.createElement('div'); el.className = 'cv'; el.id = 'cv'; document.body.appendChild(el); }
  el.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr'); el.setAttribute('lang', lang);
  el.innerHTML = html; el.scrollTop = first ? 0 : st;
}

function confetti() {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = $('#fx'); if (!cv) return; const ctx = cv.getContext('2d');
  cv.width = innerWidth; cv.height = innerHeight;
  const cols = [getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#0E7C74', '#E39B32', '#ffffff', '#F3C969'];
  const ps = Array.from({ length: 140 }, () => ({ x: innerWidth / 2, y: innerHeight * .45, vx: (Math.random() - .5) * 14, vy: Math.random() * -14 - 4, s: 4 + Math.random() * 5, c: cols[Math.floor(Math.random() * cols.length)], r: Math.random() * 6 }));
  let f = 0;
  (function tick() { ctx.clearRect(0, 0, cv.width, cv.height); ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .45; p.vx *= .99; p.r += .1; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); ctx.restore(); }); if (++f < 120) requestAnimationFrame(tick); else ctx.clearRect(0, 0, cv.width, cv.height); })();
}

window.CACT = {
  closeCv: () => closeClient(),
  cvLang: () => { CV.lang = CV.lang === 'ar' ? 'en' : 'ar'; renderClient(); },
  cvPrint: () => printQuote(CV.q, CV.lang),
  cvChoose: el => { CV.q.selection.choices[el.dataset.set] = el.dataset.id; if (CV.offer) offerPushSelection(); else save(); renderClient(); },
  cvAddon: el => { const a = CV.q.selection.addons; const id = el.dataset.id; CV.q.selection.addons = a.includes(id) ? a.filter(x => x !== id) : a.concat(id); if (CV.offer) offerPushSelection(); else save(); renderClient(); },
  cvAccept: async el => {
    if (CV.q.id === 'PREVIEW') { toast(tl('samplePkgNote', L())); return; }
    if (CV.offer) { el.disabled = true; const ok = await offerAccept(); el.disabled = false; if (!ok) return; renderClient(); confetti(); return; }
    setStatus(CV.q, 'accepted'); save(); renderClient(); confetti();
  },
  cvChanges: () => {
    const lang = CV.lang;
    modal(tl('requestChanges', lang), `<div class="f"><label for="chg">${tl('changesLabel', lang)}</label><textarea id="chg" rows="5" dir="${lang === 'ar' ? 'rtl' : 'ltr'}" placeholder="${tl('changesPh', lang)}"></textarea></div>`,
      `<button class="btn" data-act="closeModal">${tl('cancel', lang)}</button><button class="btn primary" data-act="cvChangesGo">${tl('sendRequest', lang)}</button>`);
  },
  cvChangesGo: async () => {
    const v = $('#chg').value.trim(); if (!v) return $('#chg').focus();
    if (CV.offer) { if (!(await offerChange(v))) return; CV.q.changeReq = v; closeModal(); toast(tl('requestSent', CV.lang)); return; }
    if (CV.q.id !== 'PREVIEW') { CV.q.changeReq = v; logAct(CV.q, 'change'); save(); }
    closeModal(); toast(tl('requestSent', CV.lang));
  }
};
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role="switch"][data-act],[role="radio"][data-act]')) { e.preventDefault(); e.target.click(); }
});

/* ---------- Cloud mode: Supabase auth, agency data and background sync ---------- */
const Cloud = {
  on: false, sb: null, cfg: null, user: null, agencyId: null, role: 'owner',
  meta: {},                       // quote ref -> { version, token }
  synced: { q: {}, c: {}, p: {}, b: '' },
  timer: null, busy: false, again: false, lastPull: null, status: 'saved', pollT: null,

  async start(cfg) {
    this.cfg = cfg;
    this.sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    S = authSkeleton();
    this.sb.auth.onAuthStateChange((ev, session) => {
      if (ev === 'PASSWORD_RECOVERY') renderAuth('reset');
      if (ev === 'SIGNED_OUT') location.reload();
    });
    const { data } = await this.sb.auth.getSession();
    if (data && data.session) await this.afterLogin(data.session.user);
    else renderAuth('signin');
  },

  async rpc(fn, args) {
    const { data, error } = await this.sb.rpc(fn, args || {});
    if (error) throw error;
    return data;
  },

  async membership() {
    const { data, error } = await this.sb.from('agency_members').select('agency_id, role').eq('user_id', this.user.id).maybeSingle();
    if (error) throw error;
    return data;
  },

  async afterLogin(user) {
    this.user = user;
    try {
      let mem = await this.membership();
      const nm = (user.user_metadata && user.user_metadata.name) || null;
      if (!mem) { await this.rpc('accept_invites', { p_member_name: nm }); mem = await this.membership(); }
      if (!mem) {
        let pp = null; try { pp = await this.rpc('partner_me', { p_name: nm }); } catch (e) { }
        if (pp && pp.partner_id) { window.WJ_PARTNER_PENDING = pp; if (window.WJ_startPortal) window.WJ_startPortal(pp); else $('#app').innerHTML = '<p class="muted" style="padding:40px;text-align:center">Loading…</p>'; return; }
      }
      if (!mem) {
        const pend = pendingAgency(user.email);
        if (!pend) { renderAuth('agency'); return; }
        await this.createAgency(pend.name, pend.nameAr, nm);
        mem = await this.membership();
      }
      this.agencyId = mem.agency_id; this.role = mem.role;
      await this.loadAll();
      this.on = true;
      renderShell(); route();
      this.pollT = setInterval(() => this.pull(), 45000);
      window.addEventListener('focus', () => this.pull());
      window.addEventListener('beforeunload', e => { if (this.status === 'saving' || this.timer) { e.preventDefault(); e.returnValue = ''; } });
    } catch (e) { renderAuth('signin', friendlyErr(e)); }
  },

  async createAgency(name, nameAr, memberName) {
    const b = Object.assign(defaultBrand(), {
      name, nameAr: nameAr || '', tagline: '', taglineAr: '', phone: '', whatsapp: '', email: this.user.email || '', domain: '',
      prefix: (String(name).replace(/[^A-Za-z ]/g, '').split(/\s+/).filter(Boolean).map(w => w[0]).join('').slice(0, 3).toUpperCase()) || 'Q'
    });
    await this.rpc('create_agency', { p_name: name, p_brand: b, p_member_name: memberName });
    clearPending();
  },

  async loadAll() {
    const sb = this.sb;
    const [ag, cl, pk, qs] = await Promise.all([
      sb.from('agencies').select('*').eq('id', this.agencyId).single(),
      sb.from('clients').select('id, data').eq('agency_id', this.agencyId),
      sb.from('packages').select('id, data').eq('agency_id', this.agencyId),
      sb.from('quotes').select('ref, data, version, share_token, updated_at').eq('agency_id', this.agencyId).order('created_at', { ascending: false })
    ]);
    for (const r of [ag, cl, pk, qs]) if (r.error) throw r.error;
    let ui = {}; try { ui = JSON.parse(localStorage.getItem(KEY + '-ui') || '{}'); } catch (e) { }
    S = {
      v: 1, seq: 0,
      brand: Object.assign(defaultBrand(), { domain: '', phone: '', whatsapp: '', email: '' }, ag.data.brand || {}),
      clients: cl.data.map(r => Object.assign(r.data, { id: r.id })),
      packages: pk.data.map(r => Object.assign(r.data, { id: r.id, custom: true })),
      quotes: qs.data.map(r => Object.assign(r.data, { id: r.ref })),
      ui: Object.assign({ lang: S && S.ui ? S.ui.lang : 'en', qf: { status: 'all', type: 'all', q: '' } }, ui, { current: ui.current })
    };
    S.agency = { name: ag.data.name, plan: ag.data.plan, trialEnds: ag.data.trial_ends };
    this.synced = { q: {}, c: {}, p: {}, b: JSON.stringify(S.brand) };
    S.clients.forEach(c => this.synced.c[c.id] = JSON.stringify(c));
    S.packages.forEach(p => this.synced.p[p.id] = JSON.stringify(p));
    S.quotes.forEach(q => this.synced.q[q.id] = JSON.stringify(q));
    this.meta = {}; qs.data.forEach(r => this.meta[r.ref] = { version: r.version, token: r.share_token });
    this.lastPull = qs.data.reduce((m, r) => r.updated_at > m ? r.updated_at : m, new Date(0).toISOString());
  },

  schedule() { clearTimeout(this.timer); this.timer = setTimeout(() => { this.timer = null; this.sync(); }, 700); },
  async flush() { clearTimeout(this.timer); await this.sync(); },

  async syncTable(table, list, key) {
    const seen = new Set(), ups = [];
    for (const it of list) { seen.add(it.id); const h = JSON.stringify(it); if (this.synced[key][it.id] !== h) ups.push({ row: { id: it.id, agency_id: this.agencyId, data: it, updated_at: new Date().toISOString() }, h }); }
    if (ups.length) { if (this.status !== 'saving') this.setStatus('saving'); const { error } = await this.sb.from(table).upsert(ups.map(u => u.row)); if (error) throw error; ups.forEach(u => this.synced[key][u.row.id] = u.h); }
    const del = Object.keys(this.synced[key]).filter(id => !seen.has(id));
    if (del.length) { const { error } = await this.sb.from(table).delete().in('id', del); if (error) throw error; del.forEach(id => delete this.synced[key][id]); }
  },

  async sync() {
    if (!this.on) return;
    if (this.busy) { this.again = true; return; }
    this.busy = true;
    try {
      const busy = () => { if (this.status !== 'saving') this.setStatus('saving'); };
      const b = JSON.stringify(S.brand);
      if (b !== this.synced.b && can('brand')) { busy(); await this.rpc('save_brand', { p_brand: S.brand }); this.synced.b = b; }
      if (can('edit')) {
        await this.syncTable('clients', S.clients, 'c');
        await this.syncTable('packages', S.packages, 'p');
        const refs = new Set();
        for (const q of S.quotes) {
          refs.add(q.id);
          const h = JSON.stringify(q); if (this.synced.q[q.id] === h) continue;
          const m = this.meta[q.id] || { version: 0 };
          busy();
          try {
            const data = await this.rpc('save_quote', { p_ref: q.id, p_data: q, p_public: buildPublic(q), p_total: Math.round(price(q).total * 100) / 100, p_version: m.version });
            const row = Array.isArray(data) ? data[0] : data;
            this.meta[q.id] = { version: row.version, token: row.share_token }; this.synced.q[q.id] = h;
          } catch (e) {
            if (/conflict/i.test(e.message || '')) { await this.refreshQuote(q.id); toast(t('reloadedConflict', { id: q.id })); }
            else throw e;
          }
        }
        for (const ref of Object.keys(this.synced.q)) if (!refs.has(ref)) { await this.rpc('delete_quote', { p_ref: ref }); delete this.synced.q[ref]; delete this.meta[ref]; }
      }
      this.setStatus('saved');
    } catch (e) {
      console.error(e); this.setStatus('error');
      setTimeout(() => this.schedule(), 6000);
    } finally {
      this.busy = false;
      if (this.again) { this.again = false; this.sync(); }
    }
  },

  async refreshQuote(ref) {
    const { data, error } = await this.sb.from('quotes').select('ref, data, version, share_token').eq('agency_id', this.agencyId).eq('ref', ref).maybeSingle();
    if (error) throw error;
    const i = S.quotes.findIndex(q => q.id === ref);
    if (!data) { if (i >= 0) S.quotes.splice(i, 1); delete this.synced.q[ref]; return; }
    const q = Object.assign(data.data, { id: data.ref });
    if (i >= 0) S.quotes[i] = q; else S.quotes.unshift(q);
    this.meta[ref] = { version: data.version, token: data.share_token }; this.synced.q[ref] = JSON.stringify(q);
    if (!$('#modal')) rerenderSafe();
  },

  /* Pick up what clients and colleagues changed (accepted, viewed, change requests) */
  async pull() {
    if (!this.on || this.busy) return;
    try {
      const { data, error } = await this.sb.from('quotes').select('ref, data, version, share_token, updated_at').eq('agency_id', this.agencyId).gt('updated_at', this.lastPull);
      if (error) throw error;
      const cl = await this.sb.from('clients').select('id, data').eq('agency_id', this.agencyId);
      let changed = false;
      if (!cl.error) cl.data.forEach(r => { if (!this.synced.c[r.id] && !S.clients.find(c => c.id === r.id)) { const c = Object.assign(r.data, { id: r.id }); S.clients.push(c); this.synced.c[r.id] = JSON.stringify(c); changed = true; } });
      for (const r of data) {
        if (r.updated_at > this.lastPull) this.lastPull = r.updated_at;
        const m = this.meta[r.ref]; if (m && m.version >= r.version) continue;
        const i = S.quotes.findIndex(q => q.id === r.ref), old = i >= 0 ? S.quotes[i] : null;
        if (old && this.synced.q[r.ref] !== JSON.stringify(old)) continue;   // local edits pending: the save will resolve it
        const q = Object.assign(r.data, { id: r.ref });
        if (old) S.quotes[i] = q; else S.quotes.unshift(q);
        this.meta[r.ref] = { version: r.version, token: r.share_token }; this.synced.q[r.ref] = JSON.stringify(q); changed = true;
        if (old && old.status !== q.status && ['viewed', 'accepted'].includes(q.status)) toast(t('liveStatus', { id: q.id, s: t('st_' + q.status) }));
        else if (old && q.changeReq && q.changeReq !== old.changeReq) toast(t('liveChange', { id: q.id }));
      }
      if (changed && !$('#modal') && !(document.activeElement && document.activeElement.matches('input,textarea,select'))) rerenderSafe();
    } catch (e) { console.warn('pull', e); }
  },

  setStatus(s) {
    this.status = s;
    const el = $('#sync'); if (!el) return;
    el.className = 'sync ' + s;
    el.innerHTML = s === 'saving' ? `<i></i>${t('syncSaving')}` : s === 'error' ? `${ic('alert', 'sm')}${t('syncError')}` : `${ic('check', 'sm')}${t('syncSaved')}`;
  },

  offerLink(ref) {
    const m = this.meta[ref]; if (!m || !m.token) return '';
    const base = S.brand.domain ? 'https://' + S.brand.domain.replace(/^https?:\/\//, '').replace(/\/$/, '') + '/' : (this.cfg.appUrl || (location.origin + location.pathname.replace(/[^/]*$/, '')));
    return base.replace(/\/?$/, '/') + '?offer=' + m.token;
  },

  async signOut() { try { await this.flush(); } catch (e) { } await this.sb.auth.signOut(); location.reload(); }
};

function authSkeleton() {
  let lang = 'en'; try { lang = (navigator.language || '').startsWith('ar') ? 'ar' : 'en'; const u = JSON.parse(localStorage.getItem(KEY + '-ui') || '{}'); if (u.lang) lang = u.lang; } catch (e) { }
  return { v: 1, seq: 0, brand: defaultBrand(), clients: [], packages: [], quotes: [], ui: { lang, qf: { status: 'all', type: 'all', q: '' } } };
}
function pendingAgency(email) { try { const p = JSON.parse(localStorage.getItem('wejha-pending') || 'null'); return p && p.email === String(email).toLowerCase() ? p : null; } catch (e) { return null; } }
function clearPending() { try { localStorage.removeItem('wejha-pending'); } catch (e) { } }
function friendlyErr(e) {
  const m = (e && (e.message || e.error_description)) || String(e);
  const map = { 'Invalid login credentials': 'errLogin', 'Email not confirmed': 'errConfirm', 'User already registered': 'errExists', already_member: 'errAlreadyMember', forbidden: 'errForbidden', last_owner: 'errLastOwner', cannot_remove_self: 'errRemoveSelf', bad_email: 'errEmail', expired: 'offerExpired' };
  for (const k in map) if (m.includes(k)) return t(map[k]);
  if (/fetch|network/i.test(m)) return t('errNetwork');
  return m;
}

/* ---------- Sign-in / sign-up screens ---------- */
function renderAuth(mode, err, info) {
  applyBrand(); document.title = 'wejha · ' + t('signIn');
  const f = (id, lbl, type = 'text', extra = '') => `<div class="f"><label for="${id}">${lbl}</label><input id="${id}" type="${type}" ${extra}></div>`;
  let body = '';
  if (mode === 'signin') body = `<h1>${t('welcomeBack')}</h1><p class="muted">${t('signInSub')}</p>
    <form class="stack" id="auth-form" data-mode="signin">${f('a-email', t('email'), 'email', 'autocomplete="email" required')}${f('a-pass', t('password'), 'password', 'autocomplete="current-password" required')}
    <button class="btn primary lg block" type="submit">${t('signIn')}</button></form>
    <div class="row between small"><button class="link" data-act="authMode" data-m="forgot">${t('forgotPass')}</button><button class="link" data-act="authMode" data-m="signup">${t('createAccount')}</button></div>`;
  if (mode === 'signup') body = `<h1>${t('startTrial')}</h1><p class="muted">${t('signUpSub')}</p>
    <form class="stack" id="auth-form" data-mode="signup">${f('a-name', t('yourName'), 'text', 'autocomplete="name" required')}${f('a-agency', t('agencyNameEn'), 'text', `placeholder="${t('agencyOptionalPh')}"`)}${f('a-agency-ar', t('agencyNameAr'), 'text', 'dir="rtl"')}
    ${f('a-email', t('workEmail'), 'email', 'autocomplete="email" required')}${f('a-pass', t('passwordNew'), 'password', 'autocomplete="new-password" minlength="8" required')}
    <button class="btn primary lg block" type="submit">${t('createAccount')}</button></form>
    <p class="small muted">${t('invitedHint')}</p>
    <div class="row small"><span class="muted">${t('haveAccount')}</span><button class="link" data-act="authMode" data-m="signin">${t('signIn')}</button></div>`;
  if (mode === 'forgot') body = `<h1>${t('resetPass')}</h1><p class="muted">${t('resetSub')}</p>
    <form class="stack" id="auth-form" data-mode="forgot">${f('a-email', t('email'), 'email', 'required')}<button class="btn primary lg block" type="submit">${t('sendResetLink')}</button></form>
    <button class="link small" data-act="authMode" data-m="signin">${t('backToSignIn')}</button>`;
  if (mode === 'reset') body = `<h1>${t('newPassTitle')}</h1><form class="stack" id="auth-form" data-mode="reset">${f('a-pass', t('passwordNew'), 'password', 'minlength="8" required')}<button class="btn primary lg block" type="submit">${t('save')}</button></form>`;
  if (mode === 'agency') body = `<h1>${t('createAgencyTitle')}</h1><p class="muted">${t('createAgencySub')}</p>
    <form class="stack" id="auth-form" data-mode="agency">${f('a-agency', t('agencyNameEn'), 'text', 'required')}${f('a-agency-ar', t('agencyNameAr'), 'text', 'dir="rtl"')}<button class="btn primary lg block" type="submit">${t('createAgencyBtn')}</button></form>
    <button class="link small" data-act="signOut">${t('signOut')}</button>`;
  if (mode === 'check') body = `<h1>${t('checkEmail')}</h1><p class="muted">${t('checkEmailSub')}</p><button class="btn block" data-act="authMode" data-m="signin">${t('backToSignIn')}</button>`;
  $('#app').innerHTML = `<div class="auth"><div class="auth-card">
    <div class="row between"><span class="wj" style="font-size:22px">wejha<i>.</i></span><button class="btn sm" data-act="authLang">${ic('globe', 'sm')} ${L() === 'ar' ? 'English' : 'العربية'}</button></div>
    ${err ? `<div class="warn-box" role="alert">${ic('alert', 'sm')}<span>${esc(err)}</span></div>` : ''}${info ? `<div class="warn-box ok" role="status">${ic('check', 'sm')}<span>${esc(info)}</span></div>` : ''}
    ${body}</div><p class="tiny muted auth-foot">${t('authFoot')}</p></div><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  const fm = $('#auth-form'); if (fm) { fm.addEventListener('submit', onAuthSubmit); const i = fm.querySelector('input'); if (i) i.focus(); }
}
async function onAuthSubmit(e) {
  e.preventDefault();
  const mode = e.target.dataset.mode, btn = e.target.querySelector('button[type=submit]'), v = id => ($('#' + id) ? $('#' + id).value.trim() : '');
  btn.disabled = true;
  const sb = Cloud.sb;
  try {
    if (mode === 'signin') {
      const { data, error } = await sb.auth.signInWithPassword({ email: v('a-email'), password: $('#a-pass').value });
      if (error) throw error; await Cloud.afterLogin(data.user);
    } else if (mode === 'signup') {
      const email = v('a-email').toLowerCase();
      try { if (v('a-agency')) localStorage.setItem('wejha-pending', JSON.stringify({ email, name: v('a-agency'), nameAr: v('a-agency-ar') })); } catch (er) { }
      const { data, error } = await sb.auth.signUp({ email, password: $('#a-pass').value, options: { data: { name: v('a-name') }, emailRedirectTo: Cloud.cfg.appUrl || location.href.split('?')[0] } });
      if (error) throw error;
      if (data.session) await Cloud.afterLogin(data.user); else renderAuth('check');
    } else if (mode === 'forgot') {
      const { error } = await sb.auth.resetPasswordForEmail(v('a-email'), { redirectTo: Cloud.cfg.appUrl || location.href.split('?')[0] });
      if (error) throw error; renderAuth('signin', null, t('resetSent'));
    } else if (mode === 'reset') {
      const { data, error } = await sb.auth.updateUser({ password: $('#a-pass').value });
      if (error) throw error; await Cloud.afterLogin(data.user);
    } else if (mode === 'agency') {
      await Cloud.createAgency(v('a-agency'), v('a-agency-ar'), (Cloud.user.user_metadata && Cloud.user.user_metadata.name) || null);
      await Cloud.afterLogin(Cloud.user);
    }
  } catch (er) { renderAuth(mode, friendlyErr(er)); }
}

/* ---------- Team (owner only) ---------- */
let TEAM = null;
async function loadTeam() {
  const [m, i] = await Promise.all([Cloud.sb.from('agency_members').select('user_id, role, name, email, created_at').eq('agency_id', Cloud.agencyId).order('created_at'), Cloud.sb.from('agency_invites').select('email, role, created_at').eq('agency_id', Cloud.agencyId).order('created_at')]);
  TEAM = { members: m.data || [], invites: i.data || [] };
  if (S.ui.view === 'team') rerenderSafe();
}
function vTeam() {
  if (!TEAM) { loadTeam(); return `<div class="head"><div><h1>${t('nav_team')}</h1></div></div><p class="muted">${t('loading')}</p>`; }
  const roleSel = (u, r) => `<select class="inp" style="width:auto" data-role-user="${u}" aria-label="${t('role')}">${['owner', 'agent', 'accountant'].map(x => `<option value="${x}" ${x === r ? 'selected' : ''}>${t('role_' + x)}</option>`).join('')}</select>`;
  return `
  <div class="head"><div><h1>${t('nav_team')}</h1><p>${t('teamSub')}</p></div><button class="btn primary" data-act="inviteDlg">${ic('plus', 'sm')} ${t('inviteMember')}</button></div>
  <div class="grid g3">${['owner', 'agent', 'accountant'].map(r => `<div class="card flat"><b>${t('role_' + r)}</b><p class="small muted" style="margin-top:4px">${t('roleDesc_' + r)}</p></div>`).join('')}</div>
  <div class="card" style="padding:4px 6px"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('fullName')}</th><th>${t('email')}</th><th>${t('role')}</th><th>${t('joined')}</th><th class="r">${t('actions')}</th></tr></thead><tbody>
    ${TEAM.members.map(m => { const me = m.user_id === Cloud.user.id; return `<tr><td><b>${esc(m.name || '—')}</b>${me ? ` <span class="tag">${t('you')}</span>` : ''}</td><td class="small">${esc(m.email || '')}</td><td>${me ? `<span class="pill nodot st-accepted">${t('role_' + m.role)}</span>` : roleSel(m.user_id, m.role)}</td><td class="small muted">${fmtShort(String(m.created_at).slice(0, 10))}</td><td class="acts">${me ? '' : `<button class="btn sm danger" data-act="rmMember" data-id="${m.user_id}">${t('remove')}</button>`}</td></tr>`; }).join('')}
    ${TEAM.invites.map(i => `<tr><td class="muted">${t('invited')}</td><td class="small">${esc(i.email)}</td><td><span class="pill st-sent">${t('role_' + i.role)}</span></td><td class="small muted">${fmtShort(String(i.created_at).slice(0, 10))}</td><td class="acts"><button class="btn sm" data-act="inviteMsg" data-email="${esc(i.email)}">${ic('copy', 'sm')} ${t('inviteText')}</button><button class="btn sm ghost" data-act="cancelInvite" data-email="${esc(i.email)}">${t('cancel')}</button></td></tr>`).join('')}
  </tbody></table></div></div>`;
}
function inviteMessage(email) { const url = Cloud.cfg.appUrl || location.href.split('?')[0].split('#')[0]; return t('inviteMsgBody', { a: brandName(), u: url, e: email }); }

Object.assign(ACT, {
  authMode: el => renderAuth(el.dataset.m),
  authLang: el => { S.ui.lang = L() === 'ar' ? 'en' : 'ar'; try { localStorage.setItem(KEY + '-ui', JSON.stringify({ lang: S.ui.lang })); } catch (e) { } const f = $('#auth-form'); renderAuth(f ? f.dataset.mode : 'check'); },
  signOut: () => Cloud.signOut(),
  inviteDlg: () => modal(t('inviteMember'), `<div class="grid g2"><div class="f"><label for="inv-email">${t('email')}</label><input id="inv-email" type="email"></div><div class="f"><label for="inv-role">${t('role')}</label><select id="inv-role">${['agent', 'accountant', 'owner'].map(x => `<option value="${x}">${t('role_' + x)}</option>`).join('')}</select></div></div><p class="small muted">${t('inviteHint')}</p>`,
    `<button class="btn" data-act="closeModal">${t('cancel')}</button><button class="btn primary" data-act="inviteGo">${t('inviteMember')}</button>`),
  inviteGo: async () => { const em = $('#inv-email').value.trim(); try { await Cloud.rpc('invite_member', { p_email: em, p_role: $('#inv-role').value }); closeModal(); await loadTeam(); modal(t('inviteSent'), `<p class="small muted">${t('inviteSendHint')}</p><textarea class="inp" rows="5" id="inv-msg">${esc(inviteMessage(em))}</textarea>`, `<button class="btn primary" data-act="copyInv">${ic('copy', 'sm')} ${t('copyMessage')}</button>`); } catch (e) { toast(friendlyErr(e)); } },
  copyInv: () => copyText($('#inv-msg').value),
  inviteMsg: el => copyText(inviteMessage(el.dataset.email)),
  cancelInvite: async el => { try { await Cloud.rpc('cancel_invite', { p_email: el.dataset.email }); await loadTeam(); } catch (e) { toast(friendlyErr(e)); } },
  rmMember: el => confirmBox(t('removeMemberQ'), async () => { try { await Cloud.rpc('remove_member', { p_user: el.dataset.id }); await loadTeam(); toast(t('deleted')); } catch (e) { toast(friendlyErr(e)); } }, t('remove'))
});
document.addEventListener('change', async e => {
  const el = e.target; if (!el.dataset || !el.dataset.roleUser) return;
  try { await Cloud.rpc('set_member_role', { p_user: el.dataset.roleUser, p_role: el.value }); toast(t('saved')); } catch (er) { toast(friendlyErr(er)); }
  await loadTeam();
});

/* ---------- Public offer page (client opens the link; no login) ---------- */
window.OFFER = null;
function offerToken() {
  try {
    const p = new URLSearchParams(location.search).get('offer');
    if (p) return p;
    const m = location.pathname.match(/\/p\/([a-f0-9]{16,})/i);
    return m ? m[1] : null;
  } catch (e) { return null; }
}
function offerMessage(title, text) {
  $('#app').innerHTML = `<div class="auth"><div class="auth-card" style="text-align:center;align-items:center"><span class="wj" style="font-size:22px">wejha<i>.</i></span><h1>${esc(title)}</h1><p class="muted">${esc(text)}</p></div></div>`;
}
async function bootOffer(tok, cfg) {
  S = authSkeleton();
  window.OFFER = { tok, sb: null };
  if (!(cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase)) { offerMessage(t('offerNotFound'), t('offerNotFoundSub')); return; }
  const sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  OFFER.sb = sb;
  const { data, error } = await sb.rpc('offer_get', { p_token: tok });
  if (error || !data) { offerMessage(t('offerNotFound'), t('offerNotFoundSub')); return; }
  S.brand = Object.assign(defaultBrand(), data.brand || {}, { vat: 0 });
  if (!S.brand.logo) S.brand.logo = null;
  const q = quoteFromPublic(data.offer);
  S.quotes = [q]; S.ui.lang = q.lang || S.ui.lang;
  applyBrand();
  document.title = `${q.title} · ${brandName(q.lang)}`;
  $('#app').innerHTML = `<div class="toast" id="toast" role="status" aria-live="polite"></div><canvas id="fx"></canvas>`;
  sb.rpc('offer_viewed', { p_token: tok }).then(() => { }, () => { });
  CV = { q, lang: q.lang || 'en', agent: false, offer: true };
  renderClient(true);
}
let offerSelT = null;
function offerPushSelection() {
  clearTimeout(offerSelT);
  offerSelT = setTimeout(() => { OFFER.sb.rpc('offer_select', { p_token: OFFER.tok, p_selection: CV.q.selection }).then(() => { }, () => { }); }, 600);
}
async function offerAccept() {
  const { data, error } = await OFFER.sb.rpc('offer_accept', { p_token: OFFER.tok, p_selection: CV.q.selection });
  if (error) { toast(/expired/.test(error.message) ? tl('offerExpired', CV.lang) : tl('errTryAgain', CV.lang)); return false; }
  CV.q.status = data || 'accepted'; return true;
}
async function offerChange(text) {
  const { error } = await OFFER.sb.rpc('offer_request_change', { p_token: OFFER.tok, p_text: text });
  if (error) { toast(tl('errTryAgain', CV.lang)); return false; }
  return true;
}

/* ---------- Branded PDF (browser print → "Save as PDF": sharp text, correct Arabic) ---------- */
const canPrint = () => { try { return window.self === window.top; } catch (e) { return false; } };
function printHTML(q, lang) {
  const T = (k, v) => tl(k, lang, v), M = n => money(n, lang);
  const p = price(q), sc = schedule(q, p.total), c = clientOf(q) || (q._clientName ? { name: q._clientName } : null);
  const name = lang === 'ar' ? (S.brand.nameAr || S.brand.name) : S.brand.name;
  const tag = lang === 'ar' ? (S.brand.taglineAr || S.brand.tagline) : S.brand.tagline;
  const act = q.lines.filter(l => lineActive(q, l));
  const hotels = act.filter(l => l.kind === 'hotel'), svcs = act.filter(l => l.kind !== 'hotel');
  const ip = l => q.showItemPrices ? `<td class="r">${M(sellOf(q, lineCost(q, l)))}</td>` : '';
  const stars = n => '★'.repeat(num(n));
  return `<div class="pq" dir="${lang === 'ar' ? 'rtl' : 'ltr'}" lang="${lang}">
    <header class="pq-h"><div class="pq-brand"><div class="logo">${logoHTML()}</div><div><b>${esc(name)}</b><span>${esc(tag || '')}</span></div></div>
      <div class="pq-ref"><b>${T('quotationDoc')}</b><span>${esc(q.id === 'PREVIEW' ? T('samplePackage') : q.id)}</span><span>${T('issued')}: ${fmtDate(today(), lang)}</span><span>${T('validUntil')}: ${fmtDate(q.validUntil, lang)}</span></div></header>
    <section class="pq-cover"><div class="art">${artHTML(q.art, q.cover, q.coverCredit)}</div><div class="pq-cov-t"><h1>${esc(q.title || T('yourTrip'))}</h1><span>${esc(q.dest)} · ${fmtDate(q.start, lang)} – ${fmtDate(endDate(q), lang)} · ${T('nightsN', { n: q.nights })} · ${q.type === 'GROUP' ? T('paxN', { n: p.pax }) : T('travellersN', { a: q.adults, c: q.children })}</span></div></section>
    ${c ? `<p class="pq-for">${T('preparedFor', { n: esc(c.name) })}</p>` : ''}
    ${hotels.length ? `<section class="pq-b"><h2>${T('accommodation')}</h2><table><thead><tr><th>${T('kind_hotel')}</th><th>${T('city')}</th>${q.type === 'GROUP' ? '' : `<th>${T('roomType')}</th>`}<th>${T('board')}</th><th class="r">${T('nights')}</th>${q.showItemPrices ? `<th class="r">${T('total')}</th>` : ''}</tr></thead><tbody>
      ${hotels.map(l => `<tr><td><b>${esc(l.name)}</b> <span class="st">${stars(l.stars)}</span></td><td>${esc(l.city)}</td>${q.type === 'GROUP' ? '' : `<td>${esc(l.roomType)}${num(l.rooms) > 1 ? ' × ' + l.rooms : ''}</td>`}<td>${T('board_' + l.board)}</td><td class="r">${l.nights}</td>${ip(l)}</tr>`).join('')}</tbody></table></section>` : ''}
    ${svcs.length ? `<section class="pq-b"><h2>${T('inYourPackage')}</h2><table><tbody>${svcs.map(l => `<tr><td style="width:24%">${T('kind_' + l.kind)}</td><td><b>${esc(l.name)}</b>${l.detail ? ` <span class="mut">· ${esc(l.detail)}${num(l.qty) > 1 ? ' × ' + l.qty : ''}</span>` : ''}${l.optional ? ` <span class="mut">(${T('addedExtra')})</span>` : ''}</td>${ip(l)}</tr>`).join('')}</tbody></table></section>` : ''}
    ${q.days.length ? `<section class="pq-b"><h2>${T('dayByDay')}</h2>${q.days.map((d, i) => `<div class="pq-day"><div class="dn">${T('dayN', { n: i + 1 })}<small>${fmtShort(addDays(q.start, i), lang)}</small></div><div><b>${esc(d.t)}</b>${d.d ? `<p>${esc(d.d)}</p>` : ''}</div></div>`).join('')}</section>` : ''}
    ${q.inc.length || q.exc.length ? `<section class="pq-b pq-2"><div><h2>${T('included')}</h2><ul>${q.inc.map(x => `<li>✓ ${esc(x)}</li>`).join('')}</ul></div><div><h2>${T('notIncluded')}</h2><ul>${q.exc.map(x => `<li>✕ ${esc(x)}</li>`).join('')}</ul></div></section>` : ''}
    <section class="pq-b pq-price"><div><span>${T('yourPrice')}</span><b>${M(p.total)}</b><small>${q.type === 'GROUP' ? T('avgPerPaying', { a: M(p.pp), n: p.paying }) : T('forTravellers', { a: M(p.pp), n: p.pax })}</small>
      ${q.type === 'GROUP' ? `<div class="pq-occ">${Object.keys(p.occ).map(k => `<div><b>${M(p.occ[k])}</b><small>${T('ppIn', { r: T('room_' + k) })}</small></div>`).join('')}</div>` : ''}</div>
      <div class="pq-sched"><div><span>${T('depositNow', { p: q.deposit })}</span><b>${M(sc.deposit)}</b></div><div><span>${T('balanceBy', { d: fmtDate(sc.balanceDue, lang) })}</span><b>${M(sc.balance)}</b></div></div></section>
    ${q.terms ? `<section class="pq-b"><h2>${T('termsTitle')}</h2><p class="mut">${esc(q.terms)}</p></section>` : ''}
    <footer class="pq-f">${esc(name)} · ${esc(S.brand.phone || '')} · ${esc(S.brand.email || '')}${S.brand.poweredBy ? ` · ${T('poweredBy')} wejha.` : ''}</footer></div>`;
}
function buildPrint(q, lang) {
  let root = $('#print-root'); if (!root) { root = document.createElement('div'); root.id = 'print-root'; document.body.appendChild(root); }
  root.innerHTML = printHTML(q, lang);
  return root;
}
function printQuote(q, lang) {
  if (!canPrint()) { toast(t('pdfHosted')); return; }
  buildPrint(q, lang);
  document.body.classList.add('printing');
  const done = () => { document.body.classList.remove('printing'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  setTimeout(() => { try { window.print(); } catch (e) { done(); } }, 60);
}

/* ---------- Live LuxeCheck rates (n8n workflow → Browserless, read-only) ---------- */
let LIVE = null; // { lineId, busy, res }
const sleep = ms => new Promise(r => setTimeout(r, ms));
function demoRates(b) {
  const r = rng(String(b.hotel || b.city).length * 97 + b.rooms);
  const n = Math.max(1, daysBetween(b.checkIn, b.checkOut)), base = 400 + Math.floor(r() * 1200);
  const rooms = [['Standard room', 'RO'], ['Deluxe room', 'BB'], ['Deluxe room', 'HB'], ['Junior suite', 'BB']];
  const sup = ['Hotelbeds', 'WebBeds', 'RateHawk', 'TBO'];
  return { ok: true, demo: true, provider: 'LuxeCheck', offers: rooms.map(([room, board], i) => {
    const per = Math.round(base * (1 + i * .18) * (0.95 + r() * .1)), tot = per * n * b.rooms;
    return { hotel: b.hotel || b.city, room, board, boardText: board, total: tot, perNight: per, currency: S.brand.currency, refundable: i % 2 === 0, cancel: i % 2 === 0 ? 'Free cancellation until ' + addDays(b.checkIn, -7) : 'Non-refundable', supplier: sup[i] };
  }).sort((a, b2) => a.total - b2.total) };
}
async function fetchLiveRates(body) {
  const url = (window.WEJHA_CONFIG || {}).liveRatesUrl;
  if (!url) { await sleep(1400); return demoRates(body); }
  const headers = { 'Content-Type': 'application/json' };
  if (Cloud.on) { const { data } = await Cloud.sb.auth.getSession(); if (data && data.session) headers.Authorization = 'Bearer ' + data.session.access_token; }
  const ctrl = new AbortController(); const tm = setTimeout(() => ctrl.abort(), 120000);
  try {
    const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal: ctrl.signal });
    const j = await r.json().catch(() => ({ ok: false, error: 'bad_response' }));
    if (!r.ok && !j.error) j.error = 'http_' + r.status;
    return j;
  } catch (e) { return { ok: false, error: e.name === 'AbortError' ? 'timeout' : 'network' }; }
  finally { clearTimeout(tm); }
}
function liveForm(q, l) {
  const rooms = q.type === 'GROUP' ? 1 : Math.max(1, num(l.rooms));
  const adults = q.type === 'GROUP' ? 2 : Math.max(1, Math.ceil(num(q.adults) / rooms));
  return { hotel: l.name, city: l.city, checkIn: q.start, checkOut: addDays(q.start, Math.max(1, num(l.nights) || num(q.nights))), rooms, adults, children: q.type === 'GROUP' ? 0 : num(q.children) };
}
function liveResultsHTML() {
  const q = curQ(); const res = LIVE.res;
  if (LIVE.busy) return `<div class="live-wait"><span class="spin"></span><div><b>${t('liveSearching')}</b><div class="small muted">${t('liveSearchingSub')}</div></div></div>`;
  if (!res) return '';
  if (!res.ok) return `<div class="warn-box">${ic('alert', 'sm')}<span>${I18N.en['liveErr_' + (res.error || 'none')] ? t('liveErr_' + (res.error || 'none')) : t('liveErr_generic')}</span></div>`;
  const fx = res.offers.some(o => o.currency && o.currency !== S.brand.currency);
  return `${res.demo ? `<div class="warn-box">${ic('alert', 'sm')}<span>${t('liveDemo')}</span></div>` : ''}
    ${fx ? `<div class="warn-box">${ic('alert', 'sm')}<span>${t('liveFx', { q: S.brand.currency })}</span></div>` : ''}
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('kind_hotel')}</th><th>${t('roomType')}</th><th>${t('board')}</th><th>${t('cancellation')}</th><th class="r">${t('total')}</th><th class="r">${t('perNightLbl')}</th><th></th></tr></thead><tbody>
    ${res.offers.map((o, i) => `<tr><td class="who"><b>${esc(o.hotel)}</b><span>${esc(o.supplier || '')}</span></td><td class="small">${esc(o.room)}</td><td class="small">${o.board ? t('board_' + o.board) : esc(o.boardText)}</td>
      <td><span class="pill ${o.refundable ? 'st-confirmed' : 'st-lost'}">${o.refundable ? t('refundable') : t('nonRefundable')}</span>${o.cancel ? `<div class="tiny muted">${esc(o.cancel)}</div>` : ''}</td>
      <td class="r num"><b>${esc(o.currency)} ${Math.round(o.total).toLocaleString('en-US')}</b></td><td class="r num">${esc(o.currency)} ${Math.round(o.perNight).toLocaleString('en-US')}</td>
      <td class="acts"><button class="btn sm primary" data-act="liveUse" data-i="${i}">${t('liveUse')}</button></td></tr>`).join('')}</tbody></table></div>
    <p class="tiny muted">${t('liveMeta', { n: res.offers.length, s: Math.round((res.ms || 0) / 1000) })}</p>`;
}
function openLive(lineId) {
  const q = curQ(), l = q.lines.find(x => x.id === lineId); if (!l) return;
  LIVE = { lineId, busy: false, res: null };
  const f = liveForm(q, l);
  modal(t('liveTitle'), `
    <div class="grid g3">
      <div class="f span2"><label for="lv-hotel">${t('kind_hotel')}</label><input id="lv-hotel" value="${esc(f.hotel)}" placeholder="${t('hotelNamePh')}"></div>
      <div class="f"><label for="lv-city">${t('city')}</label><input id="lv-city" value="${esc(f.city)}"></div>
      <div class="f"><label for="lv-in">${t('checkIn')}</label><input id="lv-in" type="date" value="${f.checkIn}"></div>
      <div class="f"><label for="lv-out">${t('checkOut')}</label><input id="lv-out" type="date" value="${f.checkOut}"></div>
      <div class="row" style="gap:10px;align-items:flex-end"><div class="f"><label for="lv-rooms">${t('rooms')}</label><input id="lv-rooms" type="number" min="1" value="${f.rooms}" style="width:70px"></div><div class="f"><label for="lv-ad">${t('adultsPerRoom')}</label><input id="lv-ad" type="number" min="1" value="${f.adults}" style="width:70px"></div></div>
    </div>
    <div class="row between"><span class="tiny muted">${t('liveHint')}</span><button class="btn primary" data-act="liveGo" id="lv-go">${ic('search', 'sm')} ${t('liveSearch')}</button></div>
    <div id="lv-res"></div>`, '', { wide: true });
}
window.LACT = {
  liveRate: el => openLive(el.dataset.id),
  liveGo: async () => {
    if (LIVE.busy) return;
    const body = { hotel: $('#lv-hotel').value.trim(), city: $('#lv-city').value.trim(), checkIn: $('#lv-in').value, checkOut: $('#lv-out').value, rooms: Math.max(1, num($('#lv-rooms').value)), adults: Math.max(1, num($('#lv-ad').value)), children: 0 };
    if (!(body.hotel || body.city) || !body.checkIn || !(body.checkOut > body.checkIn)) { toast(t('liveErr_bad_request')); return; }
    LIVE.busy = true; LIVE.res = null; LIVE.body = body; $('#lv-go').disabled = true; $('#lv-res').innerHTML = liveResultsHTML();
    const res = await fetchLiveRates(body);
    LIVE.busy = false; LIVE.res = res;
    if (res.ok && !res.offers.length) res.ok = false, res.error = 'none';
    if (!$('#lv-res')) return;
    $('#lv-go').disabled = false; $('#lv-res').innerHTML = liveResultsHTML();
  },
  liveUse: el => {
    const q = curQ(), l = q.lines.find(x => x.id === LIVE.lineId), o = LIVE.res.offers[num(el.dataset.i)];
    if (!l || !o) return;
    l.name = o.hotel || l.name; l.roomType = o.room || l.roomType; if (o.board) l.board = o.board;
    const nights = Math.max(1, daysBetween(LIVE.body.checkIn, LIVE.body.checkOut));
    l.nights = nights;
    const per = Math.round(o.perNight * 100) / 100;
    if (q.type === 'GROUP') { l.rates.dbl = per; if (!num(l.rates.sgl)) l.rates.sgl = per; }
    else { l.rate = per; l.rooms = LIVE.body.rooms; }
    l.src = { p: 'LuxeCheck', at: today(), total: o.total, currency: o.currency, refundable: !!o.refundable, cancel: o.cancel || '', supplier: o.supplier || '', demo: !!LIVE.res.demo };
    if (o.cancel && !q.notes.includes(o.cancel)) q.notes = (q.notes ? q.notes + '\n' : '') + `${l.name}: ${o.supplier ? o.supplier + ' · ' : ''}${o.cancel}`;
    closeModal(); rerender(); toast(t('liveFilled'));
  }
};

/* ---------- Orders: LuxeCheck WhatsApp orders + staff intervention ----------
   Cloud mode: data and actions go through the Supabase edge function "ops-bridge",
   which signs requests to the n8n ops endpoints. Demo mode: sample orders, actions simulated. */
(function () {
  const T = {
    nav_orders: ['Orders', 'الطلبات'],
    ordersSub: ['WhatsApp requests handled by the booking assistant. Step in when it needs a person.', 'طلبات واتساب التي يتابعها مساعد الحجز. تدخّل عندما يحتاج الطلب موظفاً.'],
    of_all: ['All', 'الكل'], of_staff: ['Needs staff', 'تحتاج موظف'], of_active: ['In progress', 'قيد التنفيذ'], of_done: ['Paid & issued', 'مدفوعة ومُصدرة'], of_closed: ['Cancelled', 'ملغاة'],
    os_received: ['Received', 'مستلم'], os_processing: ['Processing', 'قيد المعالجة'], os_searching: ['Confirming rate', 'تأكيد السعر'], os_quoted: ['Quote sent', 'عرض مُرسل'], os_replied: ['Replied', 'تم الرد'],
    os_payment_pending: ['Awaiting payment', 'بانتظار الدفع'], os_paid: ['Paid', 'مدفوع'], os_vouchered: ['Voucher issued', 'صدر الفاوتشر'], os_hold: ['On hold', 'حجز مؤقت'],
    os_human_review: ['Needs staff', 'يحتاج موظف'], os_failed: ['Failed', 'فشل'], os_cancelled: ['Cancelled', 'ملغي'],
    ok_today: ['Requests today', 'طلبات اليوم'], ok_staff: ['Need staff now', 'تحتاج موظف الآن'], ok_pay: ['Awaiting payment', 'بانتظار الدفع'], ok_paid: ['Paid this month', 'مدفوع هذا الشهر'],
    oc_customer: ['Customer', 'العميل'], oc_request: ['Request', 'الطلب'], oc_stay: ['Stay', 'الإقامة'], oc_amount: ['Amount', 'المبلغ'], oc_status: ['Status', 'الحالة'], oc_updated: ['Updated', 'آخر تحديث'],
    noOrders: ['No orders here yet.', 'لا توجد طلبات هنا بعد.'], ordersLoading: ['Loading orders…', 'جارٍ تحميل الطلبات…'],
    ordersSynced: ['Updated {t}', 'آخر تحديث {t}'], refresh: ['Refresh', 'تحديث'], opsDashboard: ['Operations centre', 'مركز العمليات'],
    ordersDemo: ['Demo orders. Connect Wejha to the database and the ops bridge to see live WhatsApp orders.', 'طلبات تجريبية. اربط وجهة بقاعدة البيانات وجسر العمليات لرؤية طلبات واتساب الحقيقية.'],
    ordersErr_bridge_not_configured: ['The ops bridge is not set up yet (signing key missing).', 'جسر العمليات غير مُعدّ بعد (مفتاح التوقيع غير موجود).'],
    ordersErr_n8n_unreachable: ['The booking assistant did not answer. Try again in a moment.', 'لم يستجب مساعد الحجز، حاول بعد لحظات.'],
    ordersErr_generic: ['Couldn’t load orders.', 'تعذر تحميل الطلبات.'],
    od_title: ['Order {id}', 'الطلب {id}'], od_timeline: ['Timeline', 'المراحل'], od_chat: ['Conversation', 'المحادثة'], od_lastReply: ['Last assistant reply', 'آخر رد من المساعد'],
    od_mode_bot: ['The assistant is answering this customer.', 'المساعد هو من يرد على هذا العميل.'], od_mode_human: ['{n} took over. The assistant is paused for this customer.', '{n} تولّى المحادثة، والمساعد متوقف لهذا العميل.'],
    od_mode_mine: ['You took over. The assistant is paused for this customer.', 'أنت تتولى المحادثة، والمساعد متوقف لهذا العميل.'], od_mode_unknown: ['Checking who is answering…', 'جارٍ التحقق من المسؤول عن الرد…'],
    od_claim: ['Take over', 'تولَّ المحادثة'], od_release: ['Hand back to assistant', 'أعِدها للمساعد'], od_send: ['Send on WhatsApp', 'أرسل على واتساب'],
    od_msgPh: ['Write to the customer…', 'اكتب للعميل…'], od_claimFirst: ['Take over the conversation to reply.', 'تولَّ المحادثة لتتمكن من الرد.'],
    od_settling: ['Taken over. You can send in a few seconds (the assistant is finishing its last step).', 'تم التولي. يمكنك الإرسال بعد ثوانٍ (المساعد ينهي آخر خطوة).'],
    od_claimed: ['You took over the conversation.', 'توليت المحادثة.'], od_released: ['Handed back to the assistant.', 'أُعيدت المحادثة للمساعد.'], od_sent: ['Message sent.', 'تم إرسال الرسالة.'],
    od_readOnly: ['Your role can view orders but not reply.', 'صلاحيتك تسمح بعرض الطلبات دون الرد.'], od_noMessages: ['No messages recorded yet.', 'لا توجد رسائل مسجلة بعد.'],
    od_trip: ['Booking ref', 'مرجع الحجز'], od_original: ['Original request', 'الطلب الأصلي'], od_customerMsg: ['Customer', 'العميل'], od_staffMsg: ['Staff', 'الموظف'], od_botMsg: ['Assistant', 'المساعد'],
    oe_claim_required: ['Take over the conversation first.', 'تولَّ المحادثة أولاً.'], oe_handoff_settling: ['Wait a few seconds, then send again.', 'انتظر ثوانٍ ثم أرسل مجدداً.'],
    oe_template_required: ['The customer hasn’t written in the last 24 hours, so WhatsApp only allows an approved template.', 'العميل لم يراسل خلال 24 ساعة، فواتساب يسمح فقط بقالب معتمد.'],
    oe_owned_by_another_actor: ['Another colleague is handling this conversation.', 'زميل آخر يتولى هذه المحادثة.'], oe_invalid_message: ['Write a message first (up to 4096 characters).', 'اكتب الرسالة أولاً (حتى 4096 حرفاً).'],
    oe_not_your_order: ['This order isn’t from your agency’s numbers.', 'هذا الطلب ليس من أرقام وكالتك.'], oe_forbidden: ['Your role can’t do this.', 'صلاحيتك لا تسمح بذلك.'],
    oe_send_outcome_uncertain: ['WhatsApp didn’t confirm the message. Check the chat before resending.', 'لم يؤكد واتساب الإرسال، تحقق من المحادثة قبل إعادة الإرسال.'],
    phonesTitle: ['Your WhatsApp numbers', 'أرقام واتساب الخاصة بكم'], phonesSub: ['Orders sent from these numbers appear here.', 'الطلبات المرسلة من هذه الأرقام تظهر هنا.'],
    phoneAdd: ['Add number', 'أضف رقماً'], phonePh: ['e.g. 9665XXXXXXXX', 'مثال: 9665XXXXXXXX'], phoneLabelPh: ['Name (optional)', 'الاسم (اختياري)'],
    phoneErr_bad_phone: ['Enter the number with country code, digits only.', 'أدخل الرقم مع رمز الدولة، أرقام فقط.'], phoneErr_phone_taken: ['This number belongs to another agency.', 'هذا الرقم مسجل لوكالة أخرى.'],
    ordersSearch: ['Search number, hotel, booking ref…', 'ابحث برقم، فندق، مرجع حجز…'],
    scopeAll: ['All LuxeCheck orders', 'كل طلبات LuxeCheck'], scopeAgency: ['Your agency’s orders', 'طلبات وكالتك'],
  };
  for (const [k, [en, ar]] of Object.entries(T)) { I18N.en[k] = en; I18N.ar[k] = ar; }
})();

// WhatsApp button payloads (lc_offer:wamid…:1:2, approve_payment…) shown as readable text.
function reqText(v) {
  const ar = L() === 'ar';
  return String(v || '')
    .replace(/\blc_offer:wamid\.[A-Za-z0-9+/=_-]+:(\d+):(\d+)/g, (m, h, o) => ar ? `🔘 اختار العرض ${o} (فندق ${h})` : `🔘 Picked offer ${o} (hotel ${h})`)
    .replace(/\blc_(?:name|info):[^\s]*/g, ar ? '🔘 ضغط زر' : '🔘 Tapped a button')
    .replace(/\bapprove_payment\b/g, ar ? '🔘 وافق على الدفع' : '🔘 Approved payment')
    .replace(/\baccept_nonref\b/g, ar ? '🔘 قبل شرط عدم الاسترداد' : '🔘 Accepted non-refundable');
}
const OPS = { data: null, at: 0, loading: false, err: null, f: 'all', q: '', sel: null, mode: {}, timer: null, phones: null, demo: null };
const OPS_GROUPS = {
  all: null, staff: ['human_review', 'failed'], active: ['received', 'processing', 'searching', 'quoted', 'replied', 'payment_pending', 'hold'],
  done: ['paid', 'vouchered'], closed: ['cancelled']
};
const opsCfg = () => window.WEJHA_CONFIG || {};
const opsLive = () => Cloud.on && !!opsCfg().supabaseUrl;
const fmtPhone = p => { const d = String(p || ''); return d ? '+' + d.replace(/^(\d{3})(\d{2})(\d{3})(\d+)$/, '$1 $2 $3 $4') : '—'; };
const opsPill = s => `<span class="pill os-${esc(s)}">${t('os_' + s) !== 'os_' + s ? t('os_' + s) : esc(s)}</span>`;
function opsTime(iso) {
  if (!iso) return '—'; const d = new Date(iso); if (isNaN(d)) return '—';
  const mins = Math.round((Date.now() - d) / 60000);
  if (mins < 1) return L() === 'ar' ? 'الآن' : 'now';
  if (mins < 60) return L() === 'ar' ? `قبل ${mins} د` : `${mins} min ago`;
  if (mins < 24 * 60) return d.toLocaleTimeString(locale(), { hour: 'numeric', minute: '2-digit' });
  return d.toLocaleDateString(locale(), { day: 'numeric', month: 'short' });
}

async function opsCall(body) {
  if (!opsLive()) return opsDemoCall(body);
  const { data, error } = await Cloud.sb.functions.invoke('ops-bridge', { body });
  if (error) {
    let detail = {}; try { detail = await error.context.json(); } catch (e) { }
    const err = new Error(detail.error || 'generic'); err.code = detail.error || 'generic'; throw err;
  }
  return data;
}

async function opsLoad(force) {
  if (OPS.loading) return; if (!force && OPS.data && Date.now() - OPS.at < 15000) return;
  OPS.loading = true; OPS.err = null;
  try { OPS.data = await opsCall({ op: 'feed' }); OPS.at = Date.now(); }
  catch (e) { OPS.err = e.code || 'generic'; }
  OPS.loading = false;
  if (S.ui.view === 'orders') { opsPaint(); if (OPS.sel && $('#od')) opsPaintDetail(); }
  const n = opsStaffCount(); const nav = $('#nav-orders'); let b = nav && nav.querySelector('.count');
  if (nav && !b && n) { b = document.createElement('span'); b.className = 'count alert'; nav.appendChild(b); }
  if (b) { b.textContent = n || ''; b.classList.add('alert'); b.style.display = n ? '' : 'none'; }
}
const opsOrders = () => (OPS.data && OPS.data.orders) || [];
const opsStaffCount = () => opsOrders().filter(o => OPS_GROUPS.staff.includes(o.status)).length;

function vOrders() {
  opsLoad(); clearInterval(OPS.timer);
  OPS.timer = setInterval(() => { if (S.ui.view === 'orders' && !document.hidden) opsLoad(true); else if (S.ui.view !== 'orders') clearInterval(OPS.timer); }, 30000);
  if (Cloud.on && can('team') && OPS.phones === null) opsLoadPhones();
  const dash = opsCfg().opsDashboardUrl;
  return `
  <div class="head"><div><h1>${t('nav_orders')}</h1><p>${t('ordersSub')}</p></div>
    <div class="row">${dash ? `<a class="btn" href="${esc(dash)}" target="_blank" rel="noopener">${ic('link', 'sm')} ${t('opsDashboard')}</a>` : ''}<button class="btn" data-act="opsRefresh">${ic('refresh', 'sm')} ${t('refresh')}</button></div></div>
  <div id="ops-body">${opsBody()}</div>`;
}
function opsPaint() { const b = $('#ops-body'); if (b) b.innerHTML = opsBody(); }

function opsBody() {
  if (!OPS.data && OPS.loading) return `<div class="card"><p class="muted">${t('ordersLoading')}</p></div>`;
  if (!OPS.data && OPS.err) return `<div class="warn-box">${ic('alert', 'sm')} ${t('ordersErr_' + OPS.err) !== 'ordersErr_' + OPS.err ? t('ordersErr_' + OPS.err) : t('ordersErr_generic')}</div>`;
  const all = opsOrders();
  const today0 = new Date(); today0.setHours(0, 0, 0, 0);
  const month = new Date().toISOString().slice(0, 7);
  const k = {
    today: all.filter(o => new Date(o.updated_at) >= today0).length,
    staff: opsStaffCount(),
    pay: all.filter(o => o.status === 'payment_pending').length,
    paid: all.filter(o => ['paid', 'vouchered'].includes(o.status) && String(o.updated_at).slice(0, 7) === month).reduce((a, o) => a + (Number(o.amount_sar) || 0), 0)
  };
  const g = OPS_GROUPS[OPS.f]; const qq = OPS.q.toLowerCase();
  const list = all.filter(o => (!g || g.includes(o.status)) && (!qq || [o.request_id, o.sender, o.hotel, o.city, o.trip_id, o.request_text].join(' ').toLowerCase().includes(qq)));
  const cnt = key => all.filter(o => !OPS_GROUPS[key] || OPS_GROUPS[key].includes(o.status)).length;
  const sar = n => (L() === 'ar' ? `${Math.round(n).toLocaleString('en-US')} ر.س` : `SAR ${Math.round(n).toLocaleString('en-US')}`);
  return `
  ${!opsLive() ? `<div class="warn-box" style="margin-bottom:14px">${ic('alert', 'sm')} ${t('ordersDemo')}</div>` : ''}
  ${OPS.err && OPS.data ? `<div class="warn-box" style="margin-bottom:14px">${ic('alert', 'sm')} ${t('ordersErr_' + OPS.err) !== 'ordersErr_' + OPS.err ? t('ordersErr_' + OPS.err) : t('ordersErr_generic')}</div>` : ''}
  <div class="grid g4">
    <div class="card tile"><span class="k">${ic('chat', 'sm')} ${t('ok_today')}</span><span class="v">${k.today}</span><span class="d muted">${OPS.data.scope === 'all' ? t('scopeAll') : t('scopeAgency')}</span></div>
    <div class="card tile ${k.staff ? 'tile-alert' : ''}"><span class="k">${ic('alert', 'sm')} ${t('ok_staff')}</span><span class="v">${k.staff}</span>${k.staff ? `<button class="btn sm" data-act="opsF" data-v="staff">${t('open')}</button>` : `<span class="d muted">${t('allClear')}</span>`}</div>
    <div class="card tile"><span class="k">${ic('clock', 'sm')} ${t('ok_pay')}</span><span class="v">${k.pay}</span></div>
    <div class="card tile"><span class="k">${ic('wallet', 'sm')} ${t('ok_paid')}</span><span class="v">${sar(k.paid)}</span></div>
  </div>
  <div class="card" style="padding:12px 14px">
    <div class="row between" style="flex-wrap:wrap;gap:10px">
      <div class="chips" role="tablist">${Object.keys(OPS_GROUPS).map(key => `<button class="chip ${OPS.f === key ? 'on' : ''}" data-act="opsF" data-v="${key}" role="tab" aria-selected="${OPS.f === key}">${t('of_' + key)} <span class="num muted">${cnt(key)}</span></button>`).join('')}</div>
      <div class="search" style="min-width:220px">${ic('search', 'sm')}<input id="ops-q" type="search" value="${esc(OPS.q)}" placeholder="${t('ordersSearch')}" aria-label="${t('ordersSearch')}"></div>
    </div>
  </div>
  <div class="card" style="padding:4px 6px"><div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>${t('oc_customer')}</th><th>${t('oc_request')}</th><th>${t('oc_stay')}</th><th class="r">${t('oc_amount')}</th><th>${t('oc_status')}</th><th>${t('oc_updated')}</th></tr></thead>
    <tbody>${list.length ? list.map(o => `
      <tr class="click ${OPS_GROUPS.staff.includes(o.status) ? 'row-alert' : ''}${o.status === 'human_review' ? ' row-staff' : ''}" data-act="opsOpen" data-id="${esc(o.request_id)}" tabindex="0">
        <td class="who"><b class="num" dir="ltr">${fmtPhone(o.sender)}</b><span>${esc(o.request_id)}</span></td>
        <td class="small"><b>${esc(o.hotel || o.city || '—')}</b><div class="tiny muted ellip" dir="auto">${esc(reqText(o.request_text).split('\n')[0].slice(0, 70))}</div></td>
        <td class="small">${o.checkin ? `${fmtShort(o.checkin)} → ${fmtShort(o.checkout)}` : '—'}</td>
        <td class="r num">${o.amount_sar ? sar(o.amount_sar) : '—'}</td>
        <td>${opsPill(o.status)}</td>
        <td class="small muted">${opsTime(o.updated_at)}</td></tr>`).join('') : `<tr><td colspan="6" class="empty">${t('noOrders')}</td></tr>`}</tbody></table></div>
    <p class="tiny muted" style="padding:8px 10px">${OPS.at ? t('ordersSynced', { t: new Date(OPS.at).toLocaleTimeString(locale(), { hour: 'numeric', minute: '2-digit' }) }) : ''}</p></div>
  ${Cloud.on && can('team') && OPS.data.scope !== 'all' ? opsPhonesCard() : ''}`;
}

/* ----- Order detail ----- */
function opsOpen(id) {
  OPS.sel = id; const o = opsOrders().find(x => x.request_id === id); if (!o) return;
  modal(t('od_title', { id }), `<div id="od"></div>`, '', { wide: true });
  opsPaintDetail();
  if (!OPS.mode[o.sender]) opsStatus(o.sender);
}
function opsPaintDetail() {
  const box = $('#od'); const o = opsOrders().find(x => x.request_id === OPS.sel); if (!box || !o) return;
  let msgs = ((OPS.data && OPS.data.messages) || []).filter(m => m.sender === o.sender);
  if (o.last_reply && !msgs.some(m => m.direction === 'outbound' && m.body === o.last_reply)) msgs = msgs.concat([{ id: 'last', sender: o.sender, direction: 'last', body: o.last_reply, created_at: o.updated_at }]);
  msgs = msgs.slice().sort((a, b) => (Date.parse(a.created_at) || 0) - (Date.parse(b.created_at) || 0)).slice(-40);
  const md = OPS.mode[o.sender]; const me = Cloud.on && Cloud.user ? Cloud.user.id : 'demo-user';
  const mine = md && md.mode === 'human' && md.actor_id === me;
  const canAct = can('edit');
  const modeTxt = !md ? t('od_mode_unknown') : md.mode === 'human' ? (mine ? t('od_mode_mine') : t('od_mode_human', { n: esc(md.actor_name || '—') })) : t('od_mode_bot');
  box.innerHTML = `
  <div class="od-grid">
    <div class="stack">
      <div class="row between"><div><b class="num" dir="ltr">${fmtPhone(o.sender)}</b><div class="tiny muted">${esc(o.request_id)}${o.trip_id ? ' · ' + t('od_trip') + ' ' + esc(o.trip_id) : ''}</div></div>${opsPill(o.status)}</div>
      <div class="sumrow"><span>${t('oc_request')}</span><span>${esc(o.hotel || o.city || '—')}</span></div>
      <div class="sumrow"><span>${t('oc_stay')}</span><span>${o.checkin ? `${fmtDate(o.checkin)} → ${fmtDate(o.checkout)}` : '—'}</span></div>
      <div class="sumrow"><span>${t('oc_amount')}</span><span class="num">${o.amount_sar ? Math.round(o.amount_sar).toLocaleString('en-US') + (L() === 'ar' ? ' ر.س' : ' SAR') : '—'}</span></div>
      ${o.request_text ? `<div><div class="tiny muted">${t('od_original')}</div><div class="quote-box" dir="auto">${esc(reqText(o.request_text))}</div></div>` : ''}
      <div><div class="tiny muted" style="margin-bottom:6px">${t('od_timeline')}</div>
        <div class="feed">${(o.events || []).slice().reverse().slice(0, 14).map(e => `<div class="it"><span class="dot">${ic('clock', 'sm')}</span><div><span dir="auto">${esc(e.text)}</span><div class="tiny muted">${opsTime(e.at)}</div></div></div>`).join('') || `<p class="tiny muted">—</p>`}</div></div>
    </div>
    <div class="stack od-chat">
      <div class="tiny muted">${t('od_chat')}</div>
      <div class="chat" id="od-chat">${msgs.length ? msgs.map(m => `<div class="bub ${m.direction === 'inbound' ? 'in' : m.direction === 'staff' ? 'staff' : 'out'}"><div class="tiny muted">${m.direction === 'inbound' ? t('od_customerMsg') : m.direction === 'staff' ? t('od_staffMsg') : m.direction === 'last' ? t('od_lastReply') : t('od_botMsg')} · ${opsTime(m.created_at)}</div><div dir="auto">${esc(m.body)}</div></div>`).join('') : `<p class="tiny muted">${t('od_noMessages')}</p>`}</div>
      <div class="mode-box ${md && md.mode === 'human' ? 'human' : ''}">${ic(md && md.mode === 'human' ? 'user' : 'spark', 'sm')} <span>${modeTxt}</span></div>
      ${!canAct ? `<p class="tiny muted">${t('od_readOnly')}</p>` : `
      <div class="row" style="gap:8px;flex-wrap:wrap">
        ${!md || md.mode !== 'human' ? `<button class="btn primary" data-act="opsClaim" data-s="${o.sender}">${ic('user', 'sm')} ${t('od_claim')}</button>` : ''}
        ${mine ? `<button class="btn" data-act="opsRelease" data-s="${o.sender}">${ic('spark', 'sm')} ${t('od_release')}</button>` : ''}
      </div>
      <div class="f"><textarea class="inp" id="od-msg" rows="3" placeholder="${mine ? t('od_msgPh') : t('od_claimFirst')}" ${mine ? '' : 'disabled'} maxlength="4096"></textarea></div>
      <div class="row" style="justify-content:flex-end"><button class="btn primary" data-act="opsSend" data-s="${o.sender}" ${mine ? '' : 'disabled'}>${ic('send', 'sm')} ${t('od_send')}</button></div>`}
    </div>
  </div>`;
  const c = $('#od-chat'); if (c) c.scrollTop = c.scrollHeight;
}
async function opsStatus(sender) {
  try { const r = await opsCall({ op: 'status', sender }); OPS.mode[sender] = { mode: r.mode || 'bot', actor_id: r.actor_id || null, actor_name: r.actor_name || '' }; }
  catch (e) { OPS.mode[sender] = { mode: 'bot' }; }
  opsPaintDetail();
}
const opsErr = code => (t('oe_' + code) !== 'oe_' + code ? t('oe_' + code) : t('ordersErr_' + code) !== 'ordersErr_' + code ? t('ordersErr_' + code) : t('errTryAgain'));
async function opsAction(op, sender, extra) {
  try {
    const r = await opsCall(Object.assign({ op, sender }, extra || {}));
    if (r && r.ok === false) throw Object.assign(new Error(r.error), { code: r.error });
    return r;
  } catch (e) { toast(opsErr(e.code || e.message)); return null; }
}

/* ----- Agency WhatsApp numbers (cloud, owners) ----- */
async function opsLoadPhones() {
  OPS.phones = [];
  const { data } = await Cloud.sb.from('agency_phones').select('phone,label').order('created_at');
  OPS.phones = data || []; if (S.ui.view === 'orders') opsPaint();
}
function opsPhonesCard() {
  return `<div class="card"><div class="card-h"><div><h2>${t('phonesTitle')}</h2><p>${t('phonesSub')}</p></div></div>
    <div class="stack">${(OPS.phones || []).map(p => `<div class="alert-row" style="background:transparent;border:1px solid var(--line)">${ic('chat', 'sm')}<div class="grow"><b class="num" dir="ltr">${fmtPhone(p.phone)}</b> <span class="muted small">${esc(p.label || '')}</span></div><button class="icon-btn" data-act="opsPhoneRm" data-v="${p.phone}" aria-label="${t('delete')}">${ic('trash', 'sm')}</button></div>`).join('')}
    <div class="row" style="gap:8px;flex-wrap:wrap"><input class="inp" id="ph-num" dir="ltr" inputmode="numeric" placeholder="${t('phonePh')}" style="max-width:220px"><input class="inp" id="ph-label" placeholder="${t('phoneLabelPh')}" style="max-width:200px"><button class="btn" data-act="opsPhoneAdd">${ic('plus', 'sm')} ${t('phoneAdd')}</button></div></div></div>`;
}

Object.assign(ACT, {
  opsRefresh: () => opsLoad(true),
  opsF: el => { OPS.f = el.dataset.v; opsPaint(); },
  opsOpen: el => opsOpen(el.dataset.id),
  opsClaim: async el => { const s = el.dataset.s; el.disabled = true; const r = await opsAction('claim', s); if (r) { OPS.mode[s] = { mode: 'human', actor_id: Cloud.on ? Cloud.user.id : 'demo-user', actor_name: '' }; toast(t('od_settling')); } opsPaintDetail(); },
  opsRelease: async el => { const s = el.dataset.s; el.disabled = true; const r = await opsAction('release', s); if (r) { OPS.mode[s] = { mode: 'bot' }; toast(t('od_released')); } opsPaintDetail(); },
  opsSend: async el => {
    const s = el.dataset.s; const ta = $('#od-msg'); const body = (ta.value || '').trim(); if (!body) { ta.focus(); return toast(t('oe_invalid_message')); }
    const last = ((OPS.data && OPS.data.messages) || []).filter(m => m.sender === s && m.direction === 'inbound').map(m => m.created_at).sort().pop() || '';
    el.disabled = true; const r = await opsAction('send', s, { body, last_inbound_at: last }); el.disabled = false;
    if (r) { OPS.data.messages = (OPS.data.messages || []).concat([{ id: 'local-' + Date.now(), sender: s, direction: 'staff', body, created_at: new Date().toISOString() }]); toast(t('od_sent')); opsPaintDetail(); }
  },
  opsPhoneAdd: async () => {
    try { await Cloud.rpc('add_agency_phone', { p_phone: $('#ph-num').value, p_label: $('#ph-label').value }); OPS.phones = null; await opsLoadPhones(); opsLoad(true); toast(t('saved')); }
    catch (e) { const m = String(e.message || ''); toast(m.includes('bad_phone') ? t('phoneErr_bad_phone') : m.includes('phone_taken') ? t('phoneErr_phone_taken') : friendlyErr(e)); }
  },
  opsPhoneRm: el => confirmBox(fmtPhone(el.dataset.v), async () => { try { await Cloud.rpc('remove_agency_phone', { p_phone: el.dataset.v }); await opsLoadPhones(); opsLoad(true); } catch (e) { toast(friendlyErr(e)); } }, t('delete'))
});
document.addEventListener('input', e => { if (e.target.id === 'ops-q') { OPS.q = e.target.value; const pos = e.target.selectionStart; opsPaint(); const n = $('#ops-q'); n.focus(); n.setSelectionRange(pos, pos); } });

/* ----- Demo data (no backend) ----- */
function opsDemoSeed() {
  const now = Date.now(), iso = m => new Date(now - m * 60000).toISOString(), day = d => isoDate(new Date(now + d * 86400000));
  const ev = (...xs) => xs.map(([text, m]) => ({ text, at: iso(m) }));
  const orders = [
    { request_id: 'LCREQ-3721', sender: '966544381103', status: 'human_review', hotel: 'Hilton Dubai Palm Jumeirah', city: 'Dubai', checkin: day(40), checkout: day(42), amount_sar: 1729, request_text: 'Hilton Dubai Palm Jumeirah\n15-17 Dec, 2 adults', last_reply: 'العرض لم يعد متاحاً. أرسل البحث مرة أخرى لعرض الأسعار الحالية.\nلم يتم أي حجز.', updated_at: iso(4), events: ev(['استلام طلب العميل', 26], ['عرض مُرسل: 1729 ريال', 24], ['تأكيد السعر والتوافر', 6], ['تعذّر مطابقة العرض: السعر غير ظاهر بنفس الوجبة', 4]) },
    { request_id: 'LCREQ-3718', sender: '966501234567', status: 'quoted', hotel: 'Four Seasons Hotel Cairo at Nile Plaza', city: 'Cairo', checkin: day(35), checkout: day(37), amount_sar: 2410, request_text: 'فورسيزونز النيل بلازا 10-12 ديسمبر شخصين مصريين', last_reply: 'Four Seasons Hotel Cairo at Nile Plaza | 2410 ريال', updated_at: iso(18), events: ev(['استلام طلب العميل', 22], ['عرض مُرسل', 18]) },
    { request_id: 'LCREQ-3712', sender: '971551112233', status: 'payment_pending', hotel: 'Atlantis The Royal', city: 'Dubai', checkin: day(20), checkout: day(23), amount_sar: 9850, trip_id: 'LUX-482910', request_text: 'Atlantis The Royal 3 nights, 2 adults, breakfast', last_reply: 'رابط الدفع جاهز. صالح لمدة 30 دقيقة.', updated_at: iso(55), events: ev(['استلام طلب العميل', 90], ['عرض مُرسل', 85], ['استلام الأسماء', 70], ['رابط الدفع', 55]) },
    { request_id: 'LCREQ-3705', sender: '966555000111', status: 'vouchered', hotel: 'The Ritz-Carlton, Riyadh', city: 'Riyadh', checkin: day(6), checkout: day(8), amount_sar: 3120, trip_id: 'LUX-482771', request_text: 'Ritz Carlton Riyadh 2 nights', last_reply: 'تم قبول إرسال الفوتشر على واتساب.', updated_at: iso(300), events: ev(['استلام طلب العميل', 420], ['تم الدفع', 330], ['صدر الفاوتشر', 300]) },
    { request_id: 'LCREQ-3699', sender: '201001234567', status: 'failed', hotel: '', city: 'Hurghada', checkin: day(60), checkout: day(64), amount_sar: null, request_text: 'فندق في الغردقة 4 ليالي ميزانية 3000', last_reply: 'تعذّر إكمال البحث عن سعر لهذا الفندق. يُرجى إعادة المحاولة.', updated_at: iso(140), events: ev(['استلام طلب العميل', 150], ['تعذّر إكمال البحث: الأسعار لم تُحمّل', 140]) },
    { request_id: 'LCREQ-3690', sender: '966544381103', status: 'paid', hotel: 'Burj Al Arab Jumeirah', city: 'Dubai', checkin: day(14), checkout: day(16), amount_sar: 18400, trip_id: 'LUX-482650', request_text: 'Burj Al Arab, 2 nights', last_reply: 'تم استلام الدفع.', updated_at: iso(1500), events: ev(['استلام طلب العميل', 1600], ['تم الدفع', 1500]) },
    { request_id: 'LCREQ-3684', sender: '96550001234', status: 'cancelled', hotel: 'Raffles Doha', city: 'Doha', checkin: day(9), checkout: day(11), amount_sar: 4300, request_text: 'Raffles Doha', last_reply: 'تم إلغاء الطلب بطلب العميل.', updated_at: iso(2900), events: ev(['استلام طلب العميل', 3000], ['إلغاء', 2900]) }
  ];
  const messages = [
    { id: 'm1', sender: '966544381103', direction: 'inbound', body: 'Hilton Dubai Palm Jumeirah 15-17 Dec 2 adults', created_at: iso(26) },
    { id: 'm2', sender: '966544381103', direction: 'outbound', body: 'Hilton Dubai Palm Jumeirah | 1729 ريال\nأرسل أسماء النزلاء بالإنجليزي، كل نزيل في سطر.\nمثال: Mr Ahmed Ali', created_at: iso(24) },
    { id: 'm3', sender: '966544381103', direction: 'inbound', body: 'Mr Raed Talat\nMr Wael Talat', created_at: iso(7) },
    { id: 'm4', sender: '966501234567', direction: 'inbound', body: 'فورسيزونز النيل بلازا 10-12 ديسمبر شخصين مصريين', created_at: iso(22) },
    { id: 'm5', sender: '201001234567', direction: 'inbound', body: 'فندق في الغردقة 4 ليالي ميزانية 3000', created_at: iso(150) }
  ];
  return { source: 'demo', synced_at: new Date().toISOString(), orders, messages, scope: 'all', modes: {} };
}
async function opsDemoCall(body) {
  await new Promise(r => setTimeout(r, 250));
  if (!OPS.demo) OPS.demo = opsDemoSeed();
  const d = OPS.demo, s = body.sender;
  if (body.op === 'feed') return { ...d, orders: d.orders.slice(), messages: d.messages.slice(), synced_at: new Date().toISOString() };
  const m = d.modes[s] || { mode: 'bot' };
  if (body.op === 'status') return { ok: true, mode: m.mode, actor_id: m.actor_id || null, actor_name: m.actor_name || '' };
  if (body.op === 'claim') { if (m.mode === 'human' && m.actor_id !== 'demo-user') return { ok: false, error: 'owned_by_another_actor' }; d.modes[s] = { mode: 'human', actor_id: 'demo-user', actor_name: 'You' }; return { ok: true, mode: 'human' }; }
  if (body.op === 'release') { d.modes[s] = { mode: 'bot' }; return { ok: true, mode: 'bot' }; }
  if (body.op === 'send') { if (m.mode !== 'human') return { ok: false, error: 'claim_required' }; d.messages.push({ id: 'd' + Date.now(), sender: s, direction: 'staff', body: body.body, created_at: new Date().toISOString() }); return { ok: true, state: 'accepted' }; }
  return { ok: false, error: 'bad_op' };
}

/* ---------- Dispatch: auto-assign WhatsApp orders to staff, live map, order → branded quote ----------
   Assignments are shared: Supabase table ops_assignments in cloud mode, localStorage in demo mode.
   Logic runs in every open Orders page after each refresh (idempotent, last write wins). */
(function () {
  const T = {
    dp_staff: ['Staff', 'الموظف'], dp_unassigned: ['Unassigned', 'غير مُسند'], dp_late: ['Late', 'متأخر'], dp_accepted: ['Accepted', 'مُستلم'],
    dp_waiting: ['Waiting {m} min', 'بانتظار الاستلام {m} د'], dp_mine: ['My orders', 'طلباتي'], dp_iam: ['I am', 'أنا'], dp_pickMe: ['Choose your name', 'اختر اسمك'],
    dp_accept: ['Accept order', 'استلمت الطلب'], dp_reassign: ['Reassign', 'حوّل لموظف'], dp_assign: ['Assign to', 'أسند إلى'], dp_unassign: ['Unassign', 'إلغاء الإسناد'], dp_unassigned_done: ['Unassigned', 'تم إلغاء الإسناد'], dp_toQuote: ['Turn into quote', 'حوّل لعرض سعر'],
    dp_assignedTo: ['Assigned to {n}', 'مُسند إلى {n}'], dp_acceptedBy: ['Accepted by {n}', 'استلمه {n}'], dp_history: ['Assignment history', 'سجل الإسناد'],
    dp_duty: ['On duty', 'على رأس العمل'], dp_dutyTitle: ['Team on duty', 'الفريق المناوب'], dp_dutyHint: ['New orders rotate between staff on duty. Unaccepted orders move to the next person after {m} minutes.', 'الطلبات الجديدة تتوزع بالدور على المناوبين. الطلب غير المُستلم ينتقل للموظف التالي بعد {m} دقائق.'],
    dp_late_k: ['Late (not accepted)', 'متأخرة (غير مستلمة)'], dp_mapTitle: ['Live request pulse', 'نبض الطلبات المباشر'], dp_mapHint: ['Orders by destination; pulsing dots are new in the last 30 minutes.', 'الطلبات حسب الوجهة؛ النقاط النابضة جديدة خلال آخر 30 دقيقة.'],
    dp_quoteMade: ['Draft quote created from the order.', 'تم إنشاء مسودة عرض سعر من الطلب.'], dp_saved: ['Saved.', 'تم الحفظ.'], dp_noStaff: ['Nobody is on duty. Turn someone on in “Team on duty”.', 'لا يوجد موظف مناوب. فعّل موظفاً من "الفريق المناوب".'],
    dp_by_auto: ['auto', 'تلقائي'], dp_by_timeout: ['not accepted in time', 'لم يُستلم في الوقت'], dp_by_manual: ['manual', 'يدوي'], dp_by_unassign: ['unassigned', 'أُلغي الإسناد'],
    dp_teamTitle: ['Team & assignments', 'الفريق والإسناد'], dp_accepting: ['Accepting', 'يستقبل'], dp_paused: ['Paused', 'موقوف'], dp_toggleHint: ['Turn new assignments on or off', 'تشغيل أو إيقاف الطلبات الجديدة'],
    dp_newAssign: ['New assignments', 'الطلبات الجديدة'], dp_openCol: ['Open', 'مفتوحة'], dp_acceptedCol: ['Accepted', 'مُستلمة'], dp_lateCol: ['Late', 'متأخرة'],
    dp_viewOrders: ['Orders', 'الطلبات'], dp_unassignAll: ['Unassign all', 'إلغاء إسناد الكل'], dp_unassignAllQ: ['Unassign all {n} open orders from {s}? They go back to the unassigned list.', 'إلغاء إسناد {n} طلب مفتوح من {s}؟ ترجع لقائمة غير المُسندة.'],
    dp_autoNow: ['Assign now', 'وزّع الآن'], dp_addStaff: ['Add staff', 'إضافة موظف'], dp_released: ['{n} orders unassigned', 'أُلغي إسناد {n} طلب'], dp_autoDone: ['{n} orders assigned', 'تم إسناد {n} طلب'],
  };
  for (const [k, [en, ar]] of Object.entries(T)) { I18N.en[k] = en; I18N.ar[k] = ar; }
})();

const DSP = { rows: {}, loaded: false, busy: false, map: null, layer: null };
const dspCfg = () => window.WEJHA_CONFIG || {};
const DSP_STAFF = () => (DSP.team && DSP.team.length ? DSP.team : null) || dspCfg().staff || [
  { id: 's1', name: 'أحمد العتيبي' }, { id: 's2', name: 'سارة القحطاني' }, { id: 's3', name: 'خالد المصري' }, { id: 's4', name: 'منى الشهري' }];
const DSP_SLA = () => Number(dspCfg().assignMinutes) || 10;
const DSP_DONE = ['paid', 'vouchered', 'cancelled'];
const dspStaffName = id => (DSP_STAFF().find(s => s.id === id) || {}).name || '—';
const dspMe = () => { try { return localStorage.getItem('wejha_me') || ''; } catch (e) { return ''; } };
const dspDuty = () => { const d = DSP.rows.__duty__; const off = (d && d.history && d.history.off) || []; return DSP_STAFF().filter(s => !off.includes(s.id)); };
const dspCloud = () => typeof opsLive === 'function' && opsLive() && Cloud.sb;

async function dspTeam() {
  if (Cloud.on && Cloud.sb && Cloud.agencyId && !DSP.team) {
    try { const { data } = await Cloud.sb.from('agency_members').select('user_id, name, email, role').eq('agency_id', Cloud.agencyId).order('created_at');
      DSP.team = (data || []).filter(m => m.role !== 'viewer').map(m => ({ id: m.user_id, name: m.name || String(m.email || '').split('@')[0] || '—' })); } catch (e) { DSP.team = []; }
    if (Cloud.user && dspMe() !== Cloud.user.id) { try { localStorage.setItem('wejha_me', Cloud.user.id); } catch (e) { } }
  }
}
async function dspLoad() {
  if (dspCloud()) {
    const { data, error } = await Cloud.sb.from('ops_assignments').select('*');
    if (!error) { DSP.rows = {}; (data || []).forEach(r => { DSP.rows[r.request_id] = r; }); DSP.loaded = true; }
  } else {
    try { DSP.rows = JSON.parse(localStorage.getItem('wejha_dispatch') || '{}'); } catch (e) { DSP.rows = {}; }
    DSP.loaded = true;
  }
}
async function dspSave(rows) {
  rows.forEach(r => { r.updated_at = new Date().toISOString(); DSP.rows[r.request_id] = r; });
  if (dspCloud()) { const { error } = await Cloud.sb.from('ops_assignments').upsert(rows); if (error) console.warn('dispatch save', error.message); }
  else { try { localStorage.setItem('wejha_dispatch', JSON.stringify(DSP.rows)); } catch (e) {} }
}
function dspNext(afterId, rr) {
  const duty = dspDuty(); if (!duty.length) return null;
  let i = afterId ? duty.findIndex(s => s.id === afterId) + 1 : (rr || 0);
  const pick = duty[((i % duty.length) + duty.length) % duty.length];
  if (pick.id === afterId && duty.length > 1) return duty[(duty.indexOf(pick) + 1) % duty.length].id;
  return pick.id;
}
/* Assign new active orders round-robin; move unaccepted ones after the SLA. */
async function dspTick(orders) {
  if (DSP.busy) return; DSP.busy = true;
  try {
    if (!DSP.team) await dspTeam();
    if (!DSP.loaded) await dspLoad();
    const now = Date.now(), sla = DSP_SLA() * 60000, changed = [];
    const meta = DSP.rows.__duty__ || { request_id: '__duty__', staff_id: null, history: { off: [], rr: 0 } };
    const recent = orders.filter(o => !DSP_DONE.includes(o.status) && now - (Date.parse(o.updated_at) || 0) < 3 * 86400000);
    for (const o of recent.sort((a, b) => (Date.parse(a.updated_at) || 0) - (Date.parse(b.updated_at) || 0))) {
      const r = DSP.rows[o.request_id];
      if (!r) {
        const sid = dspNext(null, meta.history.rr || 0); if (!sid) break;
        meta.history.rr = (meta.history.rr || 0) + 1;
        changed.push({ request_id: o.request_id, staff_id: sid, assigned_at: new Date().toISOString(), accepted_at: null, history: { log: [{ s: sid, at: new Date().toISOString(), by: 'auto' }] } });
      } else if (!r.accepted_at && r.staff_id && now - Date.parse(r.assigned_at) > sla) {
        const sid = dspNext(r.staff_id); if (!sid || sid === r.staff_id) continue;
        const log = ((r.history && r.history.log) || []).concat([{ s: sid, at: new Date().toISOString(), by: 'timeout' }]).slice(-20);
        changed.push({ ...r, staff_id: sid, assigned_at: new Date().toISOString(), history: { ...(r.history || {}), log } });
      }
    }
    if (changed.length) { changed.push(meta); await dspSave(changed); }
  } finally { DSP.busy = false; }
}
function dspState(o) {
  const r = DSP.rows[o.request_id];
  if (!r || !r.staff_id) return { cls: 'muted', txt: t('dp_unassigned') };
  const name = dspStaffName(r.staff_id);
  if (r.accepted_at) return { cls: 'ok', txt: name, sub: t('dp_accepted') };
  const mins = Math.max(0, Math.round((Date.now() - Date.parse(r.assigned_at)) / 60000));
  return { cls: mins >= DSP_SLA() ? 'late' : 'wait', txt: name, sub: mins >= DSP_SLA() ? t('dp_late') : t('dp_waiting', { m: mins }) };
}
function dspCell(o) {
  if (DSP_DONE.includes(o.status)) { const r = DSP.rows[o.request_id]; return r && r.staff_id ? `<span class="small">${esc(dspStaffName(r.staff_id))}</span>` : '<span class="muted">—</span>'; }
  const st = dspState(o);
  return `<div class="dsp ${st.cls}"><b class="small">${esc(st.txt)}</b>${st.sub ? `<div class="tiny">${esc(st.sub)}</div>` : ''}</div>`;
}
const dspLateCount = orders => orders.filter(o => !DSP_DONE.includes(o.status) && dspState(o).cls === 'late').length;
const dspMine = o => { const r = DSP.rows[o.request_id]; return !!(r && r.staff_id && r.staff_id === dspMe()); };

/* ---------- Duty panel ---------- */
const dspUnassignedRecent = o => !DSP_DONE.includes(o.status) && Date.now() - (Date.parse(o.updated_at) || 0) < 3 * 86400000 && !(DSP.rows[o.request_id] && DSP.rows[o.request_id].staff_id);
function dspDutyCard() {
  const meta = DSP.rows.__duty__; const off = (meta && meta.history && meta.history.off) || [];
  const all = opsOrders(); const open = all.filter(o => !DSP_DONE.includes(o.status));
  const me = dspMe(); const admin = can('team');
  const un = open.filter(dspUnassignedRecent).length;
  const rows = DSP_STAFF().map(s => {
    const mine = open.filter(o => { const r = DSP.rows[o.request_id]; return r && r.staff_id === s.id; });
    const late = mine.filter(o => dspState(o).cls === 'late').length;
    const acc = mine.filter(o => DSP.rows[o.request_id].accepted_at).length;
    const on = !off.includes(s.id);
    return `<tr>
      <td><b>${esc(s.name)}</b>${s.id === me ? ` <span class="tag">${t('you')}</span>` : ''}</td>
      <td><button class="chip ${on ? 'on' : ''}" data-act="dspDuty" data-v="${s.id}" ${admin || s.id === me ? '' : 'disabled'} title="${t('dp_toggleHint')}">${on ? '● ' + t('dp_accepting') : '⏸ ' + t('dp_paused')}</button></td>
      <td class="num">${mine.length}</td>
      <td class="num">${acc}</td>
      <td class="num" style="${late ? 'color:var(--bad);font-weight:600' : ''}">${late}</td>
      <td style="white-space:nowrap;text-align:end">
        <button class="btn sm ${OPS.f === 'st:' + s.id ? 'primary' : ''}" data-act="dspView" data-v="${s.id}" ${mine.length ? '' : 'disabled'}>${ic('eye', 'sm')} ${t('dp_viewOrders')}</button>
        ${can('edit') && mine.length ? `<button class="btn sm" data-act="dspRelease" data-v="${s.id}">${ic('x', 'sm')} ${t('dp_unassignAll')}</button>` : ''}</td></tr>`;
  }).join('');
  return `<div class="card" style="padding:12px 14px;margin-bottom:14px">
    <div class="row between" style="flex-wrap:wrap;gap:10px;margin-bottom:6px">
      <div><b>${t('dp_teamTitle')}</b><div class="tiny muted">${t('dp_dutyHint', { m: DSP_SLA() })}</div></div>
      <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">
        ${un ? `<button class="btn sm ${OPS.f === 'st:none' ? 'primary' : ''}" data-act="dspView" data-v="none">${ic('alert', 'sm')} ${t('dp_unassigned')}: <b>${un}</b></button>` : ''}
        ${can('edit') && un ? `<button class="btn sm" data-act="dspAutoNow">${ic('refresh', 'sm')} ${t('dp_autoNow')}</button>` : ''}
        ${admin ? `<button class="btn sm ghost" data-act="dspAddStaff">${ic('plus', 'sm')} ${t('dp_addStaff')}</button>` : ''}
      </div></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('dp_staff')}</th><th>${t('dp_newAssign')}</th><th class="num">${t('dp_openCol')}</th><th class="num">${t('dp_acceptedCol')}</th><th class="num">${t('dp_lateCol')}</th><th></th></tr></thead>
    <tbody>${rows || `<tr><td colspan="6" class="empty">${t('dp_noStaff')}</td></tr>`}</tbody></table></div></div>`;
}

/* ---------- Live map (Leaflet loaded as window.LeafletLib) ---------- */
const DSP_CITIES = {
  dubai: [25.2048, 55.2708], 'abu dhabi': [24.4539, 54.3773], sharjah: [25.3463, 55.4209], riyadh: [24.7136, 46.6753], jeddah: [21.4858, 39.1925],
  mecca: [21.3891, 39.8579], makkah: [21.3891, 39.8579], medina: [24.5247, 39.5692], madinah: [24.5247, 39.5692], dammam: [26.4207, 50.0888], khobar: [26.2172, 50.1971],
  abha: [18.2465, 42.5117], taif: [21.2703, 40.4158], alula: [26.6085, 37.9232], cairo: [30.0444, 31.2357], giza: [30.0131, 31.2089], alexandria: [31.2001, 29.9187],
  'sharm el sheikh': [27.9158, 34.3299], hurghada: [27.2579, 33.8116], luxor: [25.6872, 32.6396], doha: [25.2854, 51.531], manama: [26.2285, 50.586], kuwait: [29.3759, 47.9774],
  muscat: [23.588, 58.3829], amman: [31.9454, 35.9284], beirut: [33.8938, 35.5018], istanbul: [41.0082, 28.9784], bursa: [40.1885, 29.061], trabzon: [41.0027, 39.7168],
  antalya: [36.8969, 30.7133], london: [51.5074, -0.1278], paris: [48.8566, 2.3522], rome: [41.9028, 12.4964], milan: [45.4642, 9.19], barcelona: [41.3851, 2.1734],
  madrid: [40.4168, -3.7038], vienna: [48.2082, 16.3738], geneva: [46.2044, 6.1432], zurich: [47.3769, 8.5417], interlaken: [46.6863, 7.8632], munich: [48.1351, 11.582],
  'kuala lumpur': [3.139, 101.6869], langkawi: [6.35, 99.8], penang: [5.4141, 100.3288], bali: [-8.3405, 115.092], bangkok: [13.7563, 100.5018], phuket: [7.8804, 98.3923],
  singapore: [1.3521, 103.8198], tbilisi: [41.7151, 44.8271], baku: [40.4093, 49.8671], male: [4.1755, 73.5093], maldives: [3.2028, 73.2207], 'new york': [40.7128, -74.006], tokyo: [35.6762, 139.6503]
};
const dspCityKey = o => String(o.city || '').toLowerCase().replace(/\(.*?\)/g, '').trim();
const DSP_AR = { 'دبي': 'dubai', 'أبوظبي': 'abu dhabi', 'ابوظبي': 'abu dhabi', 'أبو ظبي': 'abu dhabi', 'الشارقة': 'sharjah', 'الرياض': 'riyadh', 'جدة': 'jeddah', 'جده': 'jeddah', 'مكة': 'makkah', 'مكه': 'makkah', 'المدينة': 'madinah', 'الدمام': 'dammam', 'الخبر': 'khobar', 'أبها': 'abha', 'ابها': 'abha', 'الطائف': 'taif', 'العلا': 'alula', 'القاهرة': 'cairo', 'الإسكندرية': 'alexandria', 'اسكندرية': 'alexandria', 'شرم': 'sharm el sheikh', 'الغردقة': 'hurghada', 'الأقصر': 'luxor', 'الدوحة': 'doha', 'المنامة': 'manama', 'البحرين': 'manama', 'الكويت': 'kuwait', 'مسقط': 'muscat', 'عمّان': 'amman', 'بيروت': 'beirut', 'إسطنبول': 'istanbul', 'اسطنبول': 'istanbul', 'بورصة': 'bursa', 'طرابزون': 'trabzon', 'أنطاليا': 'antalya', 'انطاليا': 'antalya', 'لندن': 'london', 'باريس': 'paris', 'روما': 'rome', 'ميلان': 'milan', 'برشلونة': 'barcelona', 'مدريد': 'madrid', 'فيينا': 'vienna', 'جنيف': 'geneva', 'زيورخ': 'zurich', 'انترلاكن': 'interlaken', 'ميونخ': 'munich', 'كوالالمبور': 'kuala lumpur', 'لنكاوي': 'langkawi', 'بينانج': 'penang', 'بالي': 'bali', 'بانكوك': 'bangkok', 'بوكيت': 'phuket', 'سنغافورة': 'singapore', 'تبليسي': 'tbilisi', 'باكو': 'baku', 'المالديف': 'maldives', 'نيويورك': 'new york', 'طوكيو': 'tokyo' };
const DSP_EN_KEYS = Object.keys(DSP_CITIES).sort((a, b) => b.length - a.length);
// The order feed often has no city: find it in the hotel name or the customer's words.
function dspCityOf(o) {
  const k = dspCityKey(o); if (DSP_CITIES[k]) return k;
  const txt = [o.hotel, o.request_text, o.last_reply].filter(Boolean).join(' ');
  const low = txt.toLowerCase();
  for (const c of DSP_EN_KEYS) if (new RegExp('\\b' + c + '\\b').test(low)) return c;
  for (const a in DSP_AR) if (txt.includes(a)) return DSP_AR[a];
  return '';
}
const dspCityName = k => k.replace(/\b\w/g, m => m.toUpperCase());
function dspMapCard() {
  if (!window.LeafletLib) return '';
  return `<div class="card" style="padding:12px 14px"><div class="row between"><div><b>${t('dp_mapTitle')}</b><div class="tiny muted">${t('dp_mapHint')}</div></div></div>
    <div id="dsp-map" style="height:360px;border-radius:12px;margin-top:10px;overflow:hidden"></div></div>`;
}
function dspDrawMap(orders) {
  const el = document.getElementById('dsp-map'); const LL = window.LeafletLib; if (!el || !LL) return;
  if (!DSP.map || DSP.map.getContainer() !== el) {
    DSP.map = LL.map(el, { zoomControl: true, attributionControl: true, worldCopyJump: true }).setView([24, 48], 3);
    LL.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(DSP.map);
    DSP.layer = LL.layerGroup().addTo(DSP.map);
  }
  DSP.layer.clearLayers();
  const groups = {};
  for (const o of orders) { const k = dspCityOf(o); const c = DSP_CITIES[k]; if (!c) continue; (groups[k] = groups[k] || { c, n: 0, fresh: 0, name: o.city || dspCityName(k) }).n++; if (Date.now() - (Date.parse(o.updated_at) || 0) < 30 * 60000) groups[k].fresh++; }
  for (const g of Object.values(groups)) {
    const r = Math.min(26, 7 + Math.sqrt(g.n) * 4);
    const icon = LL.divIcon({ className: '', html: `<div class="dsp-dot ${g.fresh ? 'pulse' : ''}" style="width:${r * 2}px;height:${r * 2}px"><span>${g.n}</span></div>`, iconSize: [r * 2, r * 2], iconAnchor: [r, r] });
    LL.marker(g.c, { icon }).bindTooltip(`${esc(g.name)} · ${g.n}`).addTo(DSP.layer);
  }
  setTimeout(() => DSP.map && DSP.map.invalidateSize(), 50);
}

/* ---------- Order detail panel ---------- */
function dspDetailPanel(o) {
  const r = DSP.rows[o.request_id]; const st = dspState(o);
  const log = ((r && r.history && r.history.log) || []).slice().reverse().slice(0, 6);
  const canEdit = can('edit');
  return `<div class="card" style="padding:12px 14px;margin-top:12px"><div class="row between" style="flex-wrap:wrap;gap:8px">
      <div><b>${r && r.staff_id ? (r.accepted_at ? t('dp_acceptedBy', { n: esc(dspStaffName(r.staff_id)) }) : t('dp_assignedTo', { n: esc(dspStaffName(r.staff_id)) })) : t('dp_unassigned')}</b>${st.sub && !(r && r.accepted_at) ? ` <span class="tiny dsp ${st.cls}">${esc(st.sub)}</span>` : ''}
        ${log.length ? `<div class="tiny muted">${t('dp_history')}: ${log.map(l => `${esc(dspStaffName(l.s))} (${t('dp_by_' + l.by)})`).join(' ← ')}</div>` : ''}</div>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        ${canEdit && r && !r.accepted_at ? `<button class="btn primary sm" data-act="dspAccept" data-id="${esc(o.request_id)}">${ic('check', 'sm')} ${t('dp_accept')}</button>` : ''}
        ${canEdit ? `<select class="inp sm" id="dsp-re" style="width:auto"><option value="">${r && r.staff_id ? t('dp_reassign') : t('dp_assign')}…</option>${DSP_STAFF().filter(s => !r || s.id !== r.staff_id).map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}${r && r.staff_id ? `<option value="__none__">✕ ${t('dp_unassign')}</option>` : ''}</select>` : ''}
        ${canEdit ? `<button class="btn sm" data-act="dspQuote" data-id="${esc(o.request_id)}">${ic('doc', 'sm')} ${t('dp_toQuote')}</button>` : ''}
      </div></div></div>`;
}

/* ---------- Order → branded quote draft ---------- */
function dspParseReply(text) {
  const s = String(text || '');
  const pick = re => { const m = s.match(re); return m ? m[1].trim() : ''; };
  const room = pick(/(?:Room|نوع الغرفة)\s*:\s*([^\n]+)/);
  const meal = pick(/(?:Meals|الوجبات)\s*:\s*([^\n]+)/);
  const total = Number((pick(/(?:Stay total|إجمالي الإقامة)\s*:\s*SAR\s*([\d,.]+)/) || '').replace(/,/g, '')) || 0;
  const hotel = pick(/\*(?:Option|الخيار)\s*\d+\s*\|\s*([^*\n]+)\*/) || pick(/^\*([^*\n|]+)\*\s*$/m);
  return { room, meal, total, hotel };
}
async function dspToQuote(o) {
  const p = dspParseReply(o.last_reply);
  const lang = /[؀-ۿ]/.test(o.request_text || '') ? 'ar' : 'en';
  const q = blankQuote('FIT', lang);
  if (typeof assignRef === 'function' && !(await assignRef(q))) return;
  const nights = o.checkin && o.checkout ? Math.max(1, Math.round((Date.parse(o.checkout) - Date.parse(o.checkin)) / 86400000)) : 1;
  const hotel = o.hotel || p.hotel || '';
  q.title = (hotel || o.city || (lang === 'ar' ? 'عرض فندقي' : 'Hotel offer'));
  q.dest = o.city || (dspCityOf(o) ? dspCityName(dspCityOf(o)) : ''); q.start = o.checkin || q.start; q.nights = nights; q.adults = 2; q.children = 0;
  const board = /BB|breakfast|فطور|افطار/i.test(p.meal) ? 'BB' : /HB|half/i.test(p.meal) ? 'HB' : /FB|full/i.test(p.meal) ? 'FB' : /AI|inclusive/i.test(p.meal) ? 'AI' : 'RO';
  const line = Object.assign(newLine('hotel', q), { name: hotel, city: o.city || (dspCityOf(o) ? dspCityName(dspCityOf(o)) : ''), roomType: p.room, board, nights, rooms: 1 });
  if (p.total) { const perNight = Math.round(p.total / nights); line.rate = perNight; line.rates = { sgl: perNight, dbl: perNight, tpl: perNight, quad: perNight }; }
  q.lines.push(line);
  q.notes = (lang === 'ar' ? 'من طلب واتساب ' : 'From WhatsApp order ') + o.request_id + (o.sender ? ' · +' + o.sender : '');
  S.quotes.unshift(q); if (typeof save === 'function') save();
  closeModal(); toast(t('dp_quoteMade')); openQuote(q.id);
}

async function dspAssign(id, sid) {
  const none = sid === '__none__';
  const r = DSP.rows[id] || { request_id: id, history: {} };
  const log = ((r.history && r.history.log) || []).concat([{ s: none ? null : sid, at: new Date().toISOString(), by: none ? 'unassign' : 'manual' }]).slice(-20);
  await dspSave([{ ...r, request_id: id, staff_id: none ? null : sid, assigned_at: new Date().toISOString(), accepted_at: null, history: { ...(r.history || {}), log } }]);
  toast(none ? t('dp_unassigned_done') : t('dp_saved')); opsPaint();
}
function dspCellEdit(o) {
  if (!can('edit') || DSP_DONE.includes(o.status)) return dspCell(o);
  const r = DSP.rows[o.request_id]; const cur = (r && r.staff_id) || ''; const st = dspState(o);
  return `<div class="dsp ${st.cls}" data-act="dspNoop"><select class="inp sm dsp-sel" data-id="${esc(o.request_id)}" aria-label="${t('dp_staff')}">
    <option value="__none__" ${cur ? '' : 'selected'}>${t('dp_unassigned')}</option>${DSP_STAFF().map(s => `<option value="${s.id}" ${cur === s.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select>${cur && st.sub ? `<div class="tiny">${esc(st.sub)}</div>` : ''}</div>`;
}
document.addEventListener('change', e => { const el = e.target; if (el && el.classList && el.classList.contains('dsp-sel')) dspAssign(el.dataset.id, el.value); });

/* ---------- Hooks into the Orders page ---------- */
(function hook() {
  const _load = opsLoad;
  opsLoad = async function (force) { const r = await _load(force); try { await dspTick(opsOrders()); } catch (e) { console.warn(e); } if (S.ui.view === 'orders') { opsPaint(); } return r; };
  const _body = opsBody;
  opsBody = function () {
    let html = _body();
    if (!OPS.data) return html;
    const all = opsOrders();
    // staff column
    html = html.replace(`<th>${t('oc_status')}</th>`, `<th>${t('oc_status')}</th><th>${t('dp_staff')}</th>`);
    html = html.replace(/(<tr class="click[^"]*" data-act="opsOpen" data-id="([^"]+)"[\s\S]*?<td>(<span class="pill[^<]*<\/span>)<\/td>)/g, (m, all1, id) => { const o = all.find(x => x.request_id === id.replace(/&amp;/g, '&')); return m + (o ? `<td>${dspCellEdit(o)}</td>` : '<td></td>'); });
    html = html.replace('colspan="6" class="empty"', 'colspan="7" class="empty"');
    // "My orders" chip + late KPI
    const mine = all.filter(dspMine).length, late = dspLateCount(all);
    html = html.replace('<div class="chips" role="tablist">', `<div class="chips" role="tablist"><button class="chip ${OPS.f === 'mine' ? 'on' : ''}" data-act="opsF" data-v="mine">${t('dp_mine')} <span class="num muted">${mine}</span></button>`);
    if (late) html = html.replace('<div class="grid g4">', `<div class="warn-box" style="margin-bottom:12px">${ic('alert', 'sm')} ${t('dp_late_k')}: <b>${late}</b></div><div class="grid g4">`);
    if (!dspDuty().length) html = html.replace('<div class="grid g4">', `<div class="warn-box" style="margin-bottom:12px">${ic('alert', 'sm')} ${t('dp_noStaff')}</div><div class="grid g4">`);
    // duty + map above the table
    html = html.replace('<div class="card" style="padding:12px 14px">', dspDutyCard() + '<div class="card" style="padding:12px 14px">');
    setTimeout(() => dspDrawMap(all), 0);
    return html;
  };
  // filter "mine": patch the list filter by wrapping opsBody's data source temporarily
  const _body2 = opsBody;
  opsBody = function () {
    if (!OPS.data || !(OPS.f === 'mine' || String(OPS.f).startsWith('st:'))) return _body2();
    const saved = OPS.data.orders; const f = OPS.f;
    const sid = String(f).slice(3);
    const keep = f === 'mine' ? dspMine : sid === 'none' ? dspUnassignedRecent : (o => !DSP_DONE.includes(o.status) && DSP.rows[o.request_id] && DSP.rows[o.request_id].staff_id === sid);
    OPS.data.orders = saved.filter(keep); OPS.f = 'all';
    try { return _body2().replace(`data-v="all" role="tab" aria-selected="true"`, `data-v="all" role="tab" aria-selected="false"`).replace(/class="chip on" data-act="opsF" data-v="all"/, 'class="chip" data-act="opsF" data-v="all"').replace(`class="chip " data-act="opsF" data-v="mine"`, `class="chip on" data-act="opsF" data-v="mine"`); }
    finally { OPS.data.orders = saved; OPS.f = f; }
  };
  const _detail = opsPaintDetail;
  opsPaintDetail = function () {
    _detail(); const box = document.getElementById('od'); const o = opsOrders().find(x => x.request_id === OPS.sel);
    if (box && o) box.insertAdjacentHTML('afterbegin', dspDetailPanel(o));
    const sel = document.getElementById('dsp-re');
    if (sel) sel.onchange = async () => { if (!sel.value) return; await dspAssign(o.request_id, sel.value); opsPaintDetail(); };
  };
  document.addEventListener('change', e => { if (e.target && e.target.id === 'dsp-me') { try { localStorage.setItem('wejha_me', e.target.value); } catch (x) {} opsPaint(); } });
  Object.assign(ACT, {
    dspNoop: () => { },
    dspView: el => { const v = 'st:' + el.dataset.v; OPS.f = OPS.f === v ? 'all' : v; opsPaint(); },
    dspRelease: el => {
      const sid = el.dataset.v; const ids = opsOrders().filter(o => !DSP_DONE.includes(o.status) && DSP.rows[o.request_id] && DSP.rows[o.request_id].staff_id === sid).map(o => o.request_id);
      confirmBox(t('dp_unassignAllQ', { n: ids.length, s: esc(dspStaffName(sid)) }), async () => {
        const now = new Date().toISOString();
        await dspSave(ids.map(id => { const r = DSP.rows[id]; return { ...r, staff_id: null, accepted_at: null, assigned_at: now, history: { ...(r.history || {}), log: ((r.history && r.history.log) || []).concat([{ s: null, at: now, by: 'unassign' }]).slice(-20) } }; }));
        toast(t('dp_released', { n: ids.length })); opsPaint();
      }, t('dp_unassignAll'));
    },
    dspAutoNow: async () => {
      const ids = opsOrders().filter(dspUnassignedRecent).map(o => o.request_id);
      const meta = DSP.rows.__duty__ || { request_id: '__duty__', staff_id: null, history: { off: [], rr: 0 } };
      const now = new Date().toISOString(); const out = [];
      for (const id of ids) { const sid = dspNext(null, meta.history.rr || 0); if (!sid) break; meta.history.rr = (meta.history.rr || 0) + 1;
        const r = DSP.rows[id] || { request_id: id, history: {} };
        out.push({ ...r, request_id: id, staff_id: sid, assigned_at: now, accepted_at: null, history: { ...(r.history || {}), log: ((r.history && r.history.log) || []).concat([{ s: sid, at: now, by: 'manual' }]).slice(-20) } }); }
      if (!out.length) return toast(t('dp_noStaff'));
      out.push(meta); await dspSave(out); toast(t('dp_autoDone', { n: out.length - 1 })); opsPaint();
    },
    dspAddStaff: () => { location.hash = '#team'; },
    dspAccept: async el => { const r = DSP.rows[el.dataset.id]; if (!r) return; await dspSave([{ ...r, accepted_at: new Date().toISOString() }]); toast(t('dp_saved')); opsPaintDetail(); opsPaint(); },
    dspDuty: async el => { const meta = DSP.rows.__duty__ || { request_id: '__duty__', staff_id: null, history: { off: [], rr: 0 } }; const off = new Set(meta.history.off || []); off.has(el.dataset.v) ? off.delete(el.dataset.v) : off.add(el.dataset.v); await dspSave([{ ...meta, history: { ...meta.history, off: [...off] } }]); opsPaint(); },
    dspQuote: async el => { const o = opsOrders().find(x => x.request_id === el.dataset.id); if (o) await dspToQuote(o); },
  });
})();

/* ---------- Itinerary map: the hotels of a quote, in order, on one map ----------
   Stops come from the quote's hotel lines (the chosen hotel of each choice set, no optional extras).
   Consecutive stays in the same city merge into one stop. City coordinates come from the
   built-in table (dispatch.js) and, for other cities, OpenStreetMap search, cached in the browser. */
const ITIN_TXT = {
  en: { title: 'Your route', nights: n => n === 1 ? '1 night' : n + ' nights', builder: 'Route map', hint: 'Built from the hotels in order. Add a city to each hotel to place it.' },
  ar: { title: 'مسار رحلتك', nights: n => n === 1 ? 'ليلة' : n === 2 ? 'ليلتان' : n + ' ليالٍ', builder: 'خريطة المسار', hint: 'تُبنى من الفنادق بالترتيب. أضف المدينة لكل فندق ليظهر على الخريطة.' }
};
let ITIN_GEO = {};
try { ITIN_GEO = JSON.parse(localStorage.getItem('wejha_geo') || '{}'); } catch (e) { ITIN_GEO = {}; }

function itinStops(q) {
  const stops = [];
  for (const l of q.lines || []) {
    if (l.kind !== 'hotel' || l.optional) continue;
    if (l.choice && l.id !== chosenIn(q, l.choice)) continue;
    const city = String(l.city || '').trim();
    if (!city) continue;
    const last = stops[stops.length - 1];
    if (last && last.city.toLowerCase() === city.toLowerCase()) { last.nights += num(l.nights) || 0; last.hotels.push(l.name); continue; }
    stops.push({ city, nights: num(l.nights) || 0, hotels: [l.name] });
  }
  return stops;
}

function itinKnown(city) {
  const raw = String(city || '').trim(); const low = raw.toLowerCase().split(/[,،(]/)[0].trim();
  if (typeof DSP_CITIES !== 'undefined') {
    if (DSP_CITIES[low]) return DSP_CITIES[low];
    if (typeof DSP_AR !== 'undefined') for (const a in DSP_AR) if (raw.includes(a)) return DSP_CITIES[DSP_AR[a]];
    for (const k in DSP_CITIES) if (new RegExp('\\b' + k + '\\b').test(low)) return DSP_CITIES[k];
  }
  return ITIN_GEO[low] || null;
}

async function itinGeocode(city) {
  const low = String(city).toLowerCase().split(/[,،(]/)[0].trim();
  if (ITIN_GEO[low] !== undefined) return ITIN_GEO[low];
  try {
    const r = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=en&q=' + encodeURIComponent(city));
    const j = await r.json();
    ITIN_GEO[low] = j && j[0] ? [Number(j[0].lat), Number(j[0].lon)] : null;
  } catch (e) { return null; }
  try { localStorage.setItem('wejha_geo', JSON.stringify(ITIN_GEO)); } catch (e) { }
  return ITIN_GEO[low];
}

function itinListHTML(stops, lang) {
  const T = ITIN_TXT[lang] || ITIN_TXT.en;
  return `<div class="itin-list">${stops.map((s, i) => `<span class="itin-stop"><b class="itin-n">${i + 1}</b><span><b>${esc(s.city)}</b><small>${T.nights(s.nights)}</small></span></span>`).join(`<span class="itin-arrow" aria-hidden="true">${lang === 'ar' ? '←' : '→'}</span>`)}</div>`;
}

// Client offer page: only when the trip has at least one placed stay.
function itinSection(q, lang) {
  const stops = itinStops(q); if (!stops.length) return '';
  const T = ITIN_TXT[lang] || ITIN_TXT.en;
  return `<section class="cv-sec"><h2>${T.title}</h2>${itinListHTML(stops, lang)}<div class="itin-map" data-stops="${esc(JSON.stringify(stops))}"></div></section>`;
}

// Quote builder: always shown, so the agent sees the route while adding hotels.
function itinBuilderCard(q) {
  const lang = (S.ui && S.ui.lang) || 'en'; const T = ITIN_TXT[lang] || ITIN_TXT.en;
  const stops = itinStops(q);
  return `<div class="card stack" style="gap:10px"><h3>${T.builder}</h3>${stops.length ? itinListHTML(stops, lang) + `<div class="itin-map" data-stops="${esc(JSON.stringify(stops))}"></div>` : `<p class="tiny muted">${T.hint}</p>`}</div>`;
}

async function itinMount(el) {
  if (el.dataset.on) return; el.dataset.on = '1';
  const LL = window.LeafletLib; if (!LL) { el.remove(); return; }
  let stops = []; try { stops = JSON.parse(el.dataset.stops || '[]'); } catch (e) { }
  const pts = [];
  for (const s of stops) { const c = itinKnown(s.city) || await itinGeocode(s.city); if (c) pts.push({ s, c }); }
  if (!pts.length || !el.isConnected) { el.style.display = 'none'; return; }
  const map = LL.map(el, { scrollWheelZoom: false, attributionControl: true, zoomControl: true });
  LL.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(map);
  const brand = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#0f766e';
  if (pts.length > 1) LL.polyline(pts.map(p => p.c), { color: brand, weight: 3, opacity: .85, dashArray: '6 8' }).addTo(map);
  pts.forEach((p, i) => {
    const icon = LL.divIcon({ className: 'itin-pin', html: `<span style="background:${brand}">${i + 1}</span>`, iconSize: [28, 28], iconAnchor: [14, 14] });
    LL.marker(p.c, { icon }).addTo(map).bindTooltip(`${i + 1}. ${esc(p.s.city)}${p.s.hotels.filter(Boolean).length ? ' · ' + esc(p.s.hotels.filter(Boolean).join(', ')) : ''}`);
  });
  if (pts.length === 1) map.setView(pts[0].c, 10); else map.fitBounds(LL.latLngBounds(pts.map(p => p.c)), { padding: [36, 36], maxZoom: 9 });
  setTimeout(() => map.invalidateSize(), 120);
}

new MutationObserver(() => { document.querySelectorAll('.itin-map:not([data-on])').forEach(itinMount); })
  .observe(document.documentElement, { childList: true, subtree: true });

boot();
