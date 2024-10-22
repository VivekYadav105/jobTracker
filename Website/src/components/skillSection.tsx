import React, { useState } from "react"
import { MdAdd, MdClose, MdDone, MdEdit } from "react-icons/md"
import CardLayout from "../ui/cardLayOut"

interface SkillProps{
    skills:string[],
    addSkill:(skill:string)=>void,
    deleteSkill:(skill:string)=>void,
}

const SkillSection:React.FC<SkillProps> = (props)=>{
    
    const [editable,setEditable] = useState(false)
    const [skillValue,setSkillValue] = useState('')

    function submitSkills(){
        setEditable(false)
        console.log(props.skills);
    }

    return(
        <CardLayout>
            <article className="flex items-center mb-2">
                <h1  className="ps-2 font-medium flex-1">Skills</h1>
                <article className="flex gap-2 items-center">
                    <button className="text-xs underline text-violet-400">View All</button>
                    <button className="p-1 hover:bg-gray-200 flex items-center rounded-md" onClick={()=>{setEditable(true)}}>
                        <MdEdit/>
                    </button>
                </article>
            </article>
                <ul className="flex items-center flex-wrap ">
                    {props.skills.map((ele:string)=>(
                        <li className="border-2 border-blue-600 text-blue-600 flex items-center group text-xs p-0.5 hover:bg-blue-300 duration-300 rounded-xl" key={ele}>
                            <span className="font-medium me-1 text-center">{ele}</span>
                            {editable&&(
                                <button onClick={()=>props.deleteSkill(ele)} className="p-0.5 rounded-md bg-gray-200 hover:bg-gray-300 duration-300">
                                    <MdClose/>
                                </button>
                            )}
                        </li>
                    ))}
                    {!editable&&!props.skills.length&&(
                        <p className="text-center w-full inline-block">-</p>
                    )}
                    {
                        editable&&(
                            <article className="flex items-center px-1 mx-1 rounded-md shadow-sm bg-gray-300">
                                <input onChange={(e)=>setSkillValue(e.target.value)} className="border-0 bg-transparent rounded-md text-sm p-1 w-24" type="text" placeholder="Search skill" />
                                <button onClick={()=>{props.addSkill(skillValue)}} className="bg-white font-green-500 mx-1 p-0.5 rounded-md">
                                    <MdAdd/>
                                </button>
                                <button onClick={submitSkills} className="bg-white font-green-500 p-0.5 rounded-md">
                                    <MdDone/>
                                </button>
                            </article>
                        )
                    }
                </ul>
        </CardLayout>
    )
}

export default SkillSection