import config from '@/headcode.config'
import { supabaseAuthCallback } from '@headcode/server'

export const GET = async (request: Request) => {
  const authCallback = supabaseAuthCallback(config.services.supabase)

  return await authCallback.authCallback(request)
}
