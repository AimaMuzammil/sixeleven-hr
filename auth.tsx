import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { employees, type Employee, type Role } from "./mock-data";

interface AuthContextValue {
  user: Employee | null;
  login: (email: string, _password: string) => Promise<Employee>;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "sixeleven-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Employee | null>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (u: Employee | null) => {
    setUser(u);
    if (typeof window === "undefined") return;
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string) => {
    const trimmed = email.trim().toLowerCase();
    let found = employees.find((e) => e.email.toLowerCase() === trimmed);
    if (!found) found = employees[0];
    persist(found);
    return found;
  };

  const logout = () => persist(null);

  const switchRole = (role: Role) => {
    const next = employees.find((e) => e.role === role) ?? employees[0];
    persist(next);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
