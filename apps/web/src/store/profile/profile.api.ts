import { createApi } from '@reduxjs/toolkit/query/react';
import {
    AddOrUpdateProfileApiPayload,
    GetProfileApiResponse,
} from '@ridersafeid/types';

import { PROFILE_API } from '@/constant';
import { authorizedBaseQuery } from '@/lib';

export const profileApi = createApi({
    reducerPath: PROFILE_API,
    baseQuery: authorizedBaseQuery,
    endpoints: (builder) => ({
        getProfile: builder.query<GetProfileApiResponse, void>({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
        }),
        updateProfile: builder.mutation<void, AddOrUpdateProfileApiPayload>({
            query: (data) => ({
                url: '/profile',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
