import { useEffect, useState } from "react"
import useAxios from "../api/axiosInstance"
import { useNavigate } from "react-router-dom"

const Auth = ()=>{
    const [axios,{data,loading,error}] = useAxios()
    
    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate()
    
    const handleSubmit = async(e)=>{
        const {password,userId} = e.target
        axios.post('/user/login',{
            email:userId.value,
            password:password.value
        }) 
    }

    useEffect(()=>{
        if(data&&data.success==true){
            navigate('#/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])


    return(
        <section className="wrapper" style={{backgroundColor:"rgb(202, 194, 255)"}}>
            <div className='header-wrapper header'>
                <h1 style={{textAlign:"center",color:"teal"}}>Job Board</h1>
                <p style={{width:"200px",textAlign:"center",fontSize:12,margin:"auto"}}>An application that helps you keep track of your jobs</p>
            </div>
            <form className="" onSubmit={handleSubmit} style={{width:"80%",margin:"auto",backgroundColor:""}}>
                <h2 style={{textAlign:"center",color:"teal"}}> Login </h2>
                <div className="input-wrapper">
                    <label htmlFor="role">Username</label>
                    <input id='username' name='username' placeholder='Enter username' type="text"/>
                </div>
                {error&&<span>Error Text</span>}
                {loading&&<span>Loading</span>}
                <div className="input-wrapper">
                    <label htmlFor="trackLink">Password</label>
                    <article style={{width:"100%",display:"flex",position:"relative",alignItems:"center"}}>
                        <input id='password' name="password" placeholder='Enter the Password' style={{flexGrow:1}} type={showPassword?"text":"password"}/>
                        <button style={{position:"absolute",top:"50%",transform:"translateY(-50%)",right:5,width:30,height:30,borderRadius:10}} type="button" onClick={()=>setShowPassword(prev=>!prev)} className="secondary-btn">
                            {showPassword?<img width={16} src="/eye-strike.png" alt="show"/>:<img width={16} src="/eye.png" alt="hide" />}
                        </button>
                    </article>
                </div>
                <div className='input-wrapper' style={{margin:"15px 0px 10px 0px"}}>
                    <button aria-label='submit-job-form' type='submit' className='secondary-btn' style={{margin:"auto"}}>submit</button>
                </div>
                <hr style={{marginBottom:"10px"}}/>
                <article style={{color:"gray",width:"100%",alignItems:"center",margin:"auto",fontSize:10,display:"flex",justifyContent:"center"}}>To create Account <a href="" style={{textDecoration:"underline",marginLeft:"5px"}}>click here</a></article>
            </form>
            
        </section>
    )
}

export default Auth