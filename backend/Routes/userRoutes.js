import { Router } from "express";
import { currUser, loginUser, logoutUser, registerUser } from "../Controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router = Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/curruser').get(isAuthenticatedUser, currUser);

export default router;