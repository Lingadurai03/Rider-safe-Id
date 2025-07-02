import React, { Suspense } from 'react';

import { NotificationItemSkeleton } from '@/skeletons';

import NotificationList from './components/NotificationList';

export const generateMetadata = () => ({
    title: 'Notifications | RiderSafeID',
    description:
        'Stay updated with real-time alerts and important updates about your RiderSafeID account.',
});

const Notifications = async () => {
    return (
        <Suspense
            fallback={
                <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <NotificationItemSkeleton key={i} />
                    ))}
                </div>
            }
        >
            <NotificationList />
        </Suspense>
    );
};

export default Notifications;
