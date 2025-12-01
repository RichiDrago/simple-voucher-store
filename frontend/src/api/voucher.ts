import server, { handleError } from "./server";

// Types
import type { ApiResponse, baseApiResponse } from "../types/apiResponse";
import type { Voucher } from "../types/voucher";

const endpoint = "/vouchers";

const getVouchersApi = async (token: string, ctrl?: AbortController): Promise<ApiResponse<Voucher[] | undefined>> => {
    try {
        const response = await server.get<baseApiResponse<Voucher[]>>(endpoint, {
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

const getVoucherApi = async (token: string, id: number, ctrl?: AbortController): Promise<ApiResponse<Voucher | undefined>> => {
    try {
        const response = await server.get<baseApiResponse<Voucher>>(`${endpoint}/${id}`, {
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

export { getVouchersApi, getVoucherApi };
