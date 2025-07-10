import { Router, Request, Response } from "express";
import { createPartLogic,addQuantityLogic, addInventoryLogic } from "../controllers/part.controller";

const router = Router();

router.post("/", createPartLogic);
router.post("/:partId", addInventoryLogic);

router.patch("/quantity/:partId", addQuantityLogic);

export default router;
