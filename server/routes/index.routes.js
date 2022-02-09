import express from "express";
import UserRouter from "./auth.routes.js";
import CategoryRouter from "./category.routes.js";
import imageRouter from "./image.routes.js";
const router = express.Router();

router.use("/file", imageRouter);
router.use("/api/v1/auth", UserRouter);
router.use("/", CategoryRouter);

export default router;
