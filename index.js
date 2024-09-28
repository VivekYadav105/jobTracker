const resume = {
    fname:"",
    lname:"",
    contact:"9398077470",
    github:"VivekYadav105",
    linkedin:"",
    portfolio:"portfolio-vy.vercel.app",
    address:{},
    education:{},
    skills:{},
    projects:{},
    workExperience:{},
}

const jobs = [
    {
        role:"AI Engineering-Associate",
        company:"blackrock",
        trackSite:"https://blackrock.wd1.myworkdayjobs.com/BlackRock_Professional/job/Gurgaon-India/AI-Engineering-Associate_R244378/apply",
        appliedOn:"28-09-2024",
        status:"Applied"
    }
]

const JobWrapper = document.getElementById('job-board')
const SearchWrapper = document.querySelector('.search-wrapper')

const SearchButton = document.getElementById('search')
const CloseSearchButton = document.getElementById('close-search')
const SearchBar = document.getElementById('job-search')

CloseSearchButton.addEventListener('click',()=>{
    if(!SearchWrapper.classList.contains('close')){
        SearchWrapper.classList.add('close')
    }
    SearchButton.classList.remove('close')
})

SearchButton.addEventListener('click',()=>{
    SearchWrapper.classList.remove('close')
    SearchButton.classList.add('close')
})

function createJob(e){
    const jobLink = document.createElement('a')
        jobLink.setAttribute('href',e.trackSite)
        jobLink.setAttribute('target','_blank')
        const job = document.createElement('div')
        job.classList.add('job')
        const jobLogo = document.createElement('img')
        jobLogo.setAttribute('src', "https://icon.horse/icon/stackoverflow.com")

        const companyInfo = document.createElement('article')
        const applicationInfo = document.createElement('article')
        companyInfo.classList.add('company-info')
        applicationInfo.classList.add('application-info')
        
        const company = document.createElement('span')
        company.classList.add('company')
        company.innerText = e.company
        
        const role = document.createElement('span')
        role.classList.add('role')
        role.innerText = e.role
        
        const status = document.createElement('span')
        status.classList.add('status')
        status.innerText = e.status

        const appliedOn = document.createElement('span')
        appliedOn.classList.add('applied-on')
        appliedOn.innerText = e.appliedOn

        companyInfo.appendChild(company)
        companyInfo.appendChild(role)

        applicationInfo.append(status)
        applicationInfo.append(appliedOn)

        job.appendChild(jobLogo)
        job.appendChild(companyInfo)
        job.appendChild(applicationInfo)

        jobLink.appendChild(job)

        
        return jobLink
}


const Jobs = jobs.map(e=>createJob(e))

Jobs.forEach(e=>(
    JobWrapper.appendChild(e)
))
    