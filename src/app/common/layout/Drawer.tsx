import Image from 'next/image'

export function Drawer() {
    return(
        <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 min-h-full bg-gray-100 text-black itmes-center">
                    {/* Sidebar content here */}
                    <li className='flex items-center justify-center mb-5'>
                        <div className="">
                            <div className="flex flex-col w-24 rounded flex items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
                                <p className='text-xl mt-2'>석호님</p>
                            </div>
                        </div>                        
                    </li>
                    <li className='mb-2'>            
                        <a className=''>임시 메뉴 1</a>
                    </li>
                    <li className='mb-2'>
                        <a className=''>임시 메뉴 2</a>
                    </li>
                    <li className='mb-2'>
                        <a className=''>임시 메뉴 3</a>
                    </li>
                    <li className='mb-2'>
                        <a className=''>임시 메뉴 4</a>
                    </li>
                    <li className='mb-2'>
                        <a className=''>임시 메뉴 5</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}