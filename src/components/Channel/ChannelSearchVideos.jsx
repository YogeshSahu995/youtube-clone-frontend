import { useOutletContext } from "react-router-dom";
import { useDebounce } from "../../utils";
import { useEffect, useState } from "react";
import { getAllVideos } from "../../services/videoService";
import { paginationHandler } from "../../utils";
import { Video } from "../Video";
import { Loading2, Error } from "../LayoutComponents";
import { EmptyPageResponse } from "./EmptyPageResponse";

export function ChannelSearchVideos() {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortType, setSortType] = useState("des");
    const [loading, setLoading] = useState(false)
    const [allVideos, setAllVideos] = useState([])
    const [data, setData] = useState({})
    const [end, setEnd] = useState(false)
    const { searchQuery, mainRef, userId } = useOutletContext()
    const query = useDebounce({ value: searchQuery, delay: 500 }) // custom Hook 

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setAllVideos([])
            ; (async () => {
                setLoading(true)
                try {
                    const response = await getAllVideos({ page, limit: "5", query, sortBy, sortType, userId, signal })
                    if (response?.data?.data) {
                        const data = response.data.data;
                        setAllVideos((prev) => [...prev, ...data.docs].filter((video) => video.isPublished));
                    }
                } catch (error) {
                    console.log(error.message)
                } finally {
                    setLoading(false);
                }
            })()

        return () => controller.abort()
    }, [query, userId, page, sortBy, sortType])

    useEffect(() => {
        const container = mainRef.current;
        const handleScroll = paginationHandler({ container, data, setPage, setEnd })
        return () => {
            if (container) container.removeEventListener("scroll", handleScroll);
        };
    }, [data, mainRef]);

    if (loading) {
        return <Loading2 />
    }

    if (!query) {
        return (
            <div className="mx-auto w-fit">
                <EmptyPageResponse
                    isCurrentUser={false}
                    title={`Search any video of channel`}
                    mainicon={
                        <img
                            src={'/images/plsSearch.png'}
                            loading="lazy"
                            alt="pls Search"
                            className="h-fit w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] object-cover object-center mx-auto"
                        />
                    }
                />
            </div>
        )
    }

    if (allVideos.length === 0) {
        return (
            <div className="mt-4 text-xl text-center text-[#ffffff8e]">
                <h4>This channel has no content that matched " {`${query}`} ".</h4>
            </div>
        )
    }

    return (
        <div>
            {error && (<Error message={error} />)}
            {query && (
                <>
                    <ul className="">
                        {allVideos.map((video) => (
                            <li key={video._id} className="my-4">
                                <Video videoInfo={video} />
                            </li>
                        ))}
                    </ul>
                    {loading && <Loading2 />}
                    {end && <p className="text-white text-center italic underline-offset-1">No More Videos</p>}
                </>
            )}
        </div>
    );
}