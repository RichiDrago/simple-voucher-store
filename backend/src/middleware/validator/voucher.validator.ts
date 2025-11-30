import type { Request, Response, NextFunction } from "express";

// Utils
import { isNonEmptyString, isValidId } from "../../utils/validator.js";
import AppError from "../../utils/apiError.js";

// Const
import httpStatusCodes from "../../const/httpStatusCodes.js";
import apiResponse from "../../const/apiResponse.js";

/**
 * Validate the :id parameter for routes like /voucher/:id
 */
export function validateVoucherIdParam(
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
 * Validate GET /voucher/:id
 */
export function validateGetVoucherById(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    return validateVoucherIdParam(req, res, next);
}

/**
 * Validate DELETE /voucher/:id
 */
export function validateDeleteVoucher(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    return validateVoucherIdParam(req, res, next);
}

/**
 * Validate CREATE /voucher
 *
 * Requires:
 * - name → non-empty string
 * - description → optional string
 */
export function validateCreateVoucher(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { name, description } = req.body;

    // name is required
    if (!isNonEmptyString(name)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // description is optional but must be a string if present
    if (description !== undefined && typeof description !== "string") {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    next();
}

/**
 * Validate UPDATE /voucher/:id
 *
 * Requires:
 * - valid :id
 * - at least one field: name | description
 * - name (if present) → non-empty string
 * - description (if present) → string
 */
export function validateUpdateVoucher(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { id } = req.params;
    const { name, description } = req.body;

    // validate :id
    if (!isValidId(id)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // at least one field must be present
    const hasAtLeastOneField = name !== undefined || description !== undefined;

    if (!hasAtLeastOneField) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // name validation
    if (name !== undefined && !isNonEmptyString(name)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // description validation
    if (description !== undefined && typeof description !== "string") {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    next();
}
