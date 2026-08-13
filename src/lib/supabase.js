import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fsrylqjerawznqsusbws.supabase.co';

const getAnonKey = () => {
  const savedKey = typeof window !== 'undefined' ? localStorage.getItem('csys_supabase_anon_key') : null;
  return savedKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
};

export const getSupabaseClient = () => {
  const key = getAnonKey();
  return createClient(supabaseUrl, key || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy');
};

export const supabase = getSupabaseClient();

export const saveSupabaseAnonKey = (newKey) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('csys_supabase_anon_key', newKey.trim());
  }
};
