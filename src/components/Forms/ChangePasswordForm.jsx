import { useForm } from "react-hook-form";
import { Button, Error as ErrorTag, FormStyle, Input } from "../LayoutComponents";
import { useState } from "react";
import { changePassword } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../utils";
import toast from "react-hot-toast";

export function ChangePasswordForm() {
    const [Error, setError] = useState("")
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const submitData = async(data) => {
        try {
            setError("")
            const {newPassword, confirmPassword, oldPassword} = data

            if(confirmPassword !== newPassword){
                toast("Please make sure your password match with confirm password")
            }

            const response = await changePassword(data)
            if(response.data.data){
                toast("Successfully changed password")
                navigate("/")
            }
            else{
                if(!Error){
                    setError(errorHandler(response.response))
                }
            }
        } 
        catch (error) {
            if(!Error){
                setError("Any Problem in changing password")
            }
        }
    }
    return(
        <FormStyle heading="Change Password">
            <form onSubmit={handleSubmit(submitData)}>
                {Error && <ErrorTag message={Error} />}
                <Input
                    label = "Current Password"
                    placeholder = "Current Password"
                    {...register("oldPassword", {
                        required: "Current Password is required"
                    })}
                />

                <Input 
                    label = "New Password"
                    placeholder = "New Password"
                    {...register("newPassword", {
                        required: "New Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                />

                <Input 
                    label = "Confirm Password"
                    placeholder = "Confirm Password"
                    {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                />

                <Button 
                    type="submit"
                    value="Change"
                />
            </form>
        </FormStyle>
    )
}