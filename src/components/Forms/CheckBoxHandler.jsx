import { useEffect, useState } from "react";
import { addVideoInPlaylist, removeVideoFromPlaylist } from "../../services/playlistService";
import { Input } from "../LayoutComponents";
import { checkAlreadyVideoExist } from "../../services/playlistService";

export function CheckBoxHandler({playlistId, videoId, name}){
    const [checkbox, setCheckbox] = useState(false)
    const [notification, setNotification] = useState("")
    
    useEffect(() => {
        ;(
            async() => {
                try {
                    const response = await checkAlreadyVideoExist({playlistId, videoId})
                    if(response.data.data){
                        setCheckbox(response.data.data)
                    }
                } catch (error) {
                    console.error(error.message)
                }
            }
        )()
    }, [playlistId, videoId])

    const handleCheckBoxChange = async(event) => {
        try {
            setCheckbox(event.target.checked)
            if(event.target.checked){
                const response = await addVideoInPlaylist({videoId, playlistId})
                if(response.data.data){
                    setNotification("Successfully add video in playlist")
                }
                else{
                    console.error("any problem in adding")
                }
            }
            else{
                const response = await removeVideoFromPlaylist({videoId, playlistId})
                if(response.data.data){
                    setNotification("Successfully remove video from playlist")
                }
                else{
                    console.error("any problem in removing")
                }
            }

            setTimeout(() => setNotification(""), 3000)
            
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <div>
            <label className="flex items-center" key={playlistId}>
                <Input
                    type="checkbox"
                    value = {playlistId}
                    checked = {checkbox}
                    onChange = {handleCheckBoxChange}
                    className = "cursor-pointer"
                />
                {name}
            </label>
            <div className="relative bottom-2 left-2">
                {notification && (
                    <div className="fixed bottom-2 left-2 bg-cyan-800 text-white py-2 px-4 rounded shadow-lg animate-pulse">
                        {notification}
                    </div>
                )}
            </div>
        </div>
    )
}