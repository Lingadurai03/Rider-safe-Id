import React, { Suspense } from 'react';
import NotificationList from './components/NotificationList';
import { NotificationItemSkeleton } from '@/skeletons';

const Notifications = async () => {
    return (
        <Suspense
            fallback={
                <div className='p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {Array.from({ length: 6 }).map((_, i) => (
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
