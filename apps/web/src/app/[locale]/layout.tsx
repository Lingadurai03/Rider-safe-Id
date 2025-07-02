import { ToastContainer } from 'react-toastify';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

import { LocaleLayout, StoreProvider } from '@/components';

import '.././globals.css';

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const { locale } = await params;
    const cookieStore = await cookies();
    const theme = cookieStore.get('theme')?.value ?? null;
    const isDark = theme === 'dark';
    const messages = await getMessages();

    if (!messages) notFound();
    return (
        <html className={isDark ? 'dark' : ''}>
            <body className="text-muted">
                <LocaleLayout locale={locale}>
                    <ToastContainer />
                    <StoreProvider>{children}</StoreProvider>
                    <div id="modal-root" />
                </LocaleLayout>
            </body>
        </html>
    );
}
