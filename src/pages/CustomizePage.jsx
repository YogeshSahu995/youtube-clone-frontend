import { useState, useEffect } from "react";
import { Loading, Register } from "../components";
import { getcurrentUser } from "../services/userService";

export function CustomizePage() {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                const response = await getcurrentUser()
                if (response?.data?.data) {
                    setUserData(response.data.data)
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false)
            }
        })()

    }, [])

    if (loading) return <Loading />

    return <Register userData={userData} />
}