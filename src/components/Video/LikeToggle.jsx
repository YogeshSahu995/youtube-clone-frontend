import { useState } from "react"

export function LikeToggle({ setLike, setLikeCount, Like, likeCount, _id, fn }) {
    const [loading, setLoading] = useState(false)

    const toggleLike = async () => {
        setLoading(true)
        try {
            const response = await fn(_id)
            if (response?.data?.data) {
                setLike(true)
                setLikeCount(prev => prev + 1)
            }
            else {
                setLike(false)
                setLikeCount(prev => prev -= 1)
            }  
        } catch (error) {
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-1">
            <button
                className="text-2xl"
                onClick={() => toggleLike()}
                disabled = {loading}
            >
                {Like ? (<i className={`ri-heart-3-fill text-cyan-500 textEffect  ${loading?"cursor-wait": "cursor-pointer"}`}></i>) : (<i className={`ri-heart-3-line textEffect  ${loading?"cursor-wait": "cursor-pointer"}`}></i>)}
            </button>
            <div>
                {likeCount}
            </div>
        </div>
    )
}