import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';

const initialState: AuthState = {
  isLoginned: false,
  token: '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem('token');
      state.isLoginned = false;
      state.token = '';
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
