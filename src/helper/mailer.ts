import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";


export async function writemail([email,emailtype,userid]:any) {
    const hashedtoken=await bcrypt.hash(userid.toString(),10)

    console.log(process.env.DOMAIN)
    console.log(hashedtoken)
    const domain=process.env.DOMAIN
    if(emailtype==='VERIFY'){
        await User.findOneAndUpdate({_id:userid},{
            verifyToken:hashedtoken,
            verifyTokenExpiry:Date.now()+3600000
        })
    }
    if(emailtype==='RESET'){
        await User.findOneAndUpdate({_id:userid},{
            ResetToken:hashedtoken,
            ResetTokenExpiry:Date.now()+3600000
        })
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'kyler.lakin@ethereal.email',
            pass: '29a36Z3GYfam71CkBA'
        }
    });
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: email,
        subject: "Hello ,verify your email",
        text: `click on the link to ${emailtype==="verify"?"verify your mail":"update the password"} (link witll be activated for 1 hour)
        link-${domain}/verifymail?token=${hashedtoken}
        `, 
        html: `<a href="${process.env.DOMAIN}/verifymail?token=${encodeURIComponent(hashedtoken)}">click here</a>`,
    });
    
}