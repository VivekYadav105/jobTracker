import PropTypes from "prop-types"

const JobElement = (props) =>{

    return(
        <div className="job-wrapper">
            <div className="job">
                <img src="https://icon.horse/icon/stackoverflow.com" alt="logo"/>
                <article className="company-info">
                    <span className="company">{props.company}</span>
                    <span className="role">{props.role}</span>
                </article>
                <article className="application-info">
                    <article style={{position:"relative"}} className={`status ${props.status}`}>
                        <select name='status' style={{width:'100%',cursor:'pointer',border:"0",borderRadius:'0',backgroundColor:'transparent'}}>
                            <option defaultChecked={props.status} value='Applied'>Applied</option>
                            <option defaultChecked={props.status} value='Scheduled'>Scheduled</option>
                            <option defaultChecked={props.status} value='Rejected'>Rejected</option>
                            <option defaultChecked={props.status} value='Approved'>Approved</option>
                        </select>
                    </article>
                    <span className="applied-on">{props.appliedOn}</span>
                </article>
            </div>
            <article className="actions">
                <button aria-label={`edit-${props.jobId}`} onClick={props.editJob} className="secondary-btn">Edit</button>
                <button aria-label={`delete-${props.jobId}`} onClick={props.deleteJob} className="secondary-btn">Delete</button>
                <a href={props.trackLink} target='_black'>
                    <button aria-label={`visit-${props.jobId}`} className="secondary-btn">Visit</button>
                </a>
            </article>
        </div>
    )
}

JobElement.propTypes  = {
    role:PropTypes.string.isRequired,
    company:PropTypes.string.isRequired,
    trackLink:PropTypes.string,
    appliedOn:PropTypes.string.isRequired,
    changeStatus:PropTypes.func,
    status:PropTypes.string,
    jobId:PropTypes.string,
    editJob:PropTypes.func,
    deleteJob:PropTypes.func
}

export default JobElement