import Joi from 'joi';

import {
    createScanLogService,
    getScanLogsService,
    updateScanLogService,
} from '../services/scanLogs.services.js';

const scanLogSchema = Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
    accuracy: Joi.string().valid('poor', 'accurate').required(),
});

const updateScanLogSchema = Joi.object({
    lat: Joi.number().required(),
    long: Joi.number().required(),
    accuracy: Joi.string().valid('accurate').required(),
});

export const createScanLog = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const { error } = scanLogSchema.validate(req.body);

        if (error || !req.body)
            return res.status(400).json({ message: error.details[0].message });

        const log = await createScanLogService(userId, req.body);
        res.status(201).json({ message: 'Scan logged', log });
    } catch (err) {
        next(err);
    }
};

export const updateScanLog = async (req, res, next) => {
    try {
        const { scanLogId } = req.params;

        const { error } = updateScanLogSchema.validate(req.body);

        if (error || !req.body) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedLog = await updateScanLogService(scanLogId, req.body);

        if (!updatedLog) {
            return res.status(404).json({ message: 'Scan log not found' });
        }

        res.status(200).json({ message: 'Scan log updated', log: updatedLog });
    } catch (err) {
        next(err);
    }
};

export const getScanLogs = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const logs = await getScanLogsService(userId);
        res.status(200).json({ logs });
    } catch (err) {
        next(err);
    }
};
