import {getVideoComments, addComment} from "../../services/commentService"
import { useState, useEffect, useRef } from "react";
import { paginationHandler } from "../../utils";
import { Comment } from "./Comment";
import { Button, Input } from "../LayoutComponents";

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
    }, [page]);
    
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
                console.log(response.data.data)
                setComment("")
            }
        } catch (error) {
            console.error("Error submitting comment:", error.message)
        }
    }

    return(
        <div className="">
            <h1 className="py-2">Comments <span className="text-[#ffffff73]">{commentCount}</span></h1>
            <div className="w-full flex justify-between">
                <Input 
                    placeholder="add a comment"
                    className = "w-[60vw] md:w-[70vw] lg:w-[40vw]"
                    onChange = {(e) => setComment(e.target.value)}
                    value={comment}
                />
                <Button 
                    value="comment" 
                    bgColor={comment.trim()? "bg-cyan-700": "bg-[#222]"} 
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