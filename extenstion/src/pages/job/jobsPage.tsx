import { useCallback, useEffect, useState } from "react"
import JobElement from '../../components/jobElement'
import AddForm from "./addForm"
import React from "react"
import { useSearchParams } from "react-router-dom"
import {getJobs,deleteJob, addJob} from '../../context/db'


const JobsPage = (props)=>{

    const [jobs,setJobs] = useState(new Map())
    const [currentJob,setCurrentJob] = useState({})
    const [searchParams,setSearchParams] = useSearchParams()

    async function handleAddJob(job){
      const jobs = await addJob(job)
      setJobs(jobs)
    }

    async function handleUpdateJob(jobId,job) {
      
    }

    async function handleDeleteJob(jobId){
      const jobs = await deleteJob(jobId)    
      setJobs(jobs) 
    }

    function editJob(jobId){
      const currJob = jobs.filter(ele=>ele.id==jobId)[0]
      console.log(currJob);
      
      setCurrentJob(Array.from(jobs).filter(ele=>ele.id==jobId)[0])
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

    const fetchJobs = useCallback(async()=>{
      const jobs = await getJobs()
      console.log(jobs);
      setJobs(jobs)
    },[])

    useEffect(()=>{
      fetchJobs()
    },[])


    return(
        <>
            <AddForm open={Boolean(searchParams.get('popUp'))} currentJob={currentJob} updateJob={handleUpdateJob} addJob={handleAddJob} closeJobPanel={closeJobPanel}/>
            {jobs&&Array.from(jobs.entries()).map(([jobId,job])=><JobElement editJob={()=>editJob(job.id)}  deleteJob={()=>handleDeleteJob(job.id)} key={jobId} {...job} jobId={jobId}/>)}
        </>
    )
}

export default JobsPage