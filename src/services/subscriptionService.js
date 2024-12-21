import { apiCall } from "../utils/apiCallHandle.js";

const getChannelSubscribers = ({channelId}) => {
    return apiCall(`subscriptions/c/${channelId}`, 'GET')
}

const getSubscribedChannels = ({channelId}) => {
    return apiCall(`subscriptions/u/${channelId}`, 'GET')
} 

const toggleSubscription = ({anotherChannelId}) => {
    return apiCall(`subscriptions/c/${anotherChannelId}`, 'POST')
}

export {getChannelSubscribers, getSubscribedChannels, toggleSubscription}
