export function HandelPreview (event, setTemp) {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = () => {
            setTemp(reader.result)
            // setValue(fieldName, file)
        }
        reader.readAsDataURL(file) // File ko Data URL mein convert karein
    }
}
