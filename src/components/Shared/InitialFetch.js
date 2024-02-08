export default function initialFetch(setInitialFetch, funToExe, params = []) {
    setInitialFetch((prev) => {
        if (!prev) {
            funToExe(...params);
        }
        return true;
    })
}