import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectMongo } from './db/mongoDb.js';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectMongo();
        app.listen(PORT, () => {
            console.info(`🚀 QR Service running at: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
