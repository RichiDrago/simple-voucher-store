import server, { handleError } from "./server";

// Models
import type { baseApiResponse, ApiResponse } from "../types/apiResponse";
import type { TableRecord } from "../types/TableRecord";

const endpoint = "/show-data";

const getTableRecordsApi = async (
    params?: {
        piva?: string;
        denominazione?: string;
        descrizione_beneficiario?: string;
        regione_beneficiario?: string;
        area_beneficiario?: string;
        provincia?: string;
        comune?: string;
        // settore_attivita?: string;
        codice_ateco?: string;
        descrizione_codice_ateco?: string;
        page?: number;
        per_page?: number;
    },
    ctrl?: AbortController
): Promise<ApiResponse<TableRecord[] | undefined>> => {
    try {
        const response = await server.get<baseApiResponse<TableRecord[]>>(endpoint, {
            params,
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

export { getTableRecordsApi };
