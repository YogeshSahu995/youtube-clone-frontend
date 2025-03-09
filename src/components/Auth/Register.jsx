import { Input, FormStyle, Button, Error, Loading, Avatar, CoverImage, HandelPreview } from "../index"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/authSlice"
import toast from "react-hot-toast"
import { registerUser, loginUser, updateAccountdetails, updateAvatar, updateCoverImage } from "../../services/userService"
import { Link } from "react-router-dom"

export function Register({ userData }) {
    const [loading, setLoading] = useState(false)
    const [tempCoverImage, setTempCoverImage] = useState("")
    const [temAvatar, setTempAvatar] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            avatar: userData?.avatar || "",
            coverImage: userData?.coverImage || "",
            fullname: userData?.fullname || "",
            email: userData?.email || "",
            username: userData?.username || ""
        }
    })

    const dataSubmit = async (data) => {
        if (!userData) {
            setLoading(true)
            const formData = new FormData();
            if (data.avatar?.[0]) formData.append("avatar", data.avatar[0]);
            if (data.coverImage?.[0]) formData.append("coverImage", data.coverImage[0]);
            formData.append("username", data.username);
            formData.append("fullname", data.fullname);
            formData.append("email", data.email);
            formData.append("password", data.password);

            try {
                const response = await registerUser(formData)
                if (response?.data?.data) {
                    const { email, password, username, fullname } = data
                    const userData = await loginUser({ email, password })
                    if (userData) {
                        dispatch(login({ email, password, username, fullname }))
                        navigate("/")
                        toast.success("successfully register details")
                    }
                }
            } catch (error) {
                console.error(error.response.data.message)
            }
            finally {
                setLoading(false)
            }
        }
        else {
            setLoading(true)
            try {
                if (data.fullname && data.email) {
                    await updateAccountdetails({
                        fullname: data.fullname,
                        email: data.email,
                    })
                }
                if (data?.avatar?.[0]) {
                    const formData = new FormData()
                    formData.append("avatar", data.avatar[0]);
                    if ([...formData]?.[0][1].name) {
                        await updateAvatar(formData)
                    }
                }
                if (data?.coverImage?.[0]) {
                    const formData = new FormData()
                    formData.append('coverImage', data.coverImage[0])
                    if ([...formData]?.[0][1].name) {
                        await updateCoverImage(formData)
                    }
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
                navigate(`/channel/${userData.username}`)
            }
        }
    }

    useEffect(() => {
        if (userData) {
            setTempAvatar(userData.avatar)
            setTempCoverImage(userData.coverImage)
        }
    }, [userData])


    if (loading) return <Loading />

    return (
        <>
            <FormStyle heading={userData ? "Customise" : "Sign up"}>
                {userData && (
                    <Link
                        className="text-[#ffffff81] hover:text-white absolute right-4 top-8"
                        to="/edit/Change-Password"
                    >
                        Change Password
                    </Link>
                )}
                <form onSubmit={handleSubmit(dataSubmit)}>
                    <div className={`${userData ? "inline" : "grid grid-cols-1 sm:grid-cols-2"}`}>
                        <div>
                            {errors.email && (
                                <Error message={errors.email.message} />
                            )}
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter Email.."
                                outline="outline-white outline-1"
                                {...register("email", {
                                    required: (userData ? false : "email is required"),
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invailed Email Address"
                                    }
                                })}
                            />
                            {!userData && (
                                <>
                                    {errors.username && (
                                        <Error message={errors.username.message} />
                                    )}
                                    <Input
                                        label="Username"
                                        placeholder="Enter Username.."
                                        outline="outline-white outline-1"
                                        {...register("username", {
                                            required: "username is required"
                                        })}
                                    />
                                </>
                            )}
                            {errors.fullname && (
                                <Error message={errors.fullname.message} />
                            )}
                            <Input
                                label="Full Name"
                                placeholder="Enter fullname.."
                                outline="outline-white outline-1"
                                {...register("fullname", {
                                    required: (userData ? false : "fullname is required")
                                })}
                            />
                            {!userData && (
                                <>
                                    {errors.password && (
                                        <Error message={errors.password.message} />
                                    )}
                                    <Input
                                        type="password"
                                        label="Password"
                                        outline="outline-white outline-1"
                                        placeholder="Enter Password"
                                        {...register("password", {
                                            required: "password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters",
                                            },
                                        })}
                                    />
                                </>
                            )}

                        </div>
                        <div>
                            {errors.avatar && (
                                <Error message={errors.avatar.message} />
                            )}
                            <Input
                                type="file"
                                label="Upload Avatar"
                                accept="image/*"
                                onInput={(e) => HandelPreview(e, setTempAvatar)}
                                {...register("avatar", {
                                    required: (userData ? false : "avatar is required"),
                                })}
                            />
                            <Avatar avatar={temAvatar} className="mx-auto mb-2" />
                            <Input
                                type="file"
                                label="Upload Cover-image"
                                accept="image/*"
                                onInput={(e) => HandelPreview(e, setTempCoverImage)}
                                {...register("coverImage", {
                                    required: false
                                })}
                            />
                            <CoverImage coverImage={tempCoverImage} />
                        </div>
                    </div>

                    <Button
                        value={loading? "Loading...": userData ? "Save Changes" : "Sign up"}
                        type="submit"
                        className="mr-2 mt-4"
                        cursor={loading? "cursor-wait": "cursor-pointer"}
                        disabled = {loading}
                    />
                    {!userData && (
                        <p className="font-semibold text-blue-100 mt-2">
                            you have any account ?
                            <Link to='/login' className="text-[#10e3ff] ">
                                _Login_
                            </Link>
                        </p>
                    )}
                </form>
            </FormStyle>
        </>
    )
}