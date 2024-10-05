import { useCallback, useEffect, useState } from "react"
import JobElement from '../../components/jobElement'
import AddForm from "./addForm"
import React from "react"
import { useSearchParams } from "react-router-dom"
import {getJobs,deleteJob, addJob, editJob} from '../../context/db'


const JobsPage = (props)=>{

    const [jobs,setJobs] = useState([])
    const [currentJob,setCurrentJob] = useState({})
    const [searchParams,setSearchParams] = useSearchParams()

    async function handleAddJob(job){
      const jobs = await addJob(job)
      setJobs(jobs)
    }

    async function handleUpdateJob(jobId,job) {
      const jobs = await editJob(jobId,job)
      setJobs(jobs)
    }

    async function handleDeleteJob(jobId){
      const jobs = await deleteJob(jobId)    
      setJobs(jobs) 
    }

    function editJobPanel(jobId){
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
            {jobs&&jobs.map((job)=><JobElement editJob={()=>editJobPanel(job.id)}  deleteJob={()=>handleDeleteJob(job.id)} key={job.id} {...job} jobId={job.id}/>)}
        </>
    )
}

export default JobsPage