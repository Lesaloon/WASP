import { Router } from "express";
import { MagazineControler } from "../controllers/magazine.controller";
import { checkRole } from "../middleware/rbac.middleware";

const router = Router();

router.get("/", MagazineControler.getAll);
router.get("/:id", MagazineControler.getOne);
router.get("/find", MagazineControler.findBy);
router.post("/", checkRole(["writer", "admin"]), MagazineControler.create);
router.put("/:id", checkRole(["writer", "admin"]), MagazineControler.update);
router.delete("/:id", checkRole(["writer", "admin"]), MagazineControler.delete);

export default router;