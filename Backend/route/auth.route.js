import { login,signup } from "../controller/auth.controller.js";
import express from "express"

const router = express.Router();


router.post('/login',login)

router.post('/signup',signup)


export default router;