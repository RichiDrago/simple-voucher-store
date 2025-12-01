import server, { handleError } from "./server";

// Types
import type { ApiResponse, baseApiResponse } from "../types/apiResponse";
import type { NewVoucherPurchase, VoucherPurchase } from "../types/voucherPurchase";

const endpoint = "/voucher-purchases";

const getVoucherPurchasesApi = async (token: string, ctrl?: AbortController): Promise<ApiResponse<VoucherPurchase[] | undefined>> => {
    try {
        const response = await server.get<baseApiResponse<VoucherPurchase[]>>(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            signal: ctrl?.signal,
        });

        return {
            httpCode: response.status,
            ...response.data,
        };
    } catch (error) {
        return handleError(error);
    }
};

const createVoucherPurchaseApi = async (token: string, voucherPurchase: NewVoucherPurchase): Promise<ApiResponse<VoucherPurchase | undefined>> => {
    try {
        const response = await server.post<baseApiResponse<VoucherPurchase>>(endpoint, voucherPurchase, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            httpCode: response.status,
            ...response.data,
        };
    } catch (error) {
        return handleError(error);
    }
};

const deleteVoucherPurchaseApi = async (token: string, id: number): Promise<ApiResponse<null | undefined>> => {
    try {
        const response = await server.delete<baseApiResponse<null>>(`${endpoint}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            httpCode: response.status,
            ...response.data,
        };
    } catch (error) {
        return handleError(error);
    }
};

export { getVoucherPurchasesApi, createVoucherPurchaseApi, deleteVoucherPurchaseApi };
