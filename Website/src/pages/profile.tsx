import React, { useEffect } from "react"
import { MdAdd, MdDelete, MdEdit } from "react-icons/md"
import { Navigate, useSearchParams } from "react-router-dom"
import EducationPopUp from "../components/educationPopUp"
import CardLayout from "../ui/cardLayOut"
import { RiCodeFill, RiGithubLine, RiLinkedinFill } from "react-icons/ri"
import { useSessionQuery } from "../api/auth"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import ResumePopup from "../components/resumePopUp"
import SocialsPopup from "../components/socialPopUp"
import SkillSection from "../components/skillSection"


const Profile:React.FC = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    const {isError} = useSessionQuery()
    const user = useSelector((state:RootState)=>state.user)

    useEffect(()=>{
        console.log(user);
    },[user])

    if(isError){
        return <Navigate to="/auth"/>
    }

    function openSocialsPanel(){
        setSearchParams(prev=>{
            prev.set('socialsPanel','active')
            prev.delete('educationPanel')
            prev.delete('resumePanel')
            return prev
        })
    }

    function openEducationPopup(){
        setSearchParams(prev=>{
            prev.set('educationPanel','active')
            prev.delete('resumePanel')
            prev.delete('socialsPanel')
            return prev
        })
    }

    function openResumePopUp(){
        setSearchParams(prev=>{
            prev.set('resumePanel','active')
            prev.delete('socialsPanel')
            prev.delete('educationPanel')
            return prev
        })
    }


    return(
        <div className="grid grid-cols-12 grow gap-4">
            <div className="col-span-12 sm:col-span-6 md:col-span-3 flex flex-col gap-3">
                <CardLayout className="pb-3 items-center">
                    <div className="flex items-center justify-center gap-2">
                        <img className="rounded-full w-16 h-16" src="/avatar.jpg" alt="" />
                        <article className="flex flex-col grow max-w-[200px]">
                            <h1 className="text-center text-blue">{`${user?.fname} ${user?.lname}`}</h1>
                            <span className="text-gray-800 text-xs text-center">A passionate Mern stack developer</span>
                        </article>
                    </div>
                    <div className="flex py-2 w-fit items-center flex-wrap justify-center m-auto gap-3">
                        {/* {user.socials.map(ele=>(
                            <button className="p-2 hover:bg-glassBlue rounded-md hover:shadow-md shadow-blue duration-300 hover:text-blue" key={ele.name}>
                                {ele.icon}
                            </button>
                        ))} */}
                        {[
                            {name:"github",link:"github.com/VivekYadav105",icon:<RiGithubLine/>},
                            {name:"linkedin",link:"github.com/VivekYadav105",icon:<RiLinkedinFill/>},
                            {name:"leetcode",link:"github.com/VivekYadav105",icon:<RiCodeFill/>},
                        ].map(ele=>(
                            <button className="p-2 hover:bg-glassBlue rounded-md hover:shadow-md shadow-blue duration-300 hover:text-blue" key={ele.name}>
                                {ele.icon}
                            </button>
                        ))}
                        <button onClick={openSocialsPanel} className="icon-button info">
                            <MdEdit/>
                        </button>
                    </div>
                </CardLayout>
                <SkillSection 
                    deleteSkill={(skill)=>console.log(skill)} 
                    addSkill={(e)=>{console.log(e);}} 
                    skills={user?.skills||['mern']}/>
                <CardLayout>
                    <article className="flex items-center mb-2">
                        <h1  className="ps-2 font-medium flex-1">Education</h1>
                        <article className="flex gap-2 items-center">
                            <button className="text-xs underline text-violet-400">View All</button>
                            <button onClick={openEducationPopup} className="p-1 hover:bg-gray-200 flex items-center rounded-md">
                                <MdAdd/>
                            </button>
                        </article>
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
                </CardLayout>
                <CardLayout>
                    <div className="flex items-center mb-2">
                        <h1  className="ps-2 font-medium flex-1">Resumes</h1>
                        <article className="flex gap-2 items-center">
                            <button className="text-xs underline text-violet-400">View All</button>
                            <button onClick={openResumePopUp} className="p-1 hover:bg-gray-200 flex items-center rounded-md">
                                <MdAdd/>
                            </button>
                        </article>
                    </div>
                    <div className="flex flex-col gap-2 px-2">
                        <article className="w-full flex items-center">
                            <span className="flex-1">Role name</span>
                            <span>Resume</span>
                        </article>
                    </div>
                </CardLayout>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-9 h-full flex flex-col md:flex-row gap-3">
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
            {searchParams.get("resumePanel")=='active'&&(
                <ResumePopup/>
            )}
            {searchParams.get("socialsPanel")=='active'&&(
                <SocialsPopup/>
            )}
        </div>
    )
}

export default Profile