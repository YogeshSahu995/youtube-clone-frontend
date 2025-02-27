import { useEffect, useState } from "react"
import { TimeAgo, ToggleButton } from "../LayoutComponents"
import { Link } from "react-router-dom"

export function VideoLi({ video }) {
    const [publishStatus, setPublishStatus] = useState(isPublished)
    const { 
        isPublished, 
        createdAt, 
        thumbnail, 
        _id, 
        views, 
        comments, 
        likes, 
        title, 
        description, 
        owner } = video

    return (
        <div className="min-w-[900px] w-full text-white flex flex-start items-center gap-2 mx-2 px-2 mb-6 py-2 border-b hover:bg-[#ffffff25] text-center" >
            <div className="w-[12%]">
                <ToggleButton publishStatus={publishStatus} setPublishStatus={setPublishStatus} videoId={video._id} />
            </div>
            <Link to={`/video/${_id}/${owner._id}`} className="cursor-pointer w-[42%]">
                <div className="grid grid-cols-2 gap-2 w-full items-center">
                    <div className="relative">
                        {!publishStatus && <div className="bg-[#0000009f] h-full w-full rounded-lg absolute flex justify-center items-center">
                            <h1>Private</h1>
                        </div>}
                        <img src={thumbnail} alt="thumbnail" className="h-[120px] w-[280px] object-cover object-center rounded-lg" />
                    </div>
                    <div>
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
            <div className="w-[12%]">
                {TimeAgo({ timeStamp: createdAt })}
            </div>
            <div className="w-[12%]">
                {views}
            </div>
            <div className="w-[12%]">
                {likes}
            </div>
            <div className="w-[12%]">
                {comments}
            </div>
        </div>
    )
}