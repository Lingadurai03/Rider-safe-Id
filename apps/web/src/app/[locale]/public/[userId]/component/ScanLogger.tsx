'use client';

import { useEffect, useState } from 'react';
import { CreateLogApiPayload } from '@ridersafeid/types';

import { updateScanLog } from '@/lib';
import { createScanLog } from '@/lib';

interface ScanLoggerProps {
    userId: string;
    locationData: CreateLogApiPayload;
}

const ScanLogger = ({ userId, locationData }: ScanLoggerProps) => {
    const [scanLogId, setScanLogId] = useState<string | null>(null);

    useEffect(() => {
        const handleScanLogging = async () => {
            for (const key in localStorage) {
                if (key.startsWith('scanlog_')) {
                    const storedData = localStorage.getItem(key);
                    if (storedData) {
                        try {
                            const { expiry } = JSON.parse(storedData);
                            if (Date.now() > expiry) {
                                localStorage.removeItem(key);
                            }
                        } catch {
                            localStorage.removeItem(key);
                        }
                    }
                }
            }

            const scanLogKey = `scanlog_${userId}`;
            const storedData = localStorage.getItem(scanLogKey);

            let shouldLog = true;

            if (storedData) {
                try {
                    const { expiry } = JSON.parse(storedData);
                    if (Date.now() < expiry) {
                        shouldLog = false;
                    }
                } catch {}
            }

            if (shouldLog) {
                const createScanLogData = await createScanLog(locationData, userId);
                setScanLogId(createScanLogData?.log._id || null);
                const expiryTime = new Date();
                expiryTime.setHours(23, 59, 59, 999);

                localStorage.setItem(scanLogKey, JSON.stringify({ expiry: expiryTime.getTime() }));
            }
        };

        handleScanLogging();
    }, [userId, locationData]);

    useEffect(() => {
        const askForLocationPermission = async () => {
            if (!scanLogId) return;

            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;

                        await updateScanLog(scanLogId, {
                            lat: latitude,
                            long: longitude,
                            accuracy: 'accurate',
                        });
                    },
                    (error) => {
                        console.warn('⚠️ Location permission denied or error:', error);
                    },
                );
            } else {
                console.warn('❌ Geolocation not available');
            }
        };

        askForLocationPermission();
    }, [scanLogId]);

    return null;
};

export default ScanLogger;
