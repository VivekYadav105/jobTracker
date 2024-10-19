import { useState } from "react"
import { useForm } from "react-hook-form"
import {BarLoader} from 'react-spinners';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'
import { ErrorMessage } from "@hookform/error-message"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../api/auth";

interface formDetails{
    email:string,
    password:string
}

const Login = ()=>{
    const {handleSubmit,register,formState,setValue} = useForm<formDetails>()

    const {mutate,isLoading} = useLoginMutation()
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)

    const submitForm = async(data:formDetails)=>{
        mutate(data)
    }

    const demoCred = ()=>{
        const password = import.meta.env.VITE_DUMMY_PASS
        const email = import.meta.env.VITE_DUMMY_EMAIL
        setValue('password',password)
        setValue('email',email)
    }

    return(
        <form className="max-w-sm m-auto flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
            <div className="input-field flex flex-col">
                <label htmlFor="" className="text-xs">Email</label>
                <input type="text" placeholder="Enter your User ID" className="input-box bg-white border-2 border-blue bg-transparent p-2 rounded-lg outline-none"  {...register('email',{required:{value:true,message:"UserId is required"}})}/>
                <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="email"/>
            </div>
            <div className="input-field flex flex-col">
                <label htmlFor="">Password</label>
                <article className="w-full border-2 border-blue rounded-xl bg-white flex items-center">
                    <input placeholder="Enter your password" className="bg-transparent p-2.5 rounded-lg outline-none  h-full flex-1" type={showPassword?"text":"password"} {...register('password',{required:{value:true,message:"Password cannot be empty"}})}/>   
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
                <Link to={'/auth/forgot'} className="self-end mt-2">
                    <button type="button" className="text-xs bg-transparent border-0 hover:text-violet-500 cursor-pointer duration-300">Forgot Password</button>
                </Link>
            </div>
            <div className="input-wrapper flex itemx-center gap-2">
                <button type="submit" className={`main-button flex-1 flex-col ${isLoading?"cursor-not-allowed":""}`}>
                    Login
                    {isLoading&&(<BarLoader color="white"/>)}
                </button>
                <button type="button" onClick={demoCred} className="bg-blue text-sm p-1 rounded-md shadow-md text-white">use demo credentials</button>
            </div>
            <article className="border-t-2 hidden md:inline-block relative border-gray-500">
                <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#F3FFDA] p-1 text-xs inline-block rounded-xl">Or</span>
            </article>
            <Link to={'/auth/forgot'} className="w-full">
                <button className="bg-blue text-sm p-2 w-full rounded-md shadow-md text-white">
                    Forgot Password
                </button>
            </Link>
            <div className="input-wrapper">
                <article className="text-xs text-center">
                    Don&apos;t have account?<button onClick={()=>navigate('/auth/signup')} type="button" className="text-xs mx-1 underline text-medium text-main">Create Here</button>
                </article>
            </div>
        </form>
    )
}

export default Login