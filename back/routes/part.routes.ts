import { Router } from "express";
import { PartController } from "../controllers/part.controller";

const router = Router();

router.get("/", PartController.getAll);
router.get("/:id", PartController.getOne);
router.get("/find", PartController.findBy);
router.post("/", PartController.create);
router.put("/:id", PartController.update);
router.delete("/:id", PartController.delete);

export default router;