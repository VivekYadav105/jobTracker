import { createSlice } from "@reduxjs/toolkit";

interface user{
    _id:string,
    fname:string,
    lname?:string,
    socials:{name:string,url:string}[],
    email:string,
    skills:string[]
    education:[{name:string}],
    area_of_intrest:[{name:string}],
    __v:number
}

const userSlice = createSlice({
    name:'user',
    initialState:null as user|null,
    reducers:{
        getUser:(state)=>state,
        login:(state,action)=>{
            state = action.payload
            return state
        },
        logout:(state)=>{
            state = null
            return state
        }
    }
})

export default userSlice.reducer
export const userActions = userSlice.actions