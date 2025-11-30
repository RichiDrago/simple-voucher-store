import type { Request, Response, NextFunction } from "express";

// Utils
import { isNonEmptyString, hasMinLength } from "../../utils/validator.js";
import AppError from "../../utils/apiError.js";

// Const
import httpStatusCodes from "../../const/httpStatusCodes.js";
import apiResponse from "../../const/apiResponse.js";

/**
 * Validates request body for user login.
 * Expects:
 *  - username: non-empty string
 *  - password: non-empty string
 */
export function validateLogin(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { username, password } = req.body;

    if (!isNonEmptyString(username) || !isNonEmptyString(password)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    next();
}

/**
 * Validates request body for user registration.
 * Expects:
 *  - username: non-empty string
 *  - password: non-empty string
 *
 */
export function validateRegister(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { username, password } = req.body;

    if (!isNonEmptyString(username) || !isNonEmptyString(password)) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            apiResponse.error.INVALID_PARAMS
        );
    }

    next();
}
