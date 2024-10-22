import axiosInstance from "./axiosUtils"

interface educationPayload{
    school?:string,
    degree?:string,
    field?:string,
    startDate?:string,
    endDate?:string,
    description?:string,
}

const updateUserEducation = async(data:educationPayload)=>{
    const axios = axiosInstance()
    const response = await axios.post('/user/edit',data)
    return response.data
}

export {updateUserEducation}