import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import flowchartReducer from '../features/flowcharts/flowchartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    flowchart: flowchartReducer,
  },
})
