import { Router } from "express";
import { adminRoutes } from "./admin.js";
import { coverageRouter } from "./coverage.js";

const router = Router();
router.use("/", adminRoutes);
router.use("/", coverageRouter);

export const internalRouter = router;
