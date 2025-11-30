import { Router } from "express";

// Routes import
// import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/auth", authRouter);

// router.use("/users", userRouter);

export default router;
