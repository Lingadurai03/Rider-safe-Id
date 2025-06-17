import express from 'express';

import { createScanLog, getScanLogs } from '../controllers/scan.controller.js';

const router = express.Router();

router.post('/log-scan/:userId', createScanLog);
router.get('/log-scan/:userId', getScanLogs);

export default router;
