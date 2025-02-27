import { DropDown } from "../LayoutComponents"

export function VideoDropDown({ setIsHidden, setAddVideoForm, isCurrentUser }) {

    return (
        <DropDown>
            <div className="text-base">
                {isCurrentUser && (
                    <div
                        className="dropDownLi"
                        onClick={() => setIsHidden(false)}
                    >
                        Delete
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