import {connect} from '@/dbconfig/dbconfig'
import bcrypt from 'bcryptjs'
import User from "@/models/userModel";
import { NextRequest,NextResponse } from 'next/server';
import { error } from 'console';


connect()

export async function POST(req:NextRequest) {
    try {
        const { username, email, password } = await req.json();
        const findeduser = await User.findOne({ email });
        if (findeduser) {
            return NextResponse.json({ error: "user already exist" }, { status: 200 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const userData = new User({
            username,
            email,
            password: hashed
        });
        try {
            await userData.save();
            return NextResponse.json({ message: "user created successfully" }, { status: 201 });
        } catch (validationError: any) {
            // Return validation errors from Mongoose
            return NextResponse.json({ error: validationError.errors }, { status: 400 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}