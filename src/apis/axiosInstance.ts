import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

/* =====================
 * Request Interceptor
 * ===================== */
axiosInstance.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');

  if (auth) {
    const parsed = JSON.parse(auth);
    const token = parsed.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

/* =====================
 * Response Interceptor
 * ===================== */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      useAuthStore.getState().logout();
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
