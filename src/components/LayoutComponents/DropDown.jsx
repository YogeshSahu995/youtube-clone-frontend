import { useState } from "react"


export function DropDown({
    children
}){
    const [isHidden, setIsHidden] = useState(true)
    return(
        <div className="absolute right-0 flex flex-col p-1 z-auto mr-2 text-white ">
            <div onClick={() => setIsHidden(prev => !prev)} className="text-right text-xl cursor-pointer">
                {isHidden?(<i className="ri-more-2-line"></i>):(<i className="ri-close-line"></i>)}
            </div>
            <div className={`absolute -left-36 top-7 ${isHidden? "hidden" : "block"} p-2 w-[150px] rounded-lg bg-cyan-700 text-white`}>
                {children}
            </div>
        </div>
    )
}