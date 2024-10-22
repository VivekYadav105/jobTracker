import { useMutation, useQuery } from "react-query";
import axiosInstance from "./axiosUtils";
import { successCallback,failureCallback } from "../pages/auth/callback";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

export const useLoginMutation = ()=>{
    const axios = axiosInstance()
    const dispatch = useDispatch()
    return useMutation({
        mutationFn:async (data:{email:string,password:string})=>{
            const response = await axios.post('/auth/login',data,{withCredentials: true})
            console.log(response);
            return response.data
        },
        onSuccess:(data)=>{
            dispatch(userActions.login(data.user))
            successCallback(data.message)
        },
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

export const useVerifyUserQuery = (token:string)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    return useQuery({
        queryKey:['user'],
        queryFn:async ()=>{
            const response = await axiosInstance({tokenCheck:true,config:config}).get('/auth/verify')
            return response.data
        },
        enabled:!!token
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
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const axios = axiosInstance({config:config,tokenCheck:true})
    return useQuery({
        cacheTime:0,
        refetchInterval:1000*60,
        queryKey:['verifyToken'],
        queryFn:async ()=>{
            const response = await axios.get(`/auth/verifyToken/`)
            console.log(response);
            return response.data
        },
        retry:false,
        enabled:!!token,
        onSuccess:(data)=>successCallback(data.message),
        // error state is handle by axios itself
    })
}

export const useSessionQuery = ()=>{
    const axios = axiosInstance({sessionCheck:true})
    const dispatch = useDispatch()

    return useQuery({
        queryKey:['session'],
        queryFn:async ()=>{
            const response = await axios.get('/auth/check-session',{withCredentials: true})
            // check for any good fix
            sessionStorage.setItem('user',JSON.stringify(response.data.user))
            console.log(response);
            return response.data
        },
        retry:false,
        refetchOnWindowFocus:false,
        refetchInterval:1000*60*5,
        refetchIntervalInBackground: false,
        cacheTime:0,
        onSuccess:(data)=>{
            dispatch(userActions.login(data.user))
        },
    })
}

export const logOutApi = async()=>{
    const axios = axiosInstance()
    const response = await axios.get('/auth/logout',{withCredentials:true})
    window.localStorage.removeItem('token')
    window.location.href = '/auth'
    return response.data
}