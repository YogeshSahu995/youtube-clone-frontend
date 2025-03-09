import { useEffect } from "react";
import { getChannelVideos } from "../../services/videoService";
import { paginationHandler } from "../../utils";

export function GetChannelVideos(
    {
        setLoading,
        setAllVideos,
        setData,
        mainRef,
        sortBy,
        sortType,
        setPage,
        page,
        userId,
        data,
        setEnd
    }
) {
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ; (async () => {
            try {
                setLoading(true);
                const response = await getChannelVideos({ page, limit: "10", query: userId, sortBy, sortType, signal });
                if (response?.data?.data) {
                    const data = response.data.data;
                    setAllVideos((prev) => [...prev, ...data.docs].filter((video) => video.isPublished));
                    setData(data);
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort()
    }, [page, sortBy, sortType, userId]);

    useEffect(() => {
        const container = mainRef.current;
        const handleScroll = paginationHandler({ container, data, setPage, setEnd })
        return () => {
            if (container) container.removeEventListener("scroll", handleScroll);
        };
    }, [data, mainRef]);

    useEffect(() => {
        setAllVideos([])
    }, [sortBy, sortType])
}