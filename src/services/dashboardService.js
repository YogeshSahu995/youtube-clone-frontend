import { apiCall } from "../utils/apiCallHandle.js";

const getChannelVideos = ({userId}) => {
    return  apiCall(`dashboard/videos/${userId}`, 'GET')
}

const getChannelInfo = ({userId}) => {
    return apiCall(`dashboard/stats/${userId}`, 'GET')
}

export {
    getChannelInfo,
    getChannelVideos
}