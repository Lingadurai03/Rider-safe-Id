'use client';

import { Bell } from 'lucide-react';

import LanguageSelect from '../LanguageSelect';
import Link from 'next/link';

export default function Navbar() {
    const notificationCount = 3; // dynamically fetch this later if needed

    return (
        <nav className='fixed top-0 left-0 w-full z-50 backdrop-blur-xs  border-b-white-sm bg-white-xs shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
                {/* Left Side: App Name */}
                <Link href={'/'} className='text-xl font-bold text-primary drop-shadow-glow'>
                   RiderSafeID
                </Link>

                {/* Right Side: Language Select & Notification */}
                <div className='flex items-center gap-4'>
                    {/* Language Select */}
                    <LanguageSelect />

                    {/* Notification Icon with Count */}
                    <Link href={'notifications'} className='relative'>
                        
                        <Bell className='text- w-7 h-7 text cursor-pointer hover:rotate-20 transition-all duration-300 hover:text-[color:var(--color-primary)]' />
                        {notificationCount > 0 && (
                            <span className='absolute -top-1 -right-1 bg-primary text text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg'>
                                {notificationCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
