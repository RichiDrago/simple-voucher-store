// DAL
import { UserDAL } from "../dal/user.dal.js";

// Service
import { JwtService } from "./jwt.service.js";

// DTO
import {
    RegisterAuthDTO,
    LoginAuthDTO,
    AuthResponseDTO,
} from "../dto/auth.dto.js";

// Utils
import ApiError from "../utils/apiError.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

// Consts
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";

export class AuthService {
    /**
     * Registers a new user.
     */
    static async register(dto: RegisterAuthDTO): Promise<AuthResponseDTO> {
        const exists = await UserDAL.findByUsername(dto.username);
        if (exists) {
            throw new ApiError(
                httpStatusCodes.CONFLICT,
                apiResponse.error.USERNAME_TAKEN
            );
        }

        const user = await UserDAL.createUser({
            username: dto.username,
            password: dto.password,
            privilege_name: "user",
        });

        const accessToken = JwtService.generateAccessToken(user);
        const authResponse = new AuthResponseDTO(accessToken);
        return authResponse;
    }

    /**
     * Authenticates a user using username and password.
     */
    static async login(dto: LoginAuthDTO): Promise<AuthResponseDTO> {
        const user = await UserDAL.findByUsername(dto.username);
        console.log(user);
        if (!user) {
            throw new ApiError(
                httpStatusCodes.UNAUTHORIZED,
                apiResponse.error.INVALID_CREDENTIALS
            );
        }

        const isValid = await comparePassword(dto.password, user.password);
        if (!isValid) {
            throw new ApiError(
                httpStatusCodes.UNAUTHORIZED,
                apiResponse.error.INVALID_CREDENTIALS
            );
        }

        const accessToken = JwtService.generateAccessToken(user);
        const authResponse = new AuthResponseDTO(accessToken);
        return authResponse;
    }
}
