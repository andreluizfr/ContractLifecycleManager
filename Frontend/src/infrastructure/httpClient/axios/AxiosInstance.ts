import axios from 'axios'
import { makePersistentStorage } from '@/factories/makePersistentStorage'
import { HttpStatusCode } from "../HttpStatusCode"
import { userStore } from '@/infrastructure/store/zustand/userStore'

const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL
});

axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.APP_BASE_URL;
axiosInstance.defaults.headers.common['Access-Control-Expose-Headers'] = "Set-Cookie";
axiosInstance.defaults.withCredentials = true;

const persistentStorage = makePersistentStorage();

axiosInstance.interceptors.request.use(requestConfig => {
    const accessToken = persistentStorage.get<string>('X-Access-Token');
    if(accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return requestConfig;
});

axiosInstance.interceptors.response.use(
    response => {
        const accessToken = response?.headers['X-Access-Token'];
        if(accessToken) {
            persistentStorage.set('X-Access-Token', accessToken);
        }
        return Promise.resolve(response);
    },
    error => {
        if(error.response && (error.response.status == HttpStatusCode.Unauthorized || error.response.status == HttpStatusCode.Forbidden)) {
            userStore(state => state.removeUser)();
            persistentStorage.remove('X-Access-Token');
            window.location.href = process.env.APP_BASE_URL ?? "";
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };