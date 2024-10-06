import axios from 'axios';
import { HttpStatusCode } from '../HttpStatusCode';

const createAxiosInstance = (
  currentAccessToken: string | null,
  updateAccessToken: (accessToken: string) => void,
  removeAccessToken: () => void
) => {

  const axiosInstance = axios.create({
    baseURL: `${process.env.API_BASE_URL}/api`
  });

  axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.APP_BASE_URL;
  axiosInstance.defaults.headers.common['Access-Control-Expose-Headers'] = "Set-Cookie";
  axiosInstance.defaults.withCredentials = true;

  axiosInstance.interceptors.request.use(requestConfig => {
    if(currentAccessToken) {
      requestConfig.headers.Authorization = `Bearer ${currentAccessToken}`;
    }
    return requestConfig;
  });

  axiosInstance.interceptors.response.use(
    response => {
      const accessToken: string | null = response?.headers['X-Access-Token'] ?? null;
      if(accessToken) {
        updateAccessToken(accessToken);
      }
      return Promise.resolve(response);
    },
    error => {
      if(error.response && error.response.status == HttpStatusCode.Unauthorized) {
        removeAccessToken();
      }
      return Promise.reject(new Error(error));
    }
  );

  return axiosInstance;
}

export { createAxiosInstance };