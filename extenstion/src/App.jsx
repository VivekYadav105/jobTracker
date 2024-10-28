import { HashRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { useState,useEffect,useCallback } from "react";
import initDB from './api/db'
import Auth from "./pages/auth";

function App() {
  const [isDBReady, setIsDBReady] = useState(false);

  const handleInitDB = useCallback(async () => {
    const status = await initDB();
    setIsDBReady(status);
  },[])

  useEffect(()=>{
    handleInitDB()
  },[handleInitDB])


  return(
      <HashRouter>
          {isDBReady ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth/>}/>
            </Routes>
          ) : (
            <div>Loading...</div> // Show a loading indicator while DB initializes
          )}
      </HashRouter>
  )

}

export default App
