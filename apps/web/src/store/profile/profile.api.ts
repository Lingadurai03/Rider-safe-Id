import { createApi } from '@reduxjs/toolkit/query/react';
import { AddOrUpdateProfileApiPayload, GetProfileApiResponse } from '@ridersafeid/types';
import { ProfileImageUploadResponseType } from '@ridersafeid/types';

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
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        uploadProfileImage: builder.mutation<ProfileImageUploadResponseType, FormData>({
            query: (formData) => {
                return {
                    url: 'upload/profile-image',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useLogoutMutation,
    useUploadProfileImageMutation,
} = profileApi;
