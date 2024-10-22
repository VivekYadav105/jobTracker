import { useMutation, useQuery } from "react-query"
import axiosInstance from "./axiosUtils"
import { successCallback } from "../pages/auth/callback"

export const useGetJobsQuery = ()=>{
    const axios = axiosInstance()
    return useQuery({
        queryFn:async()=>{
            const response = await axios.get('/jobs/getall')
            return response.data
        },
        queryKey:['jobs']
    })
}

export const usePostJobMutation = ()=>{
    const axios = axiosInstance()
    return useMutation({
        mutationFn:async (data:{title:string,description:string,location:string,salary:string})=>{
            const response = await axios.post('/jobs/create',data)
            return response.data
        },
        onSuccess:(data)=>successCallback(data.message)
    })
}

export const useDeleteJobMutation = ()=>{
    const axios = axiosInstance()
    return useMutation({
        mutationFn:async (id:string)=>{
            const response = await axios.post(`/jobs/delete/${id}`)
            return response.data
        },
        onSuccess:(data)=>successCallback(data.message)
    })
}

export const useUpdateJobMutation = ()=>{
    const axios = axiosInstance()
    return useMutation({
        mutationFn:async (data:{id:string,title:string,description:string,location:string,salary:string})=>{
            const response = await axios.post(`/jobs/edit/${data.id}`,data)
            return response.data
        },
        onSuccess:(data)=>successCallback(data.message)
    })
}