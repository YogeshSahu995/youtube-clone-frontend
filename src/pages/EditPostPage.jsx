import { useState, useEffect } from "react";
import { Loading, PostForm } from "../components";
import { useParams } from "react-router-dom";
import { getTweetById } from "../services/tweetService";
import { errorHandler } from "../utils";
import toast from "react-hot-toast";

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
                const response = await getTweetById({tweetId : postId, signal})
                if(response?.data?.data){
                    setPost(response.data.data)
                }
                else{
                    toast.error(errorHandler(response));
                }
            } catch (error) {
                toast.error(error.message)
            } finally{
                setLoading(false)
            }
        })()
        return () => controller.abort()
    },[postId])


    if(loading) return <Loading />
    
    return <PostForm post={post} />
}