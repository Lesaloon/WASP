import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
const router = Router();

router.get("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/refresh", AuthController.refresh);

export default router;