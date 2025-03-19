import { apiCall } from "../utils/apiCallHandle.js";
import { jsonFormatte, multipartFormatte } from "../constants.js";

const registerUser = ({formData}) => {
    return apiCall({
        endpoint: 'users/register', 
        method: 'POST', 
        data: formData, 
        headers: multipartFormatte
    })
}

const loginUser = ({data}) => {
    console.log(data)
    return apiCall({
        endpoint: 'users/login', 
        method: 'POST', 
        data, 
        headers: jsonFormatte
    })
}

const logout = () => {
    return apiCall({
        endpoint: 'users/logout', 
        method: 'POST'
    })
}

const changePassword = ({data}) => {
    return apiCall({
        endpoint: 'users/change-password', 
        method: 'POST', 
        data, 
        headers: jsonFormatte
    })
}

const refreshToken = () => {
    return apiCall({
        endpoint: 'users/refresh-token', 
        method: 'POST'
    })
}

const getcurrentUser = () => {
    return apiCall({
        endpoint: 'users/current-user', 
        method: 'GET', 
    })
}

const updateAccountdetails = ({data}) => {
    return apiCall({
        endpoint: 'users/update-account', 
        method: 'PATCH', 
        data,
        headers: jsonFormatte
    })
}

const updateAvatar = ({data}) => {
    return apiCall({
        endpoint: 'users/update-avatar', 
        method: 'PATCH', 
        data, 
        headers: multipartFormatte
    })
}

const updateCoverImage = ({data}) => {
    return apiCall({
        endpoint: 'users/update-cover-image', 
        method: 'PATCH', 
        data, 
        headers: multipartFormatte
    })
}

const getUserChannelProfile = ({ username, signal }) => {
    return apiCall({
        endpoint: `users/channel/${username}`, 
        method: 'GET', 
        signal
    })
}

const getUserHistory = ({ signal }) => {
    return apiCall({
        endpoint: 'users/watch-history', 
        method: 'GET', 
        signal
    })
}

const removeVideoFromHistory = ({videoId}) => {
    return apiCall({
        endpoint: `users/watch-history/remove/${videoId}`, 
        method: "POST"
    })
}

const clearAllHistory = () => {
    return apiCall({
        endpoint: `users/watch-history/clear-all`, 
        method: "POST"
    })
}

const getUserChannelByName = ({ username, signal }) => {
    return apiCall({
        endpoint: `users/get/users/${username}`, 
        method: "get",
        signal
    })
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