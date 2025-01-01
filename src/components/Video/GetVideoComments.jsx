import {getVideoComments, addComment} from "../../services/commentService"
import { useState, useEffect, useRef } from "react";
import { paginationHandler } from "../../utils";
import { Comment } from "./Comment";
import { Button, Input } from "../LayoutComponents";
import { comma } from "postcss/lib/list";

export function GetVideoComment({
    videoId,
    commentCount,
}){
    const [loading, setLoading] = useState(false)
    const [end, setEnd] = useState(false)
    const [allComments, setAllComments] = useState([])
    const [data, setData] = useState({})
    const [error, setError] = useState("")
    const [page, setPage] = useState(1)
    const [comment, setComment] = useState("")
    const [noOfComment, setNoOfComment] = useState(commentCount)
    const mainRef = useRef(null)

    useEffect(() => {
        ;(async() => {
            try {
                setLoading(true);
                setError("");
                const response = await getVideoComments({ videoId, page, limit: "5"});
                const data = response.data.data;
                if (data) {
                    setAllComments((prev) => [...prev, ...data.docs]);
                    setData(data);
                } 
                else{
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [page, noOfComment]);
    
    useEffect(() => {
        const container = mainRef.current;
        const handleScroll = paginationHandler({container, data, setPage, setEnd})
        return () => {
            if (container) container.removeEventListener("scroll", handleScroll);
        };
    }, [data, mainRef]);

    const SubmitComment = async() => {
        try {
            const response = await addComment({videoId, data: {"content":comment}})
            if(response.data.data){
                setComment("")
                setAllComments([])
                setNoOfComment(prev => prev += 1)
            }
        } catch (error) {
            console.error("Error submitting comment:", error.message)
        }
    }

    return(
        <div className="">
            <h1 className="py-2">Comments <span className="text-[#ffffff73]">{noOfComment}</span></h1>
            <div className="w-full flex justify-between items-center">
                <Input 
                    placeholder="add a comment"
                    className = "w-[60vw] md:w-[70vw] lg:w-[40vw]"
                    onChange = {(e) => setComment(e.target.value)}
                    value={comment}
                />
                <Button 
                    value="comment" 
                    bgColor={comment.trim()? "bg-cyan-700 text-[#fff]": "bg-[#111] text-[#ffffff70]"} 
                    cursor={comment.trim()? "cursor-pointer": "cursor-wait"}
                    onClick = {SubmitComment}
                    disabled={!comment.trim()}
                />
            </div>
            <div 
                ref={mainRef} 
                className="h-[300px] overflow-x-hidden scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent border"
            >
                <ul>
                    {allComments?.map((comment) => {
                        return(
                            <li key={comment._id}>
                                <Comment comment={comment} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}