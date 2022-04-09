import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const signup = createAsyncThunk('users/signup', async (userData) => {
  try {
    const { data } = await API.post('/users/signup', userData);
    return data;
  } catch (error) {
    return error.message;
  }
});

export const signin = createAsyncThunk('users/signin', async (userData) => {
  try {
    const { data } = await API.post('/users/signin', userData);
    return data;
  } catch (error) {
    return error.message;
  }
});
