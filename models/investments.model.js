import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    plan: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    txHash: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed'],
        default: 'pending'
    },
    confirmedAt: {
        type: Date
    }
}, { timestamps: true });

export const Investments =  mongoose.model('Investment', investmentSchema);
