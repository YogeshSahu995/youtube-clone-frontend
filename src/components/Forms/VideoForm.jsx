import { Input, FormStyle, Button, Error, Select, Loading } from "../LayoutComponents";
import { errorHandler } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { publishVideo } from "../../services/videoService";

export function VideoForm() {
    const userData = useSelector(state => state.data);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    
    const isPublished = [
        { name: "Public", value: true },
        { name: "Private", value: false },
    ];
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const dataSubmit = async (data) => {
        setError("")
        setLoading(true)
        const {username} = userData
        const formData = new FormData();
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
    };

    if(loading){
        return <Loading />
    }

    return (
        <FormStyle>
            <h1 className="text-2xl font-semibold text-cyan-700 border-b-2 w-fit mx-auto border-cyan-700">
                Create Content
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

                <Input
                    type="file"
                    label="Select Video"
                    accept="video/*"
                    {...register("videoFile", {
                        required: "Video is required",
                        validate: (value) => value?.[0] || "File is required",
                    })}
                />
                {errors.video && <Error message={errors.video.message} />}

                <Input
                    type="file"
                    label="Select Thumbnail"
                    accept="image/*"
                    {...register("thumbnail", {
                        required: "Thumbnail is required",
                        validate: (value) => value?.[0] || "File is required",
                    })}
                />
                {errors.thumbnail && <Error message={errors.thumbnail.message} />}

                <Button
                    type="submit"
                    value="Upload Video"
                    bgColor="bg-cyan-700"
                    className="mr-2 mt-2 hover:bg-opacity-70"
                />
            </form>
        </FormStyle>
    );
}

