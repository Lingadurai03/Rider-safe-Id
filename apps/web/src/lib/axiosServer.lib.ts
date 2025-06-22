import 'server-only'

import axios, { AxiosError, AxiosInstance } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constant';

export const createServerAxios = async(options?: {
    baseURL?: string;
}): Promise<AxiosInstance> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;
    const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;

    const instance = axios.create({
        baseURL: options?.baseURL || process.env.NEXT_PUBLIC_API_URL_SSR,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            if (
                error.response?.status === 401 &&
                refreshToken &&
                !error.config?.headers?.['x-retry']
            ) {
                try {
                    const refreshResponse = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL_SSR}auth/refresh`,
                        { refreshToken },
                        { headers: { 'Content-Type': 'application/json' } },
                    );

                    const newAccessToken = refreshResponse.data.accessToken;

                    // 🔁 Retry the original request
                    error.config!.headers['Authorization'] =
                        `Bearer ${newAccessToken}`;
                    error.config!.headers['x-retry'] = 'true'; // Prevent infinite loop

                    return axios.request(error.config!);
                } catch (refreshError) {
                    console.error('Token refresh failed', refreshError);
                    redirect('/login');
                }
            }

            throw error;
        },
    );

    return instance;
};
