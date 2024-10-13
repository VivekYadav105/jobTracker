import { Outlet } from "react-router-dom"

const AuthWrapper:React.FC = ()=>{
    return(
        <section className="min-h-screen">
            {<Outlet/>}
        </section>
    )
}

export default AuthWrapper