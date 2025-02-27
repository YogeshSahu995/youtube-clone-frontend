export function Button(
    {
        type = "button",
        value = "Button",
        className = "",
        bgColor = "bg-cyan-700",
        textColor = "text-white",
        cursor = "cursor-pointer",
        ...props
    }
) {
    return (
        <input
            type={type}
            value={value}
            className={`${className} h-fit px-4 py-2 ${cursor} effect rounded-xl border-none ${bgColor} ${textColor} text-lg`}
            {...props}
        />
    )
}