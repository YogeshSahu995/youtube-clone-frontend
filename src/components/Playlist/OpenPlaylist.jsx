import { useEffect, useState } from "react";
import { getPlaylistById, deletePlaylist } from "../../services/playlistService";
import { Button, Loading, TimeAgo, Popup, DeleteForm, Video, ScrollDiv, Container } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export function OpenPlaylist({ playlistId }) {
    const [data, setData] = useState({})
    const [videos, setVideos] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [frontImage, setFrontImage] = useState("")
    const [videoCount, setVideoCount] = useState("")
    const [isHidden, setIsHidden] = useState(true)
    const userData = useSelector(state => state.data)
    const navigate = useNavigate()


    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                setError("")
                const response = await getPlaylistById({ playlistId })
                if (response.data.data) {
                    setData(response.data.data)
                    setVideos(response.data.data.videos)
                }
                else {
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false)
            }
        })()
    }, [playlistId])

    useEffect(() => {
        ; (async () => {
            try {
                if (videos.length > 0) {
                    setVideoCount(`${videos.length} videos`)
                    setFrontImage(videos[0].thumbnail);
                } else {
                    setVideoCount("No Videos")
                    setFrontImage("/images/no-video.jpg");
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [videos, playlistId])

    async function handleDelete() {
        try {
            const response = await deletePlaylist({ playlistId })
            if (response.data.data) {
                console.log('successfully delete playlist')
                setIsHidden(true)
                navigate(`/channel/${data.owner.username}/playlists`)
            }
            else {
                console.log('anyProblem is delete')
            }
        } catch (error) {
            console.error('Any Problem in deleting your playlist')
        }
    }

    if (loading) return <Loading />

    if (data.createdAt) {
        const { createdAt, updatedAt, description, name, owner, videos } = data
        const { username, _id, avatar, email } = owner
        const isCurrentUser = (_id == userData._id) ? true : false

        return (
            <div className="relative h-[80vh] w-full text-[#ffffff9d]">
                <DeleteForm
                    title="Delete Playlist"
                    message="Are you sure you want to delete this video? Once its deleted, you will not be able to recover it."
                    isHidden={isHidden}
                    setIsHidden={setIsHidden}
                    deleteFunction={() => handleDelete()}
                />
                <div className="grid grid-rows-custom lg:grid-cols-custom text-white gap-2">
                    <section
                        className="flex flex-col sm:flex-row lg:flex-col lg:sticky top-0 h-fit sm:h-[30vh] lg:h-[80vh] md:w-full lg:w-[310px] p-4 bg-gradient-to-b from-black lg:from-[#151515] to-[#222] rounded-lg">
                        <div
                            style={{ backgroundImage: `url(${frontImage})` }}
                            className="relative h-[180px] w-[80vw] mx-auto sm:w-[40vw] lg:w-[280px] bg-cover bg-center bg-no-repeat rounded-lg"
                        >
                            <div className="absolute bottom-0 bg-[#00000081] h-fit w-full p-2 rounded-lg">
                                <h3>{name}</h3>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className="sm:ml-2 h-fit w-full sm:w-[45vw] lg:w-full p-2 md:ml-0 mt-2">
                            <div className="flex text-[#ffffff9d]">
                                {!isCurrentUser ? (
                                    <>
                                        <h1>Own Playlist</h1>
                                    </>
                                ) : (
                                    <>
                                        <img src={avatar} alt="avatar" className=" h-[50px] w-[50px]  object-cover object-center  rounded-full mr-4" />
                                        <div>
                                            <h3>{username}</h3>
                                            <h3>{email}</h3>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-between h-fit w-full px-2 mt-2 font-light text-[#ffffff9d]">
                                <span>{videoCount}</span>

                                {createdAt !== updatedAt ?
                                    (
                                        <div>
                                            <TimeAgo timeStamp={updatedAt} />
                                        </div>
                                    ) :
                                    (
                                        <>
                                            <TimeAgo timeStamp={createdAt} />
                                        </>
                                    )
                                }
                            </div>
                            <div className="flex">
                                {!isCurrentUser ?
                                    (<div className="w-fit mx-auto mt-2">
                                        <Button
                                            value="Play"
                                            textColor="text-[#222]"
                                            bgColor="bg-[#ffffff9d]"
                                            className="px-8 font-bold hover:bg-[#fff]"
                                            onClick={() => navigate('/')} //todo
                                        />
                                    </div>) :
                                    (<div className="w-full flex justify-between mt-2">
                                        <Button
                                            value="Play"
                                            textColor="text-[#222]"
                                            bgColor="bg-[#ffffff9d]"
                                            className="px-8 font-bold hover:bg-[#fff]"
                                            onClick={() => navigate('/')} //todo
                                        />
                                        <div className="flex">
                                            <Link to={`/playlist/edit/${data._id}`} className="px-2 py-1 rounded-full border text-lg mr-2 hover:bg-[#ffffff1e]">
                                                <i className="ri-pencil-fill"></i>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setIsHidden(false)
                                                }}
                                                className="px-2 py-1 rounded-full border text-lg hover:bg-[#ffffff1e]"
                                            >
                                                <i className="ri-delete-bin-6-line"></i>
                                            </button>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    </section>
                    <section>
                        <Container>
                            <ul>
                                {videos?.map((video) => (
                                    <li key={video._id}>
                                        {video.createdAt &&
                                            <Video
                                                videoInfo={video}
                                                thumbnailSize="h-[150px] w-[80vw] sm:h-[150px] sm:w-[280px] md:h-[190px] md:w-[300px] lg:h-[170px] lg:w-[270px] xl:h-[200px] xl:w-[310px]"
                                            />
                                        }
                                    </li>
                                ))}
                            </ul>
                        </Container>
                    </section>
                </div>
            </div>
        )
    }
}