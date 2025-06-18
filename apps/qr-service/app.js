import cors from 'cors';
import express from 'express';

import { errorHandler } from './middlewares/errorHandler.js';
import qrRoutes from './routes/qrRoutes.js';
import scanRoutes from './routes/scanRoutes.js';

const app = express();

// Middlewares
app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:3000', // your frontend URL
        credentials: true, // if you need cookies/auth headers
    }),
);

// Routes
app.use('/api/scan', scanRoutes);
app.use('/api/qr', qrRoutes);

// Error Handling
app.use(errorHandler);

export default app;
