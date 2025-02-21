import { baseURL } from "../constants"
import api from "./apiInterceptor"
import axios from "axios"

export const apiCall = async(endpoint, method='GET', data = null, headers, signal) => {
    try {
        return await api({
            url: `${baseURL}/${endpoint}`,
            method,
            data,
            headers,
            withCredentials: true,
            signal
        })
    } catch (error) {
        if (axios.isCancel(error)) {
            return
        } 
        if(error.response){
            return error.response? error.response.data : error
        }
        else if(error.request){
            console.error(endpoint, ":", "No Response Received", error.request)
        }
        else{
            console.error('Error setting up request :', error.message)
        }
    }
}