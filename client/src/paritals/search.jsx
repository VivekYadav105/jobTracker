import PropTypes from "prop-types"

function Search(props){
    
    return(
        <div className={`search-wrapper ${props.showSearch?"":"close"}`}>
                <input onChange={(e)=>{props.updateSearch(e.target.value)}} className="search-bar" id="job-search" placeholder="search your job" type="text"/>
                <button onClick={props.closeSearch} id="close-search" style={{backgroundColor: "white"}}  className="main-btn circle">
                    <i className="fa-solid fa-xmark"></i>
                </button>            
            </div>
    )
}

Search.propTypes = {
    updateSearch:PropTypes.func,
    showSearch:PropTypes.bool.isRequired,
    closeSearch:PropTypes.func
}

export default Search
