import { apiCall } from "../utils/apiCallHandle.js";
import { multipartFormatte } from "../constants.js";

const createATweet = (formData) => {
    return apiCall('tweets/', 'POST', formData, multipartFormatte)
}

const getUserTweets = (userId, signal) => {
    return apiCall(`tweets/user/${userId}`, 'GET', {}, {}, signal)
}

const updateATweet = ({tweetId, formData}) => {
    return apiCall(`tweets/${tweetId}`, 'PATCH', formData, multipartFormatte)
}

const deleteATweet = (tweetId) => {
    return apiCall(`tweets/${tweetId}`, 'DELETE')
}

const getTweetById = (tweetId, signal) => {
    return apiCall(`tweets/${tweetId}`, "GET", {}, {}, signal)
}

export {createATweet, getUserTweets, updateATweet, deleteATweet, getTweetById}