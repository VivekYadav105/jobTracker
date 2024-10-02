import { useState } from "react"
import JobElement from '../jobElement'
import AddForm from "./addForm"
import React from "react"
import PropTypes from "prop-types"


const JobsPage = (props)=>{

    const [jobs,setJobs] = useState(new Map())

      function updateJobs(jobId,job){
        setJobs(prev=>prev.set(jobId,job))
      }

    return(
        <>
            <AddForm open={props.addJobPopup} updateJobs={updateJobs} closeJobPanel={props.closeJobPanel}/>
            {jobs&&Array.from(jobs.entries()).map(([jobId,job])=><JobElement key={jobId} {...job} jobId={jobId}/>)}
        </>
    )
}

JobsPage.propTypes = {
    addJobPopup:PropTypes.bool,
    closeJobPanel:PropTypes.func
}

export default JobsPage