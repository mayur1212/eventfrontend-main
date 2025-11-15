import React, { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext();

const DEFAULT_AVATAR = "https://i.pravatar.cc/300";

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // FIXED: Correct image path builder
  const normalizeProfileImg = (img) => {
    if (!img || typeof img !== "string") return DEFAULT_AVATAR;

    // If already absolute
    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }

    // Remove /api from base URL for image paths
    const BASE = process.env.REACT_APP_API_BASE_URL?.replace("/api", "");

    return `${BASE}${img}`;
  };

  // Central user update function
  const updateUser = useCallback((newUser) => {
    if (!newUser) {
      setUserState(null);
      localStorage.removeItem("user");
      localStorage.setItem("user_updated_at", String(Date.now()));
      return;
    }

    const normalized = {
      ...newUser,
      profileImg: normalizeProfileImg(newUser.profileImg),
    };

    setUserState(normalized);
    localStorage.setItem("user", JSON.stringify(normalized));
    localStorage.setItem("user_updated_at", String(Date.now()));
  }, []);

  // Fetch authenticated user from backend
  const fetchUser = async (token) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();

      updateUser(data.user || data);
    } catch (err) {
      console.error("❌ Fetch user error:", err);
      localStorage.removeItem("token");
      updateUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Load from localStorage first
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        updateUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("user");
      }
    }

    const token = localStorage.getItem("token");
    token ? fetchUser(token) : setLoading(false);
  }, [updateUser]);

  // Sync user across browser tabs
  useEffect(() => {
    const syncUser = () => {
      const saved = localStorage.getItem("user");
      setUserState(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    updateUser(null);
  }, [updateUser]);

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, loading, logout }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
