(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(root);
  } else {
    root.FlagGameAuth = factory(root);
  }
})(typeof globalThis !== "undefined" ? globalThis : window, function (root) {
  "use strict";

  let authChangeListeners = [];
  let supabaseSubscription = null;
  let isAuthenticating = false;

  // Initialization State
  let isReadyPromise = null;
  let resolveReady = null;

  isReadyPromise = new Promise(resolve => {
    resolveReady = resolve;
    // Safety timeout: resolve after 5s regardless
    setTimeout(resolve, 5000);
  });

  // Cloud Profile State
  let currentCloudProfile = null;
  let profileLoadPromise = null;
  let profileLoadError = null;

  function generateSecureNonce() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  async function sha256Hex(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function sanitizeNickname(name) {
    if (!name) return "";
    // Normalizar Unicode e remover acentos
    let sanitized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Manter apenas A-Z, 0-9, espaços, hifens e underscores
    sanitized = sanitized.replace(/[^a-zA-Z0-9 _-]/g, "");
    // Reduzir espaços consecutivos e trim
    sanitized = sanitized.replace(/\s+/g, " ").trim();
    // Limitar comprimento
    return sanitized.slice(0, 24);
  }

  function validateCountry(code) {
    if (!code || typeof code !== "string") return null;
    const sanitized = code.trim().toUpperCase();
    return sanitized.length === 2 ? sanitized : null;
  }

  function getSupabase() {
    return root.FlagGameSupabase ? root.FlagGameSupabase.client : null;
  }

  function getGoogleAuthPlugin() {
    const capacitor = root.Capacitor;
    if (capacitor && capacitor.Plugins) {
      return capacitor.Plugins.FlagGameGoogleAuth || null;
    }
    return null;
  }

  function getPlayGamesPlugin() {
    const capacitor = root.Capacitor;
    if (capacitor && capacitor.Plugins) {
      return capacitor.Plugins.FlagGamePlayGames || null;
    }
    return null;
  }

  async function signInWithGoogle() {
    if (isAuthenticating) return;

    const plugin = getGoogleAuthPlugin();
    const supabase = getSupabase();
    const config = root.FlagGameSupabase ? root.FlagGameSupabase.config : {};

    if (!plugin || !supabase) {
      throw new Error("Authentication services not available on this platform.");
    }

    isAuthenticating = true;
    let rawNonce = null;

    try {
      // 1. Generate Nonce Pair
      rawNonce = generateSecureNonce();
      const hashedNonce = await sha256Hex(rawNonce);

      console.log("Auth: Starting Google Sign-In", {
          clientId: config.googleWebClientId,
          nonceHash: hashedNonce
      });

      // 2. Get ID Token from native Google Auth using HASHED nonce
      const { idToken } = await plugin.signInWithGoogle({
        serverClientId: config.googleWebClientId,
        nonce: hashedNonce
      });

      // 3. Sign in with Supabase using RAW nonce
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
        nonce: rawNonce
      });

      if (error) throw error;

      // 4. Ensure profile exists on backend
      await ensureCloudProfile();

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      isAuthenticating = false;
      rawNonce = null; // Clear from memory
    }
  }

  async function ensureCloudProfile(forceRefresh) {
    const supabase = getSupabase();
    const user = await getCurrentUser();

    if (!supabase || !user) {
        currentCloudProfile = null;
        profileLoadError = null;
        return null;
    }

    // Se já estiver carregado para o mesmo usuário, retornar cache
    if (!forceRefresh && currentCloudProfile && currentCloudProfile.id === user.id) {
        return currentCloudProfile;
    }

    // Se já houver uma carga em andamento, retornar a mesma promise
    if (profileLoadPromise) return profileLoadPromise;

    profileLoadPromise = (async () => {
        try {
            // 1. Tentar buscar perfil existente
            const { data: profile, error: fetchError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle();

            if (fetchError) throw fetchError;

            if (profile) {
                currentCloudProfile = profile;
                profileLoadError = null;
                return profile;
            }

            // 2. Se não existir, criar perfil inicial (ensure_profile RPC)
            const localPlayer = root.FlagGameRanking ? root.FlagGameRanking.getPlayer() : {};

            let initialNickname = sanitizeNickname(localPlayer.nickname);
            if (initialNickname.length < 3) {
                initialNickname = sanitizeNickname(user.user_metadata.full_name);
            }
            if (initialNickname.length < 3) {
                initialNickname = "Player";
            }

            const initialCountry = validateCountry(localPlayer.country);

            const { data: newProfile, error: rpcError } = await supabase.rpc('ensure_profile', {
                p_nickname: initialNickname,
                p_country: initialCountry
            });

            if (rpcError) throw rpcError;

            currentCloudProfile = newProfile;
            profileLoadError = null;
            return newProfile;

        } catch (err) {
            console.error("Cloud Profile Error:", err.code || "unknown", err.message);
            profileLoadError = "Não foi possível carregar seu perfil online.";
            currentCloudProfile = null;
            throw err;
        } finally {
            profileLoadPromise = null;
            // Notificar listeners de mudança de estado (opcional, mas bom para UI)
            notifyAuthChange("PROFILE_UPDATED", null);
        }
    })();

    return profileLoadPromise;
  }

  function getCloudProfile() {
    return currentCloudProfile;
  }

  async function updateCloudProfile(patch) {
    const supabase = getSupabase();
    const user = await getCurrentUser();

    if (!supabase || !user) {
      throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(patch)
      .eq('id', user.id)
      .select('*')
      .single();

    if (error) throw error;

    currentCloudProfile = data || {
      ...(currentCloudProfile || {}),
      id: user.id,
      ...patch
    };
    profileLoadError = null;
    notifyAuthChange("PROFILE_UPDATED", await getCurrentSession());

    return currentCloudProfile;
  }

  function getProfileError() {
    return profileLoadError;
  }

  function isProfileLoading() {
    return !!profileLoadPromise;
  }

  async function getCurrentSession() {
    const supabase = getSupabase();
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  async function getCurrentUser() {
    const session = await getCurrentSession();
    return session ? session.user : null;
  }

  function isAuthenticated() {
    return getCurrentUser().then(user => !!user);
  }

  async function signOut() {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
      currentCloudProfile = null;
      profileLoadError = null;
      profileLoadPromise = null;
    }
  }

  function notifyAuthChange(event, session) {
    authChangeListeners.forEach(callback => {
        try {
            callback(event, session);
        } catch (e) {
            console.error("Auth callback error:", e);
        }
    });
  }

  function subscribeToAuthChanges(callback) {
    authChangeListeners.push(callback);
    const supabase = getSupabase();
    if (supabase && !supabaseSubscription) {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
            if (session) ensureCloudProfile().finally(resolveReady);
            else resolveReady();
        } else if (event === "SIGNED_OUT") {
            currentCloudProfile = null;
            profileLoadError = null;
            profileLoadPromise = null;
        }
        notifyAuthChange(event, session);
      });
      supabaseSubscription = data && data.subscription ? data.subscription : true;

      // Also check if session is already there
      supabase.auth.getSession().then(({data}) => {
          if (data.session) {
            ensureCloudProfile().finally(resolveReady);
          } else {
            resolveReady();
          }
          callback("INITIAL_SESSION", data.session);
      }).catch(() => {
          resolveReady();
          callback("SESSION_ERROR", null);
      });
    } else {
        resolveReady();
        callback("INITIAL_SESSION", null);
    }
    return () => {
      authChangeListeners = authChangeListeners.filter(l => l !== callback);
    };
  }

  async function isReady() {
      return isReadyPromise;
  }

  async function linkPlayGamesIdentity() {
    const pgPlugin = getPlayGamesPlugin();
    const supabase = getSupabase();
    const config = root.FlagGameSupabase ? root.FlagGameSupabase.config : {};

    if (!pgPlugin || !supabase) return;

    const user = await getCurrentUser();
    if (!user) return;

    try {
      const { serverAuthCode } = await pgPlugin.requestServerSideAccess({
        webClientId: config.googleWebClientId
      });

      const { data, error } = await supabase.functions.invoke('link-play-games-identity', {
        body: { serverAuthCode }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Play Games linking failed:", error);
      throw error;
    }
  }

  return {
    signInWithGoogle,
    getCurrentSession,
    getCurrentUser,
    isAuthenticated,
    signOut,
    subscribeToAuthChanges,
    ensureCloudProfile,
    getCloudProfile,
    getProfileError,
    isProfileLoading,
    isReady,
    updateCloudProfile,
    linkPlayGamesIdentity
  };
});
