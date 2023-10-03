'use client'
import axios from 'axios'
import Link from 'next/link'
import { FormEvent, useState, ChangeEvent } from 'react';
import GoogleIcon from "../../../public/google.svg";
import GithubIcon from "../../../public/github-icon.svg";
import ImsiIcon from "../../../public/imsi_icon.png";
import Image from 'next/image';

type sOrn = string | null;
interface signInDto {
  "USER_EMAIL" : sOrn,
  "USER_PW" : sOrn,
}
export default function Home() {

  const [userInfo, setUserInfo] = useState<signInDto>({
    "USER_EMAIL" : "",
    "USER_PW" : "",
  })

  const [authFail, setAuthFail] = useState(false);
  const [rememberEmail, setrememberEmail ] = useState(false);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthFail(false)

    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    })    
  }
  const customSetCookie = (name: string, value?: string, exp?: number) => {
    var date = new Date();
    if(value && exp){
      date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + encodeURI(value) + ';expires=' + date.toUTCString() + ';path=/';
    } 
  }
  const deleteCookie = function(name:string) {
    document.cookie = name + '=' + ';expires=' + new Date(1);
  }
  async function signIn(e : FormEvent) {
    e.preventDefault();
    console.log(userInfo)
    await axios.post("http://localhost:4000/auth/sessionLogin", userInfo, { withCredentials: true })
    .then(res => {
      if(userInfo['USER_EMAIL'] && rememberEmail){
        customSetCookie('userEmail', userInfo['USER_EMAIL'], 7);
      }else{
        deleteCookie('userEmail');
      }
      if(res.data) return location.replace('/main');
    })
    .catch((err)=> {
      if(err.response.status === 401) setAuthFail(true)
    })

    return false;
  }
  
  function test (e:ChangeEvent<HTMLInputElement>) {
    e.target.checked ?  setrememberEmail(true) : setrememberEmail(false)
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-5 pb-5">
      <h1 className="text-black text-center mb-6 text-2xl">로그인</h1>
      <form onSubmit={signIn} className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text text-black">이메일</span>
        </label>
        <input name="USER_EMAIL" type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="example@naver.com" onChange={inputHandler}/>
        <label className="label">
          <span className="label-text text-black">비밀번호</span>
        </label>
        <input name="USER_PW" type="password" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="******" onChange={inputHandler}/>
        <div className="form-control">
          <label className="label justify-normal ">
            <input type="checkbox" className="checkbox checkbox-accent mr-2" onChange={test}/>
            <span className="cursor-pointer label-text text-gray-500">이메일 저장</span>
          </label>
        </div>
        {
         authFail 
         ? 
         <div className="btn btn-error mt-5">이메일과 패스워드를 확인해주세요.</div> 
         : 
         <button className="btn btn-outline btn-success mt-5">로그인</button>
        }
      </form>
      <div className='sub-btn-wrap flex mt-3 justify-around gap-3 w-full max-w-xs'>
        <Link href="http://localhost:4000/auth/to-google" className='btn btn-outline google-btn flex-1'>
          <p><GoogleIcon/></p>
          <p className='ml-1 text-black'>구글 로그인</p>
        </Link>
        <Link href="http://localhost:4000/auth/to-github" className='btn btn-outline google-btn flex-1'>
          <p><GithubIcon/></p>
          <p className='ml-1 text-black'>깃허브 로그인</p>
        </Link>
      </div>
      <div className="form-control w-full max-w-xs">
        <div className="text-xs flex justify-around mt-6">
          <Link href={'/findInfo/email'} className="text-black text-gray-500">이메일 찾기</Link>
          <p className="text-gray-500 ">|</p>
          <Link href={'/findInfo/password'} className="text-black text-gray-500">비밀번호 찾기</Link>
          <p className="text-gray-500 ">|</p>
          <Link href={'/sign-up'} className="text-black text-gray-500">회원가입</Link>
        </div>
      </div>
    </main>
  )
}