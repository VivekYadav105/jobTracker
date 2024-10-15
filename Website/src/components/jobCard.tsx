export interface JobCardProps{
    role:string,
    logo?:string,
    company:string,
    experience:string,
    skills:Array<string>,
    platform:string,
    date:string,
    status:string
}

const JobCard:React.FC<JobCardProps> = (props)=>{
    return(
        <div className="border-2 m-auto w-[250px] bg-blue rounded-xl hover:shadow-lg hover:scale-105 duration-300">
            <article className="flex border-b-2  rounded-t-xl items-center p-2">
                <img src="/logo.png" className="rounded-full w-8 h-8 me-2" alt="" />
                <article className="flex flex-col flex-1 gap-0">
                    <p className="text-md flex-1 text-center text-white">{props.role}</p>
                    <p className="text-center text-xs">{props.company}</p>
                </article>
            </article>
            <article className="flex px-3 p-1 bg-white items-center">
                <span className="text-sm">Experience:</span>
                <span className="bg-glassBlue shadow-md border-[1px] border-blue p-1 rounded-xl text-xs mx-2 px-2">{props.experience}</span>
            </article>
            <article className="flex px-3 p-1 bg-white items-center">
                <h1 className="text-sm me-2">Skills:</h1>
                <ul className="flex items-center flex-wrap gap-2">
                    {props.skills?.map((ele,index)=>(
                        <li key={index} className="text-xs uppercase font-mono bg-glassBlue border-[1px] rounded-xl shadow-md border-blue p-1">{ele}</li>

                    ))}
                </ul>
            </article>
            <article className="flex items-center p-2 border-t-2 border-white  bg-orange rounded-b-xl  justify-between">
                <article className="flex items-center gap-2">
                    <span className="text-xs">
                        Applied On:
                    </span>
                    <article className="rounded-xl p-.5 px-2 bg-white text-blue shadow-md w-fit">
                        <span className="text-sm">{props.platform}</span>
                    </article>
                </article>
                <article >
                    <span className="text-[10px] font-medium text-blue">{props.date}</span>
                </article>
            </article>
        </div>
    )
}

export default JobCard