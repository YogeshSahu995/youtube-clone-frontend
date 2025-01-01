import { apiCall } from "../utils/apiCallHandle.js";

const createPlaylist = ({data}) => {
    return apiCall('playlist/', 'POST', data)
}

const getPlaylistById = ({playlistId}) => {
    return apiCall(`playlist/${playlistId}`, 'GET')
}

const updatePlaylist = ({playlistId, data}) => {
    return apiCall(`playlist/${playlistId}`, 'PATCH', data)
}

const deletePlaylist = ({playlistId}) => {
    return apiCall(`playlist/${playlistId}`, 'DELETE')
}

const checkAlreadyVideoExist = ({playlistId, videoId}) => {
    return apiCall(`playlist/check-exist/${playlistId}/${videoId}`)
}

const addVideoInPlaylist = ({videoId, playlistId}) => {
    return apiCall(`playlist/add/${videoId}/${playlistId}`, 'PATCH')
}

const removeVideoFromPlaylist = ({videoId, playlistId}) => {
    return apiCall(`playlist/remove/${videoId}/${playlistId}`, 'PATCH')
}

const getUserPlaylists = ({userId}) => {
    return apiCall(`playlist/user/${userId}`, 'GET')
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