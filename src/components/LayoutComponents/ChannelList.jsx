import { useNavigate } from "react-router-dom"
import { Avatar, Loading2, SubscriptionButton } from "../index"
import { useEffect, useState } from "react"
import { getUserChannelProfile } from "../../services/userService"
import { errorHandler } from "../../utils/index"
import toast from "react-hot-toast"

export function ChannelList({ channelInfo }) {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { username } = channelInfo
    const navigate = useNavigate()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        setLoading(true)
            ; (async () => {
                try {
                    const response = await getUserChannelProfile({ username, signal })
                    if(!response) return 
                    if (response?.data?.data) {
                        const data = response.data.data
                        setUserData(data)
                    }
                    else {
                        toast.error(errorHandler(response))
                    }
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    setLoading(false)
                }
            })()

        return () => controller.abort()
    }, [username])

    if (loading) return <Loading2 />

    if (Object.keys(userData).length > 0) {
        const { avatar, fullname, isSubscribed, subscribersCount, _id, username } = userData

        return (
            <div
                className="px-4 py-2 flex flex-col flex-wrap gap-2 min-[420px]:flex-row border border-[#ffffff5d] rounded-lg justify-between items-center mb-2 hover:bg-[#0e7490ba]">
                <div
                    onClick={() => navigate(`/${username}`)}
                    className="flex flex-col min-[300px]:flex-row items-center my-2 min-[420px]:mb-0 hover:cursor-pointer"
                >
                    <Avatar
                        avatar={avatar}
                        heightWidth="h-[10vh] w-[10vh] sm:h-[10vw] sm:w-[10vw] md:h-[70px] md:w-[70px] mr-4"
                    />

                    <div
                        className="text-white text-base flex flex-col justify-center text-nowrap">
                        <h3 className="capitalize text-lg">{fullname}</h3>
                        <h3>{subscribersCount} Subscribers</h3>
                    </div>
                </div>
                <SubscriptionButton
                    isSubscribed={isSubscribed}
                    channelId={_id}
                />
            </div>
        )
    }

}