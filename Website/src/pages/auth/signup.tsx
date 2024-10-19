import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { BarLoader } from "react-spinners"
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"
import { useSignUpMutation } from "../../api/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface formValues{
    fname:string,
    lname:string,
    email:string,
    password:string,
    cnfrmPassword:string
}

const Signup = ()=>{
    const {handleSubmit,register,formState,setError} = useForm<formValues>()
    
    const {mutate,isLoading} = useSignUpMutation()
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    
    const submitForm = async(data:formValues)=>{
        if(data.password!=data.cnfrmPassword){
            setError('password',{message:"Passwords doesn't match"})
            setError('cnfrmPassword',{message:"Passwords doesn't match"})
            return 
        }
        mutate(data)
    }

    return(
        <form className="max-w-sm w-full flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
            <div className="input-field w-full flex gap-2 items-center">
                <article className="flex flex-col flex-1">
                    <label htmlFor="" className="text-xs">First Name</label>
                    <input type="text" placeholder="Enter your First Name" className="w-full border-2 border-blue outline-none rounded-xl p-2" {...register('fname',{required:{value:true,message:"fname required"}})}/>
                    <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="fname"/>
                </article>
                <article className="flex flex-col flex-1">
                    <label htmlFor="" className="text-xs">Last Name</label>
                    <input type="text" placeholder="Enter your Last Name" className="w-full border-2 border-blue rounded-xl p-2"  {...register('lname')}/>
                </article>
            </div>
            <div className="input-field flex flex-col">
                <label htmlFor="" className="text-xs">Email</label>
                <input type="text" placeholder="Enter your Email" className="input-box w-full border-2 border-blue outline-none rounded-xl p-2" {...register('email',{required:{value:true,message:"email is required"}})}/>
                <ErrorMessage render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} errors={formState.errors} name="email"/>
            </div>
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
                <label htmlFor="">Confirm Password</label>
                <input placeholder="Enter your password" className="input-box w-full border-2 border-blue outline-none rounded-xl p-2" type={showPassword?"text":"password"} {...register('cnfrmPassword',{required:{value:true,message:"Password cannot be empty"}})}/>   
                <ErrorMessage 
                    render={({message})=><span className="text-red-600 text-xs ps-2 mt-1">{message}</span>} 
                    name="password" 
                    errors={formState.errors}
                />
            </div>
            <div className="input-wrapper">
                <button type="submit" className={`flex flex-col items-center bg-green-500 rounded-xl justify-center gap-2 ${isLoading?"cursor-none":""} text-white w-full shadow-md p-2`}>
                    Create account
                    {isLoading&&(<BarLoader color="white"/>)}
                </button>
            </div>
            <article className="border-t-2 hidden md:inline-block relative border-gray-500">
                <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#F3FFDA] p-1 text-xs inline-block rounded-xl">Or</span>
            </article>
            <div className="input-wrapper">
                <article className="text-xs text-center">
                    Already have an account?<button onClick={()=>navigate('/auth/login')} type="button" className="text-xs mx-1 underline text-medium text-main">Log in Here</button>
                </article>
            </div>
        </form>
        
    )
}

export default Signup