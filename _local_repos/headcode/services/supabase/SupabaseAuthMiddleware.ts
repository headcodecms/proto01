import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { Session } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { table, TABLES, ROLES } from '../../utils/db'
import { AuthMiddleware } from '../../types'

const middleware = async ({
  req,
  res,
}: {
  req: NextRequest
  res: NextResponse
}): Promise<string | null> => {
  const pathname = req.nextUrl.pathname
  if (pathname.startsWith('/headcode/error')) return null
  if (pathname === '/headcode' || pathname === '/headcode/admin') {
    return '/headcode/admin/dashboard'
  }

  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (pathname.startsWith('/headcode/login')) {
    return session ? '/headcode/admin/dashboard' : null
  }
  if (pathname.startsWith('/headcode/setup')) {
    if (!session) return '/headcode/login'

    const role = await getRole({ supabase, session })
    if (role) return '/headcode/admin/dashboard'

    return null
  }

  if (!session) return '/headcode/login'

  let role = req.cookies.get(table(TABLES.roles))?.value
  if (role) {
    return role === ROLES.new ? '/headcode/error/denied' : null
  }

  role = await getRole({ supabase, session })
  if (!role) return '/headcode/setup'

  clearCookies({ req, res })
  res.cookies.set(table(TABLES.roles), role)
  res.cookies.set(table('email'), session.user.email!)
  return role === ROLES.new ? '/headcode/error/denied' : null
}

const clearCookies = ({
  req,
  res,
}: {
  req: NextRequest
  res: NextResponse
}) => {
  const cookies = req.cookies.getAll()
  for (let i = 0; i < cookies.length; i++) {
    const name = cookies[i].name
    if (name.endsWith('_roles') || name.endsWith('_email')) {
      res.cookies.delete(name)
    }
  }
}

const getRole = async ({
  supabase,
  session,
}: {
  supabase: any
  session: Session
}) => {
  const { data, error } = await supabase
    .from(table(TABLES.roles))
    .select('*')
    .eq('user_id', session.user.id)

  if (data && data.length === 0) {
    const { insertError } = await supabase.from(table(TABLES.roles)).insert({
      user_id: session.user.id,
      email: session.user.email,
      role: ROLES.new,
    })

    if (insertError) {
      console.error('error adding role', insertError)
      return '/headcode/error'
    }

    return ROLES.new
  } else if (data && data.length === 1) {
    return data[0].role
  } else if (error && error.code !== '42P01') {
    console.log('error getting role', error)
    return null
  }

  return null
}

const SupabaseAuthMiddleware: AuthMiddleware = {
  middleware,
}

export default SupabaseAuthMiddleware
