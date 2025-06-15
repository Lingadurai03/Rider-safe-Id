import React from 'react';
import Link from 'next/link';

import { GlowingButton } from '@/components';

const Home = () => {
    return (
        <>
            <div className='relative z-10 w-full bg-white-sm  backdrop-blur-sm py-12 p-4 border-white-sm rounded-lg flex flex-col-reverse md:flex-row gap-4 shadow-sm inset-shadow-sm'>
                <div className='w-full md:w-1/2 flex justify-center flex-col gap-5'>
                    <div className='flex flex-row justify-center items-center flex-wrap gap-2'>
                        <div className='h-40 md:h-60 w-40 md:w-60 bg-amber-100'></div>
                    </div>
                    <div className='flex flex-row gap-5 justify-center items-center flex-wrap'>
                        <div className='w-full max-w-[150px] md:w-[48%] lg:w-auto'>
                            <GlowingButton glow label='Download Qr' />
                        </div>

                        <div className='w-full max-w-[150px] md:w-[48%] lg:w-auto'>
                            <GlowingButton
                                glow
                                glowColor='var(--color-secondary)'
                                label='Upgrade to pro'
                            />
                        </div>
                    </div>
                    <p className='text-center text-xs mt-4 text'>
                        You have 3 Free edits left
                    </p>
                </div>

                <div className='w-full md:w-1/2 flex justify-center items-center text flex-col gap-2'>
                    <h2 className='text-3xl font-extrabold'>Welcome Rider</h2>
                    <p>Lets Secure your ride</p>
                    <div className='w-full max-w-[150px] md:w-[48%] lg:w-auto'>
                        <Link href={'details/add'}>
                            <GlowingButton
                                glow
                                glowColor='var(--color-primary)'
                                label='Generate Qr Code'
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
