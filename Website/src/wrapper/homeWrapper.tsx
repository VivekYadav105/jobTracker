import { Outlet } from "react-router-dom"
import Header from "../components/header"
import { Navigate } from "react-router-dom"

const HomeWrapper = ()=>{

    if(!localStorage.getItem('token')){
        return <Navigate to='/auth/login'/>
    }

    return(
        <section className="min-h-screen h-px flex flex-col grow">
            <Header/>
            <section className="w-full flex flex-col grow p-5">
                <Outlet/>
            </section>
        </section>
    )
}

export default HomeWrapper