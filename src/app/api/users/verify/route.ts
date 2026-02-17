import { writemail } from "@/helper/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log(request)
        const reqBody = await request.json();
        const { id , email } = reqBody;
        console.log(email)
        await writemail({email, emailtype: "VERIFY", userid: id});
        
        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}