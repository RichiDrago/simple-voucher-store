import type { NextFunction, Request, Response } from "express";

// Logger
import logger from "../config/logger.js";

// Services
import { VoucherService } from "../service/voucher.service.js";

// DTOs
import { UpdateVoucherDTO } from "../dto/voucher.dto.js";

// Const
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";

export default class VoucherController {
    // GET ALL -----------------------------------------
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await VoucherService.getAll();

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.VOUCHER.getVouchers,
                result
            );
        } catch (error: any) {
            logger.error(`VoucherController - getAll - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }

    // GET BY ID ---------------------------------------
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const voucherId = req.params.id;
            const result = await VoucherService.getById(voucherId!);

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.VOUCHER.getVoucherById,
                result
            );
        } catch (error: any) {
            logger.error(`VoucherController - getById - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }

    // CREATE ------------------------------------------
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description } = req.body;

            // const created = await VoucherService.({
            //     name,
            //     description,
            // });
            //TODO : Implement create voucher service method

            res.createResponse(
                httpStatusCodes.CREATED,
                apiResponse.success.VOUCHER.addVoucher,
                null
            );
        } catch (error: any) {
            logger.error(`VoucherController - create - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }

    // UPDATE ------------------------------------------
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const voucherId = req.params.id;
            const { name, description } = req.body;

            const dto = new UpdateVoucherDTO(name, description);

            const result = await VoucherService.update(voucherId!, dto);

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.VOUCHER.editVoucher,
                result
            );
        } catch (error: any) {
            logger.error(`VoucherController - update - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }

    // DELETE ------------------------------------------
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const voucherId = req.params.id;

            await VoucherService.delete(voucherId!);

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.VOUCHER.deleteVoucher,
                null
            );
        } catch (error: any) {
            logger.error(`VoucherController - delete - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }
}
