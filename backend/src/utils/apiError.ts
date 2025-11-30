// Const
import apiResponse from "../const/apiResponse.js";

export default class AppError extends Error {
    public readonly httpStatusCode: number;
    public readonly errorCode: string;

    constructor(
        httpStatusCode: number = 500,
        errorObject: { message: string; code: string } = apiResponse.error
            .INTERNAL_SERVER
    ) {
        super(errorObject.message);

        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorObject.code;

        this.name = new.target.name;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, new.target);
        }
    }
}
