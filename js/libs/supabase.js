/*
 * Supabase JavaScript Client (Universal Bundle)
 * This file should contain the pre-compiled @supabase/supabase-js library.
 * For development, please ensure the real library is placed here.
 */
console.warn("Supabase library placeholder loaded. Please replace with actual @supabase/supabase-js bundle.");
window.supabase = {
  createClient: (url, key, options) => {
    console.log("Supabase client created with URL:", url);
    return {
      auth: {
        signInWithIdToken: async (params) => { console.log("Sign in with ID Token", params); return { data: { session: null, user: null }, error: new Error("Library placeholder") }; },
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: (cb) => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: async () => ({ error: null })
      },
      rpc: async (fn, params) => { console.log("RPC call:", fn, params); return { data: null, error: new Error("Library placeholder") }; },
      from: (table) => ({
          select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
          insert: async () => ({ error: null }),
          update: async () => ({ error: null })
      }),
      functions: {
          invoke: async (name, options) => { console.log("Edge Function invoke:", name, options); return { data: null, error: null }; }
      }
    };
  }
};
