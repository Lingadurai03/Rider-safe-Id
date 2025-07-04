import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { ACCESS_TOKEN } from '@/constant';

import { routing } from './i18n';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
    const intlResponse = intlMiddleware(request);
    if (intlResponse) return intlResponse;

    const token = request.cookies.get(ACCESS_TOKEN)?.value;
    const pathname = request.nextUrl.pathname;

    const PUBLIC_PATHS = ['/login', '/register', '/public', '/_next', '/favicon.ico'];

    const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

    if (!token && !isPublic) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'], // this ignores API and static files
};
