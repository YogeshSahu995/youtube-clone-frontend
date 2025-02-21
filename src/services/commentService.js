import { jsonFormatte } from "../constants.js";
import { apiCall } from "../utils/apiCallHandle.js";

const getVideoComments = ({videoId, page, limit, signal}) => {
    return apiCall(`comments/${videoId}?page=${page}&limit=${limit}`, 'GET', {}, {}, signal)
}

const addComment = ({videoId, data}) => {
    return apiCall(`comments/${videoId}`, 'POST', data, jsonFormatte)
}

const updateComment = ({commentId, data}) => {
    return apiCall(`comments/c/${commentId}`, 'PATCH', data, jsonFormatte)
}

const deleteComment = ({commentId}) => {
    return apiCall(`comments/c/${commentId}`, 'DELETE')
}

export {getVideoComments, addComment, updateComment, deleteComment}