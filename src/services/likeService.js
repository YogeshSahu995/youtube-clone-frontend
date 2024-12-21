import { apiCall } from "../utils/apiCallHandle.js";

const toggleVideoLike = (videoId) => {
    return apiCall(`likes/toggle/v/${videoId}`, 'POST')
}

const toggleCommentLike = (commentId) => {
    return apiCall(`likes/toggle/c/${commentId}`, 'POST')
}

const toggleTweetLike = (tweetId) => {
    return apiCall(`likes/toggle/t/${tweetId}`, 'POST')
}

const getLikedVideos = () => {
    return apiCall('likes/videos', 'GET')
}

export{
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}