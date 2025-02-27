import axios from "axios"
import { baseURL } from "../constants.js";

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

api.interceptors.response.use(
    response => response,

    async error => {
        if (axios.isCancel(error)) return
        if (error.response?.status === 401 && !error.config._retry) {
            error.config._retry = true;
            try {
                await api.post("/users/refresh-token")
                return api(error.config)

            } catch (refreshError) {
                console.error('Refresh failed. Redirecting to login.')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default api