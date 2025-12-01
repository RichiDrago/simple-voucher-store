import server, { handleError } from "./server";

// Models
import type { baseApiResponse, ApiResponse } from "../types/apiResponse";
import type { AuthApiResponse } from "../types/auth";

// Endpoints
const loginEndpoint = "/auth/login";
const registerEndpoint = "/auth/register";

export async function authLoginApi(username: string, password: string): Promise<ApiResponse<AuthApiResponse | undefined>> {
    try {
        const response = await server.post<baseApiResponse<AuthApiResponse>>(loginEndpoint, {
            username,
            password,
        });

        return {
            httpCode: response.status,
            ...response.data,
        };
    } catch (error) {
        return handleError(error);
    }
}

export async function authRegisterApi(username: string, password: string): Promise<ApiResponse<AuthApiResponse | undefined>> {
    try {
        const response = await server.post<baseApiResponse<AuthApiResponse>>(registerEndpoint, {
            username,
            password,
        });

        return {
            httpCode: response.status,
            ...response.data,
        };
    } catch (error) {
        return handleError(error);
    }
}
