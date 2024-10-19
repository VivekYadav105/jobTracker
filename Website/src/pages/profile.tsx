import React from "react"
import { MdAdd, MdDelete, MdEdit } from "react-icons/md"
import { Navigate, useSearchParams } from "react-router-dom"
import EducationPopUp from "../components/educationPopUp"
import CardLayout from "../ui/cardLayOut"
import { RiCodeFill, RiGithubLine, RiLinkedinFill } from "react-icons/ri"
import { useSelector } from "react-redux"
import { RootState } from "../store"

const Profile:React.FC = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    const user = useSelector((state:RootState)=>state.user)

    function openEducationPopup(){
        setSearchParams(prev=>{
            prev.set('educationPanel','active')
            return prev
        })
    }

    if(!user) return <Navigate to={'/auth/login'} />

    return(
        <div className="grid grid-cols-12 grow gap-4">
            <div className="col-span-3">
                <CardLayout className="pb-3 items-center">
                    <div className="flex">
                        <img className="rounded-full w-16 h-16" src="/avatar.jpg" alt="" />
                        <article className="flex flex-col grow">
                            <h1 className="text-center text-blue">Vivek Yadav P</h1>
                            <span className="text-gray-800 text-xs text-center">A passionate Mern stack developer</span>
                        </article>
                    </div>
                    <div className="flex py-2 w-fit items-center  m-auto gap-3">
                        {[
                            {name:"github",link:"github.com/VivekYadav105",icon:<RiGithubLine/>},
                            {name:"linkedin",link:"github.com/VivekYadav105",icon:<RiLinkedinFill/>},
                            {name:"leetcode",link:"github.com/VivekYadav105",icon:<RiCodeFill/>},
                        ].map(ele=>(
                            <button className="p-2 hover:bg-glassBlue rounded-md hover:shadow-md shadow-blue duration-300 hover:text-blue" key={ele.name}>
                                {ele.icon}
                            </button>
                        ))}
                    </div>
                </CardLayout>
                <CardLayout>
                    <article className="flex items-center mb-2">
                        <h1  className="ps-2 font-medium flex-1">Skills</h1>
                        <button className="text-xs underline text-violet-400">View All</button>
                    </article>
                    <ul className="flex items-center flex-wrap">
                        <li className="border-2 border-blue-600 text-blue-600 text-xs p-1 px-2 hover:bg-blue-300 duration-300 rounded-xl">MERN</li>
                    </ul>
                    <article className="flex items-center justify-end gap-1">
                        <button className="text-medium m-1 justify-center hover:bg-gray-200 flex items-center rounded-md w-8 h-8">
                            <MdAdd/>
                        </button>
                    </article>
                </CardLayout>
                <div className="w-full bg-white my-2 rounded-lg p-5 pb-1 gap-2">
                    <article className="flex items-center mb-2">
                        <h1  className="ps-2 font-medium flex-1">Education</h1>
                        <button className="text-xs underline text-violet-400">View All</button>
                    </article>
                    <ul className="flex items-center flex-wrap">
                        <li className="border-2 hover:border-blue group text-center text-blue-600 text-xs p-1 px-2 hover:bg-blue-300 duration-300 rounded-xl flex items-center gap-2">
                            Full-stack web developemnt
                            <article className="flex items-center overflow-hidden gap-1 w-0 group-hover:w-fit">
                                <button>
                                    <MdDelete color="red"/>
                                </button>
                                <button>
                                    <MdEdit color="blue"/>
                                </button>
                            </article>
                        </li>
                    </ul>
                    <article className="flex items-center justify-end gap-1">
                        <button onClick={openEducationPopup} className="text-medium m-1 justify-center hover:bg-gray-200 flex items-center rounded-md w-8 h-8">
                            <MdAdd/>
                        </button>
                    </article>
                </div>
            </div>
            <div className="col-span-9 h-full flex flex-col md:flex-row gap-3">
                <div className="w-full h-full bg-white rounded-lg p-3 gap-2">
                    <h1>Applied Portals</h1>
                    <div className=""></div>
                </div>
                <div className="w-full h-full bg-white rounded-lg p-3 gap-2">
                    <h1>Recent Applications</h1>
                    <div className=""></div>
                </div>
            </div>
            {searchParams.get("educationPanel")=='active'&&(
                <EducationPopUp/>
            )}  
        </div>
    )
}

export default Profile