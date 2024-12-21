export function errorHandler(response) {
    if(response.message){
        return response.message
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(response, "text/html");
    const preTagContent = doc.querySelector("pre")?.textContent
    const errorMsg = preTagContent.split("at file" || "")[0].trim();
    return errorMsg
}