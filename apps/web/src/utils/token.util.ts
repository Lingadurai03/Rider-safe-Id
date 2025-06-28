import Cookies from 'js-cookie';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constant';

const COOKIE_EXPIRES_DAYS = 7;

export function saveToken(key: string, token: string, days = COOKIE_EXPIRES_DAYS) {
    if (typeof window !== 'undefined') {
        Cookies.set(key, token, {
            expires: days,
            secure: true,
            sameSite: 'lax',
        });
    }
}

export function getToken(key: string): string | undefined {
    if (typeof window !== 'undefined') {
        return Cookies.get(key);
    }
    return undefined;
}

export function clearTokens() {
    if (typeof window !== 'undefined') {
        Cookies.remove(ACCESS_TOKEN);
        Cookies.remove(REFRESH_TOKEN);
    }
}
