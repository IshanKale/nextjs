import { connect } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request : NextRequest) {
    try {
        const user =await getDataFromToken(request)
        console.log(user)
        const isfound = await User.findOne({_id:user.id}).select("-password")
        console.log(isfound)
        return NextResponse.json({
            message:"user found",
            data:isfound
        },{
            status:200
        })
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}