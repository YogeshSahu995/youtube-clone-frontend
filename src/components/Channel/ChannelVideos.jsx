import { useEffect, useState } from "react";
import { getChannelVideos } from "../../services/videoService";
import { Loading2, Error, Video, Button, Loading } from "../index";
import { useOutletContext } from "react-router-dom";
import { errorHandler, paginationHandler } from "../../utils";
import { EmptyPageResponse } from "./EmptyPageResponse";

export function ChannelVideos() {
    const {mainRef, userId, isCurrentUser} = useOutletContext()
    const [data, setData] = useState({});
    const [allVideos, setAllVideos] = useState([]);
    const [end, setEnd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortType, setSortType] = useState("des");

    useEffect(() => {
        (async () => {
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

    if (error) {
        return <Error message={error} />;
    }

    if(loading){
        return <Loading />
    }

    if (allVideos.length === 0) {
        return(
            <EmptyPageResponse 
                isCurrentUser={isCurrentUser}
                title="No Videos Uploaded" 
                anotherpara="This Channel does not have any content" 
                para="This channel has yet to upload a video"
                path="/add-video"
                buttonValue="Add Video"
                buttonicon={<i className="ri-video-add-fill text-2xl"></i>}
                mainicon={<i className="ri-video-off-fill"></i>}
            />
        )
    }

    return (
        <>
            <div>
                <Button 
                 value="Latest"
                 className="mr-3 mt-2 hover:bg-[#ffffff92] hover:text-[#222]"
                 bgColor="bg-[#88888844]"
                 onClick={() => {
                    if((sortBy !== "createdAt") || (sortType !== "des")) {
                        setSortBy("createdAt")
                        setSortType("des")
                        setPage(1)
                    }
                }}
                />
                <Button 
                 value="Popular"
                 className="mr-3 mt-2 hover:bg-[#ffffff92] hover:text-[#222]"
                 bgColor="bg-[#88888844]"
                 onClick={() => {
                    if((sortBy !== "likes") || (sortType !== "des")){
                        setSortBy("likes")
                        setSortType("des")
                        setPage(1)
                    } 
                }}
                />
                <Button 
                 value="Oldest"
                 className="mr-3 mt-2 hover:bg-[#ffffff92] hover:text-[#222]"
                 bgColor="bg-[#88888844]"
                 onClick = {() => {
                    if((sortBy !== "createdAt") || (sortType !== "asc")){
                        setSortBy("createdAt")
                        setSortType("asc")
                        setPage(1)
                    }
                 }}
                />
            </div>
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
    );
}
