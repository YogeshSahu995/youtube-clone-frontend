import { useEffect, useState } from "react"
import { Video, Loading2, TimeAgo, Avatar, SubscriptionButton, Button } from "../index"
import { Link, useOutletContext, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toggleVideoLike } from "../../services/likeService"
import { GetChannelVideos } from "../Channel"
import { GetVideoComment } from "./GetVideoComments"
import { addVideoInHistory, handleVideoViews } from "../../services/videoService"
import { LikeToggle } from "./LikeToggle"

export function OpenVideo({ video, userId, watcherId }) {
    const { _id, videoFile, thumbnail, title, description, views, likes, comments, isPublished, owner, isLiked, createdAt } = video
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({});
    const [allVideos, setAllVideos] = useState([]);
    const [end, setEnd] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortType, setSortType] = useState("des");
    const [like, setLike] = useState(isLiked)
    const [viewCount, setViewCount] = useState(views)
    const [likeCount, setLikeCount] = useState(likes)
    const { mainRef } = useOutletContext()
    const userData = useSelector(state => state.data)
    const navigate = useNavigate()
    const videoId = _id

    GetChannelVideos({
        setAllVideos,
        setData,
        setEnd,
        mainRef,
        setLoading,
        setError,
        setPage,
        sortBy,
        sortType,
        data,
        page,
        userId
    })

    useEffect(() => {
        ; (async () => {
            try {
                const addHistory = await addVideoInHistory({ videoId })
                const response = await handleVideoViews({ videoId: videoId, userId: watcherId })
                if (response.data.data) {
                    setTimeout(() => {
                        setViewCount(prev => prev + 1)
                    }, 4000)
                }
            } catch (error) {
                console.error(error.message)
            }
        })()
    }, [])

    if (Object.keys(video).length > 0) {
        const { avatar, fullname, isSubscribed, subscribersCount, _id, username } = owner
        const isCurrentUser = _id == userData._id

        return (
            <div className="p-1 relative">
                <div className="grid grid-rows-custom text-white gap-2">
                    <section className="h-fit p-2">
                        <video
                            className="h-fit max-h-[400px] w-full sm:max-w-[80vw] md:max-w-[70vw] lg:min-w-[40vw] object-contain object-center mx-auto"
                            controls
                            poster={thumbnail}
                        >
                            <source src={videoFile} />
                        </video>
                        <div className="flex flex-col gap-2 mt-4 border p-2 rounded-xl bg-[#0000006d] ">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-semibold">{title}</h1>
                                <LikeToggle
                                    Like={like}
                                    _id={videoId}
                                    fn={toggleVideoLike}
                                    likeCount={likeCount}
                                    setLike={setLike}   
                                    setLikeCount={setLikeCount}
                                    likes={likes}
                                />
                            </div>
                            <div className="flex gap-4 font-normal text-[#ffffff91]">
                                <span>{viewCount} Views </span>
                                <TimeAgo timeStamp={createdAt} />
                            </div>
                            <div className="flex gap-4 justify-between items-center mt-2 border-b pb-2">
                                <Link to={`/channel/${username}`} className="flex gap-4">
                                    <Avatar avatar={avatar} heightWidth="h-[60px] w-[60px]" />
                                    <div>
                                        <h3 className="text-xl font-medium">{fullname}</h3>
                                        <p className="text-lg font-light text-[#ffffff91]"> {subscribersCount} Subscribers </p>
                                    </div>
                                </Link>
                                {isCurrentUser ?
                                    (<Button value="Edit" onClick={() => navigate(`/edit/video/${videoId}`)} />) :
                                    (<SubscriptionButton channelId={_id} isSubscribed={isSubscribed} />)
                                }
                            </div>
                            <div>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div>
                            <GetVideoComment
                                mainRef={mainRef}
                                videoId={videoId}
                                commentCount={comments}
                            />
                        </div>
                    </section>
                    <section className="w-full overflow-x-hidden">
                        <div className="p-2">
                            <ul className="w-full">
                                {allVideos?.map((video) => (
                                    <li key={video._id}>
                                        {video.createdAt &&
                                            <Video
                                                videoInfo={video}
                                                isPlaying={video._id === videoId ? true : false}
                                                thumbnailSize="h-[160px] w-[90vw] sm:h-[190px] sm:w-[50vw] md:h-[190px] md:w-[300px] lg:h-[250px] lg:w-[450px]"
                                            />
                                        }
                                    </li>
                                ))}
                            </ul>
                            {loading && <Loading2 />}
                        </div>
                    </section>
                </div>
            </div>
        )
    }
} 