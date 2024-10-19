import React from "react"

const CardLayout:React.FC<{children:React.ReactNode,className?:string}> = (props)=>{
    return(
        <div className={`w-full ${props.className} bg-white my-2 rounded-lg p-5 pb-1 gap-2`}>
            {props.children}
        </div>
    )
}

export default CardLayout