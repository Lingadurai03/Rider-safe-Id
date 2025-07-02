import React, { Suspense } from 'react';
import { CreateLogApiPayload } from '@ridersafeid/types';

import { getIpAddress, getLatandLong } from '@/lib';
import { BoxSkeletons } from '@/skeletons';

import PublicDetails from './component/publicDetails';
import ScanLogger from './component/ScanLogger';

interface PageProps {
    params: Promise<{ userId: string }>;
}

export const generateMetadata = () => ({
    title: 'Emergency Profile | RiderSafeID',
    description:
        'View the emergency details shared via RiderSafeID QR. Help the rider stay safe and supported.',
});

const Details = async ({ params }: PageProps) => {
    const param = await params;
    const userId = param.userId;
    const ipRes = await getIpAddress();

    const location = await getLatandLong(ipRes.ip);

    const constructedLocationData: CreateLogApiPayload = {
        city: location[0].city,
        state: location[0].regionName,
        accuracy: 'poor',
        country: location[0].country,
        lat: location[0].lat,
        long: location[0].lon,
    };

    return (
        <main className="mx-auto mt-5 max-w-[900px]">
            <Suspense fallback={<BoxSkeletons className="w-full h-[600px]" />}>
                <PublicDetails userId={userId} />
            </Suspense>
            <ScanLogger locationData={constructedLocationData} userId={userId} />
        </main>
    );
};

export default Details;
