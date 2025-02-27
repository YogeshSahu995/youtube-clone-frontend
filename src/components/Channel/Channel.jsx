import { useSelector } from "react-redux"
import { Protectedpage } from "../LayoutComponents/Protectedpage"
import { getUserChannelProfile } from "../../services/userService"
import { useEffect, useState } from "react"
import { errorHandler } from "../../utils"
import { Outlet, useOutletContext } from "react-router-dom"
import { ChannelHeader } from "./ChannelHeader"
import { Loading } from "../LayoutComponents"
import toast from "react-hot-toast"

export function Channel({ username, Navbar }) {
    const {mainRef} = useOutletContext() // get ref pass from parent
    const [profile, setProfile] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isCurrentUser, setIsCurrentUser] = useState(false)

    const handleSearchChange = (query) => {
        setSearchQuery(query)
    }

    const userData = useSelector((state) => state.data)    
    
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if(username == userData.username){
            setIsCurrentUser(true)
        }
        else{
            setIsCurrentUser(false)
        }
        
        setLoading(true)
        setError("")
        ; (async () => {
            if(username){
                try {
                    const response = await getUserChannelProfile({username, signal})
                    if (response?.data?.data) {
                        setProfile(response.data.data)
                    }
                    else {
                        toast.error(errorHandler(response));
                    }
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    setLoading(false)
                }
            }
        })()

        return () => {
            controller.abort();
        }
    },[username])
    
    if(Object.keys(profile).length > 0){
        return (
                <>
                    {loading && (<Loading />)}
                    {error && (<div>{error}</div>)}
                    {profile && (
                        <div>
                            <ChannelHeader profile={profile} isCurrentUser={isCurrentUser} />
                            <Navbar 
                                username={username} 
                                handleSearchChange={handleSearchChange} 
                                isCurrentUser={isCurrentUser}
                            />
    
                            <Outlet 
                                context={{
                                    mainRef, 
                                    userId:profile._id, 
                                    userData: profile,
                                    isCurrentUser:isCurrentUser, 
                                    searchQuery: searchQuery
                                }} 
                            />
                        </div>
                    )}
                </>
        )
    }
    else{
        (
            <Protectedpage />
        )
    }

}