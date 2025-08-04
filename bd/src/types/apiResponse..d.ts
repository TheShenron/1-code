export interface ApiSuccess<T = any> {
    success: true;
    data: T;
    message?: string;
    error: null;
}

export interface ApiError {
    success: false;
    data: null;
    message: string;
    error: {
        code: string;
        message: string;
        details?: any;
    };
}

export type ApiResponse<T = any> = ApiSuccess<T> | ApiError;
