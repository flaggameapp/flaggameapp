(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(root);
  } else {
    root.FlagGameSupabase = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : window, function (root) {
  "use strict";

  // Public Configuration (Placeholders - To be configured via manual step)
  const CONFIG = {
  url: "https://kyupoytmphmdbwuvigcu.supabase.co",
  anonKey: "sb_publishable_q6gHDrt__gDxmuLBPrRqGA_BrnySaiW",
  googleWebClientId: "848159149097-v6gjl2vsaq2meevmtq0lqk6b183r402u.apps.googleusercontent.com"
};

  let client = null;

  function getClient() {
    if (!client) {
      if (!root.supabase) {
        throw new Error("Supabase library not loaded. Check index.html script tags.");
      }

      client = root.supabase.createClient(CONFIG.url, CONFIG.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false // Not needed for Android native flow
        }
      });
    }
    return client;
  }

  return {
    get client() {
      return getClient();
    },
    get config() {
      return { ...CONFIG };
    }
  };
});
