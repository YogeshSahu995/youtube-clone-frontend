import { useState } from "react"
import { Input, Button, FormStyle, Loading } from "../index"
import { useForm } from "react-hook-form"
import { errorHandler } from "../../utils"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { createPlaylist, updatePlaylist } from "../../services/playlistService"

export function PlaylistForm({playlist, playlistId}){
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const userData = useSelector((state) => state.data)
    const {username} = userData
    const navigate = useNavigate()

    const {handleSubmit, register, formState: {errors}} = useForm({defaultValues: {
        name: playlist?.name || "",
        description: playlist?.description || ""
    }})

    const dataSubmit = async(data) => {
        setError("")
        setLoading(true)
        if(playlist){
            try {
                const response = await updatePlaylist({playlistId, data});
                if (response.data.data) {
                    console.log(username)
                    navigate(`/channel/${username}/playlists`)
                } else {
                    const errMsg = errorHandler(response);
                    setError(errMsg);
                }
            } catch (error) {
                console.error("Error:", error.message);
                setError("Something went wrong. Please try again.");
            }
            finally{
                setLoading(false)
            }
        }
        else{
            try {
                const response = await createPlaylist({data});
                if (response.data.data) {
                    console.log(username)
                    navigate(`/channel/${username}/playlists`)
                } else {
                    const errMsg = errorHandler(response);
                    setError(errMsg);
                }
            } catch (error) {
                console.error("Error:", error.message);
                setError("Something went wrong. Please try again.");
            }
            finally{
                setLoading(false)
            }
        }
    }

    if(loading) return <Loading />

    return(
        <FormStyle heading={playlist?"Update Playlist" : " Create Playlist"}>
            {error && <Error message={error} />}

            <form onSubmit={handleSubmit(dataSubmit)}>
                <Input
                    label="Name"
                    type="text"
                    placeholder="Give name to playlist"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.title && <Error message={errors.name.message} />}

                <Input
                    label="Description"
                    type="text"
                    placeholder="About your playlist"
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && <Error message={errors.description.message} />}

                <Button
                    type="submit"
                    value={playlist?"Update":"Create"}
                    className="mr-2 mt-2"
                />
            </form>
        </FormStyle>
    )
}