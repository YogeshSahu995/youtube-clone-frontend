export function Popup({children, isHidden}) {
    return(
        <div className={`w-fit absolute mx-auto left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]  text-white bg-[#000000fb] rounded-xl ${isHidden? "hidden" : "block"} z-[9999]`}>
            <div className="h-full w-full grid place-items-center" >
                {children}
            </div>
        </div>
    )
}
 // agar translate property use kerte hai to fixed position parent ke according position leta hai
