import { Link, useNavigate } from "react-router-dom"
import { TimeAgo, Avatar, DropDown } from "../LayoutComponents"
import { FormatteDuration } from "./FormatteDuration"
import { deleteVideo } from "../../services/videoService"
import { useSelector } from "react-redux"
import { DeleteForm, AddVideoInPlaylist } from "../Forms"
import { useState } from "react"

export function Video({
    videoInfo,
    thumbnailSize = "h-[150px] w-[80vw] sm:h-[200px] sm:w-[360px] md:h-[220px] md:w-[350px]",
    gridLayout = "grid grid-row sm:grid-cols-custom justify-items-stretch"
}) {
    const [isHidden, setIsHidden] = useState(true)
    const [addVideoForm, setAddVideoForm] = useState(true)
    const navigate = useNavigate()
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

    const userData = useSelector(state => state.data)
    const { username, email, avatar, fullname } = owner
    const isCurrentUser = userData._id == owner._id

    async function handleDelete() {
        try {
            const response = await deleteVideo({videoId: _id})
            if (response.data.data) {
                setIsHidden(true)
                navigate(`/channel/${username}/videos`)
            }
            else {
                console.log('anyProblem is delete')
            }
        } catch (error) {
            console.error('Any Problem in deleting your playlist')
        }
    }

    return (
        <>
            <AddVideoInPlaylist 
                setAddVideoForm = {setAddVideoForm}
                isHidden={addVideoForm}
                videoId={_id}
            />

            <DeleteForm
                deleteFunction={handleDelete} 
                isHidden={isHidden} 
                setIsHidden={setIsHidden} 
                message="Are you sure you want to delete this video? Once its deleted, you will not be able to recover it." 
                title = "Permanently delete"
            />
            <div className={`${gridLayout} w-fit mx-auto mb-4 sm:mx-2 sm:w-full rounded-lg hover:bg-[#ffffff1e]`}>
                    <Link to={`/video/${_id}`}>
                        <div
                            className={` ${thumbnailSize} relative bg-cover bg-no-repeat bg-center bg-black rounded-lg`}
                            style={{ backgroundImage: `url(${thumbnail})` }}
                        >
                            <div className="absolute bottom-2 right-2 p-1 text-white bg-[#000000ab] rounded-lg">
                                {<FormatteDuration seconds={duration} />}
                            </div>
                        </div>
                    </Link>

                    <div className="flex justify-between">
                        <Link to={`/video/${_id}`}>
                            <div className="h-fit w-full text-[#fff] px-2 text-lg text-wrap whitespace-wrap relative flex flex-col ">
                                <h3 className="text-xl">{title}</h3>
                                <p className="text-base"> {description}</p>
                                <div className="flex flex-col gap-2 text-[#fff9] text-sm font-light">
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
                        <div className="flex-none cursor-pointer">
                            <DropDown>
                                <div className="text-base">
                                    {isCurrentUser && (
                                        <div 
                                            className="hover:bg-[#00000038] px-1 rounded-md mb-1" 
                                            onClick={() => {
                                                setIsHidden(false)
                                            }}
                                        >
                                            Delete
                                        </div>
                                    )}
                                    <div 
                                        className="hover:bg-[#00000038] px-1 rounded-md mb-1 text-base"
                                        onClick={() => setAddVideoForm(false)}
                                    >
                                        Add to playlist
                                    </div>
                                </div>
                            </DropDown>
                        </div>
                    </div>
            </div>
        </>
    )
}