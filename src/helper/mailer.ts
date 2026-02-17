import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";


export async function writemail({email, emailtype, userid}:any) {
    const hashedtoken=await bcrypt.hash(userid.toString(),10)

    console.log(process.env.DOMAIN)
    console.log(hashedtoken)
    console.log(email,emailtype,userid)
    const domain=process.env.DOMAIN
    if(emailtype==='VERIFY'){
        await User.findOneAndUpdate({_id:userid},{
            verifyToken:hashedtoken,
            verifyTokenExpiry:Date.now()+3600000
        })
    }
    if(emailtype==='RESET'){
        console.log('updating token')
        await User.findOneAndUpdate({_id:userid},{
            forgotPasswordToken:hashedtoken,
            forgotPasswordTokenExpiry:Date.now()+3600000
        })
    }
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: email,
        subject: `Hello ,${emailtype==="VERIFY"?"verify your email":"reset your password"}`,
        text: `click on the link to ${emailtype==="VERIFY"?"verify your mail":"update the password"} (link will be activated for 1 hour)
        link-${domain}/verifymail?token=${hashedtoken}`
        ,html: `${emailtype==="VERIFY"?`<a href="${process.env.DOMAIN}/verifymail?token=${hashedtoken}">click here</a>`:`<a href="${process.env.DOMAIN}/reset?token=${hashedtoken}">click here</a>`}`,
    });
    
}