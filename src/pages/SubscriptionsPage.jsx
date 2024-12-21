import { useSelector } from "react-redux";
import { SubscribedChannelInfo } from "../components";

export function SubscriptionPage(){
    const userData = useSelector(state => state.data)
    return(
        <SubscribedChannelInfo 
            isCurrentUser={true} 
            userId={userData._id} 
        />
    )
}