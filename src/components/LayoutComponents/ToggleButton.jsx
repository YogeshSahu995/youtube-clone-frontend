import { forwardRef, useEffect, useState } from "react";
import { togglePublishBtn } from "../../services/videoService";
import { Button } from "./Button";

const ToggleButton = forwardRef(
    ({ setPublishStatus, publishStatus, videoId }, ref) => {
        const [active, setActive] = useState(publishStatus);

        useEffect(() => {
            (async () => {
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
            })();
        }, [active]);

        const toggleActiveState = () => {
            console.log(active)
            setActive((prevState) => !prevState);
            if (setPublishStatus) {
                setPublishStatus((prev) => !prev);
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
);

export default ToggleButton;
