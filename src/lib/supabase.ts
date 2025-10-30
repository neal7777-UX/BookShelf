import { createClient } from '@supabase/supabase-js'

// 在部署環境（例如 GitHub Pages）若未正確注入環境變數，避免因為空字串造成執行期白畫面
const fallbackUrl = 'https://ubdelftsekxrkrirusvk.supabase.co'
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZGVsZnRzZWt4cmtyaXJ1c3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3OTg1MTYsImV4cCI6MjA3NzM3NDUxNn0.sVXO6VMQu3WkSwCkXaelYpuwCV78XtPtVLXJQw0Bv5Q'

const envUrl = (import.meta as any)?.env?.VITE_SUPABASE_URL
const envKey = (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY

const supabaseUrl: string = envUrl && typeof envUrl === 'string' && envUrl.length > 0 ? envUrl : fallbackUrl
const supabaseAnonKey: string = envKey && typeof envKey === 'string' && envKey.length > 0 ? envKey : fallbackKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
