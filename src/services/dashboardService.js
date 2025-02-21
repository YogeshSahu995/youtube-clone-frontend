import { apiCall } from "../utils/apiCallHandle.js";

const getChannelVideos = ({userId, signal}) => {
    return  apiCall(`dashboard/videos/${userId}`, 'GET', {}, {}, signal)
}

const getChannelInfo = ({userId, signal}) => {
    return apiCall(`dashboard/stats/${userId}`, 'GET', {}, {}, signal)
}

export {
    getChannelInfo,
    getChannelVideos
}