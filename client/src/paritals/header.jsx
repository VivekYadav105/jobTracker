import PropTypes from "prop-types"
import { useState } from "react"

const Header = (props)=>{

    const [showSearch,setShowSearch] = useState(false)

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
                    <button onClick={props.openJobPanel} id='add-job' className="main-btn circle">
                        <i className="fa-regular fa-plus"></i>
                    </button>
                </article>
            </article>
        </div>
    )
}

Header.propTypes = {
    openJobPanel:PropTypes.func,
}

export default Header