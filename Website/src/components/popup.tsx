import React from "react"
import { RiCloseFill } from "react-icons/ri"
export interface PopUpProps{
    children:React.ReactNode,
    open:boolean,
    onClose:()=>void,
    header?:React.ReactNode|string,
    size?:"sm"|"md"|"lg"|"xl"
}

const PopUpWrapper:React.FC<PopUpProps> = (props)=>{

    return(
        <section className={`${props.open?"":"hidden"} w-screen h-screen bg-gray-700/10 backdrop-blur-sm fixed top-0 left-0 z-50 flex flex-col items-center justify-center`}>
            <div className={`flex shadow-lg  p-3 flex-col bg-blue/40 rounded-xl ${props.size?`max-w-${props.size} h-fit`:"w-full h-full"} relative`}>
                <div className="flex items-center">
                    <article className="grow">{props.header&&props.header}</article>
                    <button className="icon-button" onClick={props.onClose}>
                        <RiCloseFill size={20} onClick={props.onClose}/>
                    </button>
                </div>
                <div className="">
                    {props.children}
                </div>
            </div>
        </section>
    )
}

export default PopUpWrapper