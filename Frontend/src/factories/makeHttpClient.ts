import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";

import { AxiosHttpClientImpl } from "@/infrastructure/httpClient/axios/HttpClientImpl";
import { axiosInstance } from "@/infrastructure/httpClient/axios/AxiosInstance";

//Factory method pattern
export function makeHttpClient<T>(): IHttpClient<T> {

    const httpClient: IHttpClient<T> = new AxiosHttpClientImpl<T>(axiosInstance);

    return httpClient;
}