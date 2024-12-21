import { logout as LogOut } from "../../services/userService"
import { logout } from "../../store/authSlice"
import { useDispatch } from "react-redux"
import { Button } from "../LayoutComponents/Button"
import { useNavigate } from "react-router-dom"

export function LogoutBtn () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        LogOut()
        .then((res) => {
            dispatch(logout())
            navigate('/login')
        })
    }

    return (
        <Button 
            value="Logout"
            onClick= {handleLogout}
            bgColor="bg-cyan-700"
            className="mr-2 hover:bg-opacity-70"
        />
    )
}