import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        balance:{
            type:Number,
            default:0
        }
        ,
        investments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Investment'
        }],
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);