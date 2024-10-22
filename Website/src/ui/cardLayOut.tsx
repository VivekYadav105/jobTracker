import React from "react"

const CardLayout:React.FC<{children:React.ReactNode,className?:string}> = (props)=>{
    return(
        <div className={`w-full ${props.className} bg-white rounded-lg p-3 gap-2`}>
            {props.children}
        </div>
    )
}

export default CardLayout