import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import {Transaction} from "../models/transaction.model.js";
import axios from "axios";

const FLW_BASE_URL = "https://api.flutterwave.com/v3";

export const payment = async (req, res) => {
    const { amount, email, name } = req.body;
    try {
        const response = await axios.post(`${FLW_BASE_URL}/payments`, {
            tx_ref: "bitvest-" + Date.now(),
            amount,
            currency: "NGN",
            redirect_url: `${process.env.CLIENT_URL}/payment-success`, // Replace with your live frontend
            payment_options: "card",
            customer: {
                email,
                name,
            },
            customizations: {
                title: "Bitvest Wallet Funding",
                description: "Funding your Bitvest Wallet",
                // logo: "https://yourdomain.com/logo.png", // optional
            },
        }, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
        });

        res.json({ link: response.data.data.link }); // This is the payment link to redirect user to
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to initiate payment" });
      }
};

export const verifyPayment = async (req, res) => {
    const { id } = req.params;
    console.log('id',id)
  console.log('lets see what happens here before tthe rquest')

  
    try {
      const response = await axios.get(`${FLW_BASE_URL}/transactions/${id}/verify`, {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      });
  
      const data = response.data.data;
      console.log('data', data)

  
        if (data.status === "successful" && data.currency === "NGN") {
          const transactionId = data.id.toString(); // Flutterwave's transaction ID
            const amount = parseFloat(data.amount); // Amount paid
          const email = data.customer.email.split("_").pop(); // You passed this when initiating payment

          const existing = await Transaction.findOne({ transactionId });
          if (existing) {
            return res.status(409).json({ message: "Transaction already processed" });
          }

            // 1. Find the user
            const user = await User.findOne({ email });
            console.log('user',user)
            if (!user) {
              console.log('no user found')
              return res.status(404).json({ message: "User not found" })
            };

            // 2. Update wallet balance
            user.balance += amount;
            await user.save();

          // 💾 Save transaction
          const transaction = new Transaction({
            transactionId,
            email,
            amount,
            status: "successful",
          });
          await transaction.save();

            return res.json({
                success: true,
                message: "Wallet funded successfully",
                balance: user.balance,
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid payment status" });
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  };
  