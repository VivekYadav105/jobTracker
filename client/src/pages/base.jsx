import JobsPage from './jobsPage'
import {useState} from 'react'
import Header from '../paritals/header'
import Search from '../paritals/search'

function BasePage() {

  const [addJobPopup,setAddJobPopUp] = useState(false)
  const [showSearch,setShowSearch] = useState(false)



  function openJobPanel(){
    setAddJobPopUp(true)
    console.log('open Job');
    
  }

  function closeJobPanel(){
    setAddJobPopUp(false)
    console.log('inside');
    
  }

  function updateSearch(value){
    // setSearchValue(value)
    console.log(value);
  }


  return (
    <div className="wrapper">
        <div className='header-wrapper'>
            <Header openSearch={()=>setShowSearch(true)} openJobPanel={openJobPanel} />
            <Search updateSearch={updateSearch} showSearch={showSearch} closeSearch={()=>setShowSearch(false)}/>
        </div>
        <div id='job-board'>
            <JobsPage addJobPopup={addJobPopup} closeJobPanel={closeJobPanel}/>
        </div>
    </div>
  )
}

export default BasePage
