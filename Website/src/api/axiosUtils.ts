import axios, { AxiosError, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const axiosInstance = (config?:AxiosRequestConfig) => {
    const instance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json",
    },
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
                    toast.error(error.message)
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        window.location.href = '/auth/login';
                    }, 800); 
                }
            }
            return Promise.reject(error)
    })

    return instance
}


export default axiosInstance