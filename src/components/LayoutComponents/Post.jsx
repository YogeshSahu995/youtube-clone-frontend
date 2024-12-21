import { useNavigate } from "react-router-dom"
import { TimeAgo } from "./TimeAgo"
import parser from 'html-react-parser'

export function Post({postInfo, isCurrentUser}) {
    const { content, createdAt, owner, _id, image } = postInfo
    const {avatar, username} = owner
    const navigate = useNavigate()

    const handleRoute = () => {
        if(isCurrentUser){
            navigate(`/channel/${username}`)
        }
        else{
            navigate(`/profile/${username}`)
        }
    }

    return (
        <div 
        className="border border-[#ffffff4b] p-4 my-4 rounded-xl text-white w-full sm:w-fit mx-auto flex gap-3 flex-col sm:flex-row">
            <div className="flex gap-3">
                <img src={avatar} alt="avatar" className="w-[50px] h-[50px] rounded-full"/>
                <div>
                    <div 
                    onClick={handleRoute}
                    className="flex gap-2 text-sm hover:cursor-pointer">
                        <h4>@{username}</h4>
                        <p className="text-[#ffffff89] font-light text-sm"><TimeAgo timeStamp={createdAt} /></p>
                    </div>
                    <div className="browser-css mt-1 capitalize text-lg">
                        {parser(content)}
                    </div>
                </div>
            </div>
            {image && 
            <div 
            className="h-[300px] w-full sm:w-[250px] md:w-[300px] bg-cover bg-center bg-no-repeat rounded-xl mx-auto"
            style={{backgroundImage: `url(${image})`}}
            >
            </div>
            }
        </div>
    )
}