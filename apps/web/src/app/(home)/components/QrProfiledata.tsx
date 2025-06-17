import React from 'react';
import { GetProfileApiResponse } from '@ridersafeid/types';
import Image from 'next/image';
import Link from 'next/link';

import { createServerAxios } from '@/lib/axiosServer.lib';

const QrProfiledata = async () => {
    const axios = await createServerAxios();
    let qrProfileData: GetProfileApiResponse | null = null;

    try {
        const res = await axios.get<GetProfileApiResponse>('profile');
        qrProfileData = res.data;
    } catch (e) {
        console.error(e);
    }

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='relative h-40 w-40 flex justify-center items-center'>
                    <Image
                        src={
                            qrProfileData?.imageUrl ||
                            'https://placehold.co/600x400/png'
                        }
                        className='h-32 w-32 rounded-full object-cover border-2 border-primary'
                        fill
                        sizes='128px'
                        alt='Rider Profile'
                    />
                </div>

                {/* 2nd grid: Name */}
                <div className='flex flex-col justify-center items-center text-center'>
                    <p className='font-semibold text-lg text'>Name</p>
                    <p className='text-muted'>{qrProfileData?.profileName}</p>
                </div>

                {/* 3rd grid: Blood Group */}
                <div className='flex flex-col justify-center items-center text-center'>
                    <p className='font-semibold text-lg text'>Blood Group</p>
                    <p className='text-muted'>{qrProfileData?.bloodGroup}</p>
                </div>

                {/* 4th grid: City */}
                <div className='flex flex-col justify-center items-center text-center'>
                    <p className='font-semibold text-lg text'>City</p>
                    <p className='text-muted'>{qrProfileData?.city}</p>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <Link
                    href={''}
                    className='underline text-primary font-semibold'
                >
                    Preview
                </Link>
            </div>
        </>
    );
};

export default QrProfiledata;
