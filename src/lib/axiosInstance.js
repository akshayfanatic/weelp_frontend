import axios from 'axios';
import { auth } from './auth/auth';

export const publicApi = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
});

// Authenticated API instance
export const authApi = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
});

// Request Interceptor - Attach Token Dynamically
authApi.interceptors.request.use(
  async (config) => {
    try {
      const session = await auth(); // Fetch session data

      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session?.access_token}`;
      }
    } catch (error) {
      console.error('Error fetching session:', error);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      redirectToLogin();
    }

    const status = error?.response?.status;
    const message = error?.response?.data?.message || error.message || 'Unexpected error';
    const url = error?.config?.url;

    // Global error log
    if (process.env.NODE_ENV === 'development') {
      console.error(`[API Error] ${status} @ ${url}: ${message}`, error?.response?.data);
    }

    return Promise.reject(error);
  },
);

const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/user/login';
  }
};
