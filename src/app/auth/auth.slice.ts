import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';

const initialState: AuthState = {
  isLogin: false,
  token: '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      window.localStorage.removeItem('token');
      state.isLogin = false;
      state.token = '';
    },
  },
});

export const { actions: authAction, reducer: authReducer } = authSlice;
