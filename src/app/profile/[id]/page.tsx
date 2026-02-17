"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import React, { use, useState } from "react";


function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [send,setsend]=useState(false)

  const searchParams = useSearchParams();
  const verified = searchParams.get('verified') == "true" ? true : false 

  console.log(verified)

  const sendmail=async (email:any)=>{
    const res =await axios.post('/api/users/verify',{ email, id })
    setsend(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div>page {id}</div>
        <button 
          className="px-4 py-2 bg-green-600 rounded disabled:opacity-50" 
          disabled={(send || verified)} 
          onClick={() => sendmail("one@gmail.com")}
        >
          verify mail
        </button>
        <h1>
          {send ? "email sent check your inbox" : ""}
        </h1>
        <h1>
          {verified ? "user already verified" : ""}
        </h1>
      </div>
    </div>
  );
}

export default page;