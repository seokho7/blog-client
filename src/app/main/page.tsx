'use client'
import axios from 'axios'
import Link from 'next/link'
import { useEffect } from 'react';
export default function Main() {
  useEffect(() : void=> {
    async function seokho() {
      axios.get("http://localhost:4000/auth/sessionAuthTest", { withCredentials: true })
      .then(res => console.log(res.data))
      .catch((err)=> console.log(err))
    }
    seokho()
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-black text-center mb-6 text-2xl">메인 페이지 진입!</h1>
    </main>
  )
}