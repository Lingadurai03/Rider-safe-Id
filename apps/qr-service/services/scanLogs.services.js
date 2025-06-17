import ScanLog from '../models/ScanLogs.js';

export const createScanLogService = async (userId, scanData) => {
    const log = await ScanLog.create({
        ownerUserId: userId,
        ...scanData,
    });
    return log;
};

export const getScanLogsService = async (userId) => {
    // fetch all logs (or by condition)
    const logs = await ScanLog.find({ userId });
    return logs;
};
