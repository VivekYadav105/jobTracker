import { configureStore } from "@reduxjs/toolkit"
import jobReducer from './jobSlice'

const store = configureStore({
    reducer:{
        'job':jobReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
export default store