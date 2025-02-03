import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { NavbarOfChannel } from ".."

export function ChannelNav({ username, handleSearchChange }) {
    const navigate = useNavigate()

    const channelNav = [
        {
            name: "Videos",
            slug: `/channel/:username/videos`
        },
        {
            name: "Playlists",
            slug: "/channel/:username/playlists"
        },
        {
            name: "Posts",
            slug: "/channel/:username/posts"
        },
        {
            name: "Subscribed",
            slug: "/channel/:username/subscribed"
        }
    ]

    useEffect(() => {
        navigate(`/channel/${username}/videos`)
    }, [username, navigate])

    return (
        <NavbarOfChannel 
            channelNav={channelNav} 
            username={username} 
            handleSearchChange={handleSearchChange} 
            searchPath={`/channel/${username}/search`} 
        />
    )
}