import { useEffect, useState } from "react"
import { Loading2, Popup } from "../index"
import { getUserPlaylists } from "../../services/playlistService"
import { useSelector } from "react-redux"
import { CheckBoxHandler } from "./index"
import { errorHandler } from "../../utils"
import toast from "react-hot-toast"

export function AddVideoInPlaylist ({
    videoId,
    isHidden,
    setAddVideoForm,
}) {
    const [allPlaylist, setAllPlaylist] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const userData = useSelector(state => state.data)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ;(async () => {
            try {
                setLoading(true)
                setError("")
                let response = await getUserPlaylists({userId: userData._id, signal})
                if(response?.data?.data){
                    setAllPlaylist(response.data.data)
                }
            } catch (error) {
                toast.error(error.message);
            } finally{
                setLoading(false)
            }
        })()
        return () => controller.abort()
    }, [userData])

    if(loading) return (
        <Popup isHidden={isHidden}>
            <Loading2 />
        </Popup>
    )

    return (
        <Popup isHidden={isHidden}>
            <div className="h-fit w-fit p-4 grid gap-4 rounded-xl bg-[#000000bd]">
                <div className="w-full flex justify-between">
                    <span className="text-2xl font-semibold text-nowrap">
                        <i className="ri-play-list-add-fill text-[#222] bg-white px-2 py-2 rounded-full mr-2 font-light"></i>
                        Save video to... 
                    </span>
                    <i 
                        className="ri-close-line text-2xl ml-4 cursor-pointer" 
                        onClick = {() => setAddVideoForm(true)}>
                    </i>
                </div>
                {allPlaylist?.map((playlist) => (
                    <div className="mb-2" key={playlist._id}>
                        <CheckBoxHandler videoId={videoId} playlistId={playlist._id} name={playlist.name} />
                    </div>
                ))}
            </div>          
        </Popup>
    )
}