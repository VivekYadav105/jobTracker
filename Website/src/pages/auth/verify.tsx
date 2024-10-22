import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useVerifyUserQuery } from "../../api/auth";
import toast from "react-hot-toast";

const Verify:React.FC = ()=>{
    const params = useParams()
    const {isSuccess,isLoading,isError} = useVerifyUserQuery(params.token||'')

    if(isError){
        toast.error("Invalid token")
    }

    if(isSuccess){
        toast.success("Account verified successfully")
        return <Navigate to={'/auth/login'}/>
    }

    return(
        <div className="h-full w-full flex justify-center items-center">
            {isLoading&&(
                <>
                <span>Verifying user</span>
                <BeatLoader loading={true} size={20}/>
                </>
            )}
            {isError&&(
                <span>Invalid token or session expired</span>
            )}
        </div>
    )
}

export default Verify