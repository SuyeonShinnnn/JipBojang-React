import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const axiosInstance = axios.create({
  baseURL: '/',
  withCredentials: true,
});

/* =====================
 * Request Interceptor
 * ===================== */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* =====================
 * Response Interceptor
 * ===================== */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
