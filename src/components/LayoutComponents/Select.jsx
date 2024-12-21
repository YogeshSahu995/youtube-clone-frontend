import { useId, forwardRef } from "react"

function Select({
    label,
    options=[],
    className ="",
    ...props
},ref){
    const id = useId()
    return(
        <div>
            {label && (<label>{label}</label>)}
            <select 
                id = {id} 
                className={`${className} text-xl text-[#ffffff7e] font-normal px-4 py-2 rounded-xl bg-[#222] outline-none`}
                ref={ref}
                {...props}
            >
                {options?.map((option) => (
                    <option 
                        value={option.value} 
                        key={option.name}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select)