'use client'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { Header } from '../common/layout/Header';
import { Footer } from '../common/layout/Footer';
import { Drawer } from '../common/layout/Drawer';


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
      <div className='p-10'>
        <h1 className="text-black text-center mb-6 text-2xl">안녕하세요 {userInfo ? userInfo.USER_NICKNAME : null} 님</h1>        
      </div>
      
    )
  }

  function fali() {
    return(
      <h1 className="text-black text-center mb-6 text-2xl">.....</h1>
    )
  }

  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden ">
      <Header/>
      {init ?  start() : fali()}
      <div className='flex w-full p-10 flex-col items-center gap-10 text-gray-500'>
        <div className="card w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="card w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="card w-96  shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>

      </div>

      <Drawer/>
      <Footer/>
    </main>
  )
}