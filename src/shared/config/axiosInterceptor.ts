import axios, { AxiosError } from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { API_BASE_URL } from "../constants/auth";
import { logout } from "../utils/logout";
import { getCookie, setCookie } from "../lib/cookie";

export const keyHeader = {
  AUTHORIZATION: "Authorization",
};

export const keyStorage = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

const onRequestSuccess = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.timeout = 10000;

  const headers = (config.headers || {}) as AxiosRequestHeaders;
  const token = getCookie(keyStorage.ACCESS_TOKEN);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  config.headers = headers;

  return config;
};

const onResponseSuccess = (response: AxiosResponse) => {
  return response?.data ?? response;
};

let isRefreshing = false;
interface FailedRequest {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

const onResponseError = async (error: AxiosError) => {
  const originalRequest = error.config;
  if (!error.response || !originalRequest) return Promise.reject(error);

  if (originalRequest.url?.includes("/auth/refresh")) {
    logout();
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !(originalRequest as any)._retry) {
    (originalRequest as any)._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            const headers = (originalRequest.headers || {}) as AxiosRequestHeaders;
            headers.Authorization = `Bearer ${token}`;
            originalRequest.headers = headers;
            resolve(axios(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = getCookie(keyStorage.REFRESH_TOKEN);
      if (!refreshToken) throw new Error("Missing refresh token");
      
      const res = await axios.post<{ access_token: string; refresh_token: string }>('/auth/refresh', {
        refresh_token: refreshToken,
      });

      setCookie(keyStorage.ACCESS_TOKEN, res.data.access_token, 1);
      setCookie(keyStorage.REFRESH_TOKEN, res.data.refresh_token, 7);

      processQueue(null, res.data.access_token);

      const headers = (originalRequest.headers || {}) as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${res.data.access_token}`;
      originalRequest.headers = headers;

      return axios(originalRequest);
    } catch (err: unknown) {
      processQueue(err, null);
      logout();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
};

export default function AxiosInterceptor(): void {
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
}

export { axios };
