export function Popup({children, isHidden}) {
    return(
        <div className={`absolute h-full w-full bg-[#222222a7] ${isHidden? "hidden" : "block"} z-[9999]`}>
            <div className="h-full w-full grid place-items-center" >
                {children}
            </div>
        </div>
    )
}