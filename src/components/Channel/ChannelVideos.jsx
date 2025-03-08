import { useState } from "react";
import { Video } from "../Video";
import { Button, Loading2, Error } from "../LayoutComponents";
import { useOutletContext } from "react-router-dom";
import { EmptyPageResponse } from "./EmptyPageResponse";
import { GetChannelVideos } from "./GetChannelVideos";

export function ChannelVideos() {
    const [data, setData] = useState({});
    const [allVideos, setAllVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortType, setSortType] = useState("des");
    const { mainRef, userId, isCurrentUser } = useOutletContext()

    GetChannelVideos({
        setAllVideos,
        setData,
        setEnd,
        mainRef,
        setLoading,
        setPage,
        sortBy,
        sortType,
        data,
        page,
        userId
    })

    if (allVideos.length === 0) {
        return (
            <div className="w-fit mx-auto">
                <EmptyPageResponse
                    isCurrentUser={isCurrentUser}
                    title="No Videos Uploaded"
                    anotherpara="This Channel does not have any content"
                    para="This channel has yet to upload a video"
                    path="/add-video"
                    buttonValue="Add Video"
                    buttonicon={<i className="ri-video-add-fill text-2xl"></i>}
                    mainicon={
                        <img
                            src={'/images/NoContent.png'}
                            alt="no content"
                            className="h-fit w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] object-cover object-center mx-auto"
                        />
                    }
                />
            </div>
        )
    }

    return (
        <div className="px-4">
            <div>
                <Button
                    value="Latest"
                    bgColor="bg-[#0000009c]"
                    className="mr-3 mt-2"
                    onClick={() => {
                        if ((sortBy !== "createdAt") || (sortType !== "des")) {
                            setSortBy("createdAt")
                            setSortType("des")
                            setPage(1)
                        }
                    }}
                />
                <Button
                    value="Popular"
                    bgColor="bg-[#0000009c]"
                    className="mr-3 mt-2"
                    onClick={() => {
                        if ((sortBy !== "likes") || (sortType !== "des")) {
                            setSortBy("likes")
                            setSortType("des")
                            setPage(1)
                        }
                    }}
                />
                <Button
                    value="Oldest"
                    bgColor="bg-[#0000009c]"
                    className="mr-3 mt-2 "
                    onClick={() => {
                        if ((sortBy !== "createdAt") || (sortType !== "asc")) {
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
        </div>
    );
}
