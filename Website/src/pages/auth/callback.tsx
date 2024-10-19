import toast from "react-hot-toast"
import { AxiosError } from "axios"

export const successCallback = (message?:string,redirect?:boolean)=>{
    if(redirect) window.location.href = '/'
    toast.success(message||'success')
}

export const failureCallback = (error:Error|AxiosError,redirect?:boolean)=>{
    console.log("inside error");
    if (error) {
        toast.error(error.message)
    } else {
        toast.error('An unknown error occurred')
    }
    if(redirect) window.location.href = '/'
}