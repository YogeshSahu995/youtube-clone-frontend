export function Popup({children, isHidden}) {
    return(
        <div className={`absolute top-[20%] left-[40%]  text-white border-b-2 bg-[#222] rounded-xl ${isHidden? "hidden" : "block"} z-[9999]`}>
            <div className="h-full w-full grid place-items-center" >
                {children}
            </div>
        </div>
    )
}
 // agar translate property use kerte hai to fixed position parent ke according position leta hai
