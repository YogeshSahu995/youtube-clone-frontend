import { useEffect, useState } from "react"
import { Input, Button, FormStyle, Loading, Error } from "../index"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { createPlaylist, updatePlaylist } from "../../services/playlistService"
import toast from "react-hot-toast"
import { onUploadProgress } from "../../utils"

export function PlaylistForm({ playlist, playlistId }) {
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    const userData = useSelector((state) => state.data)
    const { username } = userData

    useEffect(() => {console.log(progress)}, [progress])

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            name: playlist?.name || "",
            description: playlist?.description || ""
        }
    })

    const dataSubmit = async (data) => {
        setLoading(true)

        if (playlist) {
            try {
                const response = await updatePlaylist({ playlistId, data, onUploadProgress: onUploadProgress(setProgress) });
                if (response?.data?.data) {
                    navigate(`/channel/${username}/playlists`)
                    toast.success("Successfully update a playlist")
                }
            } catch (error) {
                console.log(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        else {
            try {
                const response = await createPlaylist({ data, onUploadProgress : onUploadProgress(setProgress) })
                if(!response) return 
                if (response?.data?.data) {
                    navigate(`/channel/${username}/playlists`)
                    toast.success("Successfully created a playlist")
                }
            } catch (error) {
                console.log(error.message)
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