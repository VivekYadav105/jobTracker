import {useSearchParams} from 'react-router-dom'
import PropTypes from 'prop-types'

 function JobForm(props){

    const [searchParams,] = useSearchParams()

    const parseDate = (dateString,reverse=false,currentFormat='dd-mm-yyyy')=>{
        if(reverse){
            let day,month,year;
            if(currentFormat=='dd-mm-yyyy') [day,month,year] = dateString.split('-')
            const date =  new Date(`${year}-${month}-${day}`)
            console.log(date)
            return `${year}-${month}-${day}`; 
        }
        const date = new Date(dateString).toLocaleDateString('en-US',{day:'2-digit',year:"numeric",month:"2-digit"})
        const [month,day,year] = date.split('/')
        return `${day}-${month}-${year}`
    }

    async function handleSubmit(e){
        try{
            e.preventDefault()
            const [role,company,appliedOn,trackLink,status] = e.target
            const job = {
                role:role.value,
                company:company.value,
                status:status.selectedOptions[0].value,
                appliedOn:parseDate(appliedOn.value),
                trackLink:trackLink.value
            }
            if(searchParams.get('popUp')=='add'){
                await props.addJob(job)
            }else if(searchParams.get('popUp')=='edit'){
                console.log('here');
                const key = searchParams.get('jobId')
                await props.updateJob(key,job)
            }
            props.closeJobPanel()
        }catch(err){
            console.log(err);
        }
    }
    


    return(
        <div className={props.open?"":'close'} id="addJob-wrapper">
            <div className='header' style={{borderRadius:'10px',marginBottom:'10px'}}>
                <h2 style={{textAlign:"center",color:"teal"}}> {searchParams.get('popUp')=='edit'?`Edit Job ${searchParams.get('jobId')}`:'Add Your Job'}</h2>
                <button aria-label='close-jobpanel' onClick={props.closeJobPanel} id="close-addJob" style={{backgroundColor: "white"}}  className="main-btn circle">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <form className="" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="role">Role</label>
                    <input id='role' name='role' defaultValue={props.currentJob?props.currentJob.role:undefined} placeholder='Enter role' type="text"/>
                </div>
                <div>
                    <article className="input-wrapper">
                        <label htmlFor="company">Company</label>
                        <input id='company' placeholder='Enter company' defaultValue={props.currentJob?props.currentJob.company:undefined} name='company' type="text"/>
                    </article>
                    <article className="input-wrapper">
                        <label htmlFor="appliedOn">Applied On</label>
                        <input id='appliedOn' placeholder='Applied On' defaultValue={props.currentJob?props.currentJob.appliedOn:undefined} name='appliedOn' type="date"/>
                    </article>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="trackLink">Link</label>
                    <input id='trackLink' name="trackLink" defaultValue={props.currentJob?props.currentJob.trackLink:undefined} placeholder='Enter the website link' type="text"/>
                </div>
                <div className="input-wrapper" style={{flexDirection:"row",alignItems:"center",justifyContent:"center",margin:"10px 0 "}}>
                    <label htmlFor="status">Status</label>
                    <select id='status' name='status' style={{cursor:'pointer',border:"0",borderRadius:'10px',margin:"0 10px",backgroundColor:'white'}}>
                        <option defaultChecked={props.currentJob?props.currentJob.status=='Applied':undefined} value='Applied' selected>Applied</option>
                        <option defaultChecked={props.currentJob?props.currentJob.status=='Scheduled':undefined} value='Scheduled'>Scheduled</option>
                        <option defaultChecked={props.currentJob?props.currentJob.status=='Rejected':undefined} value='Rejected'>Rejected</option>
                        <option defaultChecked={props.currentJob?props.currentJob.status=='Approved':undefined} value='Approved'>Approved</option>
                    </select>
                </div>
                <div className='input-wrapper'>
                    <button aria-label='submit-job-form' type='submit' className='secondary-btn' style={{margin:"auto"}}>submit</button>
                </div>
            </form>
        </div>
    )
}

JobForm.propTypes={
    closeJobPanel:PropTypes.func,
    updateJob:PropTypes.func,
    open:PropTypes.bool,
    currentJob:PropTypes.object,
    addJob:PropTypes.func
}

export default JobForm