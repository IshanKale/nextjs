"use client"
import axios from "axios";
import { NextRequest } from "next/server";
import React, { use } from "react";


function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const sendmail=async (email:any)=>{
    const res =await axios.post('/api/users/verify',{ email, id })
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>page {id}</div>
      <br />
      <button className="px-4 py-2 bg-green-600 rounded" onClick={()=>sendmail("one@gmail.com")}>verify mail</button>
    </div>
  );
}

export default page;