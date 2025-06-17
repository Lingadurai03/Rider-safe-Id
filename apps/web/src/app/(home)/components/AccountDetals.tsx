import React from 'react';
import { GetAccountDetailsApiResponse } from '@ridersafeid/types';
import { Phone, UserCircle, Verified } from 'lucide-react';

import { createServerAxios } from '@/lib/axiosServer.lib';

const AccountDetals = async () => {
    const axios = await createServerAxios();
    let accountDetail: GetAccountDetailsApiResponse | null = null;

    try {
        const res = await axios.get<GetAccountDetailsApiResponse | null>(
            `profile/account-details`,
        );
        accountDetail = res.data;
    } catch (e) {
        console.error(e);
    }

    console.log(accountDetail);
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
                    <p className='font-normal'>QR Code Status</p>
                    <p className='font-bold'>
                        {accountDetail?.qrStatus ? 'Active' : 'In-active'}
                    </p>
                </div>
                {accountDetail && accountDetail?.editCount >= 0 && (
                    <p className='text-center font-normal'>
                        Free Edit Left :{' '}
                        <span className='ml-2 font-black text-lg'>
                            {3 - accountDetail.editCount}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AccountDetals;
