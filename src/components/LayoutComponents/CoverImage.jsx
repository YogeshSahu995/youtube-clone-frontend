export function CoverImage({
    coverImage,
    heightWidth = "h-[130px] md:h-[150px] lg:h-[170px] xl:h-[180px] 2xl:h-[200px]"
}){
    if(coverImage){
        return (
            <div
                className={`${heightWidth} rounded-xl bg-cover bg-center bg-no-repeat bg-white bg-opacity-10`}
                style={{ backgroundImage: `url(${coverImage})`}}
            >
            </div>
        )
    }
}