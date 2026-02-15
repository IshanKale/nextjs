"use client"

// import React from "react"
import { useState } from "react"
import  Link  from "next/link"
import toast from "react-hot-toast"
import { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/navigation"

export default function (){
    const router=useRouter()
    const [user,setuser]=useState({
        email:"",
        password:"",
    })
    const [loading ,setloading]=useState(false)
    const [disablebtn,setdisablebtn]=useState(true)

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setdisablebtn(false)
        }
    },[user])

    const onlogin=async()=>{
        try {
            setloading(true)
            const res=await axios.post('/api/users/login/',user)
            if(res.status===400){
                toast.error(res.data.error)
            } 
            else{
                console.log(res)
                toast.success("login successfull")
                router.push(`/profile/`)
            }
        } catch (error:any) {
            console.log("login failded",error)
            toast.error(error.message)
        }finally{
            setloading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 w-full max-w-xs mx-auto">
            <h1>{loading?"LOADING":'LOGIN'}</h1>
            <label htmlFor="email" className="text-left w-full">email :</label>
            <input className="p-2 border rounded w-full" placeholder="email" id="email" type="text" onChange={(e: any) => setuser({ ...user, email: e.target.value })}/>
            <label htmlFor="password" className="text-left w-full" >password :</label>
            <input
                className="p-2 border rounded w-full"
                type="password"
                name=""
                id="password"
                onChange={(e: any) => setuser({ ...user, password: e.target.value })}
            />
            <button className="p-2 rounded border w-full" onClick={onlogin} disabled={disablebtn}>signup</button>
            <Link href="/signup"> visit signup page</Link>
        </div>
    )
}