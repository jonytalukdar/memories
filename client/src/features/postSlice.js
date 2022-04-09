import { createSlice } from '@reduxjs/toolkit';
import {
  createPost,
  deletePost,
  fetchPost,
  fetchPosts,
  fetchPostsBySearch,
  likePost,
  updatePost,
} from '../services/service';

const initialState = {
  posts: [],
  post: {},
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

        state.page = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;

        state.posts = action.payload.data;
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
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(fetchPostsBySearch.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsBySearch.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = action.payload.data;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      });
  },
});

export default postSlice.reducer;
