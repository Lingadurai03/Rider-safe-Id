import { getScanLogs } from '@/lib'
import React from 'react'
import NotificationItem from './NotificationItem'

const NotificationList = async() => {
       const res = await getScanLogs();

    if (!res || !res.logs || res.logs.length === 0) {
        return (
            <div className='flex justify-center items-center h-full text-gray-500 text-lg'>
                No logs found, baby 🥲
            </div>
        );
    }

    return (
        <div className='p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {res.logs.map((log) => (
                <NotificationItem key={log._id} log={log} />
            ))}
        </div>
    );

}

export default NotificationList