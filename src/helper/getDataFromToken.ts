import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getDataFromToken(request : NextRequest){
    try {
        const token = request.cookies.get('token')?.value || ''

        // console.log(request)
        const data:any =await jwt.verify(token,process.env.TOKEN_SECRET!)

        return data
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}