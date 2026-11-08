// Wejha settings. Copy the two values from Supabase → Project Settings → API.
// The anon (publishable) key is meant to be public: Row Level Security in schema.sql protects the data.
// Leave supabaseUrl empty to run the app in demo mode (data stays in the browser).
window.WEJHA_CONFIG = {
  supabaseUrl: 'https://xyhjdjnyqvdifhpeeoxr.supabase.co',        // e.g. https://abcdefgh.supabase.co
  supabaseAnonKey: 'sb_publishable_PZhcUqVsxH7zgBG107AI7g_yEnxldA1',    // anon / publishable key
  appUrl: 'https://wejha-luxecheck.pages.dev/',             // where the app is hosted, e.g. https://app.wejha.app/  (used in client links and invites)
  liveRatesUrl: '',       // n8n webhook "Wejha request" production URL
  opsDashboardUrl: 'https://luxecheck-operations-raed.coral-root-4783.chatgpt.site/'  // link shown on the Orders page (optional)        // n8n webhook "Wejha request" production URL, e.g. https://n8n.yourdomain.com/webhook/wejha/luxecheck-rates
};
