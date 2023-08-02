import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AuthInterface, User } from '../../types'

const supabaseClient = () =>
  createClientComponentClient()

const signIn = async (
  email: string,
  password: string
): Promise<string | null> => {
  const supabase = supabaseClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return error ? error.message : null
}

const signUp = async (
  email: string,
  password: string
): Promise<string | null> => {
  const emailRedirectTo = `${location.origin}/headcode/auth/callback`

  const supabase = supabaseClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
    },
  })

  return error ? error.message : null
}

const signOut = async (): Promise<void> => {
  const supabase = supabaseClient()
  await supabase.auth.signOut()
}

const getUser = async (): Promise<User | null> => {
  const supabase = supabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user ? { id: user.id, email: user.email } : null
}

const SupabaseAuth: AuthInterface = {
  signIn,
  signUp,
  signOut,
  getUser,
}

export default SupabaseAuth
