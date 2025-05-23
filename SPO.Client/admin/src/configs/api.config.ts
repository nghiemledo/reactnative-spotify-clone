/* eslint-disable @typescript-eslint/no-explicit-any */
// export const PRIVATE_API = process.env.NEXT_PUBLIC_API_URL;

export const PRIVATE_API = "https://ituda.id.vn/api"

import axios from 'axios'

const axiosClient = axios.create({
    baseURL: PRIVATE_API,
    headers: {
        'content-type': 'application/json'
    }
})

const getToken = () => localStorage.getItem("token") || "";
const getRefreshToken = () => localStorage.getItem("refreshToken") || "";

axiosClient.interceptors.request.use(async (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (error: any) => void }[] = [];

const processQueue = (token: string | null, error: any = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

const refreshToken = async () => {
    try {
        const response = await axios.post(`${PRIVATE_API}/refresh`, { refreshToken: getRefreshToken() });
        const newAccessToken = response.data.token;

        localStorage.setItem("token", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Failed to get refresh token:", error);
        throw error;
    }
};

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosClient(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await refreshToken();
                processQueue(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (err) {
                processQueue(null, err);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
)

export default axiosClient