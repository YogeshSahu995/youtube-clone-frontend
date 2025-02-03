import { baseURL } from "../constants"
import api from "./apiInterceptor"

export const apiCall = async(endpoint, method='GET', data = null, headers) => {
    try {
        return await api({
            url: `${baseURL}/${endpoint}`,
            method,
            data,
            headers,
            withCredentials: true
        })
    } catch (error) {
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