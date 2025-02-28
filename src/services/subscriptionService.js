import { apiCall } from "../utils/apiCallHandle.js";

const getChannelSubscribers = ({ channelId, signal }) => {
    return apiCall(`subscriptions/c/${channelId}`, 'GET', {}, {}, signal)
}

const getSubscribedChannels = ({ channelId, signal }) => {
    return apiCall(`subscriptions/u/${channelId}`, 'GET', {}, {}, signal)
}

const toggleSubscription = ({ anotherChannelId, signal }) => {
    return apiCall(`subscriptions/c/${anotherChannelId}`, 'POST')
}

export { getChannelSubscribers, getSubscribedChannels, toggleSubscription }
