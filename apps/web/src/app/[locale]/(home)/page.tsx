import React, { Suspense } from 'react';
import Link from 'next/link';

import { BoxSkeletons } from '@/skeletons';

import { GlowingButton } from '@/components';

import QrComponent from './components/QrComponent';
import QrProfiledata from './components/QrProfiledata';
import { getTranslations } from 'next-intl/server';

const Home = async () => {
    const t = await getTranslations('home');
    return (
        <>
            <section className='relative z-10 w-full bg-white-sm  backdrop-blur-sm py-12 p-4 border-white-sm rounded-lg flex flex-col-reverse md:flex-row gap-10 md:gap-4 shadow-sm inset-shadow-sm'>
                <div className='w-full md:w-1/2 flex justify-center flex-col gap-5'>
                    <Suspense
                        fallback={<BoxSkeletons className='h-60 w-full' />}
                    >
                        <QrComponent />
                    </Suspense>
                </div>
                <div className='w-full md:w-1/2 flex justify-center items-center text flex-col gap-2'>
                    <h2 className='text-3xl font-extrabold'>
                        {t('welcomeRider')}
                    </h2>
                    <p>{t('letsSecureYourRide')}</p>
                </div>
            </section>

            <Suspense fallback={<BoxSkeletons className='w-full h-40' />}>
                <QrProfiledata />
            </Suspense>
        </>
    );
};

export default Home;
