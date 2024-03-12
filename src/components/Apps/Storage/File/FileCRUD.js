import { UploadFile, deleteFile, downloadFile, updateFile } from "../../../../http/Storage";
import { saveAs } from 'file-saver';

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

export async function uploadFileInChunks(file, token, setFiles, selected, setProgressList) {
    const fileKey = (Date.now()/1000).toFixed(0);
    console.log(fileKey);
    const formData = new FormData();
    formData.append("fileKey", fileKey);
    formData.append("filename", file.name);
    formData.append("size", file.size);
    formData.append("inside", selected);
    const res = await UploadFile(token, formData, setProgressList, 0);
    const max_chunk_size = res['max-chunk-size']  //in bytes

    const totalChunks = Math.ceil(file.size / max_chunk_size);
    setProgressList(new Array(totalChunks).fill(1));
    for (let i = 0; i < totalChunks; i++) {
        const start = i * max_chunk_size;
        const end = Math.min(file.size, start + max_chunk_size);
        const chunk = file.slice(start, end);
        const chunkForm = new FormData();
        chunkForm.append("fileKey", fileKey);
        chunkForm.append('chunkIndex', i);
        chunkForm.append('file', chunk);
        UploadFile(token, chunkForm, setProgressList, i).then((fileData) => {
            if (typeof (fileData) === 'object') {
                setFiles((prev) => [fileData, ...prev])
                setProgressList([]);
            }
        });
    }
}

export async function fileDownloader(token, storageId, filename, setProgress) {
    const data = await downloadFile(token, storageId, setProgress);
    saveAs(new Blob([data]), filename);
}