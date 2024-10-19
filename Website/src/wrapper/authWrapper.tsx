import { Outlet,Navigate } from "react-router-dom"

const AuthWrapper = ()=>{

    if(localStorage.getItem('token')){
        return <Navigate to='/'/>
    }

    return(
        <section className="h-screen flex flex-row items-center justify-center">
                <div className="h-full w-1/2 p-20 hidden lg:flex items-center justify-center">
                    <img src={'/logo.png'} className="object-contain w-full grow rounded-xl" alt=""/>
                </div>
                <div className="flex-1 overflow-y-scroll bg-white h-full flex flex-col">
                    <div className="flex justify-center sm:p-5 items-center ">
                        <div className="p-5 sm:p-8 md:p-5 w-full max-w-md bg-lime-500/30  lg:bg-transparent rounded-xl shadow-xl lg:shadow-none">
                            <img src="/logo.png" className="m-auto w-[180px] md:hidden h-[60px] mb-5 p-3 bg-white rounded-md"/>
                            <article className="text-center md:mb-10">
                                <h1 className="text-2xl md:text-4xl font-semibold">Welcome to <span id="alt-text" className="text-main">Job Board</span></h1>
                                <p className="font-semibold mt-3">Login to your account</p>
                            </article>
                            <Outlet/>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default AuthWrapper