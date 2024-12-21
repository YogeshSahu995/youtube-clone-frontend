import { Button, Avatar, SubscriptionButton, CoverImage } from "../index"
import { useNavigate } from "react-router-dom"

export function ChannelHeader({profile, isCurrentUser})
{
    const {
        _id,
        avatar, 
        coverImage, 
        fullname, 
        username, 
        subscribersCount, 
        channelsSubscribed, 
        isSubscribed
    } = profile

    const navigate = useNavigate()

    return (
        <div className="p-2">
            <CoverImage coverImage={coverImage} />
            <div className="flex flex-row items-center">
                <Avatar avatar={avatar} />
                <div className="mt-4 ml-4">
                    <h1
                        className="font-bold text-white text-3xl md:text-4xl"
                    >
                        {fullname}
                    </h1>
                    <h2 className="text-[#ffffff75] text-md md:text-lg font-light">
                        @{username}
                    </h2>
                    <p className="text-[#ffffff75] text-md md:text-lg font-light">
                        {subscribersCount} subscribers . {channelsSubscribed} subscribed
                    </p>
                    {!isCurrentUser && (
                        <SubscriptionButton 
                            channelId={_id} 
                            isSubscribed={isSubscribed} 
                        />
                    )}
                    {isCurrentUser && (
                        <Button 
                            className="px-4"
                            value="Customize channel"
                            onClick = {() => navigate(`/edit/channel/${_id}`)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}