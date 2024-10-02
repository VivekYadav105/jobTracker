import { useEffect, useState } from "react"
import JobElement from '../jobElement'
import AddForm from "./addForm"
import React from "react"
import PropTypes from "prop-types"
import { useSearchParams } from "react-router-dom"


const JobsPage = (props)=>{

    const [jobs,setJobs] = useState(new Map())
    const [currentJob,setCurrentJob] = useState({})
    const [searchParams,setSearchParams] = useSearchParams()

    function updateJob(jobId,job){
      console.log(jobId,job);
      setJobs(prev=>prev.set(jobId,job))
    }

    function deleteJob(jobId){
      setJobs(prev=>{
        const updatedJobs = new Map(prev);
        updatedJobs.delete(jobId);
        return updatedJobs
      })
    }

    function editJob(jobId){
      console.log(jobId);
      setCurrentJob(jobs.get(jobId))
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.append('popUp', 'edit');
        newParams.append('jobId',String(jobId))
        return newParams;
      });

    }

    function closeJobPanel(){
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('popUp');
        newParams.delete('jobId')
        return newParams;
    });

    }


    return(
        <>
            <AddForm open={Boolean(searchParams.get('popUp'))} currentJob={currentJob} updateJob={updateJob} closeJobPanel={closeJobPanel}/>
            {jobs&&Array.from(jobs.entries()).map(([jobId,job])=><JobElement editJob={()=>editJob(jobId)}  deleteJob={()=>deleteJob(jobId)} key={jobId} {...job} jobId={jobId}/>)}
        </>
    )
}

export default JobsPage