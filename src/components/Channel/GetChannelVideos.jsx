import { useEffect } from "react";
import { getChannelVideos } from "../../services/videoService";
import { errorHandler, paginationHandler } from "../../utils";
import toast from "react-hot-toast";

export function GetChannelVideos(
    {
        setLoading,
        setError,
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
                setError("");
                const response = await getChannelVideos({ page, limit: "10", query: userId, sortBy, sortType, signal });
                if (response?.data?.data) {
                    const data = response.data.data;
                    setAllVideos((prev) => [...prev, ...data.docs].filter((video) => video.isPublished));
                    setData(data);
                }
                else {
                    toast.error(errorHandler(response));
                }
            } catch (error) {
                toast.error(error.message);
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