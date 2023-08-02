import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { AuthCallbackInterface } from '../../types'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const authCallback = async (request: Request): Promise<NextResponse> => {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const supabase = createServerComponentClient({ cookies })

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect('/headcode/login')
}

const SupabaseAuthCallback: AuthCallbackInterface = {
  authCallback,
}

export default SupabaseAuthCallback
