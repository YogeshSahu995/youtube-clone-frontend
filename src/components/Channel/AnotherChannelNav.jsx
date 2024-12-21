import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { NavbarOfChannel } from "../index"

export function AnotherChannelNav({ username, handleSearchChange }) {
    const navigate = useNavigate()

    const channelNav = [
        {
            name: "Videos",
            slug: `/profile/:username/videos`
        },
        {
            name: "Playlists",
            slug: "/profile/:username/playlists"
        },
        {
            name: "Posts",
            slug: "/profile/:username/posts"
        },
        {
            name: "Subscribed",
            slug: "/profile/:username/subscribed"
        }
    ]

    // useEffect(() => {
    //     navigate(`/profile/${username}/videos`)
    // }, [username, navigate])

    return (
        <NavbarOfChannel 
            channelNav={channelNav} 
            handleSearchChange={handleSearchChange} 
            username={username} 
            searchPath={`/profile/${username}/search`}
        />

    )
}