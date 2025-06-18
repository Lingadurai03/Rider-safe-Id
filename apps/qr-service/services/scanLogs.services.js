import ScanLog from '../models/ScanLogs.js';

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

export const getScanLogsService = async (userId) => {
    // fetch all logs (or by condition)
    const logs = await ScanLog.find({ ownerUserId: userId });
    return logs;
};
