import Joi from 'joi';

import {
    createScanLogService,
    getScanLogsService,
} from '../services/scanLogs.services.js';

const scanLogSchema = Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
    accuracy: Joi.string().valid('poor', 'accurate').required(),
});

export const createScanLog = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const { error } = scanLogSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const log = await createScanLogService(userId, req.body);
        res.status(201).json({ message: 'Scan logged', log });
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
