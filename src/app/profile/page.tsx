"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Router, { useRouter } from 'next/navigation'
import Link from 'next/link'
import { profile } from 'console'
export default function page() {
  const router=useRouter()
  const [data,setdata]=useState('nothing')
  const logout=()=>{
    axios.get('/api/users/logout')
    router.push('/signup')
  }
  const getuserDetails=async ()=>{
    const res= await axios.get('/api/users/me')
    console.log(res)
    setdata(res.data.data.id)

  }
  return (
    <><div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p>profile page</p>
      <br />
      <button onClick={()=>getuserDetails()} className="px-4 py-2 bg-green-600 rounded">getuserDetails</button>
      <p>
        {data==="nothing"? "Nothing" : <Link className='rounded bg-amber-600 px-4 py-2' href={`profile/${data}`}>go to profile</Link>}
      </p>
      <button onClick={()=>logout()} className="px-4 py-2 rounded bg-blue-700">log out</button>
    </div>
    </>
  )
}