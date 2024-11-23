interface ApplicationTileProps{
    companyName:string,
    jobTitle:string,
    trackLink:string,
    jobDescription?:string,
    portalLink?:string,
    companyLink?:string,
    resumeUploaded:string,
    appliedOn:string,
    status:string
}

const ApplicationTile:React.FC<ApplicationTileProps> = (props)=>{
    return(
        <div className="flex flex-col backdrop-blur-lg bg-sky-500/20 rounded-md p-2">
            <div className="flex items-center justify-around">
                <article>
                    <img className="w-4 h-4" src={`https://www.google.com/s2/favicons?domain=${props.companyLink}`} alt="" />
                </article>
                <article className="flex flex-col">
                    <span className="text-sm">{props.jobTitle}</span>
                    <span className="text-xs text-gray-500">{props.companyName}</span>
                </article>
                <article></article>
            </div>
            <article className="flex items-center justify-evenly pt-4">
                <button className="text-[10px] p-1 rounded-xl border-2 border-glassBlue text-blue">View Status</button>
                <button className="text-[10px] p-1 rounded-xl border-2 border-glassBlue text-blue">View Resume</button>
                <button className="text-[10px] p-1 rounded-xl border-2 border-glassBlue text-blue">Job description</button>
            </article>
        </div>
    )
}

export default ApplicationTile