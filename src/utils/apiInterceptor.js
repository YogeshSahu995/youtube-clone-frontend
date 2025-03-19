import axios from "axios";
import { baseURL } from "../constants.js";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

const setupInterceptors = (navigate) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Agar 401 error aaye aur request refresh-token wali na ho
      if (error.response?.status === 401 && !originalRequest._retry) {

        if (originalRequest.url.includes("/users/refresh-token")) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
          const response = await api.post("/users/refresh-token");

          return api(originalRequest);
        } catch (refreshError) {

          // Agar refresh token bhi fail ho gaya to user ko login pe bhejo
          navigate("/login");
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export { api, setupInterceptors };
