import { Link, useNavigate } from "react-router-dom"
import { TimeAgo, Avatar } from "../LayoutComponents"
import { FormatteDuration } from "./FormatteDuration"
import { deleteVideo } from "../../services/videoService"
import { useSelector } from "react-redux"
import { DeleteForm, AddVideoInPlaylist } from "../Forms"
import { useState } from "react"
import { VideoDropDown } from "./index"
import { HistoryDropDown } from "./HistoryDropDown"
import toast from "react-hot-toast"

export function Video({
    history = false,
    videoInfo,
    isPlaying = false,
    thumbnailSize = "h-[180px]  w-[80vw] sm:h-[190px] sm:w-[50vw] md:h-[190px] md:w-[300px] lg:h-[220px] lg:w-[400px]",
    gridLayout = "grid grid-row sm:grid-cols-custom justify-items-stretch",
    adjustWidth = "w-fit mx-auto mb-4 sm:mx-2 sm:w-full",
    setFetch = Function,
}) {
    const {
        _id,
        thumbnail,
        title,
        description,
        duration,
        views,
        isPublished,
        owner,
        createdAt,
        likes,
        comments,
    } = videoInfo
    const [isHidden, setIsHidden] = useState(true)
    const [addVideoForm, setAddVideoForm] = useState(true)
    const navigate = useNavigate()


    const userData = useSelector(state => state.data)
    const { username, avatar, fullname } = owner
    const isCurrentUser = userData?._id == owner?._id

    async function handleDelete() {
        try {
            const response = await deleteVideo({ videoId: _id })
            if(!response) return 
            if (response?.data?.data) {
                setIsHidden(true)
                toast.success(`Successfully delete video ${_id}`)
                navigate(`/channel/${username}/videos`)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="relative w-auto mx-auto mb-4">
            <AddVideoInPlaylist
                setAddVideoForm={setAddVideoForm}
                isHidden={addVideoForm}
                videoId={_id}
            />

            <DeleteForm
                deleteFunction={handleDelete}
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                message="Are you sure you want to delete this video? Once its deleted, you will not be able to recover it."
                title="Permanently delete"
            />
            <div className={`${gridLayout} ${adjustWidth} rounded-lg hover:bg-[#0000005d]`}>
                <Link to={isPublished && `/video/${_id}/${userData?._id}`} className={`${isPlaying && "cursor-wait"} ${!isPublished ? "cursor-not-allowed" : "cursor-pointer"} `}>
                    <div
                        className={` ${thumbnailSize} relative bg-cover bg-no-repeat bg-center bg-black rounded-lg`}
                        style={{ backgroundImage: `url(${thumbnail})` }}
                    >
                        {isPlaying && (
                            <div
                                className="absolute top-0 left-0 text-lg h-full w-full flex justify-center items-center bg-[#000000cc] rounded-lg">
                                Playling...
                            </div>
                        )}
                        {!isPublished && (
                            <div
                                className="absolute top-0 left-0 text-lg h-full w-full flex justify-center items-center bg-[#000000cc] rounded-lg">
                                Private video
                            </div>
                        )
                        }
                        <div className="absolute bottom-2 right-2 p-1 text-white bg-[#000000ab] rounded-lg">
                            {<FormatteDuration seconds={duration} />}
                        </div>
                    </div>
                </Link>

                <div className="flex justify-between relative pb-2">
                    <Link to={isPublished && `/video/${_id}/${userData._id}`} className={`${isPlaying && "cursor-wait"} ${!isPublished ? "cursor-not-allowed" : "cursor-pointer"} `}>
                        <div className="h-fit w-full text-[#fff] px-2 text-lg text-wrap whitespace-wrap relative flex flex-col ">
                            <h3 className="text-xl">{title}</h3>
                            <p className="text-base"> {description}</p>
                            <div className="flex flex-col flex-wrap gap-2 text-[#fff9] text-sm font-light">
                                {
                                    comments && likes && views ?
                                        (
                                            <>
                                                <div>
                                                    <span className="mr-4"> <i className="ri-thumb-up-line mr-1"></i>{likes}</span>
                                                    <span> <i className="ri-chat-1-line mr-1"></i> {comments} </span>
                                                </div>
                                                <div>
                                                    <span className="mr-4"> {views} views </span>
                                                    <TimeAgo
                                                        timeStamp={createdAt}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <TimeAgo
                                                timeStamp={createdAt}
                                            />
                                        )
                                }
                                <div className="flex items-center mt-2">
                                    <Avatar avatar={avatar} heightWidth="h-[40px] w-[40px] mr-2" />
                                    <h4>{fullname}</h4>
                                </div>
                            </div>
                        </div>
                    </Link>
                    {
                        history ? (
                            <HistoryDropDown
                                setAddVideoForm={setAddVideoForm}
                                videoId={_id}
                                setFetch={setFetch}
                            />
                        ) : (
                            <VideoDropDown
                                setAddVideoForm={setAddVideoForm}
                                setIsHidden={setIsHidden}
                                isCurrentUser={isCurrentUser}
                                videoId = {_id}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}