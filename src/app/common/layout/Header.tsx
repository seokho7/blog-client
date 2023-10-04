export function Header() {
    return(
        <header className="navbar text-black border-b-1">
            <div className="flex-none">
                <label className="btn btn-square btn-ghost" htmlFor="my-drawer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="flex-1">
                <a className=" ml-2 font-bold normal-case text-xl">BLOG</a>
            </div>
            <div className="flex-none dropdown dropdown-end ">
                <label tabIndex={0} className="m-1 cursor-pointer p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow  rounded-box w-52 bg-white ">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
        </header>
    )
}