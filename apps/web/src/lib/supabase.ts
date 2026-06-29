import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function buildSupabasePublicUrl(
  bucket: string,
  filePath: string,
  fallback: string,
) {
  if (!supabaseUrl) {
    return fallback;
  }

  const cleanBucket = bucket.replace(/^\/+|\/+$/g, '');
  const cleanPath = filePath.replace(/^\/+/, '');

  return `${supabaseUrl}/storage/v1/object/public/${cleanBucket}/${cleanPath}`;
}
