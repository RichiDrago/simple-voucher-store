type baseApiResponse<T> = {
    success: boolean;
    result: {
        message: string;
        code?: number;
    };
    data: T;
};

type ApiResponse<T> = baseApiResponse<T> & {
    httpCode: number;
};

export type { ApiResponse, baseApiResponse };
