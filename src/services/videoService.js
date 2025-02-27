import { apiCall } from "../utils/apiCallHandle.js";
import { multipartFormatte } from "../constants.js";

const publishVideo = (formData) => {
    return apiCall('videos/', 'POST', formData, multipartFormatte)
}

const getAllVideos = ({ page = '1', limit = '10', query, sortBy = 'createdAt', sortType = 'asc', userId, signal }) => {
    return apiCall(
        `videos/?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType=${sortType}&userId=${userId}`,
        'GET',
        {}, {}, signal
    )
}

const getChannelVideos = ({ page = '1', limit = '10', query, sortBy = 'createdAt', sortType = 'asc', signal }) => {
    return apiCall(
        `videos/c/?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType=${sortType}`,
        'GET', {}, {}, signal
    )
}

const getVideosByTitle = ({ page = '1', limit = '20', query, sortBy = 'createdAt', sortType = 'des', signal }) => {
    return apiCall(
        `videos/t?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType = ${sortType}`,
        'GET', {}, {}, signal
    )
}

const getVideoById = ({ videoId, signal }) => {
    return apiCall(`videos/${videoId}`, 'GET', {}, {}, signal)
}

const updateVideo = ({ videoId, formData }) => {
    return apiCall(`videos/${videoId}`, 'PATCH', formData, multipartFormatte)
}

const deleteVideo = ({ videoId }) => {
    return apiCall(`videos/${videoId}`, 'DELETE')
}

const togglePublishBtn = ({ videoId }) => {
    return apiCall(`videos/toggle/publish/${videoId}`, 'PATCH')
}

const addVideoInHistory = ({ videoId }) => {
    return apiCall(`videos/add/history/${videoId}`, 'PATCH')
}

const handleVideoViews = ({ videoId, userId }) => {
    return apiCall(`videos/view/${videoId}/${userId}`, 'POST')
}

const getUserHistory = ({ signal }) => {
    return apiCall("videos/get/history", "GET", {}, {}, signal)
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