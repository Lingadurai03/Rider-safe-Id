'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NotificationCountApiReponse } from '@ridersafeid/types';
import { Bell, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getNotificationCount } from '@/lib';
import { clearTokens } from '@/utils';

import { useLogoutMutation } from '@/store/profile/profile.api';

import LanguageSelect from '../LanguageSelect';
import ThemeToggle from '../ThemeToggle';

export default function Navbar() {
    const [notificationCount, setNotificationCount] = useState<NotificationCountApiReponse | null>(
        null,
    );

    const router = useRouter();

    const [logout] = useLogoutMutation();

    const fetchCount = async () => {
        try {
            const res = await getNotificationCount();
            setNotificationCount(res || null);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchCount(); // initial fetch
        const interval = setInterval(fetchCount, 60000);

        return () => clearInterval(interval); // cleanup
    }, []);

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            clearTokens();
            router.push('login');
        } catch (_e) {
            toast.error('Logout Failed');
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xs  border-b-white-sm bg-white-xs shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Left Side: App Name */}
                <Link href={'/'} className="text-xl font-bold text-primary drop-shadow-glow">
                    RiderSafeID
                </Link>

                {/* Right Side: Language Select & Notification */}
                <div className="flex items-center gap-4">
                    {/* Language Select */}
                    <LanguageSelect />
                    <ThemeToggle />
                    {/* Notification Icon with Count */}
                    <Link href={'/notifications'} className="relative">
                        <Bell className="text- w-7 h-7 text cursor-pointer hover:rotate-20 transition-all duration-300 hover:text-[color:var(--color-primary)]" />

                        <span className="absolute -top-1 -right-1 bg-primary text text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                            {notificationCount?.count || 0}
                        </span>
                    </Link>
                    <LogOut
                        onClick={logoutHandler}
                        className="w-7 h-7 cursor-pointer text hover:text-[color:var(--color-primary)]"
                    />
                </div>
            </div>
        </nav>
    );
}
