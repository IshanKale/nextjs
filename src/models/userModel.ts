import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,'please provide username']   
    },
    email:{
        type:String,
        unique:true,
        required:[true,'please provide email']
    },
    password:{
        type:String,
        required:[true,'please provide password']
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date, 
})
const User=mongoose.models.users || mongoose.model('users',userSchema)
export default User