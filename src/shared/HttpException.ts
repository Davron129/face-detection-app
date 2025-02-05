export enum Errors {
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    USER_NOT_EXISTS = 'USER_NOT_EXISTS',
    BRANCH_ALREADY_EXISTS = 'BRANCH_ALREADY_EXISTS',
    BRANCH_NOT_FOUND = 'BRANCH_NOT_FOUND',
    EMPTY_BODY_ERROR = 'EMPTY_BODY_ERROR',
    EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
    WRONG_PASSWORD = 'WRONG_PASSWORD',
    INVALID_EMAIL_ADDRESS = 'INVALID_EMAIL_ADDRESS',
    INVALID_TOKEN = 'INVALID_TOKEN',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    TOKEN_REVOKED = 'TOKEN_REVOKED',
    FORBIDDEN_ERROR = 'FORBIDDEN_ERROR',
    BAD_REQUEST_ERROR = 'BAD_REQUEST_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    BAD_INPUT_ERROR = 'BAD_INPUT_ERROR',
    COURSE_NOT_FOUND = 'COURSE_NOT_FOUND',
    SECTION_NOT_FOUND = 'SECTION_NOT_FOUND',
    NOT_FOUND = 'NOT_FOUND',
}

export class HttpException extends Error {
    status: number;
    error: Errors;
    message: string;

    constructor(status: number, error: Errors, message?: string) {
        super();
        this.status = status;
        this.error = error;
        this.message = message || '';
    }
}
