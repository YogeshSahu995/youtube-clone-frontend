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
                const response = await getVideosByTitle({ page, limit: "10", query })
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
                    <div className="text-center text-[#ffffff] textShadow text-xl font-medium ">
                        <h2>Welcome to the Channel Page</h2>
                        <p>Search for a channel using the search bar above to get started.</p>
                        <div className="boxShadow rounded-3xl w-fit h-fit mx-auto">
                            <img src="/images/search-illustrator.png" alt="Search illustration" className="w-[400px] mx-auto mt-[10px]" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    if(channelLoader){
        return <Loading2 />
    }

    if (allVideos) {
        return (
            <div className="text-white grid grid-rows-custom md:grid-cols-2 gap-2">
                <div>
                    <ul>
                        {allVideos?.map((video) => {
                            return (
                                <li key={video._id}>
                                    <Video
                                        gridLayout="grid grid-rows lg:grid-cols-2"
                                        videoInfo={video}
                                        thumbnailSize="w-auto h-[150px] sm:h-[30vw] md:h-[25vw] lg:h-[15vw] xl:h-[13vw] mx-auto"
                                        adjustWidth=" min-[400px]:w-[70vw] sm:w-[80vw] md:w-auto mx-auto"
                                    />
                                </li>
                            )
                        })
                        }
                    </ul>
                    {videoLoader && <Loading2 />}
                    {end && <p className="text-white text-center italic underline-offset-1">No More Videos</p>}
                </div>
                <div className="p-2 min-h-[80vh] border rounded-lg h-fit">
                    {allUsers.length > 0 && (
                        <>
                            <h1 className="text-2xl text-center my-2 font-semibold">Searched Channels</h1>
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
                </div>
            </div>
        )
    }
    else {
        return (
            <EmptyPageResponse
                isCurrentUser={true}
                mainicon={<i className="ri-video-line text-4xl"></i>}
                para="There are no videos here available. Please try to search some thing else."
                title="No videos available"
            />
        )
    }

}