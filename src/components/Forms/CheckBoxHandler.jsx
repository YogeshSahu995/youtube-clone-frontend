import { useState } from "react";
import { addVideoInPlaylist, removeVideoFromPlaylist } from "../../services/playlistService";
import { Input } from "../LayoutComponents";

export function CheckBoxHandler({playlistId, videoId, name}){
    const [checkbox, setCheckbox] = useState(false)

    const handleCheckBoxChange = async(event) => {
        try {
            setCheckbox(event.target.checked)
            if(event.target.checked){
                const response = await addVideoInPlaylist({videoId, playlistId})
                if(response.data.data){
                    console.log("successfully add")
                }
                else{
                    console.error("any problem in adding")
                }
            }
            else{
                const response = await removeVideoFromPlaylist({videoId, playlistId})
                if(response.data.data){
                    console.log("successfully remove")
                }
                else{
                    console.error("any problem in removing")
                }
            }
            
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <label className="flex items-center">
            <Input
                type="checkbox"
                value = {playlistId}
                checked = {checkbox}
                onChange = {handleCheckBoxChange}
                className = "cursor-pointer"
            />
            {name}
        </label>
    )
}