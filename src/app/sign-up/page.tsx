'use client'
import axios from 'axios'
import Link from 'next/link'
import { ChangeEvent, FormEvent, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { smsResStep } from '../common/types/smsResponse';

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
  const [isDoubleEmail, setIsDoubleEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
  const [isName, setIsName] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isNickname, setIsNickname] = useState(true);
  const [isDoubleNickname, setIsDoubleNickname] = useState(true);
  const [isDoubleUser,setIsDoubleUser] = useState(true);

  const [lodingState, setLodingState] = useState(false);
  const [smsCodeState, setSmsCodeState] = useState(false);
  const [authCodeInit, setAuthCodeInit] = useState(true);
  const [smsAuthCode, setSmsAuthCode]  = useState("");
  const [matchSmsCode, setMatchSmsCode] = useState(false);
  const [fastTrySmsCode, setFastTrySmsCode] = useState(false);
  const [reTrySmsCode, setReTrySmsCode] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let curName = e.target.name;
    function sliceValue(length: number) {
      if (e.target.value.length >= length){
        e.target.value = e.target.value.slice(0, length);
      }
    }

    if(curName === 'USER_EMAIL'){
      setIsEmail(true);
      setIsDoubleEmail(true);
    }
    if(curName === 'USER_PW' || curName === 'USER_PW_CONFIRM'){
      sliceValue(25);
      setIsPassword(true);
      setIsPasswordConfirm(true);
    } 
    if(curName === 'USER_NAME'){
      sliceValue(20);
      setIsName(true)
    } 
    if(curName === 'USER_PHONE'){
      sliceValue(11);
      setIsPhone(true);
      setFastTrySmsCode(false);
      setReTrySmsCode(false);
      setIsDoubleUser(true)
    } 
    if(curName === 'USER_NICKNAME'){
      sliceValue(10);
      setIsNickname(true)
      setIsDoubleNickname(true);
    } 

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

  const smsInputHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.value.length > 6){
      e.target.value = e.target.value.slice(0, 6);
    }
    setAuthCodeInit(true);
    setSmsAuthCode(e.target.value);
  },[])

  async function signUp(e : FormEvent) : Promise<boolean>{
    e.preventDefault();
    let emailOn = inputValidCheck('email', USER_EMAIL);
    let passwordOn = inputValidCheck('password', USER_PW);
    let passwordConfirmOn = inputValidCheck('passwordConfirm', USER_PW_CONFIRM);
    let nameOn = inputValidCheck('name', USER_NAME);
    let phoneOn = inputValidCheck('phone', USER_PHONE);
    let nicknameOn = inputValidCheck('nickname', USER_NICKNAME);
    if(emailOn && passwordOn && passwordConfirmOn && nameOn && phoneOn && nicknameOn){
      if(!matchSmsCode) {
        window.alert("휴대폰 인증을 완료해주세요.");
        return false
      }else{
        // const userInfo = document.querySelectorAll("input");
        // let registerUserInfo : any = {};
    
        // for(let i = 0; i < userInfo.length; i++){
        //   let curInput = userInfo[i];
        //   if(curInput.name){
        //     registerUserInfo[curInput.name] = curInput.value;
        //   }
        // }
        
        await axios.post("http://localhost:4000/auth/register", userInfo )
        .then(res => {
          if(res.status === 201) location.replace('/');
        })
        .catch((err)=> {
          const detailMsg = err.response.data.message;
          if(detailMsg === 'U0001') setIsDoubleEmail(false);
          if(detailMsg === 'U0002') setIsDoubleNickname(false);
          if(detailMsg === 'U0003') setIsDoubleUser(false);
        })
        return true;
      }
    }else{
      return false;
    }
  }

  async function sendCode(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      setLodingState(true);
      if(USER_PHONE?.length === 11 && USER_PHONE?.indexOf("010") === 0 ){        
        await axios.post("http://localhost:4000/auth/sendCode",{
          "USER_PHONE" : USER_PHONE
        })
        .then(res => {
          const result : smsResStep = res.data;
          if(result.resState === true){
            setSmsCodeState(true);
            setMinutes(3)
            console.log("성공!")
          }else{
            const failBody = result.failStep;
            switch(failBody){
              case 'reSubmit' : {setIsPhone(false); break}
              case 'fastTry' : {setFastTrySmsCode(true); break}
              case 'redisOff' : {console.log("쿠키스텝"); break}
              case 'reTry' : {setReTrySmsCode(true); break}
            }
          }
        })
        .catch((err)=> console.log(err))        
      }else{
        setIsPhone(false)
        console.log("제대로 입력해라")
      }
      setLodingState(false);
  }

  async function smsDisable() {
    console.log("중복 방지")
  }

  async function validateCode() {
    console.log(smsAuthCode)
    if(smsAuthCode?.length !== 6){
      setAuthCodeInit(false);
    }else{
      await axios.post("http://localhost:4000/auth/validateCode",{
        "USER_PHONE":USER_PHONE,
        "USER_SMS_AUTH_CODE": smsAuthCode
      }).then(res => {
        if(res.data == true){
          setAuthCodeInit(false);
          setMatchSmsCode(true);
        }else{
          setAuthCodeInit(false);
        }
        console.log(res.data)
      }).catch(err => console.log(err))
    }
  }
  
  useEffect(() => {
    if(matchSmsCode){
      setMinutes(0);
      setAuthCodeInit(false)
      setSmsCodeState(false)
      return;
    } 
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          setAuthCodeInit(true);
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
            <input name='USER_SMS_AUTH_CODE' type="number" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black text-sm" onChange={smsInputHandler} placeholder='인증번호 6자리'/>
            <p className='text-base-content text-xs absolute right-3 top-4'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
          </div>
          <div className={`input input-bordered btn btn-success bg-white label-text border-slate-300 text-gray-300 whitespace-nowrap right-0`} onClick={validateCode}>확인</div>
        </div>        
        {
          authCodeInit 
          ?
          <p className='label-text text-xs text-success ml-2'>인증번호를 입력해주세요.</p> 
          :          
          matchSmsCode 
          ? 
            null
          :
          <p className='label-text text-xs text-error ml-2'>올바른 인증번호를 입려해주세요.</p>
        }
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-5 pb-5">
      <h1 className="text-black text-center mb-6 text-2xl">회원가입</h1>
      <form className='form-control w-full max-w-xs relative' onSubmit={signUp}>
        <label className="label">
          <span className="label-text text-black">이메일</span>
        </label>
        <div>
          <input name='USER_EMAIL' type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" placeholder="example@naver.com" onChange={inputHandler}/>
          {!isEmail ? <p className='label-text text-xs text-error ml-2'>올바른 이메일 형식을 입력해주세요.</p> : null}
          {!isDoubleEmail ? <p className='label-text text-xs text-error ml-2'>중복된 이메일 입니다.</p> : null}
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
          <input name='USER_PHONE' type="number" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" onChange={inputHandler} disabled={smsCodeState || matchSmsCode ? true : false}/>
          <div className={`input input-bordered btn ${smsCodeState || matchSmsCode ? 'btn-disabled' :  'btn-success'} bg-white label-text text-black border-slate-300 text-gray-300 `} onClick={ lodingState ? smsDisable : sendCode}>
            <span className={`text-sm whitespace-nowrap ${ lodingState ? 'loading loading-spinner' : null}`}>전송</span>  
          </div>
        </div>
        {
          !isPhone ?
            <p className='label-text text-xs text-error ml-2 mb-2'>휴대폰 번호 11자리를 올바르게 입력해주세요.</p>
          : fastTrySmsCode ? 
            <p className='label-text text-xs text-error ml-2 mb-2'>중복 발송: 3분 뒤에 다시 요청해주세요.</p>
          : reTrySmsCode ? 
            <p className='label-text text-xs text-error ml-2 mb-2'>일시적인 오류: 다시 요청해주세요.</p>
          : matchSmsCode ? 
            <p className='label-text text-xs text-success ml-2'>인증되었습니다.</p>  
          : null}
        {
          smsCodeState && !matchSmsCode ? smsCodeInputEle() : null
        }
        <label className="label">
          <span className="label-text text-black">닉네임</span>
        </label>
        <input name='USER_NICKNAME' type="text" className="mb-2 input input-bordered w-full max-w-xs bg-white text-black" onChange={inputHandler}/>
        {!isNickname ? <p className='label-text text-xs text-error ml-2'>닉네임은 최소 2글자 이상, 10글자 이하로 입력해주세요.</p> : null}
        {!isDoubleNickname ? <p className='label-text text-xs text-error ml-2'>중복된 닉네임 입니다.</p> : null}
        {
          isDoubleUser ?
          <button className="btn btn-outline btn-success mt-8">회원가입</button>
          :
          <div className="btn mt-8 btn btn-error">휴대폰당 1개의 계정만 등록가능합니다.</div>
        }
      </form>
      <div className="text-xs flex justify-around mt-6">
        <Link href={'/sign-in'} className="text-black text-gray-500">로그인 하기</Link>
      </div>
    </main>
  )
}