import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    LoginApiPayload,
    LoginApiResponse,
    RegisterApiPayload,
    RegisterApiResponse,
} from '@ridersafeid/types';

import { AUTH_API } from '@/constant';

export const authApi = createApi({
    reducerPath: AUTH_API,
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        register: builder.mutation<RegisterApiResponse, RegisterApiPayload>({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation<LoginApiResponse, LoginApiPayload>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
