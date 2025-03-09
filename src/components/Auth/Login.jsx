import { Input, FormStyle, Button, Error } from "../index"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/authSlice"
import { loginUser, getcurrentUser } from "../../services/userService"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function Login() {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dataSubmit = async (data) => {
        const controller = new AbortController()
        const signal = controller.signal
        setLoading(true)
        try {
            const response = await loginUser(data)
            if (response?.data?.data) {
                const userData = await getcurrentUser(signal)
                if (userData) {
                    const { username, fullname, email, _id } = userData.data.data
                    dispatch(login({ username, fullname, email, _id }))
                    navigate('/')
                    toast.success("Successfully login")
                }
            }
        } catch (error) {
            console.error(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
        return () => controller.abort()
    }


    return (
        <FormStyle heading="Sign In">

            <form onSubmit={handleSubmit(dataSubmit)}>
                {errors.email && (
                    <Error message={errors.email.message} />
                )}
                <Input
                    label="Email"
                    type="email"
                    placeholder="enter your email"
                    outline="outline-none"
                    {...register("email", {
                        required: "email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invailed Email Address"
                        }
                    })}
                />
                {errors.password && (
                    <Error message={errors.password.message} />
                )}
                <Input
                    type="password"
                    label="Password"
                    outline="outline-none"
                    placeholder="enter password"
                    {...register("password", {
                        required: "password is required",
                    })}
                />

                <Button
                    value={loading ? "Loading..." : "Sign In"}
                    type="submit"
                    bgColor={loading ? "bg-cyan-900" : "bg-cyan-700"}
                    className="mr-2 mt-2"
                    cursor={loading? "cursor-wait": "cursor-pointer"}
                    disabled={loading}
                />
            </form>
            <p className="font-semibold text-blue-100 mt-2">
                Don't have an account ?
                <Link to='/register' className="text-[#10e3ff] ">
                    _Create Account_
                </Link>
            </p>

        </FormStyle>
    )
}