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
        VOUCHER_PURCHASE: {
            getVoucherPurchases: "Voucher purchases fetched successfully",
            getVoucherPurchaseById: "Voucher purchase fetched successfully",
            addVoucherPurchase: "Voucher purchase created successfully",
            editVoucherPurchase: "Voucher purchase edited successfully",
            deleteVoucherPurchase: "Voucher purchase deleted successfully"
        },
        VOUCHER: {
            getVouchers: "Vouchers fetched successfully",
            getVoucherById: "Voucher fetched successfully",
            addVoucher: "Voucher created successfully",
            editVoucher: "Voucher edited successfully",
            deleteVoucher: "Voucher deleted successfully"
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
        // Voucher Purchase Errors
        VOUCHER_PURCHASE_NOT_FOUND: {
            code: "VOUCHER_PURCHASE_NOT_FOUND",
            message: "Voucher purchase not found",
        },
        // Voucher Errors
        VOUCHER_NOT_FOUND: {
            code: "VOUCHER_NOT_FOUND",
            message: "Voucher not found",
        },
    },
};

export default apiResponse;
