import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const baseURL = import.meta.env.VITE_API_URL;
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    const accessToken = token || localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axios_get = async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  const configWithParams = {
    ...config,
    params: data,
  };
  return apiClient.get(url, configWithParams);
};

const axios_post = async (url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return apiClient.post(url, data, config);
};

const axios_put = async (url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return apiClient.put(url, data, config);
};

const axios_del = async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  const configWithData = {
    ...config,
    data: data,
  };
  return apiClient.delete(url, configWithData);
};

export { axios_get, axios_post, axios_put, axios_del };
