import type { ApiResponse } from "../types/apiResponse";

const notifyApiError = (
    apiResponse: ApiResponse<unknown>,
    notify: (props: { type: "success" | "warning" | "error"; title: number; message: string }) => void
) => {
    const message = apiResponse.result.code !== undefined ? apiResponse.result.code.toString() : apiResponse.result.message;

    // API request aborted
    if (message === "0") return;

    notify({
        type: "error",
        title: apiResponse.httpCode,
        message,
    });
};

export { notifyApiError };
