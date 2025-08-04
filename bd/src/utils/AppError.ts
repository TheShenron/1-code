export class AppError extends Error {
    public code: string;
    public statusCode: number;
    public details?: any;

    constructor(code: string, message: string, statusCode = 500, details?: any) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}
