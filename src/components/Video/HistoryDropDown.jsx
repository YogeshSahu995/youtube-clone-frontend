import { useNavigate } from "react-router-dom"
import { removeVideoFromHistory } from "../../services/userService"
import { DropDown } from "../LayoutComponents"
import toast from "react-hot-toast"
import { errorHandler } from "../../utils"

export function HistoryDropDown ({setAddVideoForm, isCurrentUser, videoId, setFetch}) {
    const navigate = useNavigate()

    const handleRemoveVideo = async() => {
        try {
            const response = await removeVideoFromHistory(videoId)
            if(response?.data?.data){
                setFetch(prev => !prev)
            }
            else{
                navigate("/")
                toast.error(errorHandler(response))
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <DropDown>
            <div className="text-base">
                {isCurrentUser && (
                    <div 
                        className="dropDownLi" 
                        onClick={() => handleRemoveVideo()}
                    >
                        Remove
                    </div>
                )}
                <div 
                    className="dropDownLi"
                    onClick={() => setAddVideoForm(false)}
                >
                    Add to playlist
                </div>
            </div>
        </DropDown>
    )
}