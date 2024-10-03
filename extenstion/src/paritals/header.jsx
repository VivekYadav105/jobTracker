import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom"

const Header = ({showSearch,openSearch})=>{

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
                        <button aria-label="open-search" className="main-btn circle" id="search" onClick={openSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    )}
                    <button aria-label="open-resume" className="main-btn circle">
                        <i className="fa-regular fa-file"></i>
                    </button>
                    {!searchParams.get('popUp')&&(
                        <button aria-label="open-jobForm" onClick={openJobPopUp} id='add-job' className="main-btn circle">
                            <i className="fa-regular fa-plus"></i>
                        </button>
                    )}
                </article>
            </article>
        </div>
    )
}

Header.propTypes = {
    showSearch:PropTypes.bool,
    openSearch:PropTypes.func
}

export default Header