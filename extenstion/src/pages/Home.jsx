import JobsPage from './job/jobsPage'
import {useEffect, useState} from 'react'
import Header from '../paritals/header'
import Search from '../paritals/search'

function Home() {

  const [showSearch,setShowSearch] = useState(false)
  const [searchValue,setSearchValue] = useState('')

  function updateSearch(value){
    setSearchValue(value);
  }
  
  useEffect(()=>{
    console.log(searchValue);
  },[searchValue])


  return (
    <div className="wrapper">
        <div className='header-wrapper'>
            <Header showSearch={showSearch} openSearch={()=>setShowSearch(true)} />
            <Search updateSearch={updateSearch} showSearch={showSearch} closeSearch={()=>setShowSearch(false)}/>
        </div>
        <div id='job-board'>
            <JobsPage/>
        </div>
    </div>
  )
}

export default Home
