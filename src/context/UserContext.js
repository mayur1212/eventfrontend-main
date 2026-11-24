import React, { createContext, useState, useEffect, useCallback } from "react";
import API_BASE_URL, { api, apiError } from "../api";

export const UserContext = createContext();
const normalizeUser = (user) => ({
  ...user,
  profileImg: !user.profileImg ? "" : new URL(user.profileImg, `${API_BASE_URL.replace(/\/api$/, "")}/`).href,
});

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");
  const updateUser = useCallback((value) => {
    const normalized = value ? normalizeUser(value) : null;
    setUserState(normalized);
    if (normalized) localStorage.setItem("user", JSON.stringify(normalized));
    else localStorage.removeItem("user");
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setSessionError("");
    updateUser(null);
  }, [updateUser]);
  const restoreSession = useCallback(async () => {
    setLoading(true); setSessionError("");
    try {
      if (!localStorage.getItem("token")) { updateUser(null); return; }
      const { data } = await api.get("/me");
      updateUser(data.user || data);
    } catch (err) {
      setUserState(null);
      if (err.response?.status === 401 || err.response?.status === 403) logout();
      else setSessionError(apiError(err));
    } finally { setLoading(false); }
  }, [updateUser, logout]);
  useEffect(() => { restoreSession(); }, [restoreSession]);
  useEffect(() => {
    const sync = (event) => {
      if (event.key === "token" || event.key === "user" || event.key === null) restoreSession();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [restoreSession]);
  return <UserContext.Provider value={{ user, setUser: updateUser, loading, logout }}>
    {loading ? <p role="status" className="p-8 text-center">Checking session…</p> : sessionError ? <div className="p-8 text-center space-y-4"><p role="alert">{sessionError}</p><button onClick={restoreSession} className="px-4 py-2 bg-purple-700 text-white rounded">Retry connection</button><button onClick={logout} className="ml-4 underline">Go to login</button></div> : children}
  </UserContext.Provider>;
};
