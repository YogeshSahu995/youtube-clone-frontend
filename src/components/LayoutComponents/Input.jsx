import {useId, forwardRef} from 'react'

function Input (
    {
        type = "text", 
        outline = "outline-1 outline-blue-400",
        width = "min-w-full",
        className = "",
        label, 
        ...props
    },
    ref)
    {
    const id = useId()
    return (
        <div className='px-2 py-3 flex flex-col text-lg text-blue-100'>
            {label && (<label className="mr-2" htmlFor={id}>{label}</label>)}
            <input 
             type={type}
             id={id}
             ref={ref}
             className={`${className} ${width} px-2 bg-opacity-10 bg-white rounded-lg p-1 sm:text-lg ${outline}`}
             {...props} 
            />
        </div>
    )
}

export default forwardRef(Input)