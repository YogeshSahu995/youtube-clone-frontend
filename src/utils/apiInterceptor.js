import axios from "axios"
import { baseURL } from "../constants.js";

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

api.interceptors.response.use(
    response => response,

    async error => {
        if(error.response?.status === 401 && !error.config._retry){
            error.config._retry = true; //mark the request as retried

            try {
                // call the refresh token endpoint
                await api.post("/users/refresh-token")
                // retry the original request
                return api(error.config) 

            } catch (refreshError) {
                console.error('Refresh failed. Redirecting to login.')
                window.location.href = '/login' // to do set login 
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default api