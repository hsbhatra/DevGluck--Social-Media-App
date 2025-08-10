import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  // For development
  // baseURL: "http://localhost:8000",

  // For production
  baseURL: API_URL,
  withCredentials: true,
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.token) {
      config.headers.Authorization = `Bearer ${currentUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
