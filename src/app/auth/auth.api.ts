import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { HOST_URL } from '../constants';
import {
  GetVerificationCodePayload,
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
} from './auth.types';
import { HTTP } from '../constants';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: HOST_URL + '/users',
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('token') || '';
      headers.set('Authorization', token);

      return headers;
    },
    credentials: 'include',
  }),
  reducerPath: 'api/auth',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getVerificationCode: builder.mutation<GetVerificationCodePayload, void>({
      query: (data) => ({ url: '/verificationCode', method: HTTP.POST, body: data }),
    }),
    register: builder.mutation<RegisterPayload, RegisterResponse>({
      query: (data) => ({ url: '/signUp', method: HTTP.POST, body: data }),
    }),
    login: builder.mutation<LoginPayload, LoginResponse>({
      query: (data) => ({ url: '/signIn', method: HTTP.POST, body: data }),
    }),
  }),
});

export const {
  useGetVerificationCodeMutation,
  useRegisterMutation,
  useLoginMutation,
  util: { getRunningOperationPromises },
} = authApi;

export const { getVerificationCode, register, login } = authApi.endpoints;
