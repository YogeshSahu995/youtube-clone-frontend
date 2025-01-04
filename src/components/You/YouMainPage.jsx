import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "..";
import { YourHistory, YourLikedVideos, YourPlaylists } from "./index";

export function YouMainPage({userData}){
    const navigate = useNavigate()
    const {username, fullname, avatar} = userData
    return(
        <div>
            <div className="flex gap-4 items-start">
                <Avatar avatar={avatar} />
                <div className="text-white font-semibold mt-2">
                    <h3 className="text-4xl">{fullname}</h3>
                    <h4 className="text-xl text-[#ffffff96] font-normal">@{username}</h4>
                    <Button 
                        value="View channel"
                        className="mt-2"
                        onClick = {() => navigate(`/channel/${username}`)}
                    />
                </div>
            </div>
            <YourHistory userData = {userData} />
            <YourPlaylists userId = {userData._id} />
            <YourLikedVideos />
        </div>
    )
}