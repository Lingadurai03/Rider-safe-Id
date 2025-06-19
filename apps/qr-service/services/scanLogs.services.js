import axios from 'axios';
import dotenv from 'dotenv';

import ScanLog from '../models/ScanLogs.js';

dotenv.config();

export const createScanLogService = async (userId, scanData) => {
    const log = await ScanLog.create({
        ownerUserId: userId,
        ...scanData,
    });
    return log;
};
export const updateScanLogService = async (scanLogId, updateData) => {
    const updatedLog = await ScanLog.findByIdAndUpdate(
        scanLogId,
        {
            $set: {
                lat: updateData.lat,
                long: updateData.long,
                accuracy: updateData.accuracy,
            },
        },
        { new: true },
    );

    return updatedLog;
};

export const getNotificationCountService = async (token) => {
    try {
        const response = await axios.get(
            `${process.env.USER_SERVICE_BASE_URL}auth/self`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const { id, lastSeenNotificationAt } = response.data;
        console.log(id);

        const count = await ScanLog.countDocuments({
            ownerUserId: id,
            scannedAt: { $gt: lastSeenNotificationAt },
        });

        return count;
    } catch (_error) {
        throw new Error('Failed to fetch Nofification Count');
    }
};

export const getScanLogsService = async (token) => {
    try {
        const response = await axios.get(
            `${process.env.USER_SERVICE_BASE_URL}auth/self`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        await axios.get(
            `${process.env.USER_SERVICE_BASE_URL}auth/updateNotificationLastSeenAt`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const userId = response.data.id;

        const logs = await ScanLog.find({ ownerUserId: userId });
        return logs;
    } catch (_error) {
        throw new Error('Failed to fetch scan logs');
    }
};
