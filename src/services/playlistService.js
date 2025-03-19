import { apiCall } from "../utils/apiCallHandle.js";
import { jsonFormatte } from "../constants.js";

const createPlaylist = ({ data, onUploadProgress }) => {
    return apiCall({
        endpoint: 'playlist/', 
        method: 'POST', 
        data, 
        headers: jsonFormatte, 
        onUploadProgress
    })
}

const getPlaylistById = ({ playlistId, signal }) => {
    return apiCall({
        endpoint: `playlist/${playlistId}`, 
        method: 'GET',
        signal
    })
}

const updatePlaylist = ({ playlistId, data, onUploadProgress }) => {
    return apiCall({
        endpoint: `playlist/${playlistId}`, 
        method: 'PATCH', 
        data, 
        headers: jsonFormatte,
        onUploadProgress
    })
}

const deletePlaylist = ({ playlistId }) => {
    return apiCall({
        endpoint: `playlist/${playlistId}`, 
        method: 'DELETE'
    })
}

const checkAlreadyVideoExist = ({ playlistId, videoId }) => {
    return apiCall({
        endpoint: `playlist/check-exist/${playlistId}/${videoId}`
    })
}

const addVideoInPlaylist = ({ videoId, playlistId }) => {
    return apiCall({
        endpoint: `playlist/add/${videoId}/${playlistId}`, 
        method: 'PATCH'
    })
}

const removeVideoFromPlaylist = ({ videoId, playlistId }) => {
    return apiCall({
        endpoint: `playlist/remove/${videoId}/${playlistId}`, 
        method: 'PATCH'
    })
}

const getUserPlaylists = ({ userId, signal }) => {
    return apiCall({
        endpoint: `playlist/user/${userId}`, 
        method: 'GET', 
        signal
    })
}

export {
    createPlaylist,
    addVideoInPlaylist,
    removeVideoFromPlaylist,
    getPlaylistById,
    getUserPlaylists,
    updatePlaylist,
    deletePlaylist,
    checkAlreadyVideoExist
}