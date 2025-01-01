import { useState, useEffect } from "react";
import { Loading, VideoForm } from "../components";
import { getVideoById } from "../services/videoService";
import { useParams } from "react-router-dom";

export function EditVideoPage () {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [videoInfo, setVideoInfo] = useState({})
    const {videoId} = useParams()

    useEffect(() => {
        ;(async() => {
            try {
                setLoading(true)
                setError("")
                const response = await getVideoById({videoId})
                if(response.data.data){
                    setVideoInfo(response.data.data)
                }
                else{
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError("An unexpected error occurred.");
            } finally{
                setLoading(false)
            }
        })()
    },[])

    if(loading) return <Loading />
    
    return <VideoForm videoInfo = {videoInfo} />
}