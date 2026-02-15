import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const ispublic=(request.nextUrl.pathname=='/signup' || request.nextUrl.pathname=='/login')
    const token= request.cookies.get('token')?.value ||""
    if(ispublic && token){
        return NextResponse.redirect(new URL('/profile', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/profile',
    '/signup'
  ],
}