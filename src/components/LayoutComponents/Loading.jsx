import { useSelector } from "react-redux"

export function Loading() {
    const status = useSelector(state => state.status)
    return (
        <div className={`${status ? `h-[50vh]` : `h-[80vh]`}  w-auto grid place-items-center`}>
            <span className="loader"></span>
        </div>
    )
}

export function Loading2() {
    return (
        <div className="w-fit mx-auto mt-2">
            <span className="loader2"></span>
        </div>
    )
}