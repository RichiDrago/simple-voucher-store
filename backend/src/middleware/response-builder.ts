import type { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Response {
            createResponse(
                httpStatusCode: number,
                message: string,
                data?: unknown
            ): Response;
        }
    }
}

export function createResponse<T>(
    res: Response,
    httpStatusCode: number,
    message: string,
    data?: T
) {
    return res.status(httpStatusCode).json({
        success: httpStatusCode < 400,
        result: {
            message: message,
        },
        data,
    });
}

const responseBuilder = (_: Request, res: Response, next: NextFunction) => {
    res.createResponse = (
        httpStatusCode: number,
        message: string,
        data?: unknown
    ) => {
        return createResponse(res, httpStatusCode, message, data);
    };

    next();
};

export default responseBuilder;
