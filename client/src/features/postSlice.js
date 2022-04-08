import { createSlice } from '@reduxjs/toolkit';
import {
  createPost,
  deletePost,
  fetchPosts,
  updatePost,
} from '../services/service';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success';

        const loadedPost = action.payload.data.map((post) => post);

        state.posts = state.posts.concat(loadedPost);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload.data);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      });
  },
});

export default postSlice.reducer;
