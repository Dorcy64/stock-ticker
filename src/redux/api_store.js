import { createSlice } from '@reduxjs/toolkit'

export const addStock = createSlice({
  name: 'added_stocks',
  initialState: {
    value: {}
  },
  reducers: {
    addNewStock: (state, action) => {
      state.value[action.payload.id] = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addNewStock } = addStock.actions

export default addStock.reducer

