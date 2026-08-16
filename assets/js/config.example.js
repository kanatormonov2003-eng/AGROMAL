// Copy to config.js for local use, or generate config.js at deploy time.
// The Supabase anon key is public by design. Never put privileged server credentials here.
window.AGROMAL_CONFIG = Object.freeze({
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
  whatsappVerification: "996XXXXXXXXX",
  whatsappModeration: "996XXXXXXXXX",
  siteUrl: "https://agromal.kg"
});
