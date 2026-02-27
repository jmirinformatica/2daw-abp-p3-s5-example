import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './posts/postsSlice.js'

export const store = configureStore({
  reducer: {
    postsSlice: postsSlice,
  }
})
