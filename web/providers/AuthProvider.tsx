"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";

type AuthUser = any | null;

type AuthContextValue = {
  user: AuthUser;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function rootBaseURL() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return base.replace(/\/api$/, "");
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const bootstrapped = useRef(false);

  async function refreshUser() {
    try {
      const { data } = await api.get("/user");
      setUser(data || null);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    (async () => {
      await refreshUser();
      setLoading(false);
    })();
  }, []);

  async function login(email: string, password: string) {
    await api.get("/sanctum/csrf-cookie", { baseURL: rootBaseURL() });
    await api.post(
      "/login",
      { email, password },
      { baseURL: rootBaseURL() }
    );
    await refreshUser();
  }

  async function logout() {
    await api.post("/logout", {}, { baseURL: rootBaseURL() });
    setUser(null);
  }

  const value: AuthContextValue = { user, loading, login, logout, refreshUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
}