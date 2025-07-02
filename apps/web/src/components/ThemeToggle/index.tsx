'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = Cookies.get('theme');
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        Cookies.set('theme', newTheme, { expires: 30 });

        document.documentElement.classList.toggle('dark');
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative w-7 h-7 text flex items-center justify-center transition-all duration-300"
        >
            <Sun
                className={clsx(
                    'absolute w-7 h-7 transform transition-all duration-300',
                    isDark
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-2 pointer-events-none',
                )}
            />

            <Moon
                className={clsx(
                    'absolute w-7 h-7 transform transition-all duration-300',
                    isDark
                        ? 'opacity-0 translate-y-2 pointer-events-none'
                        : 'opacity-100 translate-y-0',
                )}
            />
        </button>
    );
};

export default ThemeToggle;
