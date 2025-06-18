'use server';

import { GetRoleApiResponse } from '@ridersafeid/types';
import { cookies } from 'next/headers';

import { ACCESS_TOKEN } from '@/constant';

import { createServerAxios } from './axiosServer.lib';

export async function getUserRole() {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN)?.value;

    if (!token) return null;

    const axios = await createServerAxios();

    const response = await axios.get<GetRoleApiResponse>(`auth/getRole`);
    return response.data;
}
