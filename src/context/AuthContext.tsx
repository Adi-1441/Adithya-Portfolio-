// ==============================================================================
// AUTHENTICATION CONTEXT & SESSION PROVIDER
// ==============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AuthState } from '../types/auth';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_SESSION_KEY = 'adithya_admin_auth_session_v2';
// In local standalone mode (when Supabase URL is not configured yet in .env),
// we enforce a strict single verified administrator credential.
// No arbitrary passwords or length >= 6 hacks allowed!
const LOCAL_VERIFIED_ADMIN = {
  email: 'adithyag.eng@gmail.com',
  // Standard development administrator password for local testing before connecting remote Supabase instance
  password: 'AdithyaMech2025!AdminSecure',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeAuth() {
      setIsLoading(true);
      try {
        if (isSupabaseConfigured && supabase) {
          // 1. Supabase Session Check
          const { data, error: sessionError } = await supabase.auth.getSession();
          if (sessionError) {
            console.error('Supabase session retrieval error:', sessionError);
            setUser(null);
            setSessionToken(null);
          } else if (data.session?.user) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email || 'admin@portfolio.local',
              role: 'admin',
              lastSignIn: data.session.user.last_sign_in_at,
            });
            setSessionToken(data.session.access_token);
          }

          // Listen for session state changes
          const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              setUser({
                id: session.user.id,
                email: session.user.email || 'admin@portfolio.local',
                role: 'admin',
                lastSignIn: session.user.last_sign_in_at,
              });
              setSessionToken(session.access_token);
            } else {
              setUser(null);
              setSessionToken(null);
            }
          });

          return () => {
            authListener.subscription.unsubscribe();
          };
        } else {
          // 2. Local Standalone Session Check
          const stored = localStorage.getItem(LOCAL_SESSION_KEY);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed && parsed.email === LOCAL_VERIFIED_ADMIN.email && parsed.token) {
                setUser({
                  id: 'admin-local-verified',
                  email: parsed.email,
                  role: 'admin',
                  lastSignIn: parsed.createdAt,
                });
                setSessionToken(parsed.token);
              } else {
                localStorage.removeItem(LOCAL_SESSION_KEY);
              }
            } catch {
              localStorage.removeItem(LOCAL_SESSION_KEY);
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);
    setIsLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail || !password) {
        const msg = 'Please enter both administrator email and password.';
        setError(msg);
        setIsLoading(false);
        return { success: false, error: msg };
      }

      // 1. SUPABASE AUTHENTICATION
      if (isSupabaseConfigured && supabase) {
        const { data, error: authErr } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });

        if (authErr || !data.user) {
          const msg = authErr?.message || 'Invalid administrator login credentials.';
          setError(msg);
          setIsLoading(false);
          return { success: false, error: msg };
        }

        setUser({
          id: data.user.id,
          email: data.user.email || cleanEmail,
          role: 'admin',
          lastSignIn: data.user.last_sign_in_at,
        });
        setSessionToken(data.session?.access_token || 'supabase-token');
        setIsLoading(false);
        return { success: true };
      }

      // 2. LOCAL STANDALONE AUTHENTICATION (STRICT CHECK - NO ARBITRARY PASSWORDS)
      if (
        cleanEmail === LOCAL_VERIFIED_ADMIN.email.toLowerCase() &&
        password === LOCAL_VERIFIED_ADMIN.password
      ) {
        const token = `adm_token_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
        const sessionPayload = {
          email: cleanEmail,
          token,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionPayload));

        setUser({
          id: 'admin-local-verified',
          email: cleanEmail,
          role: 'admin',
          lastSignIn: sessionPayload.createdAt,
        });
        setSessionToken(token);
        setIsLoading(false);
        return { success: true };
      } else {
        // Reject with explicit error
        const msg = 'Invalid administrator credentials. Authentication failed.';
        setError(msg);
        setIsLoading(false);
        return { success: false, error: msg };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected authentication error occurred.';
      setError(msg);
      setIsLoading(false);
      return { success: false, error: msg };
    }
  };

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem(LOCAL_SESSION_KEY);
      setUser(null);
      setSessionToken(null);
      setError(null);
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    sessionToken,
    isLoading,
    isAuthenticated: Boolean(user && sessionToken),
    error,
    isConfigured: isSupabaseConfigured,
    signIn,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
