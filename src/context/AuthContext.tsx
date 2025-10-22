'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen:  React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem('authUser');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login (replace with API in future)
    const stored = localStorage.getItem('authUser');
    if (stored) {
      const u = JSON.parse(stored);
      if (u.email === email) {
        setUser(u);
        return true;
      }
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate signup (replace with API in future)
    const newUser = { name, email };
    localStorage.setItem('authUser', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout ,isSidebarOpen, setIsSidebarOpen}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
} 