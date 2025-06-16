import mongoose from 'mongoose';

const scanLogSchema = new mongoose.Schema({
    ownerUserId: String, // this QR belongs to this user
    viewerIp: String,
    accuracy: { type: String, enum: ['poor', 'accurate'], default: 'poor' },
    city: String,
    state: String,
    country: String,
    lat: String,
    long: String,
    scannedAt: { type: Date, default: Date.now },
});

const ScanLog = mongoose.model('ScanLog', scanLogSchema);

export default ScanLog;
