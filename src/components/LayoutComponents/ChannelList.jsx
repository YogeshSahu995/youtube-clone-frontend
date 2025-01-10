import { useNavigate } from "react-router-dom"
import { Avatar, SubscriptionButton } from "../index"
import { useEffect, useState } from "react"
import { getUserChannelProfile } from "../../services/userService"
import { errorHandler } from "../../utils/index"

export function ChannelList({ channelInfo }) {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { username } = channelInfo
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
            ; (async () => {
                try {
                    const response = await getUserChannelProfile(username)
                    if (response.data.data) {
                        const data = response.data.data
                        setUserData(data)
                    }
                    else {
                        setError(errorHandler(response))
                    }
                } catch (error) {
                    setError(error)
                } finally {
                    setLoading(false)
                }
            })()
    }, [channelInfo])


    if (Object.keys(userData).length > 0) {
        const { avatar, fullname, isSubscribed, subscribersCount, _id, username } = userData

        return (
            <div
                className="px-4 py-2 flex flex-col flex-wrap gap-2 min-[420px]:flex-row border border-[#ffffff5d] rounded-lg justify-between items-center mb-2 hover:bg-[#0e7490ba]">
                <div
                    onClick={() => navigate(`/${username}`)}
                    className="flex my-2 min-[420px]:mb-0 hover:cursor-pointer"
                >
                    <Avatar
                        avatar={avatar}
                        heightWidth="h-[70px] w-[70px] mr-4"
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