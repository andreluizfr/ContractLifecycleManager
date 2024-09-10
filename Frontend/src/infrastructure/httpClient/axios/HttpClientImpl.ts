import { IHttpClient } from '@/infrastructure/httpClient/IHttpClient';
import { IHttpResponse } from '@/infrastructure/httpClient/IHttpResponse';
import { IHttpError } from '@/infrastructure/httpClient/IHttpError';

import { AxiosError, AxiosInstance } from 'axios';

export class AxiosHttpClientImpl<T> implements IHttpClient<T> {

    axiosInstance;

    constructor(instance: AxiosInstance){
        this.axiosInstance = instance;
    }

    async get(path: string, header?: object){

        try{
            const response = await this.axiosInstance.get<IHttpResponse<T>>(path,header);
            return response.data;
        } catch (err: unknown) {
            throw this.resolveHttpError(err);
        }
    }

    async post(path: string, body: object, header?: object){

        try{
            const response = await this.axiosInstance.post<IHttpResponse<T>>(path, body, header);
            return response.data;
        } catch (err: unknown) {
            throw this.resolveHttpError(err);
        }
    }

    resolveHttpError(err: unknown): IHttpError {

        const error = err as AxiosError<IHttpResponse<T>>;

        if (error.response) return {
            httpStatusCode: error.response.status,
            message:  error.response.data.message
        };

        else if (error.request) return {
            httpStatusCode: null,
            message:  'server.response.error.cant_response_a_request'
        };

        else return {
            httpStatusCode: null,
            message:  error.message
        };
    }

}