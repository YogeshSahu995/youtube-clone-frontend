import { useState } from "react"
import { Video, Loading2, TimeAgo, Avatar, SubscriptionButton, Button } from "../index" 
import { Link, useOutletContext } from "react-router-dom"
import { useSelector } from "react-redux"
import { toggleVideoLike } from "../../services/likeService"
import { GetChannelVideos } from "../Channel"

export function OpenVideo({video, userId}){
    const {_id, videoFile, thumbnail, title, description, views, likes, comments, isPublished, owner, isLiked, createdAt} = video
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({});
    const [allVideos, setAllVideos] = useState([]);
    const [end, setEnd] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortType, setSortType] = useState("des");
    const [like, setLike] = useState(isLiked)
    const [likeCount, setLikeCount] = useState(likes)
    const {mainRef} = useOutletContext()
    const userData = useSelector(state => state.data)

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

    const toggleLike = async() => {
        const response = await toggleVideoLike(_id)
        if(response.data?.data){
            console.log(response.data.data)
            setLike(response.data.data)
            setLikeCount(prev => prev += 1)
        }
        else{
            setLike(false)
            setLikeCount(prev => prev -= prev)
        }
    }

    if(Object.keys(video).length > 0){
        const {avatar, fullname, isSubscribed, subscribersCount, _id, username} = owner
        const isCurrentUser = _id == userData._id
        
        return(
            <div className="p-1 relative">
                <div className="grid grid-rows-custom lg:grid-cols-custom text-white gap-2">
                    <section className="h-fit">
                        <video 
                            className="h-[290px] w-full sm:h-[350px] lg:min-w-[40vw] object-contain object-center"
                            controls
                            poster={thumbnail}
                        >
                            <source src={videoFile} />
                        </video>
                        <div className="flex flex-col gap-2 mt-4 border p-2 rounded-xl ">
                            <div className="flex justify-between">
                                <h3 className="text-3xl font-semibold">{title}</h3>
                                <div className="text-2xl">
                                    <i className={`${like?"ri-thumb-up-fill":"ri-thumb-up-line"} mr-1 cursor-pointer`} onClick={toggleLike}></i>
                                    {likeCount}
                                </div>
                            </div>
                            <div className="flex gap-4 font-normal text-[#ffffff91]">
                                <span>{views} Views </span> 
                                <TimeAgo timeStamp={createdAt} />
                            </div>
                            <div className="flex gap-4 justify-between items-center mt-2 border-b pb-2">
                                <Link to={`/channel/${username}`} className="flex gap-4">
                                    <Avatar avatar={avatar} heightWidth="h-[60px] w-[60px]" />
                                    <div>
                                        <h3  className="text-xl font-semibold">{fullname}</h3>
                                        <p className="text-lg font-light text-[#ffffff91]"> {subscribersCount} Subscribers </p>
                                    </div>
                                </Link>
                                {isCurrentUser ? 
                                    (<Button value="Edit" />):
                                    (<SubscriptionButton channelId={_id} isSubscribed={isSubscribed} />)
                                }
                            </div>
                            <div>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div>

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
                                                thumbnailSize="h-[160px] w-[90vw] sm:h-[190px] sm:w-[50vw] md:h-[190px] md:w-[300px] lg:h-[160px] lg:w-[18vw] xl:h-[190px] xl:w-[20vw]"
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