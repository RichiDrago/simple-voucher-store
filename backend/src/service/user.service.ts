// DAL
import { UserDAL } from "../dal/user.dal.js";

// DTO
import { UpdateUserDTO, UserResponseDTO } from "../dto/user.dto.js";

// Utils
import ApiError from "../utils/apiError.js";

// Consts
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";

export class UserService {
    /**
     * Get all users.
     */
    static async getAll(): Promise<UserResponseDTO[]> {
        const users = await UserDAL.getAllUsers();

        return users.map((user) => {
            return new UserResponseDTO(
                user.id,
                user.username,
                user.privilege_name,
                user.Role.privilege ?? 1
            );
        });
    }

    /**
     * Get user by ID.
     */
    static async getById(id: string): Promise<UserResponseDTO> {
        const user = await UserDAL.findById(Number(id));
        if (!user) {
            throw new ApiError(
                httpStatusCodes.NOT_FOUND,
                apiResponse.error.USER_NOT_FOUND
            );
        }

        return new UserResponseDTO(
            user.id,
            user.username,
            user.privilege_name,
            user.Role.privilege ?? 1
        );
    }

    /**
     * Update user by ID.
     */
    static async update(
        id: string,
        data: UpdateUserDTO
    ): Promise<UserResponseDTO> {
        const updatedUser = await UserDAL.updateUser(Number(id), data);

        if (!updatedUser) {
            throw new ApiError(
                httpStatusCodes.NOT_FOUND,
                apiResponse.error.USER_NOT_FOUND
            );
        }

        return new UserResponseDTO(
            updatedUser.id,
            updatedUser.username,
            updatedUser.privilege_name,
            updatedUser.Role.privilege ?? 1
        );
    }

    /**
     * Delete user by ID.
     */
    static async delete(id: string): Promise<void> {
        const user = await UserDAL.findById(Number(id));
        if (!user) {
            throw new ApiError(
                httpStatusCodes.NOT_FOUND,
                apiResponse.error.USER_NOT_FOUND
            );
        }

        await UserDAL.deleteUser(Number(id));
    }
}
