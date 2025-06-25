import React from 'react';
import { GetAccountDetailsApiResponse } from '@ridersafeid/types';
import { Phone, UserCircle, Verified } from 'lucide-react';

import { createServerAxios } from '@/lib/axiosServer.lib';
import { getTranslations } from 'next-intl/server';

const AccountDetails = async () => {
    const axios = await createServerAxios();
    const t = await getTranslations('home');
    let accountDetail: GetAccountDetailsApiResponse | null = null;

    try {
        const res = await axios.get<GetAccountDetailsApiResponse | null>(
            `profile/account-details`,
        );
        accountDetail = res.data;
    } catch (e) {
        console.error(e);
    }

    return (
        <div className='relative z-10 w-full bg-white-xs border-white-sm backdrop-blur-sm p-4 text-white rounded-lg flex flex-col gap-5 justify-center shadow-sm inset-shadow-sm'>
            <div className='flex justify-center'>
                <UserCircle className='h-16 w-16 text-primary' />
            </div>
            <div className='flex gap-1 text-lg items-center justify-center'>
                <h2 className='text font-bold truncate max-w-[150px]'>
                    {accountDetail?.fullName}
                </h2>
                <Verified className='h-6 w-6 text-green-600' />
            </div>
            {accountDetail?.phone && (
                <div className='flex gap-1 text-lg items-center justify-center'>
                    <Phone className='h-6 w-6 text-green-600' />
                    <h2 className='text font-bold truncate max-w-[150px]'>
                        {accountDetail.phone}
                    </h2>
                </div>
            )}

            <div className='flex justify-center flex-col gap-2 text-sm text-muted'>
                <div className='flex justify-center gap-2 '>
                    <p className='font-normal'>{t('qrCodeStatus')}</p>
                    <p className='font-bold text-primary'>
                        {accountDetail?.qrStatus ? 'Active' : 'In-active'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
