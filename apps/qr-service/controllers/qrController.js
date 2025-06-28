import dotenv from 'dotenv';
import QRCode from 'qrcode';
import streamifier from 'streamifier';

import cloudinary from '../db/cloudinary.js';
import User from '../models/User.js';

dotenv.config();

export const generateAndUploadQR = async (req, res) => {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== process.env.INTERNAL_API_KEY) {
        return res.status(403).json({ message: 'Forbidden — Invalid API Key' });
    }
    const { userId } = req.params;

    if (!userId) return res.status(400).json({ message: 'User ID missing' });

    try {
        const qrData = `${process.env.FRONT_END_URL}public/${userId}`;

        const qrBuffer = await QRCode.toBuffer(qrData);

        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                {
                    folder: 'ridersafeid/qrcodes',
                    public_id: `qr_${userId}`,
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                },
            );
            streamifier.createReadStream(qrBuffer).pipe(uploadStream);
        });

        // Save the mapping in MongoDB
        const newQRDoc = new User({
            userId: userId,
            qrCodeUrl: uploadResult.secure_url,
        });
        await newQRDoc.save();

        res.status(200).json({
            message: 'QR generated & uploaded!',
            qrUrl: uploadResult.secure_url,
        });
    } catch (err) {
        console.error('QR Generation Error:', err);
        res.status(500).json({ message: 'QR Generation Failed' });
    }
};

export const getQRImageUrl = async (req, res, next) => {
    const { userId } = req.params;

    try {
        let qrDetails = await User.find({ userId });
        res.status(200).json({ qrDetails });
    } catch (e) {
        next(e);
    }
};
