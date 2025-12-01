import express from "express";

// Controller
import voucherPurchaseController from "../controller/voucher-purchase.controller.js";

// Validators
import {
    validateGetVoucherPurchaseById,
    validateCreateVoucherPurchase,
    validateUpdateVoucherPurchase,
    validateDeleteVoucherPurchase,
} from "../middleware/validator/voucher-purchase.validator.js";

const voucherPurchaseRoute = express.Router();

/**
 * @route GET /voucher-purchases
 * @route POST /voucher-purchases
 * @desc  Get all user voucher purchases or create a new voucher purchase
 */
voucherPurchaseRoute
    .get("/", voucherPurchaseController.getAll)
    .post("/", validateCreateVoucherPurchase, voucherPurchaseController.create);

/**
 * @route GET /oucher-purchases/:id
 * @route PUT /oucher-purchases/:id
 * @route DELETE /oucher-purchases/:id
 * @desc  Get, update, or delete voucher purchase by ID
 */
voucherPurchaseRoute
    .route("/:id")
    .get(validateGetVoucherPurchaseById, voucherPurchaseController.getById)
    .put(validateUpdateVoucherPurchase, voucherPurchaseController.update)
    .delete(validateDeleteVoucherPurchase, voucherPurchaseController.delete);

export default voucherPurchaseRoute;
