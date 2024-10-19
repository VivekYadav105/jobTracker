import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi"
import { useEffect, useState } from "react"
import {  useSelector } from "react-redux"
import { IoMdArrowDropdown } from "react-icons/io"
import { RootState } from "../store"

const Header:React.FC = ()=>{
    const [expanded,setExpanded] = useState(false)

    const user = useSelector((state:RootState)=>state.user)

    useEffect(()=>{
        console.log(user);
    },[user])

    return(
        <section className="w-full  bg-white shadow-lg  px-4 py-3 ">
            <div className="flex items-center max-w-[800px] m-auto">
                <article className="me-5 flex gap-2 items-center">
                    <span className="logo">
                        <img className="w-5 h-5" src="/logo.png" alt="" />
                    </span>
                    <h1>Job Board</h1>
                </article>
                <div className="relative flex-1 flex items-center justify-end">
                    <button onClick={()=>setExpanded(!expanded)} className="sm:hidden p-2 bg-glassBlue border-blue shadow-lg hover:bg-green-500 border-2 text-blue hover:border-green-800 hover:text-green-800 duration-300 rounded-md">
                        <GiHamburgerMenu size={15}/>
                    </button>
                    <ul className={`absolute top-[calc(100%+1rem)] ${expanded?"":"h-0"} sm:h-auto overflow-hidden right-0 sm:static flex flex-col z-[1000] sm:z-0 bg-white rounded-xl sm:flex-row items-center sm:gap-3 sm:m-auto justify-center`}>
                        <article className="sm:hidden flex items-center gap-2 border-b-2 border-blue hover:bg-glassBlue whitespace-nowrap border-transparent w-full text-center p-1 rounded-xl">
                            <img className="rounded-full w-8 h-8" src="/avatar.jpg"/>
                            <article className="flex flex-col">
                                <span>Vivek Yadav</span>
                                <span className="text-[8px]">Last logged on 23-08-2024</span>
                            </article>
                        </article>
                        <Link to={'/'} className="hover:bg-glassBlue border-transparent hover:text-blue border-2 hover:border-blue w-full text-center p-1 rounded-xl">
                            <li>Home</li>
                        </Link>
                        <Link to={'/profile'} className="hover:bg-glassBlue border-transparent hover:text-blue border-2 hover:border-blue w-full text-center p-1 rounded-xl">
                            <li>Profile</li>
                        </Link>
                        <Link to={'/extenstion'} className="hover:bg-glassBlue border-transparent hover:text-blue border-2 hover:border-blue w-full text-center p-1 rounded-xl">
                            <li>Extenstion</li>
                        </Link>
                        <button className="hover:bg-glassBlue border-transparent hover:text-blue border-2 hover:border-blue w-full text-center p-1 rounded-xl sm:hidden">Log out</button>
                    </ul>
                    {
                        user?(
                            <article className="hidden mx-3 gap-2 sm:flex items-center">
                                <img className="rounded-full w-6 h-6" src="/avatar.jpg"/>
                                <span>VY</span>
                                <span>
                                    <IoMdArrowDropdown/>
                                </span>
                            </article>
                        ):(
                            <Link to={'/auth'}>
                                <button className="main-button w-fit py-1">Login</button>                            
                            </Link>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Header