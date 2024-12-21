import { apiCall } from "../utils/apiCallHandle.js";
import { multipartFormatte } from "../constants.js";

const createATweet = (formData) => {
    return apiCall('tweets/', 'POST', formData, multipartFormatte)
}

const getUserTweets = (userId) => {
    return apiCall(`tweets/user/${userId}`, 'GET')
}

const updateATweet = (tweetId, formData) => {
    return apiCall(`tweets/${tweetId}`, 'PATCH', formData, multipartFormatte)
}

const deleteATweet = (tweetId) => {
    return apiCall(`tweets/${tweetId}`, 'DELETE')
}

export {createATweet, getUserTweets, updateATweet, deleteATweet}