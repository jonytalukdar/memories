import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const defaultOptions = {
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const API = axios.create(defaultOptions);

API.interceptors.request.use((req) => {
  const result = JSON.parse(localStorage.getItem('profile'));
  if (result) {
    req.headers.Authorization = `Bearer ${result.token}`;
  }

  return req;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page) => {
  try {
    const response = await API.get(`posts?page=${page}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData) => {
    try {
      const response = await API.post('/posts', postData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  try {
    const { data } = await API.get(`/posts/${id}`);
    return data.data;
  } catch (error) {
    return error.message;
  }
});

export const fetchPostsBySearch = createAsyncThunk(
  'posts/fetchPostBySearch',
  async (searchQuery) => {
    try {
      const { data } = await API.get(
        `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
          searchQuery.tags
        }`
      );

      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, updatedData }) => {
    try {
      const { data } = await API.patch(`/posts/${id}`, updatedData);
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  try {
    const { data } = await API.delete(`/posts/${id}`);
    return data.data;
  } catch (error) {
    return error.message;
  }
});
