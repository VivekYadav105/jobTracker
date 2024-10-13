import React from "react"
import { MdAdd, MdEdit } from "react-icons/md"

const Profile:React.FC = ()=>{
    return(
        <div className="grid grid-cols-12 grow gap-4">
            <div className="col-span-3">
                <div className="w-full bg-white rounded-lg flex flex-col items-center gap-5 p-5 shadow-lg">
                    <img className="rounded-full w-16 h-16" src="/avatar.jpg" alt="" />
                    <h1>Vivek Yadav P</h1>
                </div>
                <div className="w-full bg-white my-2 rounded-lg p-5 pb-1 gap-2">
                    <article className="flex items-center mb-2">
                        <h1  className="ps-2 font-medium flex-1">Area of Interest</h1>
                        <button className="text-xs underline text-violet-400">View All</button>
                    </article>
                    <ul className="flex items-center flex-wrap">
                        <li className="border-2 border-blue-600 text-blue-600 text-xs p-1 px-2 hover:bg-blue-300 duration-300 rounded-xl">Full-stack web developemnt</li>
                    </ul>
                    <article className="flex items-center justify-end gap-1">
                        <button className="text-medium m-1 justify-center hover:bg-gray-200 flex items-center rounded-md w-8 h-8">
                            <MdAdd/>
                        </button>
                        <button className="text-medium justify-center hover:bg-gray-200 flex items-center rounded-md w-8 h-8">
                            <MdEdit/>
                        </button>
                    </article>
                </div>
                <div className="w-full bg-white my-2 rounded-lg p-5 pb-1 gap-2">
                    <article className="flex items-center mb-2">
                        <h1  className="ps-2 font-medium flex-1">Education</h1>
                        <button className="text-xs underline text-violet-400">View All</button>
                    </article>
                    <ul className="flex items-center flex-wrap">
                        <li className="border-2 border-blue-600 text-blue-600 text-xs p-1 px-2 hover:bg-blue-300 duration-300 rounded-xl">Full-stack web developemnt</li>
                    </ul>
                    <article className="flex items-center justify-end gap-1">
                        <button className="text-medium m-1 justify-center hover:bg-gray-200 flex items-center rounded-md w-8 h-8">
                            <MdAdd/>
                        </button>
                        <button className="text-medium justify-center hover:bg-gray-200 flex items-center rounded-md w-8 h-8">
                            <MdEdit/>
                        </button>
                    </article>
                </div>
            </div>
            <div className="col-span-9 h-full flex flex-col md:flex-row gap-3">
                <div className="w-full h-full bg-white rounded-lg p-3 gap-2">
                    <h1>Applied Portals</h1>
                    <div className=""></div>
                </div>
                <div className="w-full h-full bg-white rounded-lg p-3 gap-2">
                    <h1>Recent Applications</h1>
                    <div className=""></div>
                </div>
            </div>
        </div>

    )
}

export default Profile