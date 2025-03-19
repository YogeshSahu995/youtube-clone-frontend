import { useState, useEffect } from "react"
import { Video } from "../Video"
import { Loading2 } from "../LayoutComponents"
import { getLikedVideos } from "../../services/likeService"

export function YourLikedVideos() {
    const [allLikedVideos, setAllLikedVideos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        setLoading(true)
            ; (async () => {
                try {
                    const response = await getLikedVideos({signal})
                    if (response?.data?.data) {
                        setAllLikedVideos(response.data.data)
                    }
                } catch (error) {
                    console.log(error.message)
                } finally {
                    setLoading(false)
                }
            })()

        return () => controller.abort()
    }, [fetch])

    if (loading) return <Loading2 />

    return (
        <div className="text-white mt-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-medium ml-1">Liked Videos</h1>
            </div>
            {allLikedVideos.length > 0 ?
                (<div className="overflow-y-hidden mt-8 pb-2 scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent scroll-smooth ">
                    <ul className="flex gap-4">
                        {allLikedVideos?.map((videoInfo) => {
                            return (
                                <li key={videoInfo._id}>
                                    <Video
                                        gridLayout="grid grid-row justify-items-stretch"
                                        videoInfo={videoInfo.video}
                                        adjustWidth="w-fit"
                                        thumbnailSize="h-[180px] w-[300px]"
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>) :
                (<div className="mt-5 text-[#ffffff85]">
                    Use the thumbs-up icon to like videos. Your list will be shown right here.
                </div>)
            }
        </div>
    )
}