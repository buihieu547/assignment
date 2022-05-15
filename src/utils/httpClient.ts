import axios, {
    AxiosRequestConfig, AxiosInstance, AxiosRequestHeaders, AxiosResponse,
    AxiosError,
} from 'axios';
import { url } from 'constant';
import { APIResponse, StatusCode } from 'utils';

export class HttpClient {
    private static _instance: AxiosInstance;

    static get instance(): AxiosInstance {
        if (!HttpClient._instance) {
            HttpClient._instance = HttpClient.create();
        }

        return HttpClient._instance;
    }

    private static create(): AxiosInstance {
        const requestConfig: AxiosRequestConfig = {
            withCredentials: true,
        };
        const instance = axios.create(requestConfig);

        return instance;
    }

    static get<T>(
        endpoint: string,
        params?: unknown,
    ): Promise<T> {
        return HttpClient.instance
            .get(
                `${url}${endpoint}`,
                {
                    params,
                    headers: HttpClient.getHeaders(),
                },
            )
            .then((res: AxiosResponse): Promise<T> => HttpClient.handleAxiosResponse<T>(res))
            .catch((err: AxiosError): Promise<T> => HttpClient.handleAxiosError<T>(err));
    }

    private static handleAxiosResponse<T>(res: AxiosResponse<APIResponse<T>>): Promise<T> {
        const { data } = res;

        if (data?.status === StatusCode.NotFound) {
            return Promise.reject<T>(new Error(data.message));
        }

        if (data?.results) {
            return Promise.resolve<T>(data.results);
        }

        return Promise.reject<T>(new Error(data.message));
    }

    private static handleAxiosError<T>(err: AxiosError): Promise<T> {
        return Promise.reject<T>(err);
    }

    private static getHeaders(): AxiosRequestHeaders {
        const result: AxiosRequestHeaders = {
            'Content-Type': 'application/json',
        };

        return result;
    }
}
