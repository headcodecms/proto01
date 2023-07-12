import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AuthInterface, SupabaseConfig } from '../../types'

const supabaseAuth = (config: SupabaseConfig): AuthInterface => {
  const supabase = createClientComponentClient({
    supabaseUrl: config.url,
    supabaseKey: config.anon,
  })

  return {
    signIn: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return error ? error.message : null
    },

    signUp: async (email: string, password: string) => {
      const emailRedirectTo = `${location.origin}/headcode/auth/callback`

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
        },
      })

      return error ? error.message : null
    },

    signOut: async () => {
      await supabase.auth.signOut()
    },

    getUser: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      return user ? { id: user.id, email: user.email } : null
    },
  }
}

export default supabaseAuth
