import { Outlet } from "react-router-dom"
import Header from "../components/header"
import { useSessionQuery } from "../api/auth"

const HomeWrapper = ()=>{

    const {isSuccess} = useSessionQuery()

    return(
        <section className="min-h-screen h-px flex flex-col grow">
            <Header isLoggedIn={isSuccess}/>
            <section className="w-full flex flex-col grow p-5">
                <Outlet/>
            </section>
        </section>
    )
}

export default HomeWrapper