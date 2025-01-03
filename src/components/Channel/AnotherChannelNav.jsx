import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { NavbarOfChannel } from "../index"

export function AnotherChannelNav({ username, handleSearchChange }) {
    const navigate = useNavigate()

    const channelNav = [
        {
            name: "Videos",
            slug: `/:username/videos`
        },
        {
            name: "Playlists",
            slug: "/:username/playlists"
        },
        {
            name: "Posts",
            slug: "/:username/posts"
        },
        {
            name: "Subscribed",
            slug: "/:username/subscribed"
        }
    ]

    useEffect(() => {
        navigate(`/${username}/videos`)
    }, [username, navigate])

    return (
        <NavbarOfChannel 
            channelNav={channelNav} 
            handleSearchChange={handleSearchChange} 
            username={username} 
            searchPath={`/${username}/search`}
        />

    )
}