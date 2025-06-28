import express from 'express';

import {
    generateAndUploadQR,
    getQRImageUrl,
} from '../controllers/qrController.js';

const router = express.Router();

router.post('/generate/:userId', generateAndUploadQR);
router.get('/:userId', getQRImageUrl);

export default router;
