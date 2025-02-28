import { forwardRef, useEffect, useState } from "react";
import { togglePublishBtn } from "../../services/videoService";
import { Button } from "./Button";

function ToggleButton({ setPublishStatus, publishStatus, videoId }, ref) {

    const toggleActiveState = async () => {
        setPublishStatus((prev) => !prev);
        if (videoId) {
            try {
                const response = await togglePublishBtn({ videoId });
                if (!response.data.data) {
                    console.error("Error toggling publish status");
                    setPublishStatus(publishStatus)
                }
            } catch (error) {
                console.error("Error:", error.message);
                setPublishStatus(publishStatus)
            }
        }
    };

    return (
        <Button
            onClick={toggleActiveState}
            value={publishStatus ? "Public" : "Private"}
            ref={ref}
        />
    );
}

export default forwardRef(ToggleButton);
