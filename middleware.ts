import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const url = new URL(request.url)
  const pathname = url.pathname.replace(/\/$/, '')

  const publicPaths = [
    '/learn/fan_meeting',
    '/learn/dating',
    '/learn/workplace',
    '/learn/fan_meeting/FM_001',
    '/learn/dating/DT_001',
    '/learn/workplace/BM_001'
  ]

  const isPublic = publicPaths.includes(pathname)

  if (!user && !isPublic) {
    return NextResponse.redirect(new URL('/?message=login_required', request.url))
  }

  return response
}

export const config = {
  matcher: ['/learn/:path*'],
}
