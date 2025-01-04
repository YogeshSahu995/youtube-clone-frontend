import { useNavigate } from "react-router-dom"
import { removeVideoFromHistory } from "../../services/userService"
import { DropDown } from "../LayoutComponents"

export function HistoryDropDown ({setAddVideoForm, isCurrentUser, videoId, setFetch}) {
    const navigate = useNavigate()

    const handleRemoveVideo = async() => {
        try {
            const response = await removeVideoFromHistory(videoId)
            if(response.data.data){
                setFetch(prev => !prev)
                console.log("hogya akhir kar")
            }
            else{
                navigate("/")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <DropDown>
            <div className="text-base">
                {isCurrentUser && (
                    <div 
                        className="hover:bg-[#00000038] px-1 rounded-md mb-1 cursor-pointer" 
                        onClick={() => handleRemoveVideo()}
                    >
                        Remove
                    </div>
                )}
                <div 
                    className="hover:bg-[#00000038] px-1 rounded-md mb-1"
                    onClick={() => setAddVideoForm(false)}
                >
                    Add to playlist
                </div>
            </div>
        </DropDown>
    )
}