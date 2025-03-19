import { jsonFormatte } from "../constants.js";
import { apiCall } from "../utils/apiCallHandle.js";

const getVideoComments = ({ videoId, page, limit, signal }) => {
    return apiCall({
        endpoint: `comments/${videoId}?page=${page}&limit=${limit}`, 
        method: 'GET',
        signal
    })
}

const addComment = ({ videoId, data }) => {
    return apiCall({
        endpoint: `comments/${videoId}`, 
        method: 'POST', 
        data, 
        headers: jsonFormatte
    })
}

const updateComment = ({ commentId, data }) => {
    return apiCall({
        endpoint: `comments/c/${commentId}`, 
        method: 'PATCH', 
        data, 
        headers: jsonFormatte
    })
}

const deleteComment = ({ commentId }) => {
    return apiCall({
        endpoint: `comments/c/${commentId}`, 
        method: 'DELETE'
    })
}

export { getVideoComments, addComment, updateComment, deleteComment }