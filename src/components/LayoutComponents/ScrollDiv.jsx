import { forwardRef } from "react"

function ScrollDiv({ children }, ref) {
    return (
        <div
            ref={ref}
            className="h-[82vh] overflow-x-hidden scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-[#171717] scroll-smooth">
            {children}
        </div>
    )
}

export default forwardRef(ScrollDiv)