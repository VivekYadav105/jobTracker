import React, { useEffect, useRef, useState } from "react"
import { BiSearch,BiFilter } from "react-icons/bi"
import JobCard from "../components/jobCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {setJobs} from '../store/jobSlice'

const Home:React.FC = ()=>{

    const [filterExpanded,setFilterExpanded] = useState(false)
    const filterRef = useRef<HTMLDivElement|null>(null);
    const [searchValue,setSearchValue] = useState('')
    const jobs = useSelector((state:RootState)=>state.job)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setJobs())
    },[])

    return(
        <>
            <div className="">
                <div className="max-w-md m-auto flex items-center gap-2">
                    <article className="bg-white shadow-lg rounded-md flex flex-1 items-center">
                        <span className="p-2 inline-block">
                            <BiSearch size={20}/>
                        </span>
                        <input onChange={(e)=>{setSearchValue(e.target.value)}} type="text" id="searchBar" placeholder="Search by Job title or Company or Portal" className="p-2 flex-1 outline-none rounded-xl"/>
                    </article>
                    <div className="relative" ref={filterRef}>
                        <button onClick={()=>{setFilterExpanded(!filterExpanded)}} className="p-2 bg-white shadow-lg hover:bg-green-500 border-2 border-transparent hover:border-green-800 hover:text-green-800 duration-300 rounded-md">
                            <BiFilter size={20}/>
                        </button>
                        <div className={`absolute bg-white translate-y-2 ${filterExpanded?"":"h-0"} overflow-hidden top-100 right-0 z-10 shadow-md rounded-md`}>
                            <div className="flex p-3 pb-0 flex-col items-center">
                                <div className="flex flex-col w-full">
                                    <h1 className="text-xs text-gray-800 font-medium pb-1">
                                        Job Status
                                    </h1>
                                </div>
                                <article className="flex items-center w-full">
                                    <input id="isactive" type="checkbox"/>
                                    <label htmlFor="isactive" className="text-sm whitespace-nowrap flex-1 mx-2">active</label>
                                </article>
                                <article className="flex items-center w-full">
                                    <input id="isactive" type="checkbox"/>
                                    <label htmlFor="isactive" className="text-sm whitespace-nowrap flex-1 mx-2">Rejected</label>
                                </article>
                            </div>
                            <div className="flex p-3 flex-col items-center">
                                <div className="flex flex-col w-full">
                                    <h1 className="text-xs text-gray-800 font-medium pb-1">
                                        Date Range
                                    </h1>
                                </div>
                                <article className="flex items-center w-full">
                                    <label htmlFor="fromDate" className="text-sm whitespace-nowrap flex-1 ">From :</label>
                                    <input id="fromDate" type="date"/>
                                </article>
                                <article className="flex items-center w-full">
                                    <label htmlFor="toDate" className="text-sm whitespace-nowrap flex-1 ">To :</label>
                                    <input id="toDate" type="date"/>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
                {searchValue&&(
                    <div className="w-full p-3 mt-3">
                        <h1 className="pb-2 ps-4">Job Results:</h1>
                        <div className="grid rounded-xl max-w-full p-3 gap-2 place-content-center m-auto content-center grid-flow-dense" style={{gridTemplateColumns:"repeat(auto-fill,275px)"}}>
                            {jobs.map(ele=>(
                                <JobCard {...ele}/>
                            ))}
                        </div>
                    </div>
                )}
                
            </div>
        </>
    )
}

export default Home