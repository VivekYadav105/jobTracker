import React from "react"
import { useFieldArray, useForm } from "react-hook-form"
import {RiGithubFill} from "react-icons/ri"
import PopUpWrapper from "./popup"
import { useSearchParams } from "react-router-dom"
import InputElement from "../ui/input"
import { MdAdd, MdDelete } from "react-icons/md"
import { useSelector } from "react-redux"
import { RootState } from "../store"

interface formValues{
    data:{name:string,url:string}[]
}


const SocialsPopup:React.FC = ()=>{
    const user = useSelector((state:RootState)=>state.user)
    const [searchParams,setSearchParams] = useSearchParams()
    const {handleSubmit,register,control} = useForm({
        defaultValues:{
            data:user?.socials||[]
        }
    })
    const {fields,append,remove} = useFieldArray({
        control:control,
        name:"data"
    })
    
    function closeSocialPopup(){
        setSearchParams(prev=>{
            prev.delete('socialsPanel')
            return prev
        })
    }

    function submitForm(formdata:formValues){
        console.log(formdata);
        console.log("submitteing ");
        
    }

    return(
        <PopUpWrapper onClose={closeSocialPopup} open={Boolean(searchParams.get('socialsPanel'))} size="md" header={<h1 className="text-center">Add Socials</h1>}>
            <form className="full flex flex-col bg-white p-3 mt-2 rounded-md gap-2" onClick={handleSubmit(submitForm)}>
                {fields.length==0&&(
                    <p>Get started by adding your profile</p>
                )}
                {fields.map((field,index)=>(
                    <div className="flex w-full items-center gap-2">
                        <div className="flex grow w-px me-2 items-center gap-2">
                            <div className="w-1/2">
                                <article className="w-full flex items-center gap-2">
                                    <RiGithubFill size={20} className="mt-2"/>
                                    <article className="flex-1 w-px">
                                        <InputElement key={field.id} labelText="Platform" inputProps={{type:"text",...register(`data.${index}.name`,{required:true})}}/>
                                    </article>
                                </article>
                            </div>
                            <div className="w-1/2">
                                <InputElement key={field.id} labelText="Link" inputProps={{type:"text",...register(`data.${index}.url`,{required:true})}}/>                    
                            </div>
                        </div>
                        <div className="flex gap-2 items-center mt-3">
                            <button type="button" onClick={()=>{remove(index)}} className="p-1 rounded-md border-transparent border-2 duration-300 hover:text-red-800 hover:border-red-800">
                                <MdDelete size={20}/>
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex w-full gap-2">
                    <button type="submit" className="main-button">Submit</button>
                    <button type="button" onClick={()=>{append({name:"",url:""})}} className="icon-button">
                        <MdAdd size={20}/>
                    </button>
                </div>
            </form>
        </PopUpWrapper>
    )

}

export default SocialsPopup