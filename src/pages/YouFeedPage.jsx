import { useSelector } from "react-redux"
import { YouMainPage } from "../components"

export function YouFeedPage(){
    const userData = useSelector(state => state.data)
    return(
        <div>
            <YouMainPage userData={userData} />
        </div>
    )
}