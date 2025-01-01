import { apiCall } from "../utils/apiCallHandle.js";
import { multipartFormatte } from "../constants.js";

const publishVideo = (formData) => {
    return apiCall('videos/', 'POST', formData, multipartFormatte)
}

const getAllVideos = ({page = '1', limit = '10', query, sortBy = 'createdAt', sortType = 'asc', userId}) => {
    return apiCall(
        `videos/?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType=${sortType}&userId=${userId}`,
        'GET',
    )
}

const getChannelVideos = ({page = '1', limit = '10', query, sortBy = 'createdAt', sortType = 'asc'}) => {
    return apiCall(
        `videos/c/?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType=${sortType}`,
        'GET',
    )
}

const getVideosByTitle = ({page = '1', limit = '20', query, sortBy = 'views', sortType = 'des'}) => {
    return apiCall(
        `videos/t?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType = ${sortType}`,
        'GET'
    )
}

const getVideoById = ({videoId}) => {
    return apiCall(`videos/${videoId}`, 'GET')
}

const updateVideo = ({videoId, formData}) => {
    return apiCall(`videos/${videoId}`, 'PATCH', formData, multipartFormatte)
}

const deleteVideo = ({videoId}) => {
    return apiCall(`videos/${videoId}`, 'DELETE')
}

const togglePublishBtn = ({videoId}) => {
    return apiCall(`videos/toggle/publish/${videoId}`, 'PATCH')
}

const addVideoInHistory = ({videoId}) => {
    return apiCall(`videos/add/history/${videoId}`, 'PATCH')
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
    addVideoInHistory 
}