import { Popup, Button } from "../index"

export function DeleteForm ({
    title = "Delete",
    message = "Are you sure you want to delete? Once it's deleted You will not be able to recover it.",
    isHidden,
    setIsHidden,
    setIsDelete,
    deleteFunction,
}) {
    return (
        <Popup isHidden={isHidden}>
            <div className="h-fit w-fit p-4 border grid gap-4 rounded-xl bg-[#222]">
                <span className="text-2xl font-semibold">
                    <i className="ri-delete-bin-6-line text-red-500 px-2 py-2 bg-red-300 rounded-full mr-2 font-light"></i>
                    {title}
                </span>
                <p> {message} </p>
                <div className="w-full flex justify-between items-center">
                    <Button 
                        value="Cancel" 
                        bgColor="bg-[#ffffff9d]"
                        textColor="text-[#222]"
                        className="px-4 py-2 font-semibold hover:text-black hover:bg-white"
                        onClick = {() => {setIsHidden(true)}}
                    />
                    <Button
                        value="Delete" 
                        bgColor="bg-red-400"
                        textColor="text-[#ffffff9d]"
                        className="px-4 py-2 font-semibold hover:text-red-600 hover:bg-red-200"
                        onClick = {deleteFunction}
                    />
                </div>
            </div>          
        </Popup>
        
    )
}