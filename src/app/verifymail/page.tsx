"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"



export default function verifyemailpage()
{
    const [token ,setToken]=useState('')
    const [Verified ,setVerified]=useState(false)
    const [error ,setError]=useState(false)
    const verifyUserMail=async ()=>{
        try {
            await axios.post('api/users/verifymail/',{token})
            setVerified(true)
        } catch (error) {
            setError(true)
            console.log(error) 
        }
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyUserMail();
        }
    },[token])

    return (
        <>
           <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-2xl font-bold mb-2">verify email</h1>
                
                <h2 className="text-gray-500 mb-4 italic">
                    {token ? `${token}` : "no token"}
                </h2>

                {Verified && (
                    <div className="mt-4">
                        <h2 className="text-green-600 font-semibold mb-2">
                            email Verified
                        </h2>
                        <Link href='/login/' className="text-blue-500 underline hover:text-blue-700">
                            login
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="mt-4">
                        <h2 className="text-red-600 font-semibold">
                            error occurred while verifying email!
                        </h2>
                    </div>
                )}
            </div>  
        </>
    )
}