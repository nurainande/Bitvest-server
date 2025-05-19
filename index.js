import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import investmentsRoutes from "./routes/investments.route.js";
import flutterwavesRoutes from "./routes/flutterwave.route.js";


// flutterwave
import Flutterwave from 'flutterwave-node-v3';
import open from 'open';
// dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.get('/musa', (req, res) => {
    res.send('Hello, World MusaSSSSASSS and the developers !');
});

app.use("/api/auth", authRoutes);
app.use("/api/investments", investmentsRoutes);
app.use("/api/flutterwave", flutterwavesRoutes);





// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//     });
// }



// flutterwave-stuffs
// const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// // Initiating the transaction
// const payload = {
//     "card_number": "5531886652142950",
//     "cvv": "564",
//     "expiry_month": "09",
//     "expiry_year": "21",
//     "currency": "NGN",
//     "amount": "100",
//     "redirect_url": "https://www.google.com",
//     "fullname": "Flutterwave Developers",
//     "email": "developers@flutterwavego.com",
//     "phone_number": "09000000000",
//     "enckey": process.env.FLW_ENCRYPTION_KEY,
//     "tx_ref": "example01",
// }


// const chargeCard = async () => {
//     try {
//         const response = await flw.Charge.card(payload)
//         console.log(response)

//         // Authorizing transactions

//         // For PIN transactions
//         if (response.meta.authorization.mode === 'pin') {
//             let payload2 = payload
//             payload2.authorization = {
//                 "mode": "pin",
//                 "fields": [
//                     "pin"
//                 ],
//                 "pin": 3310
//             }
//             const reCallCharge = await flw.Charge.card(payload2)

//             // Add the OTP to authorize the transaction
//             const callValidate = await flw.Charge.validate({
//                 "otp": "12345",
//                 "flw_ref": reCallCharge.data.flw_ref
//             })
//             console.log(callValidate)

//         }
//         // For 3DS or VBV transactions, redirect users to their issue to authorize the transaction
//         if (response.meta.authorization.mode === 'redirect') {

//             var url = response.meta.authorization.redirect
//             open(url)
//         }

//         console.log(response)


//     } catch (error) {
//         console.log(error)
//     }
// }

// chargeCard();

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
});
