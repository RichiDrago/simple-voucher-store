import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// Logger
import logger from "../config/logger.js";

// Const
import httpStatusCodes from "../const/httpStatusCodes.js";
import apiResponse from "../const/apiResponse.js";
import AppError from "../utils/apiError.js";

const PUBLIC_ROUTES = ["/api/auth/login", "/api/auth/register"];

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.path);

        // If the route is public, skip authentication
        if (PUBLIC_ROUTES.includes(req.path)) {
            return next();
        }

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError(
                httpStatusCodes.UNAUTHORIZED,
                apiResponse.error.INVALID_TOKEN
            );
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new AppError(
                httpStatusCodes.INTERNAL_SERVER,
                apiResponse.error.JWT_CONFIG_ERROR
            );
        }

        jwt.verify(token!, secret);

        next();
    } catch (err) {
        logger.error(
            `Auth Middleware - ${err instanceof Error ? err.message : String(err)}`
        );
        return next(
            new AppError(
                httpStatusCodes.UNAUTHORIZED,
                apiResponse.error.INVALID_TOKEN
            )
        );
    }
};

export default authMiddleware;
