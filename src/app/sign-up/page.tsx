'use client'
import axios from 'axios'
import Link from 'next/link'
import { FormEvent } from 'react';
interface signUpDto {
  "USER_EMAIL" : string,
  "USER_PW" : string,
  "USER_PHONE" : string,
  "USER_NICKNAME" : string,
  "USER_NAME" : string
}
export default function SignUp() {

  async function signUp(e : FormEvent) : Promise<boolean>{
    e.preventDefault();
    const userInfo = document.querySelectorAll("input");
    let registerUserInfo : any = {};

    for(let i = 0; i < userInfo.length; i++){
      let curInput = userInfo[i];
      if(curInput.name){
        registerUserInfo[curInput.name] = curInput.value;
      }
    }
    
    await axios.post("http://localhost:4000/auth/register", registerUserInfo )
    .then(res => {
      if(res.status === 201){
        location.replace('/');
      }
    })
    .catch((err)=> console.log(err))
    return false;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-black text-center mb-6 text-2xl">회원가입</h1>
      <form className='form-control w-full max-w-xs' onSubmit={signUp}>
        <label className="label">
          <span className="label-text text-black">이메일</span>
        </label>
        <input name='USER_EMAIL' type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="example@naver.com" />

        <label className="label">
          <span className="label-text text-black">비밀번호</span>
        </label>
        <input name='USER_PW' type="password" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="******" minLength={8} maxLength={20}/>

        <label className="label">
          <span className="label-text text-black">비밀번호 확인</span>
        </label>
        <input type="password" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="******" minLength={8} maxLength={20}/>

        <label className="label">
          <span className="label-text text-black">이름</span>
        </label>
        <input name='USER_NAME' type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" maxLength={20}/>

        <label className="label">
          <span className="label-text text-black">휴대폰</span>
        </label>
        <input name='USER_PHONE' type="number" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" maxLength={11}/>

        <label className="label">
          <span className="label-text text-black">닉네임</span>
        </label>
        <input name='USER_NICKNAME' type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" maxLength={10}/>

        <button className="btn btn-outline btn-success mt-8">회원가입</button>

      </form>
      <div className="text-xs flex justify-around mt-6">
        <Link href={'/sign-in'} className="text-black text-gray-500">로그인 하기</Link>
      </div>
      <div className="text-neutral-content absolute left-0 bottom-10 flex justify-center w-full">
        <small>&copy; Seokho Got Corp</small>
      </div>
    </main>
  )
}