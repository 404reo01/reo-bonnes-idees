// frontend/src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erreur: Les variables d\'environnement Supabase (VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY) ne sont pas définies.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);