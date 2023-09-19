'use client'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react';
export default function Main() {
  let [init, setInit] = useState(false)

  useEffect(()=>{
    axios.get("http://localhost:4000/auth/info", { withCredentials: true })
    .then(res => { res.data === true ? setInit(true) : null})
    .catch((err)=> console.log(err))
  },[])
  

  function start() {
    return(
      <h1 className="text-black text-center mb-6 text-2xl">메인 페이지 진입!</h1>
    )
  }

  function fali() {
    return(
      <h1 className="text-black text-center mb-6 text-2xl">.....</h1>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {init ?  start() : fali()}
    </main>
  )
}