import { useState, useEffect } from "react"
import { getUserPlaylists } from "../../services/playlistService"
import { Button, Loading2 } from "../LayoutComponents"
import { useNavigate } from "react-router-dom"
import { Playlist } from "../Playlist"

export function YourPlaylists({userId}) {
    const [allPlaylist, setAllPlaylist] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ; (async () => {
            try {
                setLoading(true)
                const response = await getUserPlaylists({ userId, signal })
                if (response?.data?.data) {
                    setAllPlaylist(response.data.data)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        })()

        return () => controller.abort() 
    }, [userId])

    if (loading) return <Loading2 />

    return (
        <div className="text-white mt-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-medium ml-1">Playlists</h1>
                {allPlaylist.length > 0 &&
                    <Button
                        value="Create"
                        onClick={() => navigate('/create-playlist')}
                    />
                }
            </div>
            {allPlaylist.length > 0 ?
                (<div className="overflow-y-hidden mt-8 pb-2 scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent ">
                    <ul className="flex gap-6">
                        {allPlaylist?.map((playlist) => {
                            return (
                                <li key={playlist._id}>
                                    <Playlist
                                        playlistInfo={playlist}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>) :
                (<div className="mt-5 text-[#ffffff85]">
                    For make playlist you can click on create button
                </div>)
            }
        </div>
    )
}