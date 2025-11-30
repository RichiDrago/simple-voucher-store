import type { NextFunction, Request, Response } from "express";

// Logger
import logger from "../config/logger.js";

// Services
import { UserService } from "../service/user.service.js";

// DTOs
import { UpdateUserDTO } from "../dto/user.dto.js";

// Const
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";

export default class UserController {
    // GET ALL -----------------------------------------
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.getAll();

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.USER.getUsers,
                result
            );
        } catch (error: any) {
            logger.error(`UserController - getAll - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }

    // GET BY ID ---------------------------------------
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const result = await UserService.getById(userId!);

            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.USER.getUserById,
                result
            );
        } catch (error: any) {
            logger.error(`UserController - getById - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }

    // UPDATE ------------------------------------------
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const { username, password, privilege_name } = req.body;
            const dto = new UpdateUserDTO(username, password, privilege_name);
            const result = await UserService.update(userId!, dto);
            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.USER.editUser,
                result
            );
        } catch (error: any) {
            logger.error(`UserController - update - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }

    // DELETE ------------------------------------------
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            await UserService.delete(userId!);
            res.createResponse(
                httpStatusCodes.OK,
                apiResponse.success.USER.deleteUser,
                null
            );
        } catch (error: any) {
            logger.error(`UserController - delete - ${error.message}`);
            // Delegate error to global error handler
            next(error);
        }
    }
}
