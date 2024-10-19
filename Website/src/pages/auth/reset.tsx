import { useState } from "react"
import { useForm } from "react-hook-form"
import { RiseLoader} from 'react-spinners'
import { ErrorMessage } from "@hookform/error-message"
import { BarLoader } from "react-spinners"
import { useParams } from "react-router-dom"
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"
import { useResetMutation, useVerifyTokenQuery } from "../../api/auth"

interface formValues{
    password:string,
    cnfrmPassword:string
}

const Reset = ()=>{
    const {handleSubmit,register,formState,setError} = useForm<formValues>()
    const params = useParams()
    const {isLoading} = useVerifyTokenQuery(params.token||'')
    const [showPassword,setShowPassword] = useState(false)
    const {mutate,isLoading:mutationLoading} = useResetMutation()

    const submitForm = async(data:formValues)=>{
        if(data.password!=data.cnfrmPassword){
            setError('password',{message:"Passwords doesn't match"})
            setError('cnfrmPassword',{message:"Passwords doesn't match"})
            return 
        }
        if(params.token) mutate({password:data.password,token:params.token})
        console.log(data);
    }


    return(
        <div className="w-full relative h-full ">
            {isLoading&&(
                <div className="absolute top-1/2 flex justify-center items-center bg-gray-500/40 backdrop-blur-sm left-1/2 w-full h-full -translate-y-1/2 -translate-x-1/2">
                    <article className="flex flex-col items-center justify-around gap-5">
                        <RiseLoader className="text-glassBlue" size={20}/>
                        <span className="text-main font-medium inline-block">Veriying Token</span>
                    </article>
                </div>
            )}
            <form className="max-w-sm m-auto flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
                <div className="input-field flex flex-col">
                    <label htmlFor="">Password</label>
                    <article className="w-full border-2 border-blue rounded-xl bg-white flex items-center">
                        <input placeholder="Enter your password" className="bg-transparent p-2.5 rounded-lg outline-none  h-full flex-1" type={showPassword?"text":"password"} {...register('password',{required:{value:true,message:"Password cannot be empty"},minLength:{value:6,message:"Minimum length of password is 6"}})}/>   
                        <button type="button" className="p-2 pe-4" onClick={()=>setShowPassword(prev=>!prev)}>
                            {showPassword?
                                <RiEyeFill/>
                                :<RiEyeOffFill/>
                            }
                        </button>
                    </article>
                    <ErrorMessage 
                        render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} 
                        name="password" 
                        errors={formState.errors}
                    />
                </div>
                <div className="input-field flex flex-col">
                    <label htmlFor="" className="text-xs">Confirm Password</label>
                    <input type={showPassword?"text":"password"} placeholder="Enter your Password" className="input-box border-2 border-blue rounded-xl p-2" {...register('cnfrmPassword')}/>
                    <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="cnfrmPassword"/>
                </div>
                <div className="input-wrapper">
                <button type="submit" className={`bg-green-500 rounded-md flex flex-col items-center justify-center gap-2 ${mutationLoading?"cursor-none":""} text-white w-full shadow-md p-2`}>
                        Reset Password
                        {mutationLoading&&(<BarLoader color="white"/>)}
                </button>
                </div>
            </form>
        </div>
 
    )
}

export default Reset