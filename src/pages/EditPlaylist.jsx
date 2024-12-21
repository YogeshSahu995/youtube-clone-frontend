import { useParams } from "react-router-dom";
import { Error, Loading, PlaylistForm } from "../components";
import { useEffect, useState } from "react";
import { getPlaylistById } from "../services/playlistService";
import { errorHandler } from "../utils";

export function EditPlaylist (){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState({})

    const {playlistId} = useParams()

    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                setError("")
                const response = await getPlaylistById({ playlistId })
                if (response.data.data) {
                    setData(response.data.data)
                }
                else {
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError(errorHandler(error));
            } finally {
                setLoading(false)
            }
        })()
    }, [playlistId])

    if(loading) return (<Loading />)

    if(error) return (<Error message={error} />)

    if(data.name && data.description){
        const {name, description} = data
        return(
            <PlaylistForm playlist={{name, description}} playlistId={playlistId} />
        )
    }
}