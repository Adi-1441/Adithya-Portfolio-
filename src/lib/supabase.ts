import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve environment variables safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate whether real Supabase configuration is present
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-ref')
);

// Instantiate Supabase client safely
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * Diagnostic helper to report configuration status without leaking keys
 */
export function getSupabaseConfigStatus(): {
  isConfigured: boolean;
  hasUrl: boolean;
  hasKey: boolean;
  urlHost?: string;
} {
  let urlHost: string | undefined;
  try {
    if (supabaseUrl) {
      const parsed = new URL(supabaseUrl);
      urlHost = parsed.hostname;
    }
  } catch {
    urlHost = 'invalid-url';
  }

  return {
    isConfigured: isSupabaseConfigured,
    hasUrl: Boolean(supabaseUrl),
    hasKey: Boolean(supabaseAnonKey),
    urlHost,
  };
}
