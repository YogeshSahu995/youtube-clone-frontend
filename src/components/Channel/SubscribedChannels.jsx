import { useOutletContext } from 'react-router-dom'
import { SubscribedChannelInfo } from './index'


export function SubscribedChannels(){
    const {userId, isCurrentUser} = useOutletContext()

    return(
        <SubscribedChannelInfo isCurrentUser={isCurrentUser} userId={userId} />
    )
}