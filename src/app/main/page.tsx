'use client'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react';
export default function Main() {

  interface UserInfo {
    "ID": 12,
    "USER_EMAIL": string,
    "USER_PHONE": string | null,
    "USER_NICKNAME": string | null,
    "USER_NAME": string,
    "USER_CREATE_DTM": string,
    "PROVIDER_ID": string | null
  }

  let [init, setInit] = useState(false)
  let [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(()=>{
    axios.get("http://localhost:4000/auth/info", { withCredentials: true })
    .then(res => {
      console.log(res.data)
      if(res.data){
        setUserInfo(res.data);
        setInit(true);
        return true;
      }
    })
    .catch((err)=> console.log(err))
  },[])
  

  function start() {
    return(
      <h1 className="text-black text-center mb-6 text-2xl">안녕하세요 {userInfo ? userInfo.USER_NICKNAME : null} 님</h1>
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