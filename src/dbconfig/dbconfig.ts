import mongoose from "mongoose";


export async function connect() {
    try{
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGODB_URL environment variable is not defined");
        }
        mongoose.connect(mongoUrl);
        // console.log(mongoUrl);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log('mongodb connected successfully')
        })
        connection.on('error',(err)=>{
            console.log('mogodb connection error'+err)
        })
    }catch(err){
        console.log(err)
    }
}