import { useEffect, useState } from "react";
import { getChannelVideos } from "../../services/videoService";
import { errorHandler, paginationHandler } from "../../utils";
import { useOutletContext, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { VideoLi } from "./VideoLi";
import { EmptyPageResponse } from "../Channel";
import toast from "react-hot-toast";
import { Loading } from "../LayoutComponents";

export function Dashboard() {
    const userData = useSelector((state) => state.data)
    const { mainRef } = useOutletContext()
    const [data, setData] = useState({});
    const [allVideos, setAllVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("views");
    const [sortType, setSortType] = useState("des");

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        ; (async () => {
            try {
                setLoading(true);
                setError("");
                const response = await getChannelVideos({ page, query: userData._id, limit: "10", sortBy, sortType, signal });
                if(!response) return 
                if (response?.data?.data) {
                    const data = response.data.data
                    setAllVideos((prev) => [...prev, ...data.docs]);
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
    }, [page, sortBy, sortType]);

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

    if(loading) return <Loading />

    return (
        <div>
            <h1 className="text-4xl text-left text-white font-semibold mx-2">Welcome Back, <span className="text-cyan-500">{userData.fullname}</span></h1>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-left text-[#ffffffb1] my-8 mx-2">Channel Content</h2>
                <Link to={`/edit/Change-Password`} className="cursor-pointer text-cyan-500"> Change Password</Link>
            </div>
            <div className="text-center overflow-x-auto scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent scroll-smooth">
                <ul>
                    <li>
                        <div className="min-w-[900px] w-full text-white flex flex-start items-center gap-2 mx-2 px-2 mb-6 py-2 border-b bg-[#ffffff25]" >
                            <div className="w-[12%]">
                                Visibility
                            </div>
                            <div className="w-[42%]">
                                video
                            </div>
                            <div className="w-[12%]">
                                Upload on
                            </div>
                            <div className="w-[12%]">
                                views
                            </div>
                            <div className="w-[12%]">
                                likes
                            </div>
                            <div className="w-[12%]">
                                comments
                            </div>
                        </div>
                    </li>
                    {allVideos?.map((video) => {
                        return (
                            <li key={video._id}>
                                <VideoLi video={video} />
                            </li>
                        )
                    })}
                </ul>
                {allVideos.length == 0 && (
                    <div className="mx-auto w-fit mb-8">
                        <EmptyPageResponse
                            isCurrentUser={true}
                            title="No Content available"
                            para="YOu don't upload any video"
                            path="/add-video"
                            buttonValue="upload Video"
                            buttonicon={<i className="ri-video-add-fill text-2xl"></i>}
                            mainicon={<img src={'/images/NoContent.svg'} alt="no content" />}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}