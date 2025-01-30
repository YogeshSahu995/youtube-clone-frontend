import { Input, FormStyle, Button, Error, Loading, Avatar, CoverImage, HandelPreview } from "../index"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/authSlice"
import { registerUser, loginUser, updateAccountdetails, updateAvatar, updateCoverImage } from "../../services/userService"
import { Link } from "react-router-dom"
import { errorHandler } from "../../utils/errorHandler"

export function Register({ userData }) {
    const [loading, setLoading] = useState(false)
    const [tempCoverImage, setTempCoverImage] = useState("")
    const [temAvatar, setTempAvatar] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

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
            setError("")
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

                if (response.data.data) {
                    const { email, password, username, fullname } = data
                    const userData = await loginUser({ email, password })
                    if (userData) {
                        dispatch(login({ email, password, username, fullname }))
                        navigate("/")
                    }
                }
                else {
                    const errMsg = errorHandler(response)
                    setError(errMsg)
                }
            } catch (error) {
                console.error(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        else {
            setError("")
            setLoading(true)
            console.log(data)
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
                console.error(error.message)
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
        <FormStyle className="md:w-[700px] relative" heading={userData ? "Customise" : "Sign up"}>
            {error && <Error message={error} />}
            {errors.avatar && (
                <Error message={errors.avatar.message} />
            )}
            {userData && (
                <Link
                    className="text-[#ffffff81] hover:text-white absolute right-4 top-8"
                    to="/edit/Change-Password"
                >
                    Change Password
                </Link>
            )}
            <form onSubmit={handleSubmit(dataSubmit)}>
                <div className={`w-full ${userData ? "inline" : "grid"} sm:grid-cols-2`}>
                    <div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter Email.."
                            outline="outline-white outline-1"
                            {...register("email", {
                                required: (userData ? false : true),
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invailed Email Address"
                                }
                            })}
                        />
                        {!userData && (
                            <Input
                                label="Username"
                                placeholder="Enter Username.."
                                outline="outline-white outline-1"
                                {...register("username", {
                                    required: false
                                })}
                            />
                        )}
                        <Input
                            label="Full Name"
                            placeholder="Enter fullname.."
                            outline="outline-white outline-1"
                            {...register("fullname", {
                                required: (userData ? false : true)
                            })}
                        />
                        {!userData && (
                            <Input
                                type="password"
                                label="Password"
                                outline="outline-white outline-1"
                                placeholder="Enter Password"
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
                            />
                        )}

                    </div>
                    <div>
                        <div className="grid md:grid-cols-2 items-center">
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
                        </div>
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
                    value={userData ? "Save Changes" : "Sign up"}
                    type="submit"
                    className="mr-2 mt-4"
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
    )
}