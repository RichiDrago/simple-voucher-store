import type { NextFunction, Request, Response } from "express";

// Logger
import logger from "../config/logger.js";

// Services
import { VoucherPurchaseService } from "../service/voucher-purchase.service.js";

// DTOs
import {
    CreateVoucherPurchaseDTO,
    UpdateVoucherPurchaseDTO,
} from "../dto/voucher-purchase.dto.js";

// Const
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";

export default class VoucherPurchaseController {
    // GET ALL -----------------------------------------
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await VoucherPurchaseService.getAll();

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.VOUCHER_PURCHASE.getVoucherPurchases,
                result
            );
        } catch (error: any) {
            logger.error(
                `VoucherPurchaseController - getAll - ${error.message}`
            );
            // Delegate error to global error handler
            next(error);
        }
    }

    // GET BY ID ---------------------------------------
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const purchaseId = req.params.id;
            const result = await VoucherPurchaseService.getById(purchaseId!);

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.VOUCHER_PURCHASE.getVoucherPurchaseById,
                result
            );
        } catch (error: any) {
            logger.error(
                `VoucherPurchaseController - getById - ${error.message}`
            );
            // Delegate error to global error handler
            next(error);
        }
    }

    // CREATE ------------------------------------------
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { user_id, voucher_id, price_option, date, quantity } =
                req.body;

            const dto = new CreateVoucherPurchaseDTO(
                user_id,
                voucher_id,
                price_option,
                date,
                quantity
            );
            const result = await VoucherPurchaseService.create(dto);

            res.createResponse(
                httpStatusCodes.CREATED,
                apiResponse.success.VOUCHER_PURCHASE.addVoucherPurchase,
                result
            );
        } catch (error: any) {
            logger.error(
                `VoucherPurchaseController - create - ${error.message}`
            );
            // Delegate error to global error handler
            next(error);
        }
    }

    // UPDATE ------------------------------------------
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const purchaseId = req.params.id;
            const { user_id, voucher_id, price_option, date, quantity } =
                req.body;

            const dto = new UpdateVoucherPurchaseDTO(
                user_id,
                voucher_id,
                price_option,
                date,
                quantity
            );

            const result = await VoucherPurchaseService.update(
                purchaseId!,
                dto
            );

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.VOUCHER_PURCHASE.editVoucherPurchase,
                result
            );
        } catch (error: any) {
            logger.error(
                `VoucherPurchaseController - update - ${error.message}`
            );
            // Delegate error to global error handler
            next(error);
        }
    }

    // DELETE ------------------------------------------
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const purchaseId = req.params.id;

            await VoucherPurchaseService.delete(purchaseId!);

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.VOUCHER_PURCHASE.deleteVoucherPurchase,
                null
            );
        } catch (error: any) {
            logger.error(
                `VoucherPurchaseController - delete - ${error.message}`
            );
            // Delegate error to global error handler
            next(error);
        }
    }
}
