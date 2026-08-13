import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fsrylqjerawznqsusbws.supabase.co';
const defaultAnonKey = 'sb_publishable_SNvWJBEnNsvNhKSMv6JBRA_xbtdRtWn';

const getAnonKey = () => {
  const savedKey = typeof window !== 'undefined' ? localStorage.getItem('csys_supabase_anon_key') : null;
  return savedKey || import.meta.env.VITE_SUPABASE_ANON_KEY || defaultAnonKey;
};

export const getSupabaseClient = () => {
  const key = getAnonKey();
  return createClient(supabaseUrl, key);
};

export const supabase = getSupabaseClient();

export const saveSupabaseAnonKey = (newKey) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('csys_supabase_anon_key', newKey.trim());
  }
};
