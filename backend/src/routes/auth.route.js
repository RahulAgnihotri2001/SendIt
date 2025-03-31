import express from  "express"
import { login, logout, signup, updateProfile, checkAuth} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)

router.put('/updateProfile',protectRoute, updateProfile)

router.get('/check',protectRoute,checkAuth);
router.all("*", (req, res) => {
    res.send("Other response");
});

export default router;