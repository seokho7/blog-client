'use client'
import axios from 'axios'
import Link from 'next/link'
import { FormEvent, useEffect } from 'react';
export default function Home() {
  async function signIn(e : FormEvent) {
    e.preventDefault();
    const userInfo = document.querySelectorAll("input");
    let registerUserInfo : any = {};

    for(let i = 0; i < userInfo.length; i++){
      let curInput = userInfo[i];
      if(curInput.name){
        registerUserInfo[curInput.name] = curInput.value;
      }
    }
    await axios.post("http://localhost:4000/auth/sessionLoginTest", registerUserInfo, { withCredentials: true })
    .then(res => {
      if(res.data) location.replace('/main')
    })
    .catch((err)=> console.log(err))

    return false;
  }
  useEffect(()=>{
    axios.get("http://localhost:4000/auth/sessionAuthTest", { withCredentials: true })
    .then(res => { res.data ? location.replace('/main') : null})
    .catch((err)=> console.log(err))
  },[])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-black text-center mb-6 text-2xl">로그인</h1>
      <form onSubmit={signIn} className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text text-black">이메일</span>
        </label>
        <input name="USER_EMAIL" type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="example@naver.com"/>
        <label className="label">
          <span className="label-text text-black">비밀번호</span>
        </label>
        <input name="USER_PW" type="password" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="******" minLength={8} maxLength={20}/>
        <div className="form-control">
          <label className="cursor-pointer label justify-normal">
            <input type="checkbox" className="checkbox checkbox-accent mr-2" />
            <span className="label-text text-gray-500">이메일 저장</span>
          </label>
        </div>
        <button className="btn btn-outline btn-success mt-6">로그인</button>
      </form>

      <div className="form-control w-full max-w-xs">
        <div className="text-xs flex justify-around mt-6">
          <Link href={'/'} className="text-black text-gray-500">이메일 찾기</Link>
          <p className="text-gray-500 ">|</p>
          <Link href={'/'} className="text-black text-gray-500">비밀번호 찾기</Link>
          <p className="text-gray-500 ">|</p>
          <Link href={'/sign-up'} className="text-black text-gray-500">회원가입</Link>
        </div>
      </div>
      <div className="text-neutral-content absolute left-0 bottom-10 flex justify-center w-full">
        <small>&copy; Seokho Got Corp</small>
      </div>
    </main>
  )
}