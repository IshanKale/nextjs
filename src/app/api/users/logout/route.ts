import { NextResponse,NextRequest } from "next/server";
export function GET(){
    try {
        const res=NextResponse.json({message:"logout successfull"},{status:200})
        res.cookies.set('token','',{httpOnly:true,expires:new Date(0)})
        return res
    } catch (error) {
        return NextResponse.json({message:"something went wrong"},{status:400})
        console.log('logout unsuccesfull')
    }
}