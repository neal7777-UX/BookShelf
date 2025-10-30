import { createClient } from '@supabase/supabase-js'

// 後備值（避免 Pages 未注入環境變數時白屏）
const fallbackUrl = 'https://ubdelftsekxrkrirusvk.supabase.co'
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZGVsZnRzZWt4cmtyaXJ1c3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3OTg1MTYsImV4cCI6MjA3NzM3NDUxNn0.sVXO6VMQu3WkSwCkXaelYpuwCV78XtPtVLXJQw0Bv5Q'

function readEnv(name: string): string | undefined {
  try {
    const v = (import.meta as any)?.env?.[name]
    if (typeof v === 'string' && v.trim().length > 0) return v
    return undefined
  } catch (_) {
    return undefined
  }
}

const supabaseUrl: string = readEnv('VITE_SUPABASE_URL') ?? fallbackUrl
const supabaseAnonKey: string = readEnv('VITE_SUPABASE_ANON_KEY') ?? fallbackKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
