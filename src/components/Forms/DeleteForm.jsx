import { Popup, Button } from "../index"

export function DeleteForm ({
    title = "Delete",
    message = "Are you sure you want to delete? Once it's deleted You will not be able to recover it.",
    isHidden,
    setIsHidden,
    deleteFunction,
}) {
    return (
        <Popup isHidden={isHidden}>
            <div className="h-fit w-[70vw] md:w-fit p-4 grid gap-4 rounded-xl bg-[#000000ea]">
                <span className="text-2xl font-semibold">
                    <i className="ri-delete-bin-6-line text-[#000000] px-2 py-2 bg-cyan-400 rounded-full mr-2 font-light"></i>
                    {title}
                </span>
                <p> {message} </p>
                <div className="w-full flex justify-between items-center">
                    <input 
                        type="button"
                        value="Cancel" 
                        className="px-4 py-2 font-semibold bg-white text-[#000] rounded-xl cursor-pointer ease-out duration-200 hover:scale-105"
                        onClick = {() => {setIsHidden(true)}}
                    />
                    <input
                        type="button"
                        value="Delete" 
                        className="px-4 py-2 font-semibold hover:scale-105 bg-cyan-400 text-[#000000] rounded-xl cursor-pointer ease-out duration-200"
                        onClick = {deleteFunction}
                    />
                </div>
            </div>          
        </Popup>
        
    )
}