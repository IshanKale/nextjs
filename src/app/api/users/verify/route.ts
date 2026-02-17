import { writemail } from "@/helper/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log(request)
        const reqBody = await request.json();
        const { email, id } = reqBody;

        await writemail({email, emailtype: "VERIFY", userid: id});
        
        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}