import axios from "axios";
import { API_URL } from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use( async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry)
            originalRequest._retry = true;
            console.log("token hết hạn, đăng xuất");
            // await AsyncStorage.removeItem('userToken');

    }
);