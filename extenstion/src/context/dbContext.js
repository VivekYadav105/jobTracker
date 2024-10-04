import React, { useContext, useState } from "react"
import PropTypes from "prop-types"

const DbContext = React.createContext({store:undefined})

const DbProvider = ({children})=>{
    const [db,setDB] = useState({store:undefined})
    return(
        <DbContext.Provider value={{db,setDB}}>
            {children}
        </DbContext.Provider>
    )
}

DbProvider.propTypes = {
    children:PropTypes.node
}

export const useDb = ()=>useContext(DbContext)

export default DbProvider