export default function Confirm(message) {
    const confirmDelete = window.confirm(message);
    if (!confirmDelete) { return false; }
    return true;
}
