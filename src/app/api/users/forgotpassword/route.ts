import { NextRequest } from "next/server";
import { writemail } from "@/helper/mailer";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect()

export async function POST( request:NextRequest) {
    try {
        // console.log(request)
        // console.log(request.cookies.get('token')?.value)
        const reqBody = await request.json();
        const { email, username } = reqBody;
        const isfound = await User.findOne({ email:email ,username:username })
        if (!isfound) {
            return NextResponse.json({ error: "user does not exist" }, { status: 400 })
        }
        // console.log(isfound)
        
        await writemail({email, emailtype: "RESET", userid: isfound._id});
        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}