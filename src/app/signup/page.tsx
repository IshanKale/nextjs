"use client"
import React from "react"
import { useState } from "react"
import  Link  from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"



export default function (){
    const router=useRouter()
    const [user,setuser]=React.useState({
        email: "",
        username:"",
        password:"",
    })
    const [loading,setloading]=useState(false)
    // const [btndisable,setbtndisable]=useState(false)
    const onsignup=async()=>{
        try {
            setloading(true)
            const res= await axios.post("/api/users/signup/",user)
            router.push("/login",res.data)
        } catch (error : any) {
            console.log(error)
            toast.error(error.massage)
        }finally{
            setloading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 w-full max-w-xs mx-auto">
            <h1>{loading?"processing":"SIGN UP"}</h1>
            <label htmlFor="email" className="text-left w-full">email :</label>
            <input className="p-2 border rounded w-full" placeholder="email" id="email" type="email" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setuser({...user,email:e.target.value})}/>
            <label htmlFor="username" className="text-left w-full">username :</label>
            <input className="p-2 border rounded w-full" placeholder="username" id="username" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setuser({...user,username:e.target.value})}/>
            <label htmlFor="password" className="text-left w-full" >password :</label>
            <input
                className="p-2 border rounded w-full"
                type="password"
                name=""
                id="password"
                onChange={(e: any) => setuser({ ...user, password: e.target.value })}
            />
            <button className="p-2 rounded border w-full" onClick={onsignup}>signup</button>
            <Link href="/login"> visit log in page</Link>
        </div>
    )
}