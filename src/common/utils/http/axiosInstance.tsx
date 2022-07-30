import axios from 'axios';
import { authService } from '../../../app/services';
import errorHandler from './errorHandler';

declare module 'axios' {
  export interface AxiosRequestConfig {
    redirectWhenError?: boolean;
    autoRefreshToken?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 30000,
  responseEncoding: 'utf8',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    if (request.headers) {
      request.headers.Authorization = `Bearer ${authService.getAuthTokens().accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error, axiosInstance),
);

export default axiosInstance;
