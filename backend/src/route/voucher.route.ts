import express from "express";

// Controller
import voucherController from "../controller/voucher.controller.js";

// Validators
import {
    validateGetVoucherById,
    validateCreateVoucher,
    validateUpdateVoucher,
    validateDeleteVoucher,
} from "../middleware/validator/voucher.validator.js";

const voucherRouter = express.Router();

/**
 * @route GET /vouchers
 * @desc  Get all vouchers
 */
voucherRouter.get("/", voucherController.getAll);

/**
 * @route POST /vouchers
 * @desc  Create new voucher
 */
voucherRouter.post("/", validateCreateVoucher, voucherController.create);

/**
 * @route GET /vouchers/:id
 * @route PUT /vouchers/:id
 * @route DELETE /vouchers/:id
 * @desc  Get, update, or delete voucher by ID
 */
voucherRouter
    .route("/:id")
    .get(validateGetVoucherById, voucherController.getById)
    .put(validateUpdateVoucher, voucherController.update)
    .delete(validateDeleteVoucher, voucherController.delete);

export default voucherRouter;
