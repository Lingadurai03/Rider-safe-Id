import express from 'express';

import {
    createScanLog,
    getScanLogs,
    updateScanLog,
} from '../controllers/scan.controller.js';

const router = express.Router();

router.post('/log-scan/:userId', createScanLog);
router.patch('/update-log/:scanLogId', updateScanLog);
router.get('/log-scan/:userId', getScanLogs);

export default router;
