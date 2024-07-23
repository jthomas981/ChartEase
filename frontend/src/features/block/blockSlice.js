import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  topImages: [],
  bottomImages: [],
}

const blockSlice = createSlice({
  name: 'block',
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
