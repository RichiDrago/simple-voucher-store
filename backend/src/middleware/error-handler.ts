import type { Request, Response, NextFunction } from "express";

// Const
import httpStatusCodes from "../const/httpStatusCodes.js";
import apiResponse from "../const/apiResponse.js";

// Util
import logger from "../config/logger.js";
import ApiError from "../utils/apiError.js";

interface ErrorResponse {
    status: boolean;
    result: {
        code: string | number;
        message: string;
        details?: string;
    };
}

/**
 * Global Express error handler middleware.
 */
const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): Response => {
    // Normalizziamo l'errore
    const error = err as any;

    logger.error("Error handler middleware:", {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
    });

    const isProduction = process.env.NODE_ENV === "production";

    // Valori default (errore interno)
    let httpStatus: number = httpStatusCodes.INTERNAL_SERVER;
    let code: string | number = apiResponse.error.INTERNAL_SERVER.code;
    let message: string = apiResponse.error.INTERNAL_SERVER.message;

    // Aggiungi dettagli solo in sviluppo
    let details: string | undefined;
    if (!isProduction) {
        if (error?.stack) {
            details = String(error.stack).replace(/\n\s+/g, " ");
        } else if (error?.message) {
            details = error.message;
        } else {
            details = "Undefined";
        }
    }

    if (error instanceof ApiError) {
        httpStatus = error.httpStatusCode ?? httpStatus;
        code = error.errorCode ?? code;
        message = error.message ?? message;
    } else if (typeof error?.statusCode === "number") {
        httpStatus = error.statusCode;
        if (error.message) message = error.message;
        if (error.code) code = error.code;
    }

    const response: ErrorResponse = {
        status: false,
        result: {
            code,
            message,
            ...(details ? { details } : {}),
        },
    };

    return res.status(httpStatus).json(response);
};

export default errorHandler;
