import { Link, useOutletContext } from "react-router-dom";
import { getChannelInfo } from "../../services/dashboardService";
import { useState, useEffect } from "react";
import { Loading } from "../LayoutComponents";

export function ChannelDetails() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const { userId, userData } = useOutletContext()

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        ; (async () => {
            try {
                setLoading(true)
                setError("")
                const response = await getChannelInfo({ userId, signal })
                if (response.data.data) {
                    setUserInfo(response.data.data)
                }
                else {
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false)
            }
        })()

        return () => {
            controller.abort();
        };
    }, [userId])

    if (loading) return <Loading />

    if (userInfo) {
        const { username } = userData
        const { subscribedChannels, totalLikes, totalSubscribers, totalVideos, totalViews } = userInfo
        return (
            <div className="w-full h-full text-white">
                <h1 className="text-3xl font-medium mb-5">More Details</h1>
                <div className="text-xl font-light">
                    <div className="flex gap-4">
                        <i className="ri-global-line"></i>
                        <Link to={`/channel/${userData.username}`}>
                            <h3>
                                www.zippytube.com/{`@${userData.username}`}
                            </h3>
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        <i className="ri-group-line"></i>
                        <h3>{ }</h3>
                    </div>
                </div>
            </div>
        )
    }
}
//Todo