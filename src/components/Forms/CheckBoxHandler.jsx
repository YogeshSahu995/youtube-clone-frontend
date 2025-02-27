import { useEffect, useState } from "react";
import { addVideoInPlaylist, removeVideoFromPlaylist, checkAlreadyVideoExist } from "../../services/playlistService";
import { Input } from "../LayoutComponents";
import toast from "react-hot-toast";
import { errorHandler } from "../../utils";

export function CheckBoxHandler({playlistId, videoId, name}){
    const [checkbox, setCheckbox] = useState(false)
    
    useEffect(() => {
        ;(
            async() => {
                try {
                    const response = await checkAlreadyVideoExist({playlistId, videoId})
                    if(response?.data?.data){
                        setCheckbox(response.data.data)
                    }
                } catch (error) {
                    console.log(error.message)
                }
            }
        )()
    }, [playlistId, videoId])

    const handleCheckBoxChange = async(event) => {
        try {
            setCheckbox(event.target.checked)
            if(event.target.checked){
                const response = await addVideoInPlaylist({videoId, playlistId})
                if(response?.data?.data){
                    toast.success("Successfully add video in playlist")
                }
            }
            else{
                const response = await removeVideoFromPlaylist({videoId, playlistId})
                if(response?.data?.data){
                    toast.success("Successfully remove video from playlist")
                }
            }
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
        </div>
    )
}