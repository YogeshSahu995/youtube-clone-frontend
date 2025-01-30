import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { getVideosByTitle } from "../../services/videoService"
import { errorHandler, paginationHandler, useDebounce } from "../../utils"
import { ChannelList, Loading2 } from "../LayoutComponents"
import { Video } from "../Video"
import { EmptyPageResponse } from "../Channel"
import { getUserChannelByName } from "../../services/userService"


export function Home() {
    const [allVideos, setAllVideos] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [end, setEnd] = useState(false)
    const [data, setData] = useState({})
    const [page, setPage] = useState(1)
    const [error, setError] = useState("")
    const [channelLoader, setChannelLoader] = useState(false)
    const [videoLoader, setVideoLoader] = useState(false)
    const { searchInput, mainRef } = useOutletContext()
    const query = useDebounce({ value: searchInput, delay: 300 })

    useEffect(() => {
        setPage(1)
    }, [query])

    useEffect(() => {
        ; (async () => {
            setVideoLoader(true)
            setError("")
            try {
                const response = await getVideosByTitle({ page, limit: "4", query })
                if (response?.data?.data?.docs) {
                    const filteredVideos = response.data.data.docs?.filter((video) => video.isPublished)
                    setData(response.data.data)
                    if (query) {
                        if (page == 1) {
                            setAllVideos(filteredVideos)
                        }
                        else {
                            setAllVideos(prev => [...prev, ...filteredVideos])
                        }
                    }
                    else {
                        if (page == 1) {
                            setAllVideos(filteredVideos)
                        }
                        else {
                            setAllVideos(prev => [...prev, ...filteredVideos])
                        }
                    }
                }
                else {
                    setError(errorHandler(response))
                }

            } catch (error) {
                setError(error.message)
            }
            finally {
                setVideoLoader(false)
            }
        })()

    }, [query, page])

    useEffect(() => {
        ; (async () => {
            setChannelLoader(true)
            setError("")
            try {
                const response = await getUserChannelByName(query)
                if (response?.data?.data) {
                    setAllUsers(response.data.data)
                }
                else {
                    setError(errorHandler(response))
                }

            } catch (error) {
                setError(error.message)
            }
            finally {
                setChannelLoader(false)
            }
        })()
    }, [query])


    useEffect(() => {
        const container = mainRef.current;
        const handleScroll = paginationHandler({ container, data, setPage, setEnd })
        return () => {
            if (container) container.removeEventListener("scroll", handleScroll);
        };
    }, [data, mainRef]);

    if (!query) {
        return (
            <div className=" h-[70vh] w-full relative">
                <div className="w-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <div className="text-center text-[#ffffff88] textShadow text-2xl font-medium ">
                        <h2 className="">Welcome to the <span className="text-cyan-500">Home Page</span> </h2>
                        <p className="text-lg font-normal">Search for a channel and videos using the search bar above to get started.</p>
                        <div className=" rounded-3xl w-fit h-fit mx-auto">
                            <img src="/images/plsSearch.png" alt="Search illustration" className="w-[400px] mx-auto mt-[10px]" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (channelLoader) {
        return <Loading2 />
    }

    return (
        <div className="text-white grid grid-rows-custom gap-2">
            <div className="order-2 ">
                {allVideos.length > 0 && (
                    <>
                        <ul>
                            {allVideos?.map((video) => {
                                return (
                                    <li key={video._id}>
                                        <Video
                                            // gridLayout="grid grid-rows lg:grid-cols-2"
                                            videoInfo={video}
                                            thumbnailSize="w-[90vw] sm:w-[50vw] md:w-[40vw] lg:w-[32vw] h-[50vw] sm:h-[30vw] md:h-[28vw] lg:h-[22vw] xl:h-[20vw] mx-auto"
                                        // adjustWidth=" min-[400px]:w-[70vw] sm:w-[80vw] md:w-auto mx-auto"
                                        />
                                    </li>
                                )
                            })
                            }
                        </ul>
                        {videoLoader && <Loading2 />}
                        {end && <p className="text-white text-center italic underline-offset-1">No More Videos</p>}
                    </>
                )}
                {allVideos.length == 0 && (
                    <EmptyPageResponse
                        isCurrentUser={true}
                        mainicon={<i className="ri-video-line text-4xl"></i>}
                        para="Please try again with a different keyword."
                        title={`No videos found for your search query "${query}"`}
                    />
                )}
            </div>
            <div className="order-1 px-2 py-4 rounded-lg h-fit border">
                {allUsers.length > 0 && (
                    <>
                        <h1 className="text-3xl text-center my-2 font-medium">Searched Channels</h1>
                        <ul>
                            {allUsers?.map((user) => {
                                return (
                                    <li key={user._id}>
                                        <ChannelList channelInfo={user} />
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )
                }
                { allUsers.length == 0 && (
                    <EmptyPageResponse
                    isCurrentUser={true}
                    mainicon={<i className="ri-group-line text-4xl"></i>}
                    para="Please try again with a different keyword."
                    title={`No channels found for your search query "${query}"`}
                />
                )
                }
            </div>
        </div>
    )
}
