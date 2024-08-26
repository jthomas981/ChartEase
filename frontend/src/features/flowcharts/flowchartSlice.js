import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import flowchartService from './flowchartService'

// Get user from localStorage.
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  flowcharts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const flowchartSlice = createSlice({
  name: 'flowchart',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
})

export const { reset } = flowchartSlice.actions
export default flowchartSlice.reducer