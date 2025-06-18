import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ACCESS_TOKEN } from '@/constant';

const PUBLIC_PATHS = [
    '/login',
    '/register',
    '/public',
    '/_next',
    '/favicon.ico',
];

export function middleware(request: NextRequest) {
    const token = request.cookies.get(ACCESS_TOKEN)?.value;

    const pathname = request.nextUrl.pathname;

    const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

    // Not loggedin user
    if (!token && !isPublic) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}
