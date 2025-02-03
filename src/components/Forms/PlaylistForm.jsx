import { useState } from "react"
import { Input, Button, FormStyle, Loading , Error} from "../index"
import { useForm } from "react-hook-form"
import { errorHandler } from "../../utils"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { createPlaylist, updatePlaylist } from "../../services/playlistService"
import toast from "react-hot-toast"

export function PlaylistForm({ playlist, playlistId }) {
    const userData = useSelector((state) => state.data)
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { username } = userData

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            name: playlist?.name || "",
            description: playlist?.description || ""
        }
    })

    const dataSubmit = async (data) => {
        setError("")
        setLoading(true)
        const formData = new FormData();

        if (playlist) {
            formData.append("name", data.name)
            formData.append("description", data.description)
            try {
                const response = await updatePlaylist({ playlistId, data: formData });
                if (response.data.data) {
                    navigate(`/channel/${username}/playlists`)
                    toast("Successfully update a playlist")
                } else {
                    const errMsg = errorHandler(response);
                    setError(errMsg);
                }
            } catch (error) {
                console.error("Error:", error.message);
                setError("Something went wrong. Please try again.");
            }
            finally {
                setLoading(false)
            }
        }
        else {
            try {
                formData.append("name", data.name)
                formData.append("description", data.description)

                const response = await createPlaylist({ ...formData });

                if (response.data.data) {
                    navigate(`/channel/${username}/playlists`)
                    toast("Successfully created a playlist")
                } else {
                    const errMsg = errorHandler(response);
                    setError(errMsg);
                }
            } catch (error) {
                console.error("Error:", error.message);
                setError("Something went wrong. Please try again.");
            }
            finally {
                setLoading(false)
            }
        }
    }

    if (loading) return <Loading />

    return (
        <FormStyle 
            heading={playlist ? "Update Playlist" : " Create Playlist"}
        >

            <form onSubmit={handleSubmit(dataSubmit)}>
                {errors.name?.message && <Error message={errors.name.message} />}
                <Input
                    label="Name"
                    type="text"
                    placeholder="Give name to playlist"
                    {...register("name", { required: "Name is required" })}
                />

                {errors.description?.message && <Error message={errors.description.message} />}
                <Input
                    label="Description"
                    type="text"
                    placeholder="About your playlist"
                    {...register("description", { required: "Description is required" })}
                />

                <Button
                    type="submit"
                    value={playlist ? "Update" : "Create"}
                    className="mr-2 mt-2"
                />
            </form>
        </FormStyle>
    )
}