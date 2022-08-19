import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  GetVerifyCodePayload,
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  GetRecoveryCodePayload,
  RecoveryPasswordPayload,
} from './auth.types';
import { HTTP_METHODS as HTTP, AUTH_API_URL } from '../constants';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token') || '';
      headers.set('Authorization', token);
      return headers;
    },
    credentials: 'same-origin',
  }),
  reducerPath: 'api/auth',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getVerifyCode: builder.mutation<void, GetVerifyCodePayload>({
      query: (data) => ({ url: '/sendVerifyCode', method: HTTP.POST, body: data }),
    }),
    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (data) => ({ url: '/signUp', method: HTTP.POST, body: data }),
    }),
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (data) => ({ url: '/signIn', method: HTTP.POST, body: data }),
    }),
    getRecoveryCode: builder.mutation<void, GetRecoveryCodePayload>({
      query: (data) => ({ url: '/sendRecoveryCode', method: HTTP.POST, body: data }),
    }),
    recoveryPassword: builder.mutation<void, RecoveryPasswordPayload>({
      query: (data) => ({ url: '/recoveryPassword', method: HTTP.POST, body: data }),
    }),
  }),
});

export const {
  useGetVerifyCodeMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetRecoveryCodeMutation,
  useRecoveryPasswordMutation,
  endpoints: { getVerifyCode, register, login, getRecoveryCode, recoveryPassword },
  util: { getRunningOperationPromises },
} = authApi;
