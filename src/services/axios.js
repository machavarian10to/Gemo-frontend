import axios from 'axios';
import authService from '@/services/authService';
import { setLogout } from '@/state/index';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = authService.getToken('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const { store } = await import('@/main');
      store.dispatch(setLogout());
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
