'use client';

import { NotificationCountApiReponse } from '@ridersafeid/types';
import axios from 'axios';

import { ACCESS_TOKEN } from '@/constant';
import { getToken } from '@/utils';

const url = process.env.NEXT_PUBLIC_QR_SERVICE_BASE_URL;

export async function getNotificationCount(): Promise<NotificationCountApiReponse | void> {
    const accessToken = getToken(ACCESS_TOKEN);
    try {
        const res = await axios.get(`${url}scan/notificationCount`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (e) {
        console.error(e);
    }
}
