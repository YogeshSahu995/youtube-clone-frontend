import { apiCall } from "../utils/apiCallHandle.js";

const getVideoComments = ({videoId, page, limit}) => {
    return apiCall(`comments/${videoId}?page=${page}&limit=${limit}`, 'GET')
}

const addComment = ({videoId, data}) => {
    return apiCall(`comments/${videoId}`, 'POST', data, )
}

const updateComment = ({commentId, data}) => {
    return apiCall(`comments/c/${commentId}`, 'PATCH', data, )
}

const deleteComment = ({commentId}) => {
    return apiCall(`comments/c/${commentId}`, 'DELETE')
}

export {getVideoComments, addComment, updateComment, deleteComment}