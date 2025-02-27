export function Avatar({
    avatar,
    className = "",
    heightWidth = "h-[90px] w-[90px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] mt-4"
}) {
    if (avatar) {
        return (
            <img
                src={avatar}
                alt={`avatar`}
                className={`${className} ${heightWidth} rounded-full object-cover object-center bg-white bg-opacity-10`}
            />
        )
    }
}