import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'ta', 'hi', 'kn', 'ml', 'ta', 'te'],
    defaultLocale: 'en',
    pathnames: {
        '/': '/',
    },
});
