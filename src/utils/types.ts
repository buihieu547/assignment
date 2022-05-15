export type APIResponse<T> = {
    status?: number,
    message?: string,
    type?: string,
    error?: string,
    results?: T,
}

export enum StatusCode {
    NotFound = 404
}