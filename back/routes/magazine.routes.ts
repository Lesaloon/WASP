import { Router } from "express";
import { MagazineControler } from "../controllers/magazine.controller";

const router = Router();

router.get("/", MagazineControler.getAll);
router.get("/:id", MagazineControler.getOne);
router.get("/find", MagazineControler.findBy);
router.post("/", MagazineControler.create);
router.put("/:id", MagazineControler.update);
router.delete("/:id", MagazineControler.delete);

export default router;