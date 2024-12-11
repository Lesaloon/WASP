import { Router } from "express";
import { WeaponController } from "../controllers/weapon.controller";

const router = Router();

router.get("/", WeaponController.getAll);
router.get("/:id", WeaponController.getOne);
router.get("/find", WeaponController.findBy);
router.post("/", WeaponController.create);
router.put("/:id", WeaponController.update);
router.delete("/:id", WeaponController.delete);

export default router;