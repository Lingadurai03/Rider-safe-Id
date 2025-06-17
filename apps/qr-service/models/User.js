import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    qrCodeUrl: { type: String },
});

export default mongoose.model('User', userSchema);
