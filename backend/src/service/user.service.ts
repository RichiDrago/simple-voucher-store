// DAL
import { UserDAL } from "../dal/user.dal.js";

// DTO
import {
    RegisterUserDTO,
    LoginUserDTO,
    UserResponseDTO,
} from "../dto/user.dto.js";

// Utils
import ApiError from "../utils/apiError.js";
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

export class UserService {
    /**
     * Registers a new user.
     * Throws ApiError if username is already taken.
     */
    static async register(dto: RegisterUserDTO): Promise<UserResponseDTO> {
        const exists = await UserDAL.findByUsername(dto.username);
        if (exists) {
            throw new ApiError(
                httpStatusCodes.CONFLICT,
                "Username already taken",
                "USERNAME_TAKEN"
            );
        }

        const hashed = await hashPassword(dto.password);

        const user = await UserDAL.createUser({
            username: dto.username,
            password: hashed,
            privilege_name: "user",
        });

        return this.toUserResponse(user);
    }

    /**
     * Authenticates a user using username and password.
     * Throws ApiError if credentials are invalid.
     */
    static async login(dto: LoginUserDTO): Promise<UserResponseDTO> {
        const user = await UserDAL.findByUsername(dto.username);
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

        // If you want to add tokens later, you can return:
        // { user: this.toUserResponse(user), accessToken, refreshToken }
        return this.toUserResponse(user);
    }

    /**
     * Maps a user entity (from DAL/ORM) to a UserResponseDTO.
     */
    private static toUserResponse(user: any): UserResponseDTO {
        const dto = new UserResponseDTO(
            user.id,
            user.username,
            user.privilege_name ?? "user"
        );
        return dto;
    }
}
