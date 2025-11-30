import jwt from "jsonwebtoken";
import type { SignOptions, Secret } from "jsonwebtoken";

// Model
import type User from "../model/User.model.js";

// Utils
import ApiError from "../utils/apiError.js";

// Consts
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";

interface JwtPayload {
    id: number;
    username: string;
    privilege_name: string;
}

export class JwtService {
    static generateAccessToken(user: User): string {
        const accessSecret = process.env.JWT_SECRET;
        const accessExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

        if (!accessSecret) {
            throw new ApiError(
                httpStatusCodes.INTERNAL_SERVER,
                apiResponse.error.JWT_CONFIG_ERROR
            );
        }

        const options: SignOptions = {
            expiresIn: accessExpiresIn,
        } as SignOptions;

        return jwt.sign(
            {
                id: user.id,
                username: user.username,
                privilege_name: user.privilege_name,
            },
            accessSecret as Secret,
            options
        );
    }
}
