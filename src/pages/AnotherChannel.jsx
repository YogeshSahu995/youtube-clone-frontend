import { useParams } from "react-router-dom";
import { Channel } from "../components/Channel";
import { AnotherChannelNav } from "../components/Channel";

export function AnotherChannel(){
    const {username} = useParams()

    if(username){
        return <Channel username={username} Navbar={AnotherChannelNav} />
    }
}