const apiResponse = {
    success: {
        AUTH: {
            register: "User registered successfully",
            login: "User logged in successfully",
        },
        USER: {
            getUsers: "Users fetched successfully",
            getUserById: "User fetched successfully",
            addUser: "User created successfully",
            editUser: "User edited successfully",
            deleteUser: "User deleted successfully"
        },
    },
    error: {
        // General Errors
        INTERNAL_SERVER: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Internal Server Error",
        },
        INVALID_PARAMS: {
            code: "INVALID_PARAMS",
            message: "Invalid parameters",
        },
        INVALID_TOKEN: {
            code: "INVALID_TOKEN",
            message: "Invalid token",
        },
        // Auth Errors
        INVALID_CREDENTIALS: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid username or password",
        },
        JWT_CONFIG_ERROR: {
            code: "JWT_CONFIG_ERROR",
            message: "JWT secrets are not configured",
        },
        USERNAME_TAKEN: {
            code: "USERNAME_TAKEN",
            message: "Username is already taken",
        },
        // User Errors
        USER_NOT_FOUND: {
            code: "USER_NOT_FOUND",
            message: "User not found",
        },
    },
};

export default apiResponse;
