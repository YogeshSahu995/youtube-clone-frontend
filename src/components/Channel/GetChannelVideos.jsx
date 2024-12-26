import { useEffect } from "react";
import { getChannelVideos } from "../../services/videoService";
import { errorHandler, paginationHandler } from "../../utils";

export function GetChannelVideos({
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
}){
    useEffect(() => {
        ;(async() => {
            try {
                setLoading(true);
                setError("");
                const response = await getChannelVideos({ page, query: userId, limit: "5", sortBy, sortType });
                const data = response.data.data;
                if (data) {
                    setAllVideos((prev) => [...prev, ...data.docs]);
                    setData(data);
                } 
                else{
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [page, sortBy, sortType]);
    
    useEffect(() => {
        const container = mainRef.current;
        const handleScroll = paginationHandler({container, data, setPage, setEnd})
        return () => {
            if (container) container.removeEventListener("scroll", handleScroll);
        };
    }, [data, mainRef]);
    
    useEffect(() =>{
        setAllVideos([])
    }, [sortBy, sortType])
}