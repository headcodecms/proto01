import { NextRequest, NextResponse } from 'next/server'
import { AuthMiddlewareService } from '@headcode/server'

export const config = { matcher: '/headcode/:path*' }

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()

  const redirect = await AuthMiddlewareService.middleware({ req, res })
  if (redirect) {
    return NextResponse.redirect(new URL(redirect, req.url))
  }

  return res
}
