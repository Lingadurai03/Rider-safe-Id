import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGO_URI = process.env.DB_URL;

export const connectMongo = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('mongo connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
};
