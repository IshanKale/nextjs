import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const ispublic=(request.nextUrl.pathname=='/signup' || request.nextUrl.pathname=='/login' )
    const token= request.cookies.get('token')?.value ||""
    if(ispublic && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
    if(!ispublic && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/profile',
    '/signup',
    '/verifymail'
  ],
}