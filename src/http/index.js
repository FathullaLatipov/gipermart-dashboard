import axios from "axios";
import { clearRefreshToken, getCookie, setAccessToken } from "../helper/tokenHelper";

export const API_URL = "https://yruoebgair.tk/";

const $host = axios.create({
    baseURL: API_URL
});

$host.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if(!token) return config;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

$host.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config) {
        try {
            const refreshToken = getCookie("refreshToken");
            const response = await $host.post("api/v1/token/refresh/", {refresh: refreshToken});
            setAccessToken(response.data?.access);
            return $host.request(originalRequest);
        } catch (error) {
            clearRefreshToken();
            localStorage.removeItem("accessToken");
            console.error(error);
        }
    }
});

export default $host;