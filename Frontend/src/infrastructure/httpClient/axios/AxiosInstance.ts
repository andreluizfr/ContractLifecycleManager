import axios from 'axios'
import { makePersistentStorage } from '@/factories/makePersistentStorage'
import store from '@/infrastructure/store/redux/config'
import { removeUser } from '@/infrastructure/store/redux/features/UserSlice'
import { HttpStatusCode } from "../HttpStatusCode"

const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL
});

axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.APP_BASE_URL;
axiosInstance.defaults.headers.common['Access-Control-Allow-Methods'] = "*";
axiosInstance.defaults.headers.common['Access-Control-Allow-Headers'] = "*";
axiosInstance.defaults.headers.common['Access-Control-Expose-Headers'] = "Set-Cookie";
axiosInstance.defaults.withCredentials = true;

const persistentStorage = makePersistentStorage();

axiosInstance.interceptors.request.use(requestConfig => {
    const accessToken = persistentStorage.get<string>('x-access-token');
    if(accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestConfig;
});

axiosInstance.interceptors.response.use(
    response => {
        const accessToken = response?.data?.accessToken;
        if(accessToken) {
            persistentStorage.set('x-access-token', accessToken)
        }
        return Promise.resolve(response);
    },
    error => {
        if(error.response && (error.response.status == HttpStatusCode.Unauthorized || error.response.status == HttpStatusCode.Forbidden)) {
            store.dispatch(removeUser());
            window.location.href = process.env.APP_BASE_URL ?? "";
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };