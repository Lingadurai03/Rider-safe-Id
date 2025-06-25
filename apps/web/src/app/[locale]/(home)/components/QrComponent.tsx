import React from 'react';
import { GetQrApiResponse } from '@ridersafeid/types';
import Image from 'next/image';
import Link from 'next/link';

import { createServerAxios } from '@/lib/axiosServer.lib';

import { GlowingButton } from '@/components';
import { getTranslations } from 'next-intl/server';
import { downloadQrCode } from '@/utils';
import QrComponentButtons from './QrComponentButtons';

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
            <QrComponentButtons url={qrData?.qrDetails[0]?.qrCodeUrl} />
        </>
    );
};

export default QrComponent;
