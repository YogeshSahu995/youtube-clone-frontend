import { NavLink, useOutletContext } from "react-router-dom";
import { useDebounce } from "../../utils";
import { useEffect, useState } from "react";
import { getAllVideos } from "../../services/videoService";
import { paginationHandler } from "../../utils";
import { Video, Loading2, Error } from "../index";

export function ChannelSearchVideos() {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortType, setSortType] = useState("des");
    const [loading, setLoading] = useState(false)
    const [allVideos, setAllVideos] = useState([])
    const [data, setData] = useState({})
    const [end, setEnd] = useState(false)
    const [error, setError] = useState("")
    const {searchQuery, mainRef, userId} = useOutletContext()
    const query = useDebounce({value: searchQuery, delay : 1000}) //custom hook 

    useEffect(() => {
        setAllVideos([])
        ;(async() => {
            setLoading(true)
            setError("")
            try {
                const response = await getAllVideos({page, limit: "5", query, sortBy, sortType, userId })
                const data = response.data.data;
                if (data) {
                    setAllVideos((prev) => [...prev, ...data.docs]);
                } 
                else{
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError(error.message)
            }finally {
                setLoading(false);
            }
        })()
    }, [query])

    useEffect(() => {
        const container = mainRef.current;
        const handleScroll = paginationHandler({container, data, setPage, setEnd})
        return () => {
            if (container) container.removeEventListener("scroll", handleScroll);
        };
    }, [data, mainRef]);

    if(loading){
        return <Loading2 />
    }

    if(!query){
        return (
            <div className="mt-4 text-xl text-center text-[#ffffff8e]">
                <h4>Search any Video of Channel</h4>
            </div>
        )
    }

    if(allVideos.length === 0){
        return(
            <div className="mt-4 text-xl text-center text-[#ffffff8e]">
                <h4>This channel has no content that matched " {`${query}`} ".</h4>
            </div>
        )
    }

    return (
        <div>
            {error && (<Error message={error} />)}
            {query &&(
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