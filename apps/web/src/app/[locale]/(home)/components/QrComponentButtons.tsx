'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { downloadQrCode } from '@/utils';

import { GlowingButton } from '@/components';

const QrComponentButtons = ({ url }: { url: string | undefined }) => {
    const t = useTranslations('home');

    const downloadQR = () => {
        if (url) {
            downloadQrCode(url, 'rider-qr.png');
        }
    };
    return (
        <div className="flex flex-row gap-5 justify-center items-center flex-wrap">
            <div className="w-full max-w-[150px] md:w-[48%] lg:w-auto">
                <GlowingButton onClick={downloadQR} glow label={t('downloadQr')} />
            </div>

            <div className="w-full max-w-[150px] md:w-[48%] lg:w-auto">
                <Link href={'details/add'}>
                    <GlowingButton
                        glow
                        glowColor="var(--color-secondary)"
                        label={t('editDetails')}
                    />
                </Link>
            </div>
        </div>
    );
};

export default QrComponentButtons;
