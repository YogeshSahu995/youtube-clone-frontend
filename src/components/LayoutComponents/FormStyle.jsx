import { Logo } from "./Logo"

export function FormStyle({
    children,
    heading,
    borderColor = "border-slate-700",
    shadowColor = "shadow-[#111]",
    className = "",
}) {
    return (
        <div className="py-2">
            <div className={`${className} ${borderColor} ${shadowColor} h-fit bg-gradient-to-b from-[#0000008c] to-[#00000017] w-full text-center sm:w-[550px] sm:mx-auto boxShadow px-3 py-8 rounded-lg `}>
                <div className="mx-auto w-fit">
                    <Logo width="w-[100px] h-[100px]" />
                </div>
                <h1 className="text-2xl font-semibold text-cyan-500 border-b-2 w-fit mx-auto border-cyan-500">{heading}</h1>

                {children}
            </div>
        </div>
    )
}