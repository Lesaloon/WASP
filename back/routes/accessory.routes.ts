import { Router } from "express";
import { AccessoryController } from "../controllers/accessory.controller";
import { checkRole } from "../middleware/rbac.middleware";
const router = Router();

router.get("/", AccessoryController.getAll);
router.get("/:id", AccessoryController.getOne);
router.get("/find", AccessoryController.findBy);
router.post("/", checkRole(["writer", "admin"]), AccessoryController.create);
router.put("/:id", checkRole(["writer", "admin"]), AccessoryController.update);
router.delete("/:id", checkRole(["writer", "admin"]), AccessoryController.delete);

export default router;
