const SESSION_KEY = "agromal_supabase_session";

function config() {
  const values = window.AGROMAL_CONFIG || {};
  return { ...values, supabaseUrl: String(values.supabaseUrl || "").replace(/\/+$/, "") };
}

export function isConfigured() {
  const { supabaseUrl, supabaseAnonKey } = config();
  if (typeof supabaseAnonKey !== "string" || supabaseAnonKey.length <= 40) return false;
  try {
    const url = new URL(supabaseUrl);
    const local = ["localhost", "127.0.0.1"].includes(url.hostname);
    return (url.protocol === "https:" || (local && url.protocol === "http:")) && !url.pathname.replaceAll("/", "");
  } catch { return false; }
}

export function loginEmail(identifier) {
  const normalized = String(identifier).replace(/\D/g, "");
  if (!/^\d{8,14}$/.test(normalized)) throw new Error("INVALID_IDENTIFIER");
  return `inn.${normalized}@login.agromal.kg`;
}

function readSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); }
  catch { return null; }
}

function storeSession(session) {
  if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else sessionStorage.removeItem(SESSION_KEY);
}

async function parseResponse(response) {
  if (response.status === 204) return null;
  const text = await response.text();
  let body = null;
  if (text) {
    try { body = JSON.parse(text); } catch { body = { message: text }; }
  }
  if (!response.ok) {
    const error = new Error(body?.msg || body?.message || body?.error_description || "REQUEST_FAILED");
    error.status = response.status;
    error.code = body?.code || body?.error;
    throw error;
  }
  return body;
}

function baseHeaders(token, extra = {}) {
  const { supabaseAnonKey } = config();
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${token || supabaseAnonKey}`,
    "Content-Type": "application/json",
    ...extra
  };
}

async function refreshSession(session) {
  const { supabaseUrl, supabaseAnonKey } = config();
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: supabaseAnonKey, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: session.refresh_token })
  });
  const next = await parseResponse(response);
  storeSession(next);
  return next;
}

export async function getValidSession() {
  if (!isConfigured()) return null;
  let session = readSession();
  if (!session?.access_token || !session?.refresh_token) return null;
  const expiresAt = Number(session.expires_at || 0) * 1000;
  if (expiresAt && expiresAt < Date.now() + 60000) {
    try { session = await refreshSession(session); }
    catch { storeSession(null); return null; }
  }
  return session;
}

export async function signIn(identifier, password) {
  if (!isConfigured()) throw new Error("NOT_CONFIGURED");
  const { supabaseUrl, supabaseAnonKey } = config();
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: supabaseAnonKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email: loginEmail(identifier), password })
  });
  const session = await parseResponse(response);
  storeSession(session);
  return session;
}

export async function signOut() {
  const session = readSession();
  storeSession(null);
  if (!session?.access_token || !isConfigured()) return;
  const { supabaseUrl } = config();
  try {
    await fetch(`${supabaseUrl}/auth/v1/logout`, {
      method: "POST",
      headers: baseHeaders(session.access_token)
    });
  } catch { /* Local session is already cleared. */ }
}

export async function getUser() {
  const session = await getValidSession();
  if (!session) return null;
  const { supabaseUrl } = config();
  try {
    return await parseResponse(await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: baseHeaders(session.access_token)
    }));
  } catch {
    storeSession(null);
    return null;
  }
}

export async function db(path, { method = "GET", body, query = "", prefer } = {}) {
  const session = await getValidSession();
  if (!session) {
    const error = new Error("UNAUTHORIZED");
    error.status = 401;
    throw error;
  }
  const { supabaseUrl } = config();
  const headers = baseHeaders(session.access_token, prefer ? { Prefer: prefer } : {});
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}${query}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  return parseResponse(response);
}

export function rpc(name, body = {}) {
  return db(`rpc/${name}`, { method: "POST", body });
}

export async function invokeFunction(name, body) {
  const session = await getValidSession();
  if (!session) throw new Error("UNAUTHORIZED");
  const { supabaseUrl } = config();
  return parseResponse(await fetch(`${supabaseUrl}/functions/v1/${name}`, {
    method: "POST",
    headers: baseHeaders(session.access_token),
    body: JSON.stringify(body)
  }));
}
