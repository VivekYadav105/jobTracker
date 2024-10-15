import { createSlice } from "@reduxjs/toolkit";
import { JobType } from "../types/jobType";

const jobSlice = createSlice({
    name:"jobs",
    initialState:[] as JobType[],
    reducers:{
        getJobs:(state)=>{
            return state
        },
        setJobs:()=>{
            const jobs =  [
                {
                  role: "Frontend Developer",
                  logo: "https://dummyimage.com/100x100/000/fff.png&text=FD",
                  company: "TechCorp",
                  experience: "2-4 years",
                  skills: ["React", "CSS", "JavaScript", "Tailwind"],
                  platform: "LinkedIn",
                  date: "12-10-2024",
                  status: "Applied",
                  link:"",
                  _id:""
                },
                {
                  role: "Backend Developer",
                  logo: "https://dummyimage.com/100x100/000/fff.png&text=BD",
                  company: "Innovatech",
                  experience: "3-5 years",
                  skills: ["Node.js", "Express", "MongoDB", "Docker"],
                  platform: "Indeed",
                  date: "10-10-2024",
                  status: "Interview Scheduled",
                  link:"",
                  _id:""
                },
                {
                  role: "Full-Stack Engineer",
                  logo: "https://dummyimage.com/100x100/000/fff.png&text=FS",
                  company: "StartupHub",
                  experience: "1-3 years",
                  skills: ["MERN Stack", "AWS", "GraphQL"],
                  platform: "AngelList",
                  date: "01-10-2024",
                  status: "Offer Received",
                  link:"",
                  _id:""
                },
                {
                  role: "Data Scientist",
                  logo: "https://dummyimage.com/100x100/000/fff.png&text=DS",
                  company: "DataMinds",
                  experience: "2-5 years",
                  skills: ["Python", "Pandas", "Machine Learning", "SQL"],
                  platform: "Glassdoor",
                  date: "28-09-2024",
                  status: "Rejected",
                  link:"",
                  _id:""
                },
                {
                  role: "DevOps Engineer",
                  logo: "https://dummyimage.com/100x100/000/fff.png&text=DE",
                  company: "CloudNet",
                  experience: "3-6 years",
                  skills: ["AWS", "Kubernetes", "Jenkins", "Terraform"],
                  platform: "LinkedIn",
                  date: "14-09-2024",
                  status: "In Progress",
                  link:"",
                  _id:""
                }
              ];
            return jobs;              
        },
        addJob:(state,action)=>{
            return [...state,action.payload]
        },
        removeJob:(state,action)=>{
            return state.filter(ele=>ele._id!==action.payload.id)
        }
    },
}) 
console.log(jobSlice.actions);

export default jobSlice.reducer
export const {getJobs,addJob,removeJob,setJobs} = jobSlice.actions