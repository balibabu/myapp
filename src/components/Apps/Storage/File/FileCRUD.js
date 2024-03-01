import { UploadFile, deleteFile, updateFile } from "../../../../http/Storage";

export const onDelete = async (id, token, SetloadingFileItem, setFiles) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) { return false; }
    SetloadingFileItem(id);
    const status = await deleteFile(token, id);
    SetloadingFileItem(null);
    if (status) {
        alert('file deleted successfully', 'success');
        setFiles((prev) => prev.filter((file) => file.id !== id));
    } else {
        alert('something went wrong', 'danger');
    }
};

// https://github.com/balibabu/tester_drf/blob/main/babu/1704186896.png
export const downloader = (file, username) => {
    var anchor = document.createElement("a");
    anchor.href = `https://github.com/${file.github_info.repo_owner}/${file.github_info.repo_name}/blob/main/${username}/${file.uploadedName}`;
    anchor.target = "_blank";
    anchor.download = file.originalName;
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

export async function uploadFile(formData, token, loadingFileItem, SetloadingFileItem, setFiles, setProgress) {
    if (loadingFileItem === 'newfile') {
        return;
    }
    SetloadingFileItem('newfile');
    const fileData = await UploadFile(token, formData, setProgress);
    SetloadingFileItem(null);
    setProgress(0);
    if (fileData) {
        setFiles((prev) => [fileData, ...prev])
    } else {
    }
}

export async function updaterFile(updatableFile, token, setFiles) {
    const updatedFile = await updateFile(updatableFile, token);
    setFiles((prev) => prev.map((file) => file.id === updatedFile.id ? updatedFile : file));
}

export async function uploadFileInChunks(file, token, loadingFileItem, SetloadingFileItem, setFiles, setProgress, selected) {
    SetloadingFileItem('newfile');
    const formData = new FormData();
    formData.append("fileKey", 1);
    formData.append("filename", file.name);
    formData.append("size", file.size);
    formData.append("inside", selected);
    const res = await UploadFile(token, formData, setProgress);
    const max_chunk_size = res['max-chunk-size']  //in bytes

    const totalChunks = Math.ceil(file.size / max_chunk_size);
    for (let i = 0; i < totalChunks; i++) {
        const start = i * max_chunk_size;
        const end = Math.min(file.size, start + max_chunk_size);
        const chunk = file.slice(start, end);
        const chunkForm = new FormData();
        chunkForm.append("fileKey", 1);
        chunkForm.append('chunkIndex', i);
        chunkForm.append('file', chunk);
        UploadFile(token, chunkForm, setProgress).then((fileData) => {
            if (typeof (fileData) === 'object') {
                setFiles((prev) => [fileData, ...prev])
                SetloadingFileItem(null);
            }
        });
    }
}