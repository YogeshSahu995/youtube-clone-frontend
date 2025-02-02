import { useForm } from "react-hook-form";
import { Button, Input, Popup } from "../LayoutComponents";
import { updateComment } from "../../services/commentService";
import toast, { Toaster } from "react-hot-toast";

export function ChangeComment({ commentId, changeForm, setChangeForm }) {
    const { register, handleSubmit } = useForm()

    const changeContent = async (data) => {
        try {
            console.log(data)
            if (data.content.trim()) {
                const response = await updateComment({ commentId, data })
                if (response.data.data) {
                    toast("Successfully change comment")
                    setChangeForm(true)
                }
                else {
                    console.error("any problem in change comment")
                }
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <Toaster />
            <Popup isHidden={changeForm}>
                <form
                    onSubmit={handleSubmit(changeContent)}
                    className="m-4 flex flex-col items-center gap-2"
                >
                    <div className="flex gap-4">
                        <h1 className="text-2xl">Change comment Content</h1>
                        <button onClick={() => setChangeForm(true)}>
                            <i className="ri-close-line text-2xl cursor-pointer"></i>
                        </button>
                    </div>
                    <Input
                        type="text"
                        placeholder="Write a new comment"
                        {...register("content", {
                            required: true,
                        })}
                    />
                    <Button type="submit" value="Change Comment" />
                </form>
            </Popup>
        </>
    )
}