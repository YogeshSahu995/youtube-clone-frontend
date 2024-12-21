import {formatDistanceToNow} from "date-fns"

export function TimeAgo({timeStamp}){
    return(
        <span>
            {formatDistanceToNow(new Date(timeStamp), {addSuffix: true})}
        </span>
    )
}