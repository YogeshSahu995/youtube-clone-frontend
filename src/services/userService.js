import { apiCall } from "../utils/apiCallHandle.js";
import {jsonFormatte, multipartFormatte } from "../constants.js";

const registerUser = (formData) => {
    return apiCall('users/register', 'POST', formData, multipartFormatte)
}

const loginUser = (data) => {
    return apiCall('users/login', 'POST', data, jsonFormatte)
}

const logout = () => {
    return apiCall('users/logout', 'POST')
}

const changePassword = (data) => {
    return apiCall('users/change-password', 'POST', data, jsonFormatte )
}

const refreshToken = () => {
    return apiCall('users/refresh-token', 'POST')
}

const getcurrentUser = (signal) => {
    return apiCall('users/current-user', 'GET', {}, {}, signal)
}

const updateAccountdetails = (data) => {
    return apiCall('users/update-account', 'PATCH', data, jsonFormatte )
}

const updateAvatar = (data) => {
    return apiCall('users/update-avatar', 'PATCH', data, multipartFormatte)
}

const updateCoverImage = (data) => {
    return apiCall('users/update-cover-image', 'PATCH', data, multipartFormatte)
}

const getUserChannelProfile = ({username, signal}) => {
    return apiCall(`users/channel/${username}`, 'GET', {}, {}, signal)
}

const getUserHistory = ({signal}) => {
    return apiCall('users/watch-history', 'GET', {}, {}, signal)
}

const removeVideoFromHistory = (videoId) => {
    return apiCall(`users/watch-history/remove/${videoId}`, "POST")
}

const clearAllHistory = () => {
    return apiCall(`users/watch-history/clear-all`, "POST")
}

const getUserChannelByName = ({username, signal}) => {
    return apiCall(`users/get/users/${username}`, "get", {}, {}, signal)
}



export { 
        registerUser, 
        loginUser, 
        logout, 
        changePassword, 
        refreshToken, 
        getcurrentUser, 
        updateAccountdetails, 
        updateAvatar, 
        updateCoverImage, 
        getUserChannelProfile, 
        getUserHistory,
        removeVideoFromHistory,
        clearAllHistory,
        getUserChannelByName
    }