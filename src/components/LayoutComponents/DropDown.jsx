import { useState } from "react"


export function DropDown({children}){
    const [isHidden, setIsHidden] = useState(true)
    return(
        <div className="flex flex-col p-1 z-auto mr-2 text-white ">
            <div onClick={() => setIsHidden(prev => !prev)} className="text-right text-lg">
                {isHidden?(<i className="ri-more-2-line"></i>):(<i className="ri-close-line"></i>)}
            </div>
            <div className={`${isHidden? "hidden" : "block"} p-2 w-[150px] rounded-lg bg-[#c0c0c0] text-black`}>
                {children}
            </div>
        </div>
    )
}