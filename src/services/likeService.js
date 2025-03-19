import { apiCall } from "../utils/apiCallHandle.js";

const toggleVideoLike = ({_id}) => {
    return apiCall({
        endpoint: `likes/toggle/v/${_id}`, 
        method: 'POST'
    })
}

const toggleCommentLike = ({_id}) => {
    return apiCall({
        endpoint: `likes/toggle/c/${_id}`, 
        method: 'POST'
    })
}

const toggleTweetLike = ({_id}) => {
    return apiCall({
        endpoint: `likes/toggle/t/${_id}`, 
        method: 'POST'
    })
}

const getLikedVideos = ({signal}) => {
    return apiCall({
        endpoint: 'likes/videos', 
        method: 'GET',
        signal
    })
}

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}