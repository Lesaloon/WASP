import { Router } from "express";
import { AccessoryController } from "../controllers/accessory.controller";

const router = Router();

router.get("/", AccessoryController.getAll);
router.get("/:id", AccessoryController.getOne);
router.get("/find", AccessoryController.findBy);
router.post("/", AccessoryController.create);
router.put("/:id", AccessoryController.update);
router.delete("/:id", AccessoryController.delete);

export default router;
