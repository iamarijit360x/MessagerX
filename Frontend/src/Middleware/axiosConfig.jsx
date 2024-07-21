import axios from 'axios';
import { useAuth } from './AuthContex';
const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = ` ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;