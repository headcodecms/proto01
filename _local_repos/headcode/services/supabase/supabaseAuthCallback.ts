import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthCallbackInterface, SupabaseConfig } from "../../types";
import { cookies } from 'next/headers'
import { NextResponse } from "next/server";

const supabaseAuthCallback = (config: SupabaseConfig): AuthCallbackInterface => {
  const supabase = createServerComponentClient(
    { cookies },
    {
      supabaseUrl: config.url,
      supabaseKey: config.anon,
    }
  )

  return {
    authCallback: async (request: Request) => {
      const requestUrl = new URL(request.url)
      const code = requestUrl.searchParams.get('code')

      if (code) {
        await supabase.auth.exchangeCodeForSession(code)
      }

      return NextResponse.redirect('/headcode/login')
    }
  }
}

export default supabaseAuthCallback