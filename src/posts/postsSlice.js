import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    posts: [],
    userId: NaN
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
      console.log("SETPOSTS: " + JSON.stringify(state.posts))
    },

    setUserId: (state, action) => {
      state.userId = action.payload
      console.log("SETUSERID: " + state.userId)
    },
  }
});

export const { setPosts, setUserId } = postsSlice.actions;
export default postsSlice.reducer
