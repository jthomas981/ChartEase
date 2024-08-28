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

// Create new Flowchart
export const createFlowchart = createAsyncThunk('flowcharts/create', 
  async (flowchartData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await flowchartService.createFlowchart(flowchartData, token)
    } catch (error) {
      // Try and grab the most specific message inside error.
      const message = ((error.response && error.response.data 
        && error.response.data.message) || error.message || error.toString())
      return thunkAPI.rejectWithValue(message)
    }
  })

export const getFlowcharts = createAsyncThunk('flowcharts/getAll', 
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await flowchartService.getFlowcharts(token)
    } catch (error) {
      // Try and grab the most specific message inside error.
      const message = ((error.response && error.response.data 
        && error.response.data.message) || error.message || error.toString())
      return thunkAPI.rejectWithValue(message)
    }
  })

// Delete user flowchart.
export const deleteFlowchart = createAsyncThunk('flowcharts/delete', 
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await flowchartService.deleteFlowchart(id, token)
    } catch (error) {
      // Try and grab the most specific message inside error.
      const message = ((error.response && error.response.data 
        && error.response.data.message) || error.message || error.toString())
      return thunkAPI.rejectWithValue(message)
    }
  })

export const flowchartSlice = createSlice({
  name: 'flowchart',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFlowchart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createFlowchart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.flowcharts.push(action.payload)
      })
      .addCase(createFlowchart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFlowcharts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFlowcharts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.flowcharts = action.payload
      })
      .addCase(getFlowcharts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteFlowchart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteFlowchart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.flowcharts = state.flowcharts.filter(
          (flowchart) => flowchart._id !== action.payload.id
        )
      })
      .addCase(deleteFlowchart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = flowchartSlice.actions
export default flowchartSlice.reducer