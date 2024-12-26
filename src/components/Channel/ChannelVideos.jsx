import { useState } from "react";
import { Loading2, Error, Video, Button, Loading } from "../index";
import { useOutletContext } from "react-router-dom";
import { EmptyPageResponse } from "./EmptyPageResponse";
import { GetChannelVideos } from "./GetChannelVideos";

export function ChannelVideos() {
    const {mainRef, userId, isCurrentUser} = useOutletContext()
    const [data, setData] = useState({});
    const [allVideos, setAllVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortType, setSortType] = useState("des");

    GetChannelVideos({
        setAllVideos, 
        setData,
        setEnd, 
        mainRef, 
        setLoading, 
        setError, 
        setPage, 
        sortBy, 
        sortType,
        data,
        page,
        userId
    })

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
