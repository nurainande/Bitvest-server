import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, unique: true },
    email: String,
    amount: Number,
    status: String,
    createdAt: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
