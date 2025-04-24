import express from "express";
import {createInvestment,getMyInvestments} from "../controllers/investments.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/post', verifyToken, createInvestment);
router.get('/my', verifyToken, getMyInvestments);

router.get('/get',(req,res)=>{
    res.send('Investment is confirmed')
})

export default router;
