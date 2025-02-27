export function errorHandler(response) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(response, "text/html");
    const preTagContent = doc.querySelector("pre")?.textContent
    const errorMsg = preTagContent?.split("at file" || "")[0].trim();
    return errorMsg
}