import { useParams } from "react-router-dom"
import { OpenPlaylist } from "../components"

export function ViewFullPlaylist () {
    const {playlistId} = useParams()

    return (
        <OpenPlaylist playlistId={playlistId} />
    )
}