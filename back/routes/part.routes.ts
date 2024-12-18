import { Router } from "express";
import { PartController } from "../controllers/part.controller";
import { checkRole } from "../middleware/rbac.middleware";

const router = Router();

router.get("/", PartController.getAll);
router.get("/:id", PartController.getOne);
router.get("/find", PartController.findBy);
router.post("/", checkRole(["writer", "admin"]), PartController.create);
router.put("/:id", checkRole(["writer", "admin"]), PartController.update);
router.delete("/:id", checkRole(["writer", "admin"]), PartController.delete);

export default router;