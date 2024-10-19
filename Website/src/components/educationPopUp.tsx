import { Resolver, useForm } from "react-hook-form"
import * as yup from "yup";
import InputElement from "../ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import PopUpWrapper from "./popup";
import { RiAddFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";

interface formValues{
    degreeType:string,
    degreeName:string,
    course:string,
    school:string,
    from:string|Date
    to:string|Date
}

const schema = yup.object().shape({
    degreeType:yup.string().required(),
    degreeName:yup.string().required(),
    course:yup.string().required(),
    school:yup.string().required(),
    from:yup.mixed().test(
        "filed should be date or string",
        "filed should be date or string",
        (value)=>{
            return typeof value === "string" || value instanceof Date
        }
    ).required(),
    to:yup.mixed().test(
        "filed should be date or string",
        "filed should be date or string",
        (value)=>{
            return typeof value === "string" || value instanceof Date
    }).required(),
});

const EducationPopUp = ()=>{

const {handleSubmit,reset,register} = useForm<formValues>({resolver:yupResolver(schema) as unknown as Resolver<formValues>})
    const [,setSearchParams] = useSearchParams()
    function onSubmit(data:formValues){
        console.log(data)
        reset()
    }

function closeEducationPopUp(){
        setSearchParams(prev=>{
            prev.delete('educationPanel')
            return prev
        })
    }

    return(
        <PopUpWrapper onClose={closeEducationPopUp} size="md" open={true} header={<h1 className="text-center font-medium">Add Education</h1>}>
                <form className="w-full flex flex-col bg-white p-3 mt-2 rounded-md gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <InputElement inputProps={{...register('school')}} labelText="Degree Name" />
                    <div className="flex gap-2 items-center">
                        <InputElement inputProps={{...register('degreeType')}} labelText="Type" />
                        <InputElement inputProps={{...register('degreeName')}} labelText="Degree Name" />
                    </div>
                    <InputElement inputProps={{...register('course')}} labelText="Course" />
                    <div className="flex gap-2 items-center">
                        <article className="flex-1">
                            <InputElement inputProps={{type:'date',...register('from')}} labelText="from" /> 
                        </article>
                        <article className="flex-1">
                            <InputElement inputProps={{type:'date',...register('to')}} labelText="to" /> 

                        </article>
                    </div>
                    <div className="w-full">
                        <button className="main-button">
                            <RiAddFill/>
                            Add Education
                        </button>
                    </div>
                </form>
        </PopUpWrapper>
    )
}

export default EducationPopUp