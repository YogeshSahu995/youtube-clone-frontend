import { Button } from "../LayoutComponents"
import { toggleSubscription } from "../../services/subscriptionService"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { errorHandler } from "../../utils"

export function SubscriptionButton({ channelId, isSubscribed }) {
    const [loading, setLoading] = useState(false)
    const [Subscribed, setSubscribed] = useState(isSubscribed)
    const userData = useSelector(state => state.data)
    const navigate = useNavigate()

    useEffect(() => {
        setSubscribed(isSubscribed);
    }, [isSubscribed]);

    async function handleToggle() {
        setLoading(true)
        try {
            const response = await toggleSubscription({ anotherChannelId: channelId })
            if(!response) return 
            if (response?.data?.data) {
                setSubscribed(response.data.data.isSubscribed)
            }
            else {
                toast.error(errorHandler(response));
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        channelId == userData?._id ? (
            <Button
                className="px-4"
                value="Customize"
                onClick={() => navigate(`/edit/channel/${channelId}`)}
            />
        ) : (

            <Button
                bgColor={`${Subscribed ? "bg-[#ffffff3c]" : "bg-cyan-700"}`}
                textColor="text-white"
                className="px-4"
                cursor={loading? "cursor-wait": "cursor-pointer"}
                disabled = {loading}
                value={loading? "wait...": Subscribed ? "Subscribed" : "Subscribe"}
                onClick={() => {
                    handleToggle()
                }}
            />
        )
    )
}