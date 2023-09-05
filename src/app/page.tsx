export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="form-control w-full max-w-xs">
        <h1 className="text-black text-center mb-5 text-2xl">로그인</h1>
        <label className="label">
          <span className="label-text text-black">이메일</span>
        </label>
        <input type="text" className="input input-bordered w-full max-w-xs bg-white text-black" placeholder="example@naver.com"/>
        <label className="label">
          <span className="label-text text-black">패스워드</span>
        </label>
        <input type="text" className="input input-bordered w-full max-w-xs bg-white text-black" placeholder="******"/>
        <button className="btn btn-outline btn-success mt-10">로그인</button>
        <div className="text-neutral-content absolute left-0 bottom-10 flex justify-center w-full">
          <small>&copy; Seokho Brothers Corp</small>
        </div>
      </div>
    </main>
  )
}
