import { connect } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request : NextRequest) {
    try {
        const user =await getDataFromToken(request)
        const isfound = await User.findOne({_id:user._id}).select('-password')
        return NextResponse.json({
            message:"user found",
            data:user
        },{
            status:200
        })
    } catch (error) {
        
    }
}