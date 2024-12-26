import { Link } from "react-router-dom"
import { TimeAgo, Avatar } from "../LayoutComponents"
import { FormatteDuration } from "./FormatteDuration"

export function Video({
    videoInfo,
    thumbnailSize = "h-[150px] w-[80vw] sm:h-[200px] sm:w-[360px] md:h-[220px] md:w-[400px]"
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
        updatedAt,
        likes,
        comments,
    } = videoInfo

    const { username, email, avatar, fullname } = owner
    return (
        <Link to={`/video/${_id}`}>
            <div className="w-fit grid grid-row sm:grid-cols-custom mx-auto mb-4 sm:mx-2 sm:w-full rounded-lg hover:bg-[#ffffff1e]">
                <div
                    className={` ${thumbnailSize} relative bg-cover bg-no-repeat bg-center bg-black rounded-lg`}
                    style={{ backgroundImage: `url(${thumbnail})` }}
                >
                    <div className="absolute bottom-2 right-2 p-1 text-white bg-[#000000ab] rounded-lg">
                        {<FormatteDuration seconds={duration} />}
                    </div>
                </div>

                <div className="h-fit text-[#fff] px-2 text-lg">
                    <h3 className="text-2xl">{title}</h3>
                    <p> {description}</p>
                    <div className="flex flex-col gap-2 text-[#fff9] text-sm font-light">
                        {
                            (comments && likes && views) ?
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
                            <Avatar avatar={avatar} heightWidth="h-[30px] w-[30px] mr-2" />
                            <h4>{fullname}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}