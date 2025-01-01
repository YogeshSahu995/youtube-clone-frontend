import { Input, FormStyle, Button, Error, Select, Loading } from "../LayoutComponents";
import { errorHandler } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { publishVideo, updateVideo } from "../../services/videoService";
import { HandelPreview } from "../Auth";

export function VideoForm({videoInfo}) {
    const userData = useSelector(state => state.data);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(videoInfo?.thumbnail)
    
    const isPublished = [
        { name: "Public", value: true },
        { name: "Private", value: false },
    ];
    
    const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: {
        thumbnail: videoInfo?.thumbnail || "",
        title: videoInfo?.title || "",
        description: videoInfo?.description || "",
        isPublished: videoInfo?.isPublished || ""
    }});
    
    const dataSubmit = async (data) => {
        setError("")
        setLoading(true)
        const formData = new FormData();

        if(videoInfo){
            if(data.thumbnail?.[0]) formData.append("thumbnail", data.thumbnail[0])
            formData.append("title", data.title)
            formData.append("description", data.description)
            formData.append("isPublished", data.isPublished)

            try {
                const response = await updateVideo({videoId : videoInfo._id, formData})
                if (response.data) {
                    navigate(`/channel/${videoInfo.owner.username}/videos`);
                } 
                else {
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
            const {username} = userData
            if (data.videoFile?.[0]) formData.append("videoFile", data.videoFile[0]);
            if (data.thumbnail?.[0]) formData.append("thumbnail", data.thumbnail[0]);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("isPublished", data.isPublished);
    
            try {
                const response = await publishVideo(formData);
                if (response.data) {
                    navigate(`/channel/${username}/videos`);
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
    };

    if(loading){
        return <Loading />
    }

    return (
        <FormStyle>
            <h1 className="text-2xl font-semibold text-cyan-700 border-b-2 w-fit mx-auto border-cyan-700">
                {videoInfo?"Update Video":"Create Content"}
            </h1>
            {error && <Error message={error} />}

            <form onSubmit={handleSubmit(dataSubmit)}>
                <Input
                    label="Title"
                    type="text"
                    placeholder="Add a title that describes your video"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <Error message={errors.title.message} />}

                <Input
                    label="Description"
                    type="text"
                    placeholder="Tell viewers about your video"
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && <Error message={errors.description.message} />}

                <Select
                    options={isPublished}
                    {...register("isPublished", { required: true })}
                />
                {errors.isPublished && <Error message="Publishing option is required" />}

                {!videoInfo && (
                    <Input
                    type="file"
                    label="Select Video"
                    accept="video/*"
                    {...register("videoFile", {
                        required: "Video is required",
                        validate: (value) => value?.[0] || "File is required",
                    })}
                />)}
                {errors.video && <Error message={errors.video.message} />}

                <Input
                    type="file"
                    label="Select Thumbnail"
                    accept="image/*"
                    onInput = {(e) => HandelPreview(e, setImage)}
                    {...register("thumbnail", {
                        required: "Thumbnail is required",
                        validate: (value) => value?.[0] || "File is required",
                    })}
                />
                {errors.thumbnail && <Error message={errors.thumbnail.message} />}
                {image && <img src={image} className="h-[250px] w-full object-cover object-center" />}

                <Button
                    type={"submit"}
                    value={videoInfo? "Update Video" : "Upload Video"}
                    bgColor="bg-cyan-700"
                    className="mr-2 mt-2 hover:bg-opacity-70"
                />
            </form>
        </FormStyle>
    );
}

