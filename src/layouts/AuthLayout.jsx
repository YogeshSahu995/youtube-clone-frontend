import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthLayout({ authentication = true, children }) {
    const authStatus = useSelector(state => state.status)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        if (authentication && authStatus) {
            navigate('/')
        }
        if (!authentication && !authStatus) {
            navigate('/login')
        }
        setLoader(false)
    }, [authStatus, authentication])

    return !loader && (
        <div>
            {children}
        </div>
    )
}