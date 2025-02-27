import { Link } from "react-router-dom"

export function EmptyPageResponse({
    isCurrentUser,
    title,
    anotherpara,
    para,
    path,
    buttonValue,
    mainicon,
    buttonicon
}) {

    if (!isCurrentUser) {
        return (
            <div className="text-[#ffffff90] text-center text-lg mt-4">
                {mainicon}
                <h3>{title}</h3>
                <p className="font-light text-base">{anotherpara}</p>
            </div>
        )
    }

    if (isCurrentUser) {
        return (
            <div className="text-[#ffffff90] text-center text-lg mt-4">
                {mainicon}
                <h3>{title}</h3>
                <p className="font-light text-base">{para}</p>
                {path && (<Link
                    to={path}
                    className="bg-[#ffffff90] w-fit p-1 rounded-lg mx-auto flex items-center gap-2 justify-center text-[#222] hover:bg-[#fff] mt-3"
                >
                    {buttonicon}
                    <span>{buttonValue}</span>
                </Link>)
                }
            </div>
        )
    }
}