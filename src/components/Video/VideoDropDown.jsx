import { DropDown } from "../LayoutComponents"

export function VideoDropDown ({setIsHidden, setAddVideoForm, isCurrentUser}) {

    return (
        <DropDown>
            <div className="text-base">
                {isCurrentUser && (
                    <div 
                        className="hover:bg-[#00000038] px-1 rounded-md mb-1 cursor-pointer" 
                        onClick={() => setIsHidden(false)}
                    >
                        Delete
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