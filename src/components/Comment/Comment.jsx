import { useEffect, useState } from "react"
import { toggleCommentLike } from "../../services/likeService"
import { Avatar, TimeAgo, DropDown } from "../LayoutComponents"
import { LikeToggle } from "../Video/LikeToggle"

export function Comment({ comment, setIsHidden, setChangeForm, setCommentId }) {
    const { owner, content, createdAt, _id, likes, isLiked } = comment
    const [Like, setLike] = useState(isLiked)
    const [likeCount, setLikeCount] = useState(likes)

    if (owner) {
        const { fullname, avatar, username } = owner
        return (
            <div className="border-b hover:border-cy p-2 font-light">
                <div className="flex gap-2 relative ">
                    <Avatar avatar={avatar} heightWidth="h-[50px] w-[50px]" />
                    <div>
                        <div className="flex gap-4 text-base">
                            <h3>{fullname}</h3>
                            <TimeAgo timeStamp={createdAt} />
                        </div>
                        <h4 className="text-sm text-[#ffffff8f]">{username}</h4>
                    </div>
                    <DropDown>
                        <div className="text-base">
                            {true && (
                                <>
                                    <div
                                        className="dropDownLi"
                                        onClick={() => {
                                            setIsHidden(false)
                                            setCommentId(_id)
                                        }}
                                    >
                                        Delete
                                    </div>
                                    <div
                                        className="dropDownLi"
                                        onClick={() => {
                                            setChangeForm(false)
                                            setCommentId(_id)
                                        }}
                                    >
                                        change comment
                                    </div>
                                </>
                            )}
                        </div>
                    </DropDown>
                </div>
                <div className="mt-2 px-2">
                    {content}
                </div>
                <LikeToggle
                    Like={Like}
                    _id={_id}
                    fn={toggleCommentLike}
                    likeCount={likeCount}
                    setLike={setLike}
                    setLikeCount={setLikeCount}
                    likes={likes}
                />
            </div>
        )
    }
}