import { apiCall } from "../utils/apiCallHandle.js";
import {multipartFormatte } from "../constants.js";

const registerUser = (formData) => {
    return apiCall('users/register', 'POST', formData, multipartFormatte)
}

const loginUser = (data) => {
    console.log('login function chala..')
    return apiCall('users/login', 'POST', data)
}

const logout = () => {
    return apiCall('users/logout', 'POST')
}

const changePassword = (data) => {
    return apiCall('users/change-password', 'POST', data )
}

const refreshToken = () => {
    return apiCall('users/refresh-token', 'POST')
}

const getcurrentUser = () => {
    console.log('getCurrentUser chala')
    return apiCall('users/current-user', 'GET')
}

const updateAccountdetails = (data) => {
    return apiCall('users/update-account', 'PATCH', data )
}

const updateAvatar = (data) => {
    return apiCall('users/update-avatar', 'PATCH', data, multipartFormatte)
}

const updateCoverImage = (data) => {
    return apiCall('users/update-cover-image', 'PATCH', data, multipartFormatte)
}

const getUserChannelProfile = (username) => {
    return apiCall(`users/channel/${username}`, 'GET')
}

const getUserHistory = () => {
    return apiCall('users/watch-history', 'GET')
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
        getUserHistory
    }