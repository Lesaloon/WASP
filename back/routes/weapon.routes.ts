import { Router } from "express";
import { WeaponController } from "../controllers/weapon.controller";
import { checkRole } from "../middleware/rbac.middleware";

const router = Router();

router.get("/", WeaponController.getAll);
router.get("/:id", WeaponController.getOne);
router.get("/find", WeaponController.findBy);
router.post("/", checkRole(["writer", "admin"]), WeaponController.create);
router.put("/:id", checkRole(["writer", "admin"]), WeaponController.update);
router.delete("/:id", checkRole(["writer", "admin"]), WeaponController.delete);

export default router;