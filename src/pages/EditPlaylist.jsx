import { useParams } from "react-router-dom";
import { Loading, PlaylistForm } from "../components";
import { useEffect, useState } from "react";
import { getPlaylistById } from "../services/playlistService";
import toast from "react-hot-toast";

export function EditPlaylist() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const { playlistId } = useParams()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ; (async () => {
            try {
                setLoading(true)
                const response = await getPlaylistById({ playlistId, signal })
                if(!response) return 
                if (response?.data?.data) {
                    setData(response.data.data)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        })()

        return () => controller.abort()
    }, [playlistId])

    if (loading) return (<Loading />)

    if (data.name && data.description) {
        const { name, description } = data
        return (
            <PlaylistForm playlist={{ name, description }} playlistId={playlistId} />
        )
    }
}