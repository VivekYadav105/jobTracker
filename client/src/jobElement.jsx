import PropTypes from "prop-types"
import { useSearchParams } from "react-router-dom"

const JobElement = (props) =>{

    return(
        <div className="job-wrapper">
            <div className="job">
                <img src="https://icon.horse/icon/stackoverflow.com"/>
                <article className="company-info">
                    <span className="company">{props.company}</span>
                    <span className="role">{props.role}</span>
                </article>
                <article className="application-info">
                    <article style={{position:"relative"}} className={`status ${props.status}`}>
                        <select name='status' style={{width:'100%',cursor:'pointer',border:"0",borderRadius:'0',backgroundColor:'transparent'}}>
                            <option value=''></option>
                            <option value='Applied'>Applied</option>
                            <option value='Scheduled'>Scheduled</option>
                            <option value='Rejected'>Rejected</option>
                            <option value='Approved'>Approved</option>
                        </select>
                    </article>
                    <span className="applied-on">{props.appliedOn}</span>
                </article>
            </div>
            <article className="actions">
                <button onClick={props.editJob} className="secondary-btn">Edit</button>
                <button onClick={props.deleteJob} className="secondary-btn">Delete</button>
                <a href={props.trackSite} target='_black'>
                    <button className="secondary-btn">Visit</button>
                </a>
            </article>
        </div>
    )
}

JobElement.propTypes  = {
    role:PropTypes.string.isRequired,
    company:PropTypes.string.isRequired,
    trackSite:PropTypes.string,
    appliedOn:PropTypes.string.isRequired,
    changeStatus:PropTypes.func,
    status:PropTypes.string,
    jobId:PropTypes.string,
    editJob:PropTypes.func,
    deleteJob:PropTypes.func
}

export default JobElement