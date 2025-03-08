import { baseURL } from "../constants";
import { api } from "./apiInterceptor";
import axios from "axios";
import toast from "react-hot-toast";

export const apiCall = async (endpoint, method = 'GET', data = null, headers, signal) => {
    try {
        return await api({
            url: `${baseURL}/${endpoint}`,
            method,
            data,
            headers,
            withCredentials: true,
            signal
        });
    } catch (error) {
        if (axios.isCancel(error)) return;

        // ✅ Handle 401 Unauthorized Properly
        if (error?.response?.status === 401) return

        // ✅ Handle Other API Errors
        if (error?.response) {
            toast.error(error.response.data?.message || "Something went wrong!");
        } else if (error.request) {
            toast.error("No response from server!");
        } else {
            toast.error("Request setup error!");
        }

        return Promise.reject(error); // ✅ Ensure error is propagated
    }
};
