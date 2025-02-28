import { getUserPlaylists } from "../../services/playlistService"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { errorHandler } from "../../utils"
import { Error, Loading2 } from "../LayoutComponents"
import { Playlist } from "../Playlist"
import { EmptyPageResponse } from "./EmptyPageResponse";
import toast from "react-hot-toast"

export function ChannelPlaylists() {
    const [allPlaylist, setAllPlaylist] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { userId, isCurrentUser } = useOutletContext()

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        ; (async () => {
            try {
                setLoading(true)
                setError("")
                const response = await getUserPlaylists({ userId, signal })
                if(!response) return 
                if (response?.data?.data) {
                    setAllPlaylist(response.data.data)
                }
                else {
                    toast.error(errorHandler(response));
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false)
            }
        })()

        return () => controller.abort()
    }, [])

    if (loading) return <Loading2 />

    if (allPlaylist.length === 0) {
        return (
            <div className="w-fit mx-auto">
                <EmptyPageResponse
                    isCurrentUser={isCurrentUser}
                    title="No playlist created"
                    anotherpara="There are no playlist created on this channel."
                    para="This Channel yet to make a Playlist"
                    path="/create-playlist"
                    buttonValue="Create Playlist"
                    buttonicon={<i className="ri-play-list-add-fill"></i>}
                    mainicon={
                        <img
                            src={'/images/NoContent.png'}
                            alt=""
                            className="h-fit w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] object-cover object-center mx-auto"
                        />
                    }
                />
            </div>
        )
    }

    return (
        <div>
            {error && <Error message={error} />}
            <ul className="flex flex-wrap justify-around gap-4">
                {allPlaylist?.map((playlist) => (
                    <li key={playlist._id}>
                        <Playlist playlistInfo={playlist} />
                    </li>
                ))}
            </ul>
        </div>
    )
}