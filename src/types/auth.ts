// ==============================================================================
// AUTHENTICATION & SESSION TYPES
// ==============================================================================

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'superadmin' | string;
  lastSignIn?: string;
}

export interface AuthState {
  user: AdminUser | null;
  sessionToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isConfigured: boolean; // Indicates if Supabase URL & Anon Key are set
}
