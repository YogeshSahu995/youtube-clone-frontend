export function paginationHandler({ container, data, setPage, setEnd }) {

    function handleScroll() {
        if (!container || !data) return;

        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 1 && data.page < data.totalPages) {
            setPage((prev) => prev + 1);
        } else if (data.page === data.totalPages) {
            setEnd(true);
        }
    }

    if (container) {
        // here i set event on mainRef.current
        container.addEventListener("scroll", handleScroll);
    }

    return handleScroll
}