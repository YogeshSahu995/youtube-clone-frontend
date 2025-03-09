import { useState, useEffect } from "react";
import { Loading, PostForm } from "../components";
import { useParams } from "react-router-dom";
import { getTweetById } from "../services/tweetService";

export function EditPostPage () {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState({})
    const {postId} = useParams()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ;(async() => {
            try {
                setLoading(true)
                const response = await getTweetById({tweetId : postId, signal})
                if(response?.data?.data){
                    setPost(response.data.data)
                }
            } catch (error) {
                console.log(error.message)
            } finally{
                setLoading(false)
            }
        })()
        return () => controller.abort()
    },[postId])


    if(loading) return <Loading />
    
    return <PostForm post={post} />
}