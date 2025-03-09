import { useSelector } from "react-redux"
import { Protectedpage } from "../LayoutComponents/Protectedpage"
import { getUserChannelProfile } from "../../services/userService"
import { useEffect, useState } from "react"
import { Outlet, useOutletContext } from "react-router-dom"
import { ChannelHeader } from "./ChannelHeader"
import { Loading } from "../LayoutComponents"

export function Channel({ username, Navbar }) {
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const { mainRef } = useOutletContext() // get reference pass from parent

    const handleSearchChange = (query) => setSearchQuery(query)

    const userData = useSelector((state) => state.data)

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (username == userData.username) {
            setIsCurrentUser(true)
        }
        else {
            setIsCurrentUser(false)
        }

        setLoading(true)
            ; (async () => {
                if (username) {
                    try {
                        const response = await getUserChannelProfile({ username, signal })
                        if(!response) return 
                        if (response?.data?.data) {
                            setProfile(response.data.data)
                        }
                    } catch (error) {
                        console.log(error.message)
                    } finally {
                        setLoading(false)
                    }
                }
            })()

        return () => {
            controller.abort();
        }
    }, [username])

    if(loading) return <Loading />

    if (Object.keys(profile).length > 0) {
        return (
            <>
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
                                userId: profile._id,
                                userData: profile,
                                isCurrentUser: isCurrentUser,
                                searchQuery: searchQuery
                            }}
                        />
                    </div>
                )}
            </>
        )
    }
    else {
        (
            <Protectedpage />
        )
    }

}