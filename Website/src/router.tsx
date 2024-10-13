import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import HomeWrapper from "./wrapper/homeWrapper";
import AuthWrapper from "./wrapper/authWrapper";

const router = createBrowserRouter([
    {
        path:'/',
        element:<HomeWrapper/>,
        children:[
            {
                index:true,
                element:<Home/>
            },        
            {
                path:"profile",
                element:<Profile/>
            },
        ]
    },
    {
        path:'auth',
        element:<AuthWrapper/>,
        children:[
            {
                index:true,
                element:<Navigate to={'login'}/>
            },
            {
                path:'login',
                element:<span>Login</span>
            }
        ]
    }
])

export default router