import { getVideoComments, addComment } from "../../services/commentService"
import { useState, useEffect, useRef } from "react";
import { paginationHandler } from "../../utils";
import { Comment } from "./Comment";
import { Button, Input } from "../LayoutComponents";
import { DeleteForm } from ".."
import { deleteComment } from "../../services/commentService";
import { useNavigate } from "react-router-dom";
import { ChangeComment } from "./ChangeComment";
import toast, { Toaster } from "react-hot-toast";

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
    const navigate = useNavigate()


    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true);
                setError("");
                const response = await getVideoComments({ videoId, page, limit: "5" });
                const data = response.data.data;
                if (data) {
                    setAllComments((prev) => [...prev, ...data.docs]);
                    setData(data);
                }
                else {
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [page, noOfComment, changeForm, isHidden]);

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
            if (response.data.data) {
                setComment("")
                setAllComments([])
                setNoOfComment(prev => prev += 1)
            }
        } catch (error) {
            console.error("Error submitting comment:", error.message)
        }
    }

    async function handleDelete() {
        try {
            const response = await deleteComment({commentId: commentId})
            if (response.data.data) {
                setIsHidden(true)
                toast("Successfully delete comment")
            }
            else {
                console.log('anyProblem is delete')
            }
        } catch (error) {
            console.error('Any Problem in deleting your playlist: '+ error.message)
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
                <Toaster />

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
                                            setCommentId = {setCommentId}
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