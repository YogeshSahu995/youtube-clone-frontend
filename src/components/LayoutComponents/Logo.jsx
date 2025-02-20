
export function Logo (
    {
        height = "h-[80px]",
        width = "w-[80px]"
    }
) {
    return (
        <img 
            src="/images/logo4.png" 
            alt="Logo"
            className={`${height} ${width} object-cover object-center`}
        />
    )
}