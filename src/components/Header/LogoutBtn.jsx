import { logout as LogOut } from "../../services/userService"
import { logout } from "../../store/authSlice"
import { useDispatch } from "react-redux"
import { Button } from "../LayoutComponents/Button"
import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "../LayoutComponents"
import { useState } from "react"

export function LogoutBtn ({userData}) {
    const [isHidden, setIsHidden] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        LogOut()
        .then((res) => {
            dispatch(logout())
            navigate('/login')
        })
    }

    if(userData){
        const {username, fullname, avatar} = userData

        return(
            <div className="relative flex flex-col p-1 z-auto mr-2 text-white">
                <div onClick={() => setIsHidden(prev => !prev)} className="text-right text-lg cursor-pointer">
                    <Avatar avatar={avatar} heightWidth="h-[50px] w-[50px]" />
                </div>
                <div 
                className={`absolute right-[60px] top-7 flex flex-col gap-3 ${isHidden? "hidden" : "block"} text-center p-2 w-[200px] rounded-lg bg-[#484848] text-white`}>
                    <div className="flex gap-2">
                        <Avatar avatar={avatar} heightWidth="h-[40px] w-[40px]" />
                        <div className="text-left">
                            <h3>{fullname}</h3>
                            <h4>{username}</h4>
                        </div>
                    </div>
                    <Link to={`/channel/${username}`} className="text-cyan-600  font-medium"> View your channel</Link>
                    <hr></hr>
                    <Button 
                        value="Sign Out"
                        onClick = {handleLogout}
                    />
                </div>
            </div>
        )
    }
}