import { Input, FormStyle, Button, Error, Loading, ToggleButton } from "../LayoutComponents";
import { errorHandler } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { publishVideo, updateVideo } from "../../services/videoService";
import { HandelPreview } from "../Auth";
import toast from "react-hot-toast";

export function VideoForm({ videoInfo }) {
    const userData = useSelector(state => state.data);
    const navigate = useNavigate();
    const [publishStatus, setPublishStatus] = useState(videoInfo?.isPublished || true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(videoInfo?.thumbnail);

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            thumbnail: videoInfo?.thumbnail || "",
            title: videoInfo?.title || "",
            description: videoInfo?.description || "",
            isPublished: videoInfo?.isPublished || publishStatus,
        },
    });

    const dataSubmit = async (data) => {
        setError("");
        setLoading(true);
        const formData = new FormData();

        if (videoInfo) {
            if (data.thumbnail?.[0]) formData.append("thumbnail", data.thumbnail[0]);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("isPublished", publishStatus);

            try {
                const response = await updateVideo({ videoId: videoInfo._id, formData });
                if (response.data) {
                    toast(`Sucessfully video is Updated id:${videoInfo._id}`)
                    navigate(`/video/${videoInfo._id}/${userData._id}`);
                } else {
                    const errMsg = errorHandler(response);
                    setError(errMsg);
                }
            } catch (error) {
                toast(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            if (data.videoFile?.[0]) formData.append("videoFile", data.videoFile[0]);
            if (data.thumbnail?.[0]) formData.append("thumbnail", data.thumbnail[0]);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("isPublished", publishStatus);

            try {
                const response = await publishVideo(formData);
                if (response.data) {
                    toast(`Sucessfully video is uploaded`)
                    navigate(`/channel/${videoInfo.owner.username}/videos`);
                } else {
                    const errMsg = errorHandler(response);
                    setError(errMsg);
                }
            } catch (error) {
                console.error("Error:", error.message);
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <FormStyle>
            <h1 className="text-2xl font-semibold text-[#10e3ff] border-b-2 w-fit mx-auto border-[#10e3ff]">
                {videoInfo ? "Update Video" : "Create Content"}
            </h1>
            {error && <Error message={error} />}

            <form onSubmit={handleSubmit(dataSubmit)}>
                {errors.title && <Error message={errors.title.message} />}
                <Input
                    label="Title"
                    type="text"
                    placeholder="Add a title that describes your video"
                    {...register("title", { required: "Title is required" })}
                />

                {errors.description && <Error message={errors.description.message} />}
                <Input
                    label="Description"
                    type="text"
                    placeholder="Tell viewers about your video"
                    {...register("description", { required: "Description is required" })}
                />

                {errors.isPublished && <Error message="Publishing option is required" />}
                <Controller
                    name="isPublished"
                    control={control}
                    defaultValue={publishStatus}
                    render={({ field: { value, onChange } }) => (
                        <ToggleButton
                            setPublishStatus={onChange}
                            publishStatus={value}
                        />
                    )}
                />

                {errors.video && <Error message={errors.video.message} />}
                {!videoInfo && (
                    <Input
                        type="file"
                        label="Select Video"
                        accept="video/*"
                        {...register("videoFile", {
                            required: "Video is required",
                            validate: (value) => value?.[0] || "File is required",
                        })}
                    />
                )}

                {errors.thumbnail && <Error message={errors.thumbnail.message} />}
                <Input
                    type="file"
                    label="Select Thumbnail"
                    accept="image/*"
                    onInput={(e) => HandelPreview(e, setImage)}
                    {...register("thumbnail", {
                        required: "Thumbnail is required",
                        validate: (value) => value?.[0] || "File is required",
                    })}
                />
                {image && <img src={image} className="h-[250px] w-full object-cover object-center" />}

                <Button
                    type="submit"
                    value={videoInfo ? "Update Video" : "Upload Video"}
                    className="mr-2 mt-2"
                />
            </form>
        </FormStyle>
    );
}
