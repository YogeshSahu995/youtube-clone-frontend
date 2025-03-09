import { Input, FormStyle, Button, Error, Loading, RTE, HandelPreview } from "../index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createATweet, updateATweet } from "../../services/tweetService";
import toast from "react-hot-toast";

export function PostForm({ post }) {
    const [loading, setLoading] = useState(false)
    const [postImage, setPostImage] = useState(post?.image)
    const navigate = useNavigate();
    const userData = useSelector(state => state.data);
    const { username } = userData

    const { register, handleSubmit, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            image: post?.image || "",
            content: post?.content || ""
        }
    })

    const dataSubmit = async (data) => {
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
                }
            } catch (error) {
                console.log(error.message)
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
                if (response?.data?.data) {
                    toast.success(`Successfully upload a post`)
                    navigate(`/channel/${username}/posts`);
                }
            } catch (error) {
                console.log(error.message)
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

                <form onSubmit={handleSubmit(dataSubmit)}>

                    {errors.image && <Error message={errors.image.message} />}
                    <Input
                        type="file"
                        label="Upload image"
                        accept="image/*"
                        onInput={(e) => HandelPreview(e, setPostImage)}
                        {...register("image", { required: "Image is required" })}
                    />
                    {postImage && <img src={postImage} alt="posted image" className="h-[250px] w-[300px] mx-auto object-cover object-center" />}

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