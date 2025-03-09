import { useEffect, useState } from "react";
import { getUserTweets } from "../../services/tweetService";
import { Loading2, Post } from "../LayoutComponents";
import { EmptyPageResponse } from "./EmptyPageResponse";
import { useOutletContext } from "react-router-dom";

export function ChannelPost() {
    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState([])
    const { userId, isCurrentUser } = useOutletContext()

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        ; (async () => {
            try {
                setLoading(true)
                const response = await getUserTweets(userId, signal)
                if (response?.data?.data) {
                    setAllPosts(response.data.data)
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false)
            }
        })()
        return () => controller.abort()
    }, [userId])

    if (loading) {
        return <div className="mt-4">
            <Loading2 />
        </div>
    }

    if (allPosts.length === 0) {
        return (
            <div className="w-fit mx-auto">
                <EmptyPageResponse
                    isCurrentUser={isCurrentUser}
                    title="No post uploaded"
                    anotherpara="This page has yet to upload a Post. Search another page"
                    para="This channel has yet to upload a Post"
                    path="/create-post"
                    buttonValue="create Post"
                    buttonicon={<i className="ri-image-add-fill text-2xl"></i>}
                    mainicon={
                        <img
                            src={'/images/NoContent.png'}
                            alt="No Content"
                            className="h-fit w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] object-cover object-center mx-auto"
                        />
                    }
                />
            </div>
        )
    }

    return (
        <div>
            <ul className="">
                {allPosts.map((post) => (
                    <li key={post._id} className="my-4">
                        <Post postInfo={post} isCurrentUser={isCurrentUser} />
                    </li>
                ))}
            </ul>
            <p className="text-white text-center italic underline-offset-1">No More Posts</p>
        </div>
    )
}