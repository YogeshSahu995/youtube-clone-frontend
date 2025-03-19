import { apiCall } from "../utils/apiCallHandle.js";
import { multipartFormatte } from "../constants.js";

const publishVideo = ({formData, onUploadProgress}) => {
    return apiCall({ 
        endpoint: 'videos/', 
        method: 'POST', 
        data: formData, 
        headers: multipartFormatte, 
        onUploadProgress,
    })
}

const getAllVideos = ({ page = '1', limit = '10', query, sortBy = 'createdAt', sortType = 'asc', userId, signal }) => {
    return apiCall({
        endpoint:`videos/?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType=${sortType}&userId=${userId}`,
        method: 'GET',
        signal
    })
}

const getChannelVideos = ({ page = '1', limit = '10', query, sortBy = 'createdAt', sortType = 'asc', signal }) => {
    return apiCall({
        endpoint: `videos/c/?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType=${sortType}`,
        method: 'GET',
        signal
    })
}

const getVideosByTitle = ({ page = '1', limit = '20', query, sortBy = 'createdAt', sortType = 'des', signal }) => {
    return apiCall({
        endpoint: `videos/t?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType = ${sortType}`,
        method: 'GET',
        signal
    })
}

const getVideoById = ({ videoId, signal }) => {
    return apiCall({
        endpoint: `videos/${videoId}`, 
        method: 'GET',
        signal
    })
}

const updateVideo = ({ videoId, formData, onUploadProgress }) => {
    return apiCall({
        endpoint: `videos/${videoId}`, 
        method: 'PATCH', 
        data: formData, 
        headers: multipartFormatte, 
        onUploadProgress
    })
}

const deleteVideo = ({ videoId }) => {
    return apiCall({
        endpoint: `videos/${videoId}`, 
        method: 'DELETE'
    })
}

const togglePublishBtn = ({ videoId }) => {
    return apiCall({
        endpoint: `videos/toggle/publish/${videoId}`, 
        method: 'PATCH'
    })
}

const addVideoInHistory = ({ videoId }) => {
    return apiCall({
        endpoint: `videos/add/history/${videoId}`, 
        method: 'PATCH'
    })
}

const handleVideoViews = ({ videoId, userId }) => {
    return apiCall({
        endpoint: `videos/view/${videoId}/${userId}`, 
        method: 'POST'
    })
}

const getUserHistory = ({ signal }) => {
    return apiCall({
        endpoint: "videos/get/history", 
        method: "GET",
        signal
    })
}

export {
    getAllVideos,
    getChannelVideos,
    publishVideo,
    getVideosByTitle,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishBtn,
    addVideoInHistory,
    handleVideoViews,
    getUserHistory
}