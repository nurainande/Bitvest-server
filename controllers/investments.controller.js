// controllers/investmentController.js
import { Investments } from "../models/investments.model.js";

export const createInvestment = async (req, res) => {
    const { plan, amount } = req.body;

    try {
        const investments = await Investments.create({
            user: req.userId,
            plan,
            amount,
            status: 'pending'
        });

        // 2. Push the investment ID into the user's investments array
        await User.findByIdAndUpdate(req.userId, {
            $push: { investments: newInvestment._id },
        });

        res.status(201).json(investments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getMyInvestments = async (req, res) => {
    try {
        const investments = await Investments.find({ user: req.userId }).sort('-createdAt');
        res.json(investments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
