import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import axios from 'axios'

export async function proxy(request: NextRequest) {
    const token= request.cookies.get('token')?.value ||""
    
    const ispublic=(request.nextUrl.pathname=='/signup' || request.nextUrl.pathname=='/login' )
    if(!ispublic &&token){
        try {
          const data:any = jwt.verify(token,process.env.TOKEN_SECRET!)
          console.log(data)
          
        } catch (error) {
          if(error instanceof jwt.TokenExpiredError){
            console.log("token expired") 
            const res= NextResponse.redirect(new URL('/login', request.nextUrl))
            res.cookies.delete('token')
            return res
          }
        }
      }
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