import axios from "axios";
import { auth } from "../lib/auth";

// Public API instance (No auth required)
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
      console.log("Error fetching session:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Logging out...");
    }
    return Promise.reject(error);
  }
);
