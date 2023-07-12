import { NextRequest, NextResponse } from 'next/server'
import { supabaseMiddleware } from '@headcode/server'

export const config = { matcher: '/headcode/:path*' }

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()

  const redirect = await supabaseMiddleware({ req, res })
  if (redirect) {
    return NextResponse.redirect(new URL(redirect, req.url))
  }

  return res
}
