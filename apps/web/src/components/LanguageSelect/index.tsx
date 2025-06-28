'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { LANGUAGES, LOCALMAP } from '@/constant';
import { usePathname, useRouter } from '@/i18n';
import { getLangFromLocale } from '@/utils';

export default function LanguageSelect() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const t = useTranslations('languages');
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const [selected, setSelected] = useState(getLangFromLocale(locale));

    // Close on outside click
    const handleSelect = (lang: string) => {
        setSelected(lang);
        setIsOpen(false);

        const newLocale = LOCALMAP[lang];
        if (newLocale) {
            router.replace(pathname, { locale: newLocale });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="relative w-24 text-[color:var(--color-text)] text-sm cursor-pointer"
        >
            {/* Trigger Button */}
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full bg-white-md text-[color:var(--color-text)] backdrop-blur-sm px-3 py-2 rounded-md flex justify-between items-center shadow-inner hover:bg-white/20 transition-all duration-300"
            >
                {t(selected)}
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                />
            </div>

            {/* Dropdown Options */}
            <ul
                className={`absolute top-full mt-1 left-0 w-full bg-bg color backdrop-blur-sm rounded-md shadow-lg overflow-hidden transition-all duration-300 z-50 ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
                {LANGUAGES.map((lang) => (
                    <li
                        key={lang}
                        onClick={() => handleSelect(lang)}
                        className={`px-3 py-2 hover:bg-[color:var(--color-primary)] cursor-pointer transition-colors duration-200 ${
                            lang === selected ? 'bg-[color:var(--color-primary)]' : ''
                        }`}
                    >
                        {t(lang)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
