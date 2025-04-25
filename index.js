import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import investmentsRoutes from "./routes/investments.route.js";


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


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//     });
// }
// Basic route

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
});
