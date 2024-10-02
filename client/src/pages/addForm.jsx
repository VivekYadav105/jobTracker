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

    function handleSubmit(e){
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
            console.log(job);            
            let key;
            if(searchParams.get('popUp')=='add'){
                key = Date.now()
            }else if(searchParams.get('popUp')=='edit'){
                key = searchParams.get('jobId')
            }
            props.updateJobs(key,job)
            props.closeJobPanel()
        }catch(err){
            console.log(err);
        }
    }
    


    return(
        <div className={props.open?"":'close'} id="addJob-wrapper">
            <div className='header' style={{borderRadius:'10px',marginBottom:'10px'}}>
                <h2 style={{textAlign:"center",color:"teal"}}> Add Your Job </h2>
                <button onClick={props.closeJobPanel} id="close-addJob" style={{backgroundColor: "white"}}  className="main-btn circle">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <form className="" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="">Role</label>
                    <input name='role' placeholder='Enter role' type="text"/>
                </div>
                <div>
                    <article className="input-wrapper">
                        <label htmlFor="">Company</label>
                        <input placeholder='Enter company' name='company' type="text"/>
                    </article>
                    <article className="input-wrapper">
                        <label htmlFor="">Applied On</label>
                        <input placeholder='Applied On' name='appliedOn' type="date"/>
                    </article>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="">Link</label>
                    <input name="trackLink" placeholder='Enter the website link' type="text"/>
                </div>
                <div className="input-wrapper">
                <label htmlFor="">Status</label>
                <select name='status' style={{width:'100%',cursor:'pointer',border:"0",borderRadius:'0',backgroundColor:'transparent'}}>
                    <option value=''></option>
                    <option value='Applied'>Applied</option>
                    <option value='Scheduled'>Scheduled</option>
                    <option value='Rejected'>Rejected</option>
                    <option value='Approved'>Approved</option>
                </select>
                </div>
                <div className='input-wrapper'>
                    <button type='secondary-btn'>submit</button>
                </div>
            </form>
        </div>
    )
}

JobForm.propTypes={
    closeJobPanel:PropTypes.func,
    updateJobs:PropTypes.func,
    open:PropTypes.bool
}

export default JobForm