"use client"
import axios from 'axios'
import { set } from 'mongoose'
import React from 'react'
import { useState } from 'react'

function page() {
    const [username,setusername]=useState('')
    const [email,setemail]=useState('')
    const [sent,setsent]=useState(false)
    const [error,seterror]=useState(false)

    const forgotpassword=async ()=>{
        const data={
            username,
            email
        }
        try {
            axios.post('/api/users/forgotpassword/',data)
            setsent(true)   
        } catch (err) {
            seterror(true)
            console.log(err)
        }finally{
            setemail('')
            setusername('')
        }

    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <input 
            type="email" 
            className="border p-2 rounded"
            onChange={(e) => setemail(e.target.value)} 
            placeholder="email"
        />
        <input 
            type="text" 
            className="border p-2 rounded"
            onChange={(e) => setusername(e.target.value)} 
            placeholder="username" 
        />
        
        <button 
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
            onClick={() => {forgotpassword()}} 
            disabled={sent}
        >
            submit
        </button>

        <div className="text-center">
            <h2 className='text-green-700'>{sent ? "email sent" : ""}</h2>
            <h2 className='text-red-700' >{error ? "error occurred" : ""}</h2>
        </div>
    </div>
    )
}

export default page