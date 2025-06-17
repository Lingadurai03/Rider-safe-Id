import React, { Suspense } from 'react';
import Link from 'next/link';

import { BoxSkeletons } from '@/skeletons';

import { GlowingButton } from '@/components';

import QrComponent from './components/QrComponent';
import QrProfiledata from './components/QrProfiledata';

const Home = () => {
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
                    <h2 className='text-3xl font-extrabold'>Welcome Rider</h2>
                    <p>Lets Secure your ride</p>
                    <div className='w-full max-w-[150px] md:w-[48%] lg:w-auto'>
                        <Link href={'details/add'}>
                            <GlowingButton
                                glow
                                glowColor='var(--color-primary)'
                                label='Upgrade to Pro'
                            />
                        </Link>
                    </div>
                </div>
            </section>
            <section className=' mt-4 w-full bg-white-sm  backdrop-blur-sm py-8 p-4 border-white-sm rounded-lg shadow-sm inset-shadow-sm'>
                <Suspense fallback={<BoxSkeletons className='w-full h-40' />}>
                    <QrProfiledata />
                </Suspense>
            </section>
        </>
    );
};

export default Home;
