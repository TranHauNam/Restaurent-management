import axios from "axios";
import { API_URL } from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useAuthContext } from "@/contexts/auth-context"; //error when have this
// const { userToken } = useAuthContext(); //error when have this


export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use( async (config) => {
    //debug
    console.log("Attempting to get userToken from AsyncStorage");
    //end debug
    const token = await AsyncStorage.getItem('userToken');
    //debug
    console.log("userToken retrieved from AsyncStorage:", token);
    //end debug
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("axios interceptor user: 401");
        }
            // await AsyncStorage.removeItem('userToken');
        // Luôn trả về Promise.reject để hàm gọi nhận được lỗi
        return Promise.reject(err);
    
    }
);