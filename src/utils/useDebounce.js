import { useEffect, useState } from 'react'


const useDebounce = ({value, delay}) => {
    const [debouncedValue, setDebouncedValue] = useState("");
    useEffect(() => {
        const search = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
    
    return () => clearTimeout(search) // clear timeout if value change before delay
    }, [value])

    return debouncedValue
}

export default useDebounce