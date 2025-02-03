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
        ;(async() => {
            try {
                setLoading(true)
                setError("")
                const response = await getTweetById(postId)
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
    },[])

    if(loading) return <Loading />
    
    return <PostForm post={post} />
}