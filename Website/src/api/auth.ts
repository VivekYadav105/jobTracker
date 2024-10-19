import { useMutation, useQuery } from "react-query";
import axiosInstance from "./axiosUtils";
import { successCallback,failureCallback } from "../pages/auth/callback";
import { AxiosError } from "axios";

export const useLoginMutation = ()=>{
    const axios = axiosInstance()
    return useMutation({
        mutationFn:async (data:{email:string,password:string})=>{
            const response = await axios.post('/auth/login',data)
            return response.data
        },
        onSuccess:(data)=>successCallback(data.message),
        onError:(error:Error|AxiosError)=>failureCallback(error)
    })
}

export const useSignUpMutation = ()=>{
    const axios = axiosInstance()
    return useMutation({
        mutationFn:async (data:{email:string,password:string,fname:string,lname:string})=>{
            const response = await axios.post('/auth/signup',data)
            return response.data
        },
        onSuccess:(data)=>successCallback(data.message),
        onError:(error:Error|AxiosError)=>failureCallback(error)
    })
}

export const useForgotPasswordMutation = ()=>{
    const axios = axiosInstance()
    return useMutation({
        mutationFn:async (data:{email:string})=>{
            const response = await axios.post('/auth/forgot',data)
            return response.data
        },
        onSuccess:(data)=>successCallback(data.message),
        onError:(error:Error|AxiosError)=>failureCallback(error)
    })
}

export const useResetMutation = ()=>{
    const axios = axiosInstance()
    return useMutation({
        mutationFn:async (data:{password:string,token:string})=>{
            axios.defaults.headers.common['Authorization'] = data.token
            const response = await axios.post('/auth/reset',data)
            return response.data
        },
        onSuccess:(data)=>{
            successCallback(data.message,true)
            localStorage.removeItem('token')
        },
        // error state is handle by axios itself
    })
}

export const useVerifyTokenQuery = (token:string)=>{
    const axios = axiosInstance()
    return useQuery({
        cacheTime:0,
        refetchInterval:1000*60,
        queryKey:['verifyToken'],
        queryFn:async ()=>{
            const response = await axios.get(`/auth/verifyToken/${token}`)
            console.log(response);
            return response.data
        },
        enabled:!!token,
        onSuccess:(data)=>successCallback(data.message),
        // error state is handle by axios itself
    })
}