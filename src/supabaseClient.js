import { createClient } from '@supabase/supabase-js'

// ⚠️ VIKTIG: Legg inn dine Supabase credentials her!
const supabaseUrl = 'https://XXXXXXXX.supabase.co'  // <-- Bytt ut med din Supabase URL
const supabaseAnonKey = 'eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'  // <-- Bytt ut med din anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
