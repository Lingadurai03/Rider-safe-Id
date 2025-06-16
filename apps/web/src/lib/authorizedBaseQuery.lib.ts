import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constant';
import { getToken, saveToken } from '@/utils';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
        const token =
            typeof window !== 'undefined' ? getToken(ACCESS_TOKEN) : null;
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});

export const authorizedBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshToken = getToken(REFRESH_TOKEN);
        if (!refreshToken) return result;

        // 🔁 Try refreshing access token
        const refreshResponse = await rawBaseQuery(
            {
                url: '/auth/refresh',
                method: 'POST',
                body: { refreshToken },
            },
            api,
            extraOptions,
        );

        if (refreshResponse.data) {
            const newAccessToken = (refreshResponse.data as any).accessToken;
            saveToken(ACCESS_TOKEN, newAccessToken);

            // Retry original failed request with new access token
            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            // Refresh failed — possibly logout user
            console.warn('Token refresh failed');
        }
    }

    return result;
};
