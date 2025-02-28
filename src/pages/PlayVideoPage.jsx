import { useParams } from "react-router-dom"
import { Loading2, OpenVideo } from "../components"
import { useEffect, useState } from "react"
import { getVideoById } from "../services/videoService"
import toast from "react-hot-toast"
import { errorHandler } from "../utils"

export function PlayVideoPage() {
    const { videoId, userId } = useParams()
    const [videoInfo, setVideoInfo] = useState({})
    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        setLoading(true)
            ; (async () => {
                try {
                    const response = await getVideoById({ videoId, signal })
                    if(!response) return 
                    if (response?.data?.data) {
                        setVideoInfo(response.data.data)
                    }
                    else {
                        toast.error(errorHandler(response))
                    }
                } catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setLoading(false)
                }
            })()
        return () => controller.abort()
    }, [videoId])

    if (Loading) return <Loading2 />

    if (Object.keys(videoInfo).length > 0) {
        return <OpenVideo video={videoInfo} userId={videoInfo.owner._id} watcherId={userId} />
    }
}