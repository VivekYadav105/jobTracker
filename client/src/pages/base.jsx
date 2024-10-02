import JobsPage from './jobsPage'
import {useState} from 'react'
import Header from '../paritals/header'
import Search from '../paritals/search'

function BasePage() {

  const [showSearch,setShowSearch] = useState(false)

  function updateSearch(value){
    console.log(value);
  }


  return (
    <div className="wrapper">
        <div className='header-wrapper'>
            <Header openSearch={()=>setShowSearch(true)} />
            <Search updateSearch={updateSearch} showSearch={showSearch} closeSearch={()=>setShowSearch(false)}/>
        </div>
        <div id='job-board'>
            <JobsPage/>
        </div>
    </div>
  )
}

export default BasePage
