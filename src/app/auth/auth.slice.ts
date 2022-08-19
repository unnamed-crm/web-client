import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';
import { login, register } from './auth.api';

const initialState: AuthState = {
  token: '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      window.localStorage.removeItem('token');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(register.matchFulfilled, (state, { payload: { token, user } }) => {
        window.localStorage.setItem('token', token);

        state.token = token;
        state.user = {
          id: user.id,
          email: user.email,
          avatarUrl: user.avatar_url,
          createdAt: user.created_at,
        };
      })
      .addMatcher(login.matchFulfilled, (state, { payload: { token, user } }) => {
        window.localStorage.setItem('token', token);

        state.token = token;
        state.user = {
          id: user.id,
          email: user.email,
          avatarUrl: user.avatar_url,
          createdAt: user.created_at,
        };
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
