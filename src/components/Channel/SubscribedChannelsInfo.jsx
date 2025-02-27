import { useEffect, useState } from 'react'
import {getSubscribedChannels} from '../../services/subscriptionService'
import { Loading2, ChannelList } from '../LayoutComponents'
import { EmptyPageResponse } from "./EmptyPageResponse"
import { errorHandler } from '../../utils'
import toast from 'react-hot-toast'

export function SubscribedChannelInfo({isCurrentUser, userId}){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [subscribedChannels, setSubscribedChannel] = useState([])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ;(async () => {
            try {
                setLoading(true)
                setError("")
                const response = await getSubscribedChannels({channelId: userId, signal})
                if(response?.data?.data){
                    setSubscribedChannel(response.data.data)
                }
                else{
                    toast.error(errorHandler(response));
                }
            } catch (error) {
                setError("An unexpected error occurred.");
            } finally{
                setLoading(false)
            }
        })()

        return () => controller.abort()
    }, [userId])

    if(loading){
        return(<Loading2 />)
    }
    
    if(error){
        return error
    }
    
    if(subscribedChannels.length === 0){
        return (
            <EmptyPageResponse 
                isCurrentUser={isCurrentUser}
                title="No Any Subscribed Channel" 
                anotherpara="This channel has yet to subscribe a new channel." 
                para="You Not Subscribed Any Channel"
                mainicon={<i className="ri-group-line"></i>}
            />
        )
    }

    if(subscribedChannels.length >  0){
        return (
            <div className='p-2'>
                <h1 className='text-white text-4xl text-center font-semibold my-4'>Subscribed Channels</h1>
                <ul>
                    {subscribedChannels?.map((channel) => {
                        if(channel.channel){
                            return (<li key={channel._id}>
                                <ChannelList channelInfo={channel.channel} />
                            </li>)
                        }
                    }
                    )}
                </ul>
            </div>
        )
    }
}