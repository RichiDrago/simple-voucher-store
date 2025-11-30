import { Router } from "express";

// Routes import
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import voucherPurchaseRouter from "./voucher-purchase.route.js";
import voucherRouter from "./voucher.route.js";

const router = Router();

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/voucher-purchases", voucherPurchaseRouter);

router.use("/vouchers", voucherRouter);

export default router;
