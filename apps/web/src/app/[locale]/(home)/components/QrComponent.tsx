import React from 'react';
import { GetQrApiResponse } from '@ridersafeid/types';
import Image from 'next/image';
import Link from 'next/link';

import { createServerAxios } from '@/lib/axiosServer.lib';

import { GlowingButton } from '@/components';
import { getTranslations } from 'next-intl/server';

const QrComponent = async () => {
    const axios = await createServerAxios();
    const t = await getTranslations('home');

    let qrData: GetQrApiResponse | null = null;

    try {
        const response = await axios.get<GetQrApiResponse>(`getQr`);
        qrData = response.data;
    } catch (e) {
        console.error(e);
    }

    return (
        <>
            <div className='flex flex-row justify-center items-center flex-wrap gap-2'>
                <div className='h-40 md:h-60 w-40 md:w-60 bg-amber-100 relative'>
                    {qrData?.qrDetails[0]?.qrCodeUrl && (
                        <Image
                            src={qrData?.qrDetails[0].qrCodeUrl}
                            alt={qrData.qrDetails[0].userId}
                            fill
                        />
                    )}
                </div>
            </div>
            <div className='flex flex-row gap-5 justify-center items-center flex-wrap'>
                <div className='w-full max-w-[150px] md:w-[48%] lg:w-auto'>
                    <GlowingButton glow label={t('downloadQr')} />
                </div>

                <div className='w-full max-w-[150px] md:w-[48%] lg:w-auto'>
                    <Link href={'details/add'}>
                        <GlowingButton
                            glow
                            glowColor='var(--color-secondary)'
                            label={t('editDetails')}
                        />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default QrComponent;
