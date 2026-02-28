import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { sendOTP} from "../controllers/userController.js";
import { verifyOTP, resetPassword } from "../controllers/userController.js";
const router = express.Router();

router.post("/register/", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);


export default router;
