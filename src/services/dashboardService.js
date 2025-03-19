import { apiCall } from "../utils/apiCallHandle.js";

const getChannelVideos = ({ userId, signal }) => {
    return apiCall({
        endpoint: `dashboard/videos/${userId}`, 
        method: 'GET',
        signal
    })
}

const getChannelInfo = ({ userId, signal }) => {
    return apiCall({
        endpoint: `dashboard/stats/${userId}`, 
        method: 'GET',
        signal
    })
}

export {
    getChannelInfo,
    getChannelVideos
}