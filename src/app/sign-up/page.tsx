'use client'
import axios from 'axios'
import Link from 'next/link'
import { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useState } from 'react';

type sOrn = string | null;

interface signUpDto {
  "USER_EMAIL" : sOrn,
  "USER_PW" : sOrn,
  "USER_PW_CONFIRM": sOrn,
  "USER_PHONE" : sOrn,
  "USER_NICKNAME" : sOrn,
  "USER_NAME" : sOrn
}

export default function SignUp() {

  const [userInfo, setUserInfo] = useState<signUpDto>({
    "USER_EMAIL" : "",
    "USER_PW" : "",
    "USER_PW_CONFIRM": "",
    "USER_PHONE" : "",
    "USER_NICKNAME" : "",
    "USER_NAME" : "",
  })

  const { USER_EMAIL, USER_PW, USER_PW_CONFIRM, USER_PHONE, USER_NICKNAME, USER_NAME } = userInfo;

  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
  const [isName, setIsName] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isNickname, setIsNickname] = useState(true);

  const [lodingState, setLodingState] = useState(false);
  const [smsCodeState, setSmsCodeState] = useState(false);
  
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let curName = e.target.name;
    function sliceValue(length: number) {
      if (e.target.value.length >= length){
        e.target.value = e.target.value.slice(0, length);
      }
    }

    if(curName === 'USER_PW' || curName === 'USER_PW_CONFIRM') sliceValue(25);
    if(curName === 'USER_NAME') sliceValue(20);
    if(curName === 'USER_PHONE') sliceValue(11);
    if(curName === 'USER_NICKNAME') sliceValue(10);

    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    })    
  }

  const inputValidCheck = (targetKey: string, targetVal: sOrn) => {
    let curVal = targetVal as string;
    if(targetKey === 'email'){
      const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
      if(!emailRegExp.test(curVal)){
        setIsEmail(false);
      }else {
        return true;
      }
    }
    if(targetKey === 'password'){
      
      const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      if(!passwordRegExp.test(curVal)){
        setIsPassword(false);
      }else {
        return true;
      }
    }
    if(targetKey === 'passwordConfirm'){
      console.log(USER_PW, curVal)
      if(curVal !== USER_PW){
        setIsPasswordConfirm(false);
      }else {
        return true;
      }
    }
    if(targetKey === 'name'){
      if(!(curVal.length > 1) || !(curVal.length <= 20)){
        setIsName(false);
      }else {
        return true;
      }
    }
    if(targetKey === 'phone'){
      if(curVal.length !== 11){
        setIsPhone(false);
      }else {
        return true;
      }
    }
    if(targetKey === 'nickname'){
      if(!(curVal.length > 1) || !(curVal.length <= 20)){
        setIsNickname(false);
      }else {
        return true;
      }
    }
  }

  const smsInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 6){
      e.target.value = e.target.value.slice(0, 6);
    }
  }

  async function signUp(e : FormEvent) : Promise<boolean>{
    e.preventDefault();
    let emailOn = inputValidCheck('email', USER_EMAIL);
    let passwordOn = inputValidCheck('password', USER_PW);
    let passwordConfirmOn = inputValidCheck('passwordConfirm', USER_PW_CONFIRM);
    let nameOn = inputValidCheck('name', USER_NAME);
    let phoneOn = inputValidCheck('phone', USER_PHONE);
    let nicknameOn = inputValidCheck('nickname', USER_NICKNAME);

    if(emailOn && passwordOn && passwordConfirmOn && nameOn && phoneOn && nicknameOn){
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
      return true;
    }else{
      return false;
    }
  }

  async function smsAuth(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setLodingState(true);
    if(USER_PHONE && USER_PHONE.length === 11){
      setSmsCodeState(true);
      setLodingState(false);
      await axios.post("http://localhost:4000/auth/smsAuth",{
        "USER_PHONE" : USER_PHONE
      })
      .then(res => {
        if(res.data === true){
          console.log("성공!")
          setLodingState(false)
        }
      })
      .catch((err)=> console.log(err))
    }else{
      setLodingState(false);
      console.log("제대로 입력해라")
    }
  }

  async function smsDisable() {
    console.log("중복 방지")
  }

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          setSmsCodeState(false)
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  function smsCodeInputEle() {
    return(
      <div>
        <div className='flex gap-2 '>
          <div className='relative w-full'>
            <input name='USER_PHONE' type="number" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black text-sm" onChange={smsInputHandler} placeholder='인증번호 6자리'/>
            <p className='text-base-content text-xs absolute right-3 top-4'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
          </div>
          <div className='input input-bordered btn btn-success bg-white label-text border-slate-300 text-gray-300 whitespace-nowrap right-0'>확인</div>
        </div>        
        {/* <p className='label-text text-xs text-error ml-2'>인증번호가 일치하지 않습니다. 다시 한 번 확인해주세요.</p> */}
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-black text-center mb-6 text-2xl">회원가입</h1>
      <form className='form-control w-full max-w-xs' onSubmit={signUp}>
        <label className="label">
          <span className="label-text text-black">이메일</span>
        </label>
        <div>
          <input name='USER_EMAIL' type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="example@naver.com" onChange={inputHandler}/>
          {!isEmail ? <p className='label-text text-xs text-error ml-2'>올바른 이메일 형식을 입력해주세요.</p> : null}
        </div>

        <label className="label">
          <span className="label-text text-black">비밀번호</span>
        </label>
        <div>
          <input name='USER_PW' type="password" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="******" onChange={inputHandler}/>
          {!isPassword ? <p className='label-text text-xs text-error ml-2'>영문 + 숫자 + 특수문자 조합 8 ~ 20자리 문자를 입력해주세요.</p> : null}
        </div>

        <label className="label">
          <span className="label-text text-black">비밀번호 확인</span>
        </label>
        <div>
          <input name='USER_PW_CONFIRM' type="password" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="******" onChange={inputHandler}/>
          {!isPasswordConfirm ? <p className='label-text text-xs text-error ml-2'>확인 패스워드가 일치하지 않습니다. 다시 한 번 확인해주세요.</p> : null}
          
        </div>

        <label className="label">
          <span className="label-text text-black">이름</span>
        </label>
        <div>
          <input name='USER_NAME' type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" onChange={inputHandler}/>
          {!isName ? <p className='label-text text-xs text-error ml-2'>이름은 최소 2글자 이상, 20글자 이하로 입력해주세요.</p> : null}
        </div>

        <label className="label">
          <span className="label-text text-black">휴대폰</span>
        </label>
        <div className='flex gap-2'>
          <input name='USER_PHONE' type="number" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" onChange={inputHandler}/>
          <div className={`input input-bordered btn ${smsCodeState ? 'btn-disabled' :  'btn-success'} bg-white label-text text-black border-slate-300 text-gray-300 `} onClick={ lodingState ? smsDisable : smsAuth}>
            <span className={`text-sm whitespace-nowrap ${ lodingState ? 'loading loading-spinner' : null}`}>전송</span>  
          </div>
        </div>
        {!isPhone ? <p className='label-text text-xs text-error ml-2 mb-2'>휴대폰 번호 11자리를 올바르게 입력해주세요.</p> : null}
        {
          smsCodeState ? smsCodeInputEle() : null
        }
        <label className="label">
          <span className="label-text text-black">닉네임</span>
        </label>
        <input name='USER_NICKNAME' type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" maxLength={10} onChange={inputHandler}/>
        {!isNickname ? <p className='label-text text-xs text-error ml-2'>닉네임은 최소 2글자 이상, 10글자 이하로 입력해주세요.</p> : null}

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