export function Popup({children, isHidden}) {
    return(
        <div className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-white bg-[#22222272] ${isHidden? "hidden" : "block"} z-[9999]`}>
            <div className="h-full w-full grid place-items-center" >
                {children}
            </div>
        </div>
    )
}
