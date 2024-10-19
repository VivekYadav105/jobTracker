import React from "react"

type InputProps = {
    inputProps:Omit<React.InputHTMLAttributes<HTMLInputElement>,'classname'>,
    labelProps?:Omit<React.LabelHTMLAttributes<HTMLLabelElement>,'children'>,
    labelText?:string
}

const InputElement:React.FC<InputProps> = (props)=>{
    return(
        <article className="input-field flex flex-col">
            <label {...props.labelProps} htmlFor={props.inputProps.id} className="text-xs">{props.labelText}</label>
            <input {...props.inputProps} className="input-box border-2 border-blue bg-transparent p-2 rounded-lg outline-none"/>
        </article>
    )
}

export default InputElement