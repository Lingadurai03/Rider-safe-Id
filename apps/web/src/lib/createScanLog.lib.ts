'use client';

import { CreateLogApiPayload, CreateScanLogApiResponse } from '@ridersafeid/types';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_QR_SERVICE_BASE_URL;

export async function createScanLog(
    scanLogData: CreateLogApiPayload,
    userId: string,
): Promise<CreateScanLogApiResponse | void> {
    try {
        const res = await axios.post(url + 'scan/log-scan/' + userId, scanLogData);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}
