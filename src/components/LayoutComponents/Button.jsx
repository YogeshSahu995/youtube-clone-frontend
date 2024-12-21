export function Button(
    {
        type="button",
        value="Button",
        className="",
        bgColor = "bg-cyan-700",
        textColor = "text-white",
        ...props
    }
) {
    return (
        <input 
            type={type} 
            value={value}
            className={`${className} px-2 py-1 cursor-pointer rounded-xl border-none shadow-lg shadow-[#0000002b] ${bgColor} ${textColor} text-lg`}
            {...props}
        /> 
    )
}