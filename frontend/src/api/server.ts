import axios, { isAxiosError } from "axios";

// Model
import type { ApiResponse } from "../types/apiResponse";

const hostname = window.location.hostname;

// Backend params
const endpoint = import.meta.env.VITE_BACKEND_ENDPOINT ?? hostname;
const port = import.meta.env.VITE_BACKEND_PORT ?? "3000";

const server = axios.create({
    baseURL: `http://${endpoint}:${port}/api`,
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
    },
});

const handleError = (err: unknown): ApiResponse<undefined> => {
    if (isAxiosError(err) && err.response?.data) {
        const errorData: ApiResponse<undefined> = {
            httpCode: err.response.status,
            ...err.response?.data,
        };
        return errorData;
    }

    return {
        httpCode: 500,
        success: false,
        result: {
            message: "Unknown server error",
        },
        data: undefined,
    };
};

export default server;

export { handleError };
