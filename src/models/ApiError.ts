export type ApiFieldError = {
    field: string;
    message: string;
}

export type ApiErrorResponse = {
    code: string;
    message: string;
    errors?: ApiFieldError[];
}

export class ApiError extends Error {
    status: number;
    code: string;
    errors?: ApiFieldError[];

    constructor(
        status: number,
        response: ApiErrorResponse
    ) {
        super(response.message);

        this.name = "ApiError";
        this.status = status;
        this.code = response.code;
        this.errors = response.errors;
    }
}