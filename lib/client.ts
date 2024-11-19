import { createClient } from '@supabase/supabase-js'

let supabase: ReturnType<typeof createClient> | null = null

if (typeof window !== 'undefined') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables:', {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey
    })
  } else {
    try {
      supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      })
      console.log('Supabase client initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error)
    }
  }
}

export { supabase }