import type { Request, Response, NextFunction } from "express";

// Utils
import { isNonEmptyString, isValidId } from "../../utils/validator.js";
import AppError from "../../utils/apiError.js";

// Const
import httpStatusCodes from "../../const/httpStatusCodes.js";
import apiResponse from "../../const/apiResponse.js";

/**
 * Validate the :id parameter in routes like /users/:id.
 */
export function validateUserIdParam(
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
 * Validate the request for GET /users/:id.
 */
export function validateGetUserById(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    return validateUserIdParam(req, res, next);
}

/**
 * Validate the request for DELETE /users/:id.
 */
export function validateDeleteUser(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    return validateUserIdParam(req, res, next);
}

/**
 * Validate the request for UPDATE /users/:id.
 * Expects:
 *  - :id must be valid
 *  - at least one field among username, password, privilege_name must be present
 *  - if present, they must be non-empty strings
 */
export function validateUpdateUser(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { id } = req.params;
    const { username, password, privilege_name } = req.body;

    // valid id
    if (!isValidId(id)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // at least one field must be present
    const hasAtLeastOneField =
        username !== undefined ||
        password !== undefined ||
        privilege_name !== undefined;

    if (!hasAtLeastOneField) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    // if present, they must be non-empty strings
    if (username !== undefined && !isNonEmptyString(username)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    if (password !== undefined && !isNonEmptyString(password)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    if (privilege_name !== undefined && !isNonEmptyString(privilege_name)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    next();
}
