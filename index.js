const jobs = new Map()

const Wrapper = document.querySelector('.wrapper')
const JobsWrapper = document.createElement('div')
const AddJobWrapper = document.getElementById('addJob-wrapper')
JobsWrapper.setAttribute('id','job-board')
Wrapper.appendChild(JobsWrapper)
const SearchWrapper = document.querySelector('.search-wrapper')

const SearchButton = document.getElementById('search')
const JobForm = document.forms[0]
const CloseSearchButton = document.getElementById('close-search')
const CloseAddJobButton = document.getElementById('close-addJob')
const AddJobButton = document.querySelector('#add-job')
const FormHeading = document.querySelector('#form-heading')

const SearchBar = document.getElementById('job-search')

CloseSearchButton.addEventListener('click',()=>{
    if(!SearchWrapper.classList.contains('close')){
        SearchWrapper.classList.add('close')
    }
    SearchButton.classList.remove('close')
})

JobForm.addEventListener('submit',(e)=>handleSubmit(e))

SearchButton.addEventListener('click',()=>{
    SearchWrapper.classList.remove('close')
    SearchButton.classList.add('close')
})

AddJobButton.addEventListener('click',()=>{
    AddJobWrapper.classList.remove('close')
    AddJobButton.classList.add('close')
           
    const queryParams = new URLSearchParams({
        popUp:'add'
    }).toString();

    FormHeading.innerHTML = `Add Job`

    const urlWithParams = `/?${queryParams}`;
    window.history.replaceState({}, '', urlWithParams);
})

CloseAddJobButton.addEventListener('click',()=>{
    closeJobPanel()
})

function editJobPanel(key){
    const job = jobs.get(key)
    const [role,company,appliedOn,trackLink,status] = JobForm
    role.value = job.role
    company.value = job.company
    appliedOn.value = parseDate(job.appliedOn,true)
    trackLink.value = job.trackSite
    status.value = job.status
    const queryParams = new URLSearchParams({
        popUp:'edit',
        key:key
    }).toString();

    FormHeading.innerHTML = `Edit Job - <span>${key}<span>`

    const urlWithParams = `/?${queryParams}`;
    window.history.replaceState({}, '', urlWithParams);
    AddJobWrapper.classList.remove('close')

}

function closeJobPanel(){
    AddJobButton.classList.remove('close')
    AddJobWrapper.classList.add('close')
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('?')[0];
    window.history.replaceState({}, '', baseUrl);
}

function changeStatus(event,key){
    const value = event.target.selectedOptions[0].value
    const job = jobs.get(key)
    jobs.set(key,{...job,status:value})
    renderJobs()
}

function createJob(key,value){
    const jobWrapper = document.createElement('div');
    jobWrapper.classList.add('job-wrapper');
    jobWrapper.innerHTML = 
        `<div class="job">
            <img src="https://icon.horse/icon/stackoverflow.com">
            <article class="company-info">
                <span class="company">${value.company}</span>
                <span class="role">${value.role}</span>
            </article>
            <article class="application-info">
                <article style="position:relative" class='status ${value.status}'>
                    <select onChange={changeStatus(event,'${key}')} style='width:100%;cursor:pointer;border:0;border-radius:0;background-color:transparent'>
                        <option value=''></option>
                        <option value='Applied'>Applied</option>
                        <option value='Scheduled'>Scheduled</option>
                        <option value='Rejected'>Rejected</option>
                        <option value='Approved'>Approved</option>
                    </select>
                    <span style="pointer-events:none;position:absolute;top:50%;left:calc(50% - 10px);transform:translate(-50%,-50%)">${value.status}</span>
                </article>
                <span class="applied-on">${value.appliedOn}</span>
            </article>
        </div>
        <article class="actions">
            <button id='edit-${key}' class="secondary-btn">Edit</button>
            <button id='delete-${key}' class="secondary-btn">Delete</button>
            <a href=${value.trackSite} target='_black'>
                <button class="secondary-btn">Visit</button>
            </a>
        </article>`
    
        console.log(jobWrapper)

        jobWrapper.querySelector('select').addEventListener('change', function(event) {
            changeStatus(event, key);
        });
        
        jobWrapper.querySelector(`#edit-${key}`).addEventListener('click', function() {
            editJobPanel(key);
        });

        jobWrapper.querySelector(`#delete-${key}`).addEventListener('click', function() {
            deleteJob(key);
        });

        return jobWrapper
}

function deleteJob(key){
    console.log(jobs)
    jobs.delete(key)
    renderJobs()
}

function parseDate(dateString,reverse=false,currentFormat='dd-mm-yyyy'){
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
    e.preventDefault()
    const [role,company,appliedOn,trackLink,applied] = e.target
    const job = {
        role:role.value,
        company:company.value,
        status:applied.selectedOptions[0].value,
        appliedOn:parseDate(appliedOn.value),
        trackLink:trackLink.value
    }
    const params = window.location.href.split('?')[1].split('&')
    const submitType = params[0].split('=')[1]
    console.log(submitType)
    if(submitType=='add'){
        jobs.set(Date.now(),job)
    }else if(submitType=='edit'){
        const key = params[1].split('=')[1]
        jobs.set(key,job)
    }
    closeJobPanel()
    renderJobs()
}

function renderJobs(){
    JobsWrapper.innerHTML = ''
    jobs.forEach((value,key)=>JobsWrapper.appendChild(createJob(key,value)))
    console.log(jobs)
}

document.onload = renderJobs()