import { baseURL } from "../constants"
import api from "./apiInterceptor"

export const apiCall = async(endpoint, method='GET', data = null, headers) => {
    try {
        return await api({
            url: `${baseURL}/${endpoint}`,
            method,
            data,
            headers
        })
    } catch (error) {
        console.log('API CALL Error: ', error)
        return error.response? error.response.data : error
    }
}