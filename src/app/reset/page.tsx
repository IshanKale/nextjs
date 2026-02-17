"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
    const router = useRouter()
    const [pass,setpass]=useState('')
    const [cpass,setcpass]=useState('')
    const [reset,setreset]=useState(false)
    const [error,seterror]=useState(false)
    const [token,setToken]=useState('')



    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        setToken(urlToken || "")
    },[])


    useEffect(()=>{
        if(pass.length>0 && cpass.length>0 && pass===cpass){
            setreset(true)
            seterror(false)
        }else{
            setreset(false)
            seterror(true)
        }
    },[pass,cpass])
    
    const resetpassword=async ()=>{
        try {
           seterror(false)
           const res= await axios.post('/api/users/resetpassword/',{token,pass})
            console.log(res)
            router.push('/login')
        } catch (error) {
            seterror(true)
            console.log(error)
        }
    }

    return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <input 
                className="border p-2 rounded w-64"
                type="password" 
                placeholder="enter your new password" 
                onChange={(e) => setpass(e.target.value)}
            />
            <input 
                className="border p-2 rounded w-64"
                type="password" 
                placeholder="confirm your password" 
                onChange={(e) => setcpass(e.target.value)}
            />
            
            {/* Error message takes up space only if it exists to keep alignment clean */}
            <h4 className="text-red-500 text-sm h-5">
                {error ? "passwords are not same" : ""}
            </h4>
            
            <button 
                className="px-6 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                disabled={!reset} 
                onClick={() => resetpassword()}
            >
                submit
            </button>
        </div>
    </div>
  )
}

export default page