"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthTokens, LoginCredentials, AuthState } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = "auth_tokens";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    tokens: null,
  });

  // Load tokens from localStorage on mount
  useEffect(() => {
    const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedTokens) {
      try {
        const tokens: AuthTokens = JSON.parse(storedTokens);
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          tokens,
        });
      } catch {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          tokens: null,
        });
      }
    } else {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        tokens: null,
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Invalid username or password");
    }

    const tokens: AuthTokens = await response.json();
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
    setAuthState({
      isAuthenticated: true,
      isLoading: false,
      tokens,
    });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      tokens: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Helper function to get the current access token
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!storedTokens) return null;
  try {
    const tokens: AuthTokens = JSON.parse(storedTokens);
    return tokens.access;
  } catch {
    return null;
  }
}
