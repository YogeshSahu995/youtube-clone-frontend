import { apiCall } from "../utils/apiCallHandle.js";
import { jsonFormatte } from "../constants.js";

const createPlaylist = ({ data }) => {
    return apiCall('playlist/', 'POST', data, jsonFormatte)
}

const getPlaylistById = ({ playlistId, signal }) => {
    return apiCall(`playlist/${playlistId}`, 'GET', {}, {}, signal)
}

const updatePlaylist = ({ playlistId, data }) => {
    return apiCall(`playlist/${playlistId}`, 'PATCH', data, jsonFormatte)
}

const deletePlaylist = ({ playlistId }) => {
    return apiCall(`playlist/${playlistId}`, 'DELETE')
}

const checkAlreadyVideoExist = ({ playlistId, videoId }) => {
    return apiCall(`playlist/check-exist/${playlistId}/${videoId}`)
}

const addVideoInPlaylist = ({ videoId, playlistId }) => {
    return apiCall(`playlist/add/${videoId}/${playlistId}`, 'PATCH')
}

const removeVideoFromPlaylist = ({ videoId, playlistId }) => {
    return apiCall(`playlist/remove/${videoId}/${playlistId}`, 'PATCH')
}

const getUserPlaylists = ({ userId, signal }) => {
    return apiCall(`playlist/user/${userId}`, 'GET', {}, {}, signal)
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