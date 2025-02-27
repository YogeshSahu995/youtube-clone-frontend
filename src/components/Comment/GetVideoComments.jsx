import { getVideoComments, addComment } from "../../services/commentService"
import { useState, useEffect, useRef } from "react";
import { errorHandler, paginationHandler } from "../../utils";
import { Comment } from "./Comment";
import { Button, Input } from "../LayoutComponents";
import { DeleteForm } from ".."
import { deleteComment } from "../../services/commentService";
import { ChangeComment } from "./ChangeComment";
import toast from "react-hot-toast";

export function GetVideoComment({
    videoId,
    commentCount,
}) {
    const [loading, setLoading] = useState(false)
    const [end, setEnd] = useState(false)
    const [allComments, setAllComments] = useState([])
    const [data, setData] = useState({})
    const [error, setError] = useState("")
    const [page, setPage] = useState(1)
    const [comment, setComment] = useState("")
    const [noOfComment, setNoOfComment] = useState(commentCount)
    const mainRef = useRef(null)
    const [commentId, setCommentId] = useState("")
    const [isHidden, setIsHidden] = useState(true)
    const [changeForm, setChangeForm] = useState(true)


    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ; (async () => {
            try {
                setLoading(true);
                setError("");
                const response = await getVideoComments({ videoId, page, limit: "5", signal });
                if (response?.data?.data) {
                    const data = response.data.data;
                    setAllComments((prev) => [...prev, ...data.docs]);
                    setData(data);
                }
                else {
                    toast.error(errorHandler(response));
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort()
    }, [page, noOfComment]);

    useEffect(() => {
        const container = mainRef.current;
        const handleScroll = paginationHandler({ container, data, setPage, setEnd })
        return () => {
            if (container) container.removeEventListener("scroll", handleScroll);
        };
    }, [data, mainRef]);

    const SubmitComment = async () => {
        try {
            const response = await addComment({ videoId, data: { "content": comment } })
            if (response?.data?.data) {
                setComment("")
                setAllComments([])
                setNoOfComment(prev => prev += 1)
            }
            else {
                toast.error(errorHandler(response))
            }
        } catch (error) {
            toast.error("Error submitting comment:", error.message)
        }
    }

    async function handleDelete() {
        try {
            const response = await deleteComment({ commentId: commentId })
            if (response?.data?.data) {
                setAllComments([])
                setNoOfComment(prev => prev - 1)
                setIsHidden(true)
                toast.success("Successfully delete comment")
            }
            else {
                toast.error(errorHandler(response))
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="relative">
            <h1 className="py-2">Comments <span className="text-[#ffffff73]">{noOfComment}</span></h1>
            <div className="w-full flex justify-between items-center">
                <Input
                    placeholder="add a comment"
                    className="w-[60vw] md:w-[70vw] lg:w-[40vw]"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                <Button
                    value="comment"
                    bgColor={comment.trim() ? "bg-cyan-700 text-[#fff]" : "bg-[#111] text-[#ffffff70]"}
                    cursor={comment.trim() ? "cursor-pointer" : "cursor-wait"}
                    onClick={SubmitComment}
                    disabled={!comment.trim()}
                />
            </div>
            <div
                ref={mainRef}
                className="h-[300px] bg-[#0000006d] rounded-xl overflow-x-hidden scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent p-2"
            >
                <DeleteForm
                    deleteFunction={handleDelete}
                    isHidden={isHidden}
                    setIsHidden={setIsHidden}
                />

                <ChangeComment
                    changeForm={changeForm}
                    commentId={commentId}
                    setChangeForm={setChangeForm}
                />

                {
                    allComments.length == 0 ? (
                        <div className="h-full w-full flex justify-center items-center text-xl">
                            <i className="ri-chat-1-line text-2xl mr-2"></i>
                            <h1>No Any Comment</h1>
                        </div>
                    ) : (

                        <ul>
                            {allComments?.map((comment) => {
                                return (
                                    <li key={comment._id}>
                                        <Comment
                                            comment={comment}
                                            setIsHidden={setIsHidden}
                                            setCommentId={setCommentId}
                                            setChangeForm={setChangeForm}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }
            </div>
        </div>
    )
}