import { forwardRef, useEffect, useState } from "react";
import { togglePublishBtn } from "../../services/videoService";
import { Button } from "./Button";

function ToggleButton({ setPublishStatus, publishStatus, videoId }, ref) {
    const [active, setActive] = useState(Boolean);

    useEffect(() => {
        setActive(publishStatus);
    }, [publishStatus]);

    const toggleActiveState = async () => {
        setActive((prevState) => !prevState);

        if (setPublishStatus) {
            setPublishStatus((prev) => !prev);
        }

        if (videoId) {
            try {
                const response = await togglePublishBtn({ videoId });
                if (!response.data.data) {
                    console.error("Error toggling publish status");
                }
            } catch (error) {
                console.error("Error:", error.message);
            }
        }
    };

    return (
        <Button
            onClick={toggleActiveState}
            value={active ? "Public" : "Private"}
            ref={ref}
        />
    );
}

export default forwardRef(ToggleButton);
