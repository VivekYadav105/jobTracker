import { BrowserRouter, Route, Routes } from "react-router-dom"
import BasePage from "./pages/base"
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePage/>}/>
      </Routes>
    </BrowserRouter>

  )

}

export default App
