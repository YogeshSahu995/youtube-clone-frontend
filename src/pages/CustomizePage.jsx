import { useState, useEffect } from "react";
import { Loading, Register } from "../components";
import { getcurrentUser } from "../services/userService";
import toast from "react-hot-toast";

export function CustomizePage() {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;
        ; (async () => {
            try {
                setLoading(true)
                const response = await getcurrentUser(signal)
                if(!response) return 
                if (response?.data?.data) {
                    setUserData(response.data.data)
                }
            } catch (error) {
                toast.error("An unexpected error occurred.");
            } finally {
                setLoading(false)
            }
        })()

        return () => controller.abort()
    }, [])

    if (loading) return <Loading />

    return <Register userData={userData} />
}