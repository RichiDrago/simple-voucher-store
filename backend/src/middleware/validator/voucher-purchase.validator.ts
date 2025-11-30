import type { Request, Response, NextFunction } from "express";

// Utils
import {
    isNonEmptyString,
    isValidId,
    isInteger,
} from "../../utils/validator.js";
import AppError from "../../utils/apiError.js";

// Const
import httpStatusCodes from "../../const/httpStatusCodes.js";
import apiResponse from "../../const/apiResponse.js";

/**
 * Validate the :id parameter for routes like /voucher-purchase/:id
 */
export function validateVoucherPurchaseIdParam(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { id } = req.params;

    if (!isValidId(id)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    next();
}

/**
 * Validate GET /voucher-purchase/:id
 */
export function validateGetVoucherPurchaseById(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    return validateVoucherPurchaseIdParam(req, res, next);
}

/**
 * Validate DELETE /voucher-purchase/:id
 */
export function validateDeleteVoucherPurchase(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    return validateVoucherPurchaseIdParam(req, res, next);
}

/**
 * Validate UPDATE /voucher-purchase/:id
 *
 * Requires:
 * - valid :id
 * - at least one field among:
 *      user_id, voucher_id, price_option, date, quantity
 * - all provided fields must be valid:
 *      - IDs must be positive integers
 *      - price_option must be non-empty string
 *      - date must be non-empty string
 *      - quantity must be positive integer
 */
export function validateUpdateVoucherPurchase(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { id } = req.params;
    const { user_id, voucher_id, price_option, date, quantity } = req.body;

    // validate :id
    if (!isValidId(id)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // at least one field must be present
    const hasAtLeastOneField =
        user_id !== undefined ||
        voucher_id !== undefined ||
        price_option !== undefined ||
        date !== undefined ||
        quantity !== undefined;

    if (!hasAtLeastOneField) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // user_id
    if (user_id !== undefined && !isValidId(user_id)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // voucher_id
    if (voucher_id !== undefined && !isValidId(voucher_id)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // price_option
    if (price_option !== undefined && !isNonEmptyString(price_option)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // date (qui controllo solo che sia una stringa non vuota)
    if (date !== undefined && !isNonEmptyString(date)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // quantity
    if (quantity !== undefined) {
        const num = Number(quantity);
        if (!isInteger(num) || num <= 0) {
            throw new AppError(
                httpStatusCodes.BAD_REQUEST,
                apiResponse.error.INVALID_PARAMS
            );
        }
    }

    next();
}
