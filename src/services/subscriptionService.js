import { apiCall } from "../utils/apiCallHandle.js";

const getChannelSubscribers = ({ channelId, signal }) => {
    return apiCall({
        endpoint: `subscriptions/c/${channelId}`, 
        method: 'GET',
        signal
    })
}

const getSubscribedChannels = ({ channelId, signal }) => {
    return apiCall({
        endpoint: `subscriptions/u/${channelId}`, 
        method: 'GET', 
        signal
    })
}

const toggleSubscription = ({ anotherChannelId, signal }) => {
    return apiCall({
        endpoint: `subscriptions/c/${anotherChannelId}`, 
        method: 'POST'
    })
}

export { getChannelSubscribers, getSubscribedChannels, toggleSubscription }
