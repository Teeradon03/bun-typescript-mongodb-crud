import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validateRegister, validateLogin } from "../middlewares/validate";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/me", auth, authController.getMe);
export default router;
