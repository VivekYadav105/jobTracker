import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const Header = ()=>{

    const [showSearch,setShowSearch] = useState(false)
    const [searchParams,setSearchParams] = useSearchParams()

    function openJobPopUp(){
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.append('popUp', 'add');

            // Log new search parameters after appending
            console.log('Updated Search Params:', newParams.toString());
            return newParams;
        });

    }

    return(
        <div className="header-wrapper">
            <article className="header">
                <h3>JOB BOARD</h3>
                <article className="header-buttons">
                    {!showSearch&&(
                        <button className="main-btn circle" id="search" onClick={()=>setShowSearch(true)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    )}
                    <button className="main-btn circle">
                        <i className="fa-regular fa-file"></i>
                    </button>
                    {!searchParams.get('popUp')&&(
                        <button onClick={openJobPopUp} id='add-job' className="main-btn circle">
                            <i className="fa-regular fa-plus"></i>
                        </button>
                    )}
                </article>
            </article>
        </div>
    )
}


export default Header