import express from "express";
import {
    payment,
    verifyPayment
    
} from "../controllers/payment.controller.js";
// import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/initiate-payment", payment);
router.get("/verify-payment/:id",verifyPayment)



export default router;
