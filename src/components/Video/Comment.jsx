import { Avatar, TimeAgo } from "../LayoutComponents"

export function Comment({comment}){
    const {owner, content, createdAt, updatedAt, _id} = comment

    if(owner){
        const {fullname, avatar, username} = owner
        return(
            <div className="border-b p-2 font-light">
                <div className="flex gap-2">
                    <Avatar avatar={avatar} heightWidth="h-[50px] w-[50px]" />
                    <div>
                        <div className="flex gap-4 text-base">
                            <h3>{fullname}</h3> 
                            <TimeAgo timeStamp={createdAt} />
                        </div>
                        <h4 className="text-sm text-[#ffffff8f]">{username}</h4>
                    </div>
                </div>
                <div className="mt-2 px-2">
                    {content}
                </div>
            </div>
        )
    }
}