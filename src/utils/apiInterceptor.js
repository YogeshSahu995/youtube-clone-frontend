import axios from "axios";
import { baseURL } from "../constants.js";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// let isRefreshing = false;
// let failedRequestsQueue = [];

const setupInterceptors = (navigate) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // **Agar 401 error aaye aur request refresh-token wali na ho**
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (originalRequest.url.includes("/users/refresh-token")) {
          navigate("/login");
          return Promise.reject(error);
        }

        // if (isRefreshing) {
          // return new Promise((resolve, reject) => {
          //   failedRequestsQueue.push({ resolve, reject });
          // })
          //   .then(() => api(originalRequest))
          //   .catch((err) => {
          //     navigate("/login");
          //     return Promise.reject(err);
          //   });
        // }

        originalRequest._retry = true;
        // isRefreshing = true;

        try {
          const response = await api.post("/users/refresh-token");
          console.log("🔄 Refreshing token...");

          // isRefreshing = false;
          // failedRequestsQueue.forEach(({ resolve }) => resolve());
          // failedRequestsQueue = [];

          return api(originalRequest);
        } catch (refreshError) {
          // isRefreshing = false;
          // failedRequestsQueue.forEach(({ reject }) => reject(refreshError));
          // failedRequestsQueue = [];

          // **Agar refresh token bhi fail ho gaya to user ko login pe bhejo**
          navigate("/login");
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export { api, setupInterceptors };
