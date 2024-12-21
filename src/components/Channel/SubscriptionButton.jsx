import { Button } from "../LayoutComponents"
import { toggleSubscription } from "../../services/subscriptionService"
import { useEffect, useState } from "react"

export function SubscriptionButton({channelId, isSubscribed}){
    const [Subscribed, setSubscribed] = useState(isSubscribed)

    useEffect(() => {
        setSubscribed(isSubscribed);
    }, [isSubscribed]);

    async function handleToggle() {
        try {
           const response = await toggleSubscription({anotherChannelId: channelId})
           if(response.data.data){
                setSubscribed(response.data.data.isSubscribed)
           }
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <Button 
            bgColor = {`${Subscribed? "bg-[#ffffff3c]": "bg-cyan-700"}`}
            textColor = "text-white"
            className="px-4"
            value={Subscribed? "Subscribed" : "Subscribe"}
            onClick = {() => {
                handleToggle()
            }}
        />
    )
}