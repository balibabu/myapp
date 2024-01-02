import { UploadFile, deleteFile } from "../../../http/Storage";

export const onDelete = async (id, token, SetloadingFileItem, showToast, setFiles) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) { return false; }
    SetloadingFileItem(id);
    const status = await deleteFile(token, id);
    SetloadingFileItem(null);
    if (status) {
        showToast('file deleted successfully', 'danger');
        setFiles((prev) => prev.filter((file) => file.id !== id));
    } else {
        showToast('something went wrong', 'warning');
    }
};


export const downloader = (url, filename) => {
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.download = filename;
    var clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false
    });
    anchor.dispatchEvent(clickEvent);
};

export const directDownload = (file, username) => {
    fetch(`https://raw.githubusercontent.com/${file.github_info.repo_owner}/${file.github_info.repo_name}/main/${username}/${file.uploadedName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.originalName; // Set the desired file name
            link.click();
        })
        .catch(error => {
            console.log('Fetch error:', error);
        });
};

export async function uploadFile(formData, token, loadingFileItem, showToast, SetloadingFileItem, fileInputRef, setFiles) {
    if (loadingFileItem === 'newfile') {
        showToast('please wait while for first file to be uploaded', 'warning');
        return;
    }
    SetloadingFileItem('newfile');
    showToast('file is being uploaded in the background, please wait', 'secondary');
    const fileData = await UploadFile(token, formData);
    SetloadingFileItem(null);
    if (fileData) {
        fileInputRef.current.value = null;
        showToast('file uploaded successfully', 'success');
        setFiles((prev) => [fileData, ...prev])
    } else {
        showToast('something went wrong, check console for details', 'danger');
    }
}


