import { Input, FormStyle, Button, Error, Loading, RTE, HandelPreview } from "../index";
import { errorHandler } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createATweet, updateATweet } from "../../services/tweetService";


export function PostForm ({post}) {
    const userData = useSelector(state => state.data);
    const {username} = userData
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [postImage, setPostImage] = useState(post?.image)

    const {register, handleSubmit, control, getValues, formState: {errors}} = useForm({defaultValues: {
        image: post?.image || "",
        content: post?.content || ""
    }})

    const dataSubmit = async (data) => {
        setError("")
        setLoading(true)
        const formData = new FormData();

        if(post){
            if(data.image?.[0]) formData.append("image", data?.image?.[0])
            formData.append("content", data?.content)
            try {
                const response = await updateATweet({tweetId:post._id, formData:formData})
                if (response.data.data) {
                    navigate(`/channel/${username}/posts`);
                    toast(`Successfully update a post id:${post._id}`)
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
            if (data.image?.[0]) formData.append("image", data.image[0]);
            formData.append("content", data.content)
    
            try {
                const response = await createATweet(formData);
                if (response.data.data) {
                    toast(`Successfully upload a post id:${post._id}`)
                    navigate(`/channel/${username}/posts`);
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

    if(loading) return(<Loading />)

    return(
        <FormStyle heading="Create Post">
            {error && <Error message={error} />}

            <form onSubmit={handleSubmit(dataSubmit)}>

                <Input
                    type="file"
                    label="Upload image"
                    accept="image/*"
                    onInput = {(e) => HandelPreview(e, setPostImage)}
                    {...register("image", {required: "Image is required"})}
                />
                {errors.image && <Error message={errors.image.message} />}
                {postImage && <img src={postImage} className="h-[250px] w-[300px] mx-auto object-cover object-center" />}

                <RTE 
                    control={control}
                    defaultValue = {getValues("content")}
                    label= 'Content : '
                    {...register("content", {required: "Content is required"})}
                />
                {errors.content && <Error message={errors.content.message} />}

                <Button
                    type="submit"
                    value={post? "Update Post" : "Upload Post"}
                    className="mr-2 mt-2"
                />
            </form>
        </FormStyle>
    )
}