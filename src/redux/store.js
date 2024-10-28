import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "../feature/counter/todoSlice"

export const store = configureStore({
  reducer: {
    todo: todoReducer,  // Add your slices here.
  },
})