import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi"
import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import {  useSelector } from "react-redux"
import { IoMdArrowDropdown } from "react-icons/io"
import {userActions} from '../store/userSlice'
import { RootState } from "../store"
import { BiLogOut } from "react-icons/bi"
import { logOutApi } from "../api/auth"

interface HeaderProps{
    isLoggedIn:boolean
}

const Header:React.FC<HeaderProps> = ({isLoggedIn})=>{
    const [expanded,setExpanded] = useState(false)
    const dispatch = useDispatch()
    const logout = async()=>{
        await logOutApi()
        dispatch(userActions.logout())
    }

    const user = useSelector((state:RootState)=>state.user)

    const shortName = useMemo(() => {
        if (user?.fname && user?.lname) {
            return user.fname[0] + user.lname[0];
        }
        return null;
    }, [user]);

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
                        <button onClick={logout} className="hover:bg-glassBlue border-transparent hover:text-blue border-2 hover:border-blue w-full text-center p-1 rounded-xl sm:hidden">Log out</button>
                    </ul>
                    {
                        isLoggedIn?(
                            <div className="relative z-[100]">
                                <button onClick={()=>setExpanded(prev=>!prev)} className="hidden mx-3 p-2 rounded-md group hover:bg-glassBlue gap-2 sm:flex items-center">
                                    <img className="rounded-full w-6 h-6" src="/avatar.jpg"/>
                                    <span>{shortName||'user'}</span>
                                    <span className={`duration-300 ${expanded?"rotate-180":""}`}>
                                        <IoMdArrowDropdown/>
                                    </span>
                                </button>
                                <article className={`bg-white ${expanded?"":"h-0"}  flex flex-col overflow-hidden absolute top-full right-0 translate-y-3 rounded`}>
                                    <button onClick={logout} className="icon-button flex items-center gap-2 border-green-500 text-green-500 shadow-none py-2">
                                        <BiLogOut/>
                                        LogOut
                                    </button>
                                </article>
                            </div>
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