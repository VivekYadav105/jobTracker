import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import HomeWrapper from "./wrapper/homeWrapper";
import AuthWrapper from "./wrapper/authWrapper";
import { Login, Signup } from "./pages/auth";
import Forgot from "./pages/auth/forgot";
import Reset from "./pages/auth/reset";

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
                element:<Navigate to={'login'} />
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'signup',
                element:<Signup/>
            },
            {
                path:"forgot",
                element:<Forgot/>
            },
            {
                path:"reset/:token",
                element:<Reset/>

            }
        ]
    }
])

export default router