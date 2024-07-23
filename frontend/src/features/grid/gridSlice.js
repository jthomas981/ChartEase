import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  grid: [], // This will hold the state of your grid
}

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    addBlock: (state, action) => {
      // action.payload should contain information about the block position
      // Modify state.grid to add the new block
      state.grid.push(action.payload);
    },
  },
})

export const { addBlock } = gridSlice.actions

export default gridSlice.reducer
