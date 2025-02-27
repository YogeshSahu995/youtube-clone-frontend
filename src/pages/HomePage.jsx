import { useEffect } from "react";
import { Home } from "../components";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getcurrentUser } from "../services/userService";

export function HomePage() {
    const dispatch = useDispatch()
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        getcurrentUser(signal)
            .then((res) => {
                if (res?.data?.data) {
                    const {
                        username,
                        fullname,
                        email,
                        _id,
                        coverImage,
                        avatar,
                        createdAt,
                        updateAt
                    } = res.data.data
                    dispatch(login({ username, fullname, email, _id, coverImage, avatar, createdAt, updateAt }))
                }
            })
        return () => controller.abort()
    }, [])
    return (
        <div>
            <Home />
        </div>
    )
}