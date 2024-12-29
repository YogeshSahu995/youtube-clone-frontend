import {formatDistanceToNow} from "date-fns"

export function TimeAgo({timeStamp}){
    return(
        <span className="text-[#ffffff73]">
            {formatDistanceToNow(new Date(timeStamp), {addSuffix: true}).replace("about", "")}
        </span>
    )
}