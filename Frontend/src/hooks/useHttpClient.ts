import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";
import { AxiosHttpClientImpl } from "@/infrastructure/httpClient/axios/HttpClientImpl";
import { createAxiosInstance } from "@/infrastructure/httpClient/axios/AxiosInstance";
import { useUserStore } from "@/infrastructure/store/zustand/use-user-store";

export function useHttpClient<T>() {

  const { accessToken, updateAccessToken, removeAccessToken } = useUserStore();

  const axiosInstance = createAxiosInstance(accessToken, updateAccessToken, removeAccessToken);
  const httpClient: IHttpClient<T> = new AxiosHttpClientImpl<T>(axiosInstance);

  return httpClient;
}