import { useState, useEffect } from "react";
import { Loading, Register } from "../components";
import { getcurrentUser } from "../services/userService";

export function CustomizePage () {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [userData, setUserData] = useState({})

    useEffect(() => {
        ;(async() => {
            try {
                setLoading(true)
                setError("")
                const response = await getcurrentUser()
                if(response.data.data){
                    setUserData(response.data.data)
                }
                else{
                    setError(errorHandler(response));
                }
            } catch (error) {
                setError("An unexpected error occurred.");
            } finally{
                setLoading(false)
            }
        })()
    },[])

    if(loading) return <Loading />
    
    return <Register userData = {userData} />
}