export function LikeToggle({setLike, setLikeCount, Like, likeCount, _id, fn}) {

    const toggleLike = async () => {
        const response = await fn(_id)
        if (response?.data?.data) {
            setLike(true)
            setLikeCount(prev => prev + 1)
        }
        else {
            setLike(false)
            setLikeCount(prev => prev -= 1)
        }
    }
    return (
        <div className="flex items-center gap-1">
            <button
                className="text-2xl"
                onClick={() => toggleLike()}
            >
                {Like ? (<i className="ri-heart-3-fill text-cyan-500 textEffect"></i>) : (<i className="ri-heart-3-line textEffect"></i>)}
            </button>
            <div>
                {likeCount}
            </div>
        </div>
    )
}