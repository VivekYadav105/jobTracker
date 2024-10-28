import axios from 'axios'
import { useState } from 'react'

const useAxios = ()=>{
    
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [data,setData] = useState(false)

    const axiosInstance = axios.create({
        baseURL:import.meta.env.API_URL,
        withCredentials:true
    })

    axios.interceptors.request.use(
        (request)=>{
            setLoading(true)
            return request
        },
        (error)=>{
            setLoading(false)
            setError(error)
            return Promise.error(error)
        }
    )

    axiosInstance.interceptors.response.use(
        (response) => {
            setData(response.data)
            setLoading(false)
            setError(null)
            return response
        },
        (error) => {
            console.log(error)
            return Promise.reject(error)
        }
    )

    return [axiosInstance,{data,loading,error}]
}

export default useAxios