import express from 'express';

import {
    createScanLog,
    getNotificationCount,
    getScanLogs,
    updateScanLog,
} from '../controllers/scan.controller.js';

const router = express.Router();

router.post('/log-scan/:userId', createScanLog);
router.patch('/update-log/:scanLogId', updateScanLog);
router.get('/logs/:userId', getScanLogs);
router.get('/notificationCount', getNotificationCount);

export default router;
