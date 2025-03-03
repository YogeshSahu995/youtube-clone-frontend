import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideoById } from "../../services/videoService";
import { TimeAgo } from "../LayoutComponents/TimeAgo";
import toast from "react-hot-toast";

export function Playlist({ playlistInfo }) {
    const { _id, createdAt, description, name, updatedAt, owner, videos } = playlistInfo
    const [image, setImage] = useState("")
    const [videoCount, setVideoCount] = useState("")

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ; (async function fetchFirstVideo() {
            try {
                if (videos.length > 0) {
                    setVideoCount(`${videos.length} videos`)
                    const response = await getVideoById({ videoId: videos[0], signal });
                    if(!response) return 
                    if (response?.data?.data?.thumbnail) {
                        setImage(response.data.data.thumbnail);
                    }
                    else {
                        setImage("/images/no-video.jpg")
                    }
                } else {
                    setVideoCount("No Videos")
                    setImage("/images/no-video.jpg");
                }
            } catch (error) {
                toast.error(error.message);
            }
        })()
        return () => controller.abort()
    }, [videos])

    return (
        <Link to={`/playlist/${_id}`}>
            <div className="mt-4">
                <section className="relative h-[180px] w-[80vw] min-[400px]:h-[190px] sm:w-[300px]">
                    <div className=" absolute left-4 bg-[#3b3b3b] h-full w-full rounded-lg z-0"> </div>
                    <div className=" absolute left-2 bg-[#5f5f5f] h-full w-full rounded-lg z-10"> </div>
                    <img
                        src={`${image}`}
                        className=" absolute h-full w-full object-cover object-center rounded-lg z-20"
                        alt="playlist image"
                    />
                    {videoCount && (
                        <div className="absolute bottom-2 right-2 px-2 bg-[#00000081] text-white rounded-lg text-sm z-30">
                            {videoCount}
                        </div>
                    )}
                    {videos.length > 0 ?
                        (
                            <div className="absolute bg-[#000000ad] text-white hover:opacity-100 opacity-0 h-full w-full rounded-lg z-40">
                                <i className="ri-play-fill mr-2"></i>
                                Play
                            </div>
                        )
                        : (
                            <div className="absolute bg-[#000000ad] text-white hover:opacity-100 opacity-0 h-full w-full rounded-lg z-40">
                                <i className="ri-add-line mr-2"></i>
                                Add Videos
                            </div>
                        )
                    }
                </section>
                <section className="p-1 text-[#ffffff87]">
                    <h3 className="text-white">{name}</h3>
                    <p>{description}</p>
                    {createdAt !== updatedAt ?
                        (
                            <div>
                                <span>Updated at </span>
                                <TimeAgo timeStamp={updatedAt} />
                            </div>
                        ) :
                        (
                            <div>
                                <span>Created at </span>
                                <TimeAgo timeStamp={createdAt} />
                            </div>
                        )
                    }
                </section>
            </div>
        </Link>
    )
}