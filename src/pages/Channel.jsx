import { useSelector } from "react-redux";
import { Channel as ChannelComponent } from "../components";
import { ChannelNav } from "../components";

export function Channel() {
    const data = useSelector(state => state.data)

    if (data?.username) {
        return <ChannelComponent username={data.username} Navbar={ChannelNav} />
    }
    else{
        return <div>Please Login</div>
    }
}