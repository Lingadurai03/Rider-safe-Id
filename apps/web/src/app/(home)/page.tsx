import React from 'react';
import { UserCircle, Verified } from 'lucide-react';

import { GlowingButton } from '@/components';

const Home = () => {
    return (
        <section className='relative flex flex-col md:flex-row w-full min-h-[calc(100vh-65px)]'>
            <div className='md:w-1/4 p-4'>
                <div className='relative z-10 w-full bg-white-xs border-white-sm backdrop-blur-sm p-4 text-white rounded-lg flex flex-col gap-5 justify-center shadow-sm inset-shadow-sm'>
                    <div className='flex justify-center'>
                        <UserCircle className='h-16 w-16 text-primary' />
                    </div>
                    <div className='flex gap-1 text-lg items-center justify-center'>
                        <h2 className='text font-bold truncate max-w-[150px]'>
                            Lingasdfsdfsdfsdfsdfsfdsdfdurai
                        </h2>
                        <Verified className='h-6 w-6 text-green-600' />
                    </div>

                    <div className='flex justify-center flex-col gap-2 text-sm text-muted'>
                        <div className='flex justify-center gap-2 '>
                            <p className='font-normal'>QR Code Status</p>
                            <p className='font-bold'>Active</p>
                        </div>
                        <p className='text-center font-normal'>
                            Free Edit Left :{' '}
                            <span className='ml-2 font-black text-lg'>3</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right - 4 parts */}
            <div className='md:w-3/4 p-4'>
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
                        <h2 className='text-3xl font-extrabold'>
                            Welcome Rider
                        </h2>
                        <p>Lets Secure your ride</p>
                        <div className='w-full max-w-[150px] md:w-[48%] lg:w-auto'>
                            <GlowingButton
                                glow
                                glowColor='var(--color-primary)'
                                label='Generate Qr Code'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
