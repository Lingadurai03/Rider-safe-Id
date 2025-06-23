import { ToastContainer } from 'react-toastify';
import { cookies } from 'next/headers';

import { LocaleLayout, StoreProvider } from '@/components';

import '.././globals.css';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const theme = cookieStore.get('theme')?.value ?? null;
    const isDark = theme === 'dark';

    return (
        <html className={isDark ? 'dark' : ''}>
            <body className='text-muted'>
                <ToastContainer />
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
