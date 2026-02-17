import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getDataFromToken(request : NextRequest){
    try {
        const token = request.cookies.get('token')?.value || ''
        console.log(request)
        const data:any =jwt.verify(token,process.env.TOKEN_SECRET!)
        return data
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}