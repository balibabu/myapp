// non-changeable and non customizable utilities are here 

export function copyToClipboard(text) {
    // Check if the Clipboard API is supported
    if (navigator.clipboard) {
        // Use the writeText method to copy text to the clipboard
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text successfully copied to clipboard:', text);
            })
            .catch((err) => {
                console.error('Unable to copy text to clipboard:', err);
            });
    } else {
        // Fallback for browsers that do not support the Clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        console.log('Text successfully copied to clipboard:', text);
    }
}


export function Confirm(message) {
    const confirmDelete = window.confirm(message);
    if (!confirmDelete) { return false; }
    return true;
}
