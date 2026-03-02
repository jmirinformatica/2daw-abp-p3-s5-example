import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    posts: [],
    userId: NaN,
    availableUserIds: []
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
      state.availableUserIds = [...new Set(state.posts.map(post => post.userId))];
      console.log("SETPOSTS: " + JSON.stringify(state.posts))
    },

    setUserId: (state, action) => {
      state.userId = action.payload
      console.log("SETUSERID: " + state.userId)
    },

    setAvailableUserIds: (state, action) => {
      state.availableUserIds = action.payload
      console.log("SETAVAILABLEUSERIDS: " + JSON.stringify(state.availableUserIds))
    }
  }
});

export const { setPosts, setUserId, setAvailableUserIds } = postsSlice.actions;
export default postsSlice.reducer
