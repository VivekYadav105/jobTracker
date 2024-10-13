const JobCard:React.FC = ()=>{
    return(
        <div className="border-2  w-[250px] bg-blue rounded-xl">
            <article className="flex border-b-2  rounded-t-xl items-center p-2">
                <img src="/logo.png" className="rounded-full w-8 h-8 me-2" alt="" />
                <article className="flex flex-col flex-1 gap-0">
                    <p className="text-md flex-1 text-center text-white">Role</p>
                    <p className="text-center text-xs">Job Company</p>
                </article>
            </article>
            <article className="flex px-3 p-1 bg-white items-center">
                <span className="text-sm">Experience:</span>
                <span className="bg-glassBlue shadow-md border-[1px] border-blue p-1 rounded-xl text-xs mx-2 px-2">3+ years</span>
            </article>
            <article className="flex px-3 p-1 bg-white items-center">
                <h1 className="text-sm me-2">Skills:</h1>
                <ul className="flex items-center flex-wrap gap-2">
                    <li className="text-xs uppercase font-mono bg-glassBlue border-[1px] rounded-xl shadow-md border-blue p-1">python</li>
                    <li className="text-xs uppercase font-mono bg-glassBlue border-[1px] rounded-xl shadow-md border-blue p-1">python</li>
                    <li className="text-xs uppercase font-mono bg-glassBlue border-[1px] rounded-xl shadow-md border-blue p-1">python</li>
                    <li className="text-xs uppercase font-mono bg-glassBlue border-[1px] rounded-xl shadow-md border-blue p-1">python</li>
                    <li className="text-xs uppercase font-mono bg-glassBlue border-[1px] rounded-xl shadow-md border-blue p-1">python</li>
                </ul>
            </article>
            <article className="flex items-center p-2 border-t-2 border-white  bg-orange rounded-b-xl  justify-between">
                <article className="flex items-center gap-2">
                    <span className="text-xs">
                        Applied On:
                    </span>
                    <article className="rounded-xl p-.5 px-2 bg-white text-blue shadow-md w-fit">
                        <span className="text-sm">Naukri</span>
                    </article>
                </article>
                <article >
                    <span className="text-[10px] font-medium text-blue">24/08/2020</span>
                </article>
            </article>
        </div>
    )
}

export default JobCard