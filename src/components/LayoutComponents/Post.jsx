import { useNavigate } from "react-router-dom"
import { TimeAgo } from "./TimeAgo"
import parser from 'html-react-parser'
import { Avatar, DropDown } from "./index"
import { deleteATweet } from "../../services/tweetService"
import { useState } from "react"
import { DeleteForm } from "../Forms"
import { LikeToggle } from "../Video"
import { toggleTweetLike } from "../../services/likeService"

export function Post({ postInfo, isCurrentUser }) {
    const { content, createdAt, owner, _id, image, likes, isLiked } = postInfo
    const { avatar, username } = owner
    const [isHidden, setIsHidden] = useState(true)
    const [likeCount, setLikeCount] = useState(likes)
    const [like, setLike] = useState(isLiked)
    const navigate = useNavigate()

    const handleRoute = () => {
        if (isCurrentUser) {
            navigate(`/channel/${username}`)
        }
        else {
            navigate(`/profile/${username}`)
        }
    }

    async function handleDelete() {
        try {
            const response = await deleteATweet(_id)
            if (response.data.data) {
                setIsHidden(true)
                navigate(`/channel/${username}/posts`)
            }
            else {
                console.log('anyProblem is delete')
            }
        } catch (error) {
            console.error('Any Problem in deleting your post')
        }
    }

    return (
        <>
            <DeleteForm
                deleteFunction={handleDelete}
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                message="Are you sure you want to delete this post? Once its deleted, you will not be able to recover it."
                title="Permanently delete"
            />
            <div
                className="relative border border-[#ffffff4b] p-4 my-4 rounded-xl text-white w-full sm:w-fit mx-auto flex gap-3 flex-col ">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <Avatar avatar={avatar} heightWidth="h-[50px] w-[50px]" />
                        <div>
                            <div
                                onClick={handleRoute}
                                className="flex gap-2 text-sm hover:cursor-pointer">
                                <h4>@{username}</h4>
                                <p className="text-[#ffffff89] font-light text-sm"><TimeAgo timeStamp={createdAt} /></p>
                            </div>
                            <div className="browser-css mt-1 capitalize text-lg">
                                {parser(content)}
                            </div>
                        </div>
                    </div>
                    <DropDown>
                        <div className="text-base">
                            {isCurrentUser && (
                                <>
                                    <div
                                        className="dropDownLi"
                                        onClick={() => {
                                            setIsHidden(false)
                                        }}
                                    >
                                        Delete
                                    </div>
                                    <div
                                        className="dropDownLi"
                                        onClick={() => navigate(`/edit/post/${_id}`)}
                                    >
                                        Edit Post
                                    </div>
                                </>
                            )}
                        </div>
                    </DropDown>
                </div>
                {image &&
                    <div
                        className="h-[300px] w-full sm:w-[250px] md:w-[450px] bg-cover bg-center bg-no-repeat rounded-xl mx-auto"
                        style={{ backgroundImage: `url(${image})` }}
                    >
                    </div>
                }
                <LikeToggle 
                    setLike = {setLike}
                    Like={like}
                    setLikeCount={setLikeCount}
                    likeCount={likeCount}
                    fn={toggleTweetLike}
                    _id={_id}
                />
            </div>
        </>
    )
}