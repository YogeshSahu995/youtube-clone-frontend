import { useNavigate } from "react-router-dom"
import { DropDown } from "../LayoutComponents"

export function VideoDropDown({ setIsHidden, setAddVideoForm, isCurrentUser, videoId }) {
    const navigate = useNavigate()

    return (
        <DropDown>
            <div className="text-base">
                {isCurrentUser && (
                    <>
                        <div
                            className="dropDownLi"
                            onClick={() => setIsHidden(false)}
                        >
                            Delete
                        </div>

                        <div
                            className="dropDownLi"
                            onClick={() => {
                                setIsHidden(false)
                                navigate(`/edit/video/${videoId}`)
                            }}
                        >
                            Edit
                        </div>
                    </>
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