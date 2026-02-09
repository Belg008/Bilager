import { createClient } from '@supabase/supabase-js'

// ⚠️ VIKTIG: Legg inn dine Supabase credentials her!
const supabaseUrl = 'https://cgdissrzxzywdldhhlhp.supabase.co'  // <-- Bytt ut med din Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnZGlzc3J6eHp5d2RsZGhobGhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NTIxNzIsImV4cCI6MjA4NjIyODE3Mn0.p9E4m8CPv1jzqItXCTJyxJcx3bQYHm7IZZC0EP9vsg4'  // <-- Bytt ut med din anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
