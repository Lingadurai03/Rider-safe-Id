import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
    children,
    locale,
}: {
    children: React.ReactNode;
    locale: string;
}) {
    const messages = await getMessages();
    if (!messages) notFound();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
