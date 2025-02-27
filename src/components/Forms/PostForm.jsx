import { Input, FormStyle, Button, Error, Loading, RTE, HandelPreview } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createATweet, updateATweet } from "../../services/tweetService";
import toast, { Toaster } from "react-hot-toast";
import { errorHandler } from "../../utils";

export function PostForm({ post }) {
    const userData = useSelector(state => state.data);
    const { username } = userData
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [postImage, setPostImage] = useState(post?.image)

    const { register, handleSubmit, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            image: post?.image || "",
            content: post?.content || ""
        }
    })

    const dataSubmit = async (data) => {
        setError("")
        setLoading(true)
        const formData = new FormData();

        if (post) {
            if (data.image?.[0]) formData.append("image", data?.image?.[0])
            formData.append("content", data?.content)
            try {
                const response = await updateATweet({ tweetId: post._id, formData })
                if (response?.data?.data) {
                    navigate(`/channel/${username}/posts`);
                    toast.success(`Successfully update a post id:${post._id}`)
                } else {
                    toast.error(errorHandler(response))
                }
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        else {
            if (data.image?.[0]) formData.append("image", data.image[0]);
            formData.append("content", data.content)

            try {
                const response = await createATweet(formData);
                console.log(response)
                console.log(errorHandler(response))
                if (response?.data?.data) {
                    toast.success(`Successfully upload a post`)
                    navigate(`/channel/${username}/posts`);
                } else {
                    toast.error(errorHandler(response));
                }
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setLoading(false)
            }
        }
    };

    if (loading) return (<Loading />)

    return (
    <>
        <FormStyle heading={post ? "Update Post" : "Create Post"}>
            {error && <Error message={error} />}

            <form onSubmit={handleSubmit(dataSubmit)}>

                {errors.image && <Error message={errors.image.message} />}
                <Input
                    type="file"
                    label="Upload image"
                    accept="image/*"
                    onInput={(e) => HandelPreview(e, setPostImage)}
                    {...register("image", { required: "Image is required" })}
                />
                {postImage && <img src={postImage} className="h-[250px] w-[300px] mx-auto object-cover object-center" />}

                {errors.content && <Error message={errors.content.message} />}
                <RTE
                    control={control}
                    defaultValue={post ? post.content : getValues("content")}
                    label='Content : '
                    {...register("content", { required: "Content is required" })}
                />

                <Button
                    type="submit"
                    value={post ? "Update Post" : "Upload Post"}
                    className="mr-2 mt-2"
                />
            </form>
        </FormStyle>
    </>
    )
}