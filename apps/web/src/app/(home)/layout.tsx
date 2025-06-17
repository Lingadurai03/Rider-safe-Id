import { Suspense } from 'react';

import { BoxSkeletons } from '@/skeletons';

import { Navbar } from '@/components';

import AccountDetails from './components/AccountDetails';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className='bg-bg min-h-screen pt-[65px]'>
                <section className='relative flex flex-col md:flex-row w-full min-h-[calc(100vh-65px)]'>
                    <div className='md:w-1/4 p-4'>
                        <Suspense
                            fallback={<BoxSkeletons className='h-60 w-full' />}
                        >
                            <AccountDetails />
                        </Suspense>
                    </div>
                    <div className='md:w-3/4 p-4'>{children}</div>
                </section>
            </main>
        </>
    );
}
