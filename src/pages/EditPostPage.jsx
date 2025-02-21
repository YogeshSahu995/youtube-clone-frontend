import { useState, useEffect } from "react";
import { Loading, PostForm } from "../components";
import { useParams } from "react-router-dom";
import { getTweetById } from "../services/tweetService";

export function EditPostPage () {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [post, setPost] = useState({})
    const {postId} = useParams()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ;(async() => {
            try {
                setLoading(true)
                setError("")
                const response = await getTweetById({tweetId: postId, signal})
                if(response.data.data){
                    setPost(response.data.data)
                }
                else{
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError("An unexpected error occurred.");
            } finally{
                setLoading(false)
            }
        })()
        return () => controller.abort()
    },[])

    if(loading) return <Loading />
    
    return <PostForm post={post} />
}