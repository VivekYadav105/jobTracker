interface PlatformTileProps{
    name:string,
    domain:string,
    count:number,
    platformLink:string
}

const PlatformTile:React.FC<PlatformTileProps> = (props)=>{
    return(
        <article className="border-2 hover:shadow-lg duration-300 shadow-glassBlue hover:bg-glassBlue hover:text-blue hover:border-transparent backdrop-blur-sm gradient gap-2 rounded-xl w-fit p-1 px-3 text-sm 300 flex items-center justify-center">
            <img className="w-4 h-4" src={`https://www.google.com/s2/favicons?domain=${props.domain}`} alt="" />
            <span>{props.name}</span>
            <span className="border-2 rounded-full p-1 flex items-center justify-center aspect-square w-6 h-6 text-xs font-medium">{props.count||0}</span>
        </article>
    )
}

export default PlatformTile