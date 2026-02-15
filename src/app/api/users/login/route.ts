import {connect} from '@/dbconfig/dbconfig'
import bcrypt from 'bcryptjs'
import User from "@/models/userModel";
import { NextRequest,NextResponse } from 'next/server';
import { error } from 'console';
import { sign } from 'jsonwebtoken'

connect()

export async function POST(req:NextRequest) {
    try {
        const reqbody=await req.json()
        const {email,password}=reqbody
        const isfound=await User.findOne({email})
        if(!isfound){
            return NextResponse.json({error:"user does not exist"},{status:400})
        }
        // console.log(isfound,reqbody)
        
        const validPassword=await bcrypt.compare(reqbody.password,isfound.password)
        // console.log(validPassword)
        if(!validPassword){
            return NextResponse.json({error:"wrong password"},{status:400})
        }
        const tokenData={
            id:isfound._id,
            username:isfound.username,
            email:isfound.email
        }
        // console.log(tokenData)
        // console.log(process.env.TOKEN_SECRET)
        const token = sign(tokenData, process.env.TOKEN_SECRET as string, { expiresIn: '1h' })
        // console.log(token)
        const response=NextResponse.json({
            message:"login successfull",
            success:true,
        })
        response.cookies.set("token",token,{httpOnly:true,sameSite: 'lax',path: '/',})
        return response;
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}