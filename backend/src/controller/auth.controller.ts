import type { NextFunction, Request, Response } from "express";

// Logger
import logger from "../config/logger.js";

// Services
import { AuthService } from "../service/auth.service.js";

// DTOs
import { LoginAuthDTO, RegisterAuthDTO } from "../dto/auth.dto.js";

// Const
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";

export default class AuthController {
    // REGISTER ---------------------------------------
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const dto = new RegisterAuthDTO(username, password);
            const result = await AuthService.register(dto);

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.AUTH.register,
                result
            );
        } catch (error: any) {
            logger.error(`AuthController - register - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }

    // LOGIN ------------------------------------------
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const dto = new LoginAuthDTO(username, password);
            const result = await AuthService.login(dto);

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.AUTH.login,
                result
            );
        } catch (error: any) {
            logger.error(`AuthController - login - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }
}
