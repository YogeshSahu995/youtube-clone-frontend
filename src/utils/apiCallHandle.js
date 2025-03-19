import { baseURL } from "../constants";
import { api } from "./apiInterceptor";
import axios from "axios";
import toast from "react-hot-toast";

export const apiCall = async ({endpoint, method = 'GET', data = null, headers = {}, signal = null, onUploadProgress}) => {
    try {
        return await api({
            url: `${baseURL}/${endpoint}`,
            method,
            data,
            headers,
            withCredentials: true,
            signal,
            onUploadProgress,
        });
    } catch (error) {
        if (axios.isCancel(error)) return;

        // Handle 401 Unauthorized 
        if (error?.response?.status === 401) return

        // Handle Other API Errors
        if (error?.response) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } else if (error.request) {
            toast.error("No response from server!");
        } else {
            console.log(error)
        }

        return Promise.reject(error); // ✅ Ensure error is propagated
    }
};
