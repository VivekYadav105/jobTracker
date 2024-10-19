import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios, { AxiosError } from 'axios'
import { ErrorMessage } from "@hookform/error-message"
import { BarLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"

const ForgotPassword = ()=>{
    const {handleSubmit,register,formState} = useForm<{email:string}>()
    const navigate = useNavigate()
    const [mode,] = useState(0)
    const [loading,setLoading] = useState(false)


    const submitForm = async(data:{email:string})=>{
        try{
            setLoading(true)
            const response = await axios.post('/user/forgot',data)
            if(response.status==200){
                localStorage.setItem('verifyToken',response.data.token)
                toast.success(response.data.message)
                navigate('/auth/verifyOtp/resetCred')
            }
        }catch(err){
            if(err instanceof AxiosError || err instanceof Error){
                toast.error(err.message)
            }
        }finally{
            setLoading(false)
        }
    }

    return(

                <form className="max-w-sm m-auto flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
                    {mode==0&&(
                        <div className="input-field flex flex-col">
                            <label htmlFor="" className="text-xs">Email</label>
                            <input type="text" placeholder="Enter your email" className="input-box border-2 border-blue outline-none rounded-md p-2" {...register('email',{required:{value:true,message:"Email is required"}})}/>
                            <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="email"/>
                        </div>
                    )}
                    <div className="input-wrapper">
                    <button type="submit" className={`bg-green-500 rounded-md flex flex-col items-center justify-center gap-2 ${loading?"cursor-none":""} text-white rounded-sm w-full shadow-md p-2`}>
                        Send OTP
                        {loading&&(<BarLoader color="white"/>)}
                    </button>
                    </div>
                </form>

    )
}

export default ForgotPassword