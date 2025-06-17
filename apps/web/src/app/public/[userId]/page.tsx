import React, { Suspense } from 'react';

import { BoxSkeletons } from '@/skeletons';

import PublicDetails from './component/publicDetails';

const Details = async ({ params }: { params: { userId: string } }) => {
    const param = await params;
    const userId = param.userId;

    return (
        <main className='mx-auto mt-5 max-w-[900px]'>
            <Suspense fallback={<BoxSkeletons className='w-full h-[600px]' />}>
                <PublicDetails userId={userId} />
            </Suspense>
        </main>
    );
};

export default Details;
