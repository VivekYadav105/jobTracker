import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi"
import { useState } from "react"

const Header:React.FC = ()=>{
    const [expanded,setExpanded] = useState(false)
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
                    <ul className={`absolute top-[calc(100%+1rem)] ${expanded?"":"h-0"} sm:h-auto overflow-hidden right-0 sm:static flex flex-col z-[1000] sm:z-0 bg-white rounded-xl sm:flex-row items-center gap-3 justify-end`}>
                        <Link to={'/'} className="hover:bg-glassBlue border-transparent hover:text-blue border-2 hover:border-blue w-full text-center p-1 rounded-xl">
                            <li>Home</li>
                        </Link>
                        <Link to={'/profile'} className="hover:bg-glassBlue border-transparent hover:text-blue border-2 hover:border-blue w-full text-center p-1 rounded-xl">
                            <li>Profile</li>
                        </Link>
                        <Link to={'/jobs'} className="hover:bg-glassBlue whitespace-nowrap border-transparent hover:text-blue border-2 hover:border-blue w-full text-center p-1 rounded-xl">
                            <li>All Jobs</li>
                        </Link>
                        <Link to={'/extenstion'} className="hover:bg-glassBlue border-transparent hover:text-blue border-2 hover:border-blue w-full text-center p-1 rounded-xl">
                            <li>Extenstion</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Header