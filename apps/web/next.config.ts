import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts'); // 👈 specify correct path here

const nextConfig: NextConfig = {
    images: {
        domains: ['placehold.co', 'res.cloudinary.com'],
    },
};

export default withNextIntl(nextConfig);
