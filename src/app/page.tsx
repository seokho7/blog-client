import Link from 'next/link'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-black text-center mb-6 text-2xl">초기 페이지입니다.</h1>
      <Link href={'/sign-in'} className='btn mb-5 text-white'>로그인 하기!</Link>
      <Link href={'/sign-up'} className='btn text-white'>회원가입 하기!</Link>
      
    </main>
  )
}