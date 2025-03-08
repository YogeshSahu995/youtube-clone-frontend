import { useState, useEffect } from "react";
import { Loading, VideoForm } from "../components";
import { getVideoById } from "../services/videoService";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function EditVideoPage() {
    const [loading, setLoading] = useState(false)
    const [videoInfo, setVideoInfo] = useState({})
    const { videoId } = useParams()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ; (async () => {
            try {
                setLoading(true)
                const response = await getVideoById({ videoId, signal })
                if(!response) return 
                if (response?.data?.data) {
                    setVideoInfo(response.data.data)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        })()
        return () => controller.abort()
    }, [])

    if (loading) return <Loading />

    return <VideoForm videoInfo={videoInfo} />
}