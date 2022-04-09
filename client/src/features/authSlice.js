import { createSlice } from '@reduxjs/toolkit';
import { signin, signup } from '../services/auth';

const initialState = {
  user: JSON.parse(localStorage.getItem('profile')) || null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('profile');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'success';
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
        state.user = action.payload;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'success';
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
        state.user = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
