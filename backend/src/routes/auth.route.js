import express from  "express"
import { login, logout, signup } from "../controllers/auth.controller.js";
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.all("*", (req, res) => {
    res.send("Other response");
});

export default router;