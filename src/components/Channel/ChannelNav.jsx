import { NavbarOfChannel } from ".."

export function ChannelNav({ username, handleSearchChange }) {

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


    return (
        <NavbarOfChannel
            channelNav={channelNav}
            username={username}
            handleSearchChange={handleSearchChange}
            searchPath={`/channel/${username}/search`}
        />
    )
}