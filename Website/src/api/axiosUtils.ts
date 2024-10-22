import axios, { AxiosError, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

type InstanceProps = {
    config?:AxiosRequestConfig,
    sessionCheck?:boolean,
    tokenCheck?:boolean
}

const axiosInstance = (params?:InstanceProps) => {
    const {config,sessionCheck} = params || {}
    const instance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true,
    ...config
    })

    instance.interceptors.response.use(
        (response)=>response,
        (error: AxiosError) => {
            if (error.response) {
                if (error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                    error.message = error.response.data.message as string
                }
                if(error.response.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
                    error.message = error.response.data.error as string
                }
                if (error.response.status === 401 || error.response.status === 403) {
                    if(!sessionCheck){
                        toast.error(error.message)
                        setTimeout(() => {
                            localStorage.removeItem('token');
                            window.location.href = '/auth/login';
                        }, 800); 
                    }
                }
                if(error.response.status === 500){
                    
                    toast.error("Some Issue with the backend")
                }
            }else{
                console.log("inside");
                toast.error("Trouble connecting to Backend")
            }
            return Promise.reject(error)
    })

    return instance
}


export default axiosInstance