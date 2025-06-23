import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    pathnames: {
        '/': '/', // home page
        '/pathnames': {
            // example page path translation
            de: '/pfadnamen',
        },
    },
});
