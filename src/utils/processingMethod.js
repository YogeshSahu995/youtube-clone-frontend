export function onUploadProgress(setProgress){
    return (progressEvent) => {
        const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
    }
}
