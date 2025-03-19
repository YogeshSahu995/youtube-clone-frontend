import { apiCall } from "../utils/apiCallHandle.js";
import { multipartFormatte } from "../constants.js";

const createATweet = ({data, onUploadProgress}) => {
    return apiCall({
        endpoint: 'tweets/', 
        method: 'POST', 
        data,
        headers: multipartFormatte,
        onUploadProgress
    })
}

const getUserTweets = ({userId, signal}) => {
    return apiCall({
        endpoint: `tweets/user/${userId}`, 
        method: 'GET',
        signal
    })
}

const updateATweet = ({ tweetId, formData, onUploadProgress }) => {
    return apiCall({
        endpoint: `tweets/${tweetId}`, 
        method: 'PATCH', 
        data: formData, 
        headers: multipartFormatte, 
        onUploadProgress
    })
}

const deleteATweet = ({tweetId}) => {
    return apiCall({
        endpoint: `tweets/${tweetId}`, 
        method: 'DELETE'
    })
}

const getTweetById = ({ tweetId, signal }) => {
    return apiCall({
        endpoint: `tweets/${tweetId}`, 
        method: "GET",
        signal
    })
}

export { createATweet, getUserTweets, updateATweet, deleteATweet, getTweetById }