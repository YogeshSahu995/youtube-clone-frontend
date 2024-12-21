export function Error ({message, className}) {
    return (
        <div className={`${className} italic underline mt-2 text-lg text-[#ff4a4a] px-2 rounded-lg `}>
            <i className="ri-error-warning-fill mr-2"></i>
            {message}
        </div>
    )
}