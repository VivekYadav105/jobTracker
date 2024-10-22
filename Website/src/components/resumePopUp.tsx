import React from "react";
import PopUpWrapper from "./popup";
import { useSearchParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import InputElement from "../ui/input";
import { MdAdd, MdDelete } from "react-icons/md";

interface popupData{
    data:Array<{resume_name:string,role_name:string}>
}

const ResumePopup:React.FC = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    const {handleSubmit,register,control} = useForm<popupData>()
    const {fields,append,remove} = useFieldArray({
        control:control,
        name:"data"
    })

    const submitForm = (data:popupData)=>{
       console.log(data);
    }

    function closeResumePopUp(){
        setSearchParams(prev=>{
            prev.delete('resumePanel')
            return prev
        })
    }

    return(
        <PopUpWrapper size="md" header={'Add Resume'} open={Boolean(searchParams.get('resumePanel'))} onClose={closeResumePopUp}>
            <form className="w-full flex flex-col bg-white p-3 mt-2 rounded-md gap-2" onSubmit={handleSubmit(submitForm)}>
                {fields.length==0&&(
                    <p className="p-4">Start adding your resume by clicking add  button</p>
                )}
                {fields.map((field,index)=>(
                    <div className="flex w-full items-center gap-2">
                        <div className="flex grow w-px me-2 items-center gap-2">
                            <div className="w-1/2">
                                <InputElement key={field.id} labelText="Role Name" inputProps={{type:"file",...register(`data.${index}.resume_name`)}}/>
                            </div>
                            <div className="w-1/2">
                                <InputElement key={field.id} labelText="Role Name" inputProps={{type:"text",...register(`data.${index}.role_name`)}}/>                    
                            </div>
                        </div>
                        <div className="flex gap-2 items-center mt-3">
                            <button onClick={()=>{remove(index)}} className="p-1 rounded-md border-transparent border-2 duration-300 hover:text-red-800 hover:border-red-800">
                                <MdDelete size={20}/>
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex w-full gap-2">
                    <button className="main-button">Submit</button>
                    <button onClick={()=>{append({resume_name:"",role_name:""})}} className="icon-button">
                        <MdAdd size={20}/>
                    </button>
                </div>
            </form>
        </PopUpWrapper>
    )
}

export default ResumePopup