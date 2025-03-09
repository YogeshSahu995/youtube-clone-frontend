import { useParams } from "react-router-dom"
import { Loading2, OpenVideo } from "../components"
import { useEffect, useState } from "react"
import { getVideoById } from "../services/videoService"

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
                    if (response?.data?.data) {
                        setVideoInfo(response.data.data)
                    }
                } catch (error) {
                    console.log(error.message)
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