import { UploadFile, deleteFile, downloadFile, updateFile } from "../../../../http/Storage";
import { saveAs } from 'file-saver';
import { API_BASE_URL } from "../../../../http/_baseURL";
import axios from "axios";
import progressHandler from "../../Photo/utility/progressHandler";

export const onDelete = async (id, token, SetloadingFileItem, setFiles, notify) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) { return false; }
    SetloadingFileItem(id);
    const status = await deleteFile(token, id);
    SetloadingFileItem(null);
    if (status) {
        notify('Storage File Delete', 'file deleted successfully', 'success');
        setFiles((prev) => prev.filter((file) => file.id !== id));
    } else {
        notify('Storage File Delete', 'something went wrong, check console for details', 'danger');
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

// export async function uploadFileInChunks(file, token, setFiles, selected, setProgressList) {
//     const fileKey = (Date.now() / 1000).toFixed(0);
//     console.log(fileKey);
//     const formData = new FormData();
//     formData.append("fileKey", fileKey);
//     formData.append("filename", file.name);
//     formData.append("size", file.size);
//     formData.append("inside", selected);
//     const res = await UploadFile(token, formData, setProgressList, 0);
//     const max_chunk_size = res['max-chunk-size']  //in bytes

//     const totalChunks = Math.ceil(file.size / max_chunk_size);
//     setProgressList(new Array(totalChunks).fill(1));
//     for (let i = 0; i < totalChunks; i++) {
//         const start = i * max_chunk_size;
//         const end = Math.min(file.size, start + max_chunk_size);
//         const chunk = file.slice(start, end);
//         const chunkForm = new FormData();
//         chunkForm.append("fileKey", fileKey);
//         chunkForm.append('chunkIndex', i);
//         chunkForm.append('file', chunk);
//         UploadFile(token, chunkForm, setProgressList, i).then((fileData) => {
//             if (typeof (fileData) === 'object') {
//                 setFiles((prev) => [fileData, ...prev])
//                 setProgressList([]);
//             }
//         });
//     }
// }

export async function fileDownloader(token, storageId, filename, notify, setProgressList) {
    const response = await axios.get(`${API_BASE_URL}/storage/chunks/${storageId}/`, {
        headers: {
            'Authorization': `Token ${token}`,
        }
    });
    const blobs = {};
    const chunkIds = response.data;
    let count = 0;
    setProgressList(new Array(chunkIds.length).fill(0));
    for (let i = 0; i < chunkIds.length; i++) {
        donwloadChunk(chunkIds[i], token, setProgressList, i).then((chunk) => {
            blobs[i] = chunk;
            count++;
            if (count === chunkIds.length) {
                const orderedBlobs = []
                for (let j = 0; j < chunkIds.length; j++) {
                    orderedBlobs.push(blobs[j]);
                }
                saveAs(new Blob(orderedBlobs), filename);
                setProgressList([])
            }
        })
    }
}
async function donwloadChunk(id, token, setProgressList, index) {
    const response = await axios.get(`${API_BASE_URL}/storage/download/chunk/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
        },
        onDownloadProgress: (progressEvent) => {
            progressHandler(setProgressList, index, (progressEvent.progress * 100).toFixed(0));
        },
        responseType: 'blob',
    });
    return response.data;
}


// const initiatedTask = new Set();
// export async function fileDownloader(token, storageId, filename, setProgress, notify) {
//     if (initiatedTask.has(storageId)) {
//         notify('Storage Download', 'your file is not ready for download yet', 'danger');
//         return
//     }
//     notify('Storage Download', 'downloading will start soon when your file is ready', 'success');
//     initiatedTask.add(storageId);
//     const data = await downloadFile(token, storageId, setProgress);
//     saveAs(new Blob([data]), filename);
//     // initiatedTask.delete(storageId);
// }

export async function uploadFileInChunks(file, token, setFiles, selected, setProgressList) {
    pingForCleanUp(token);
    const formData = new FormData();
    formData.append("filename", file.name);
    formData.append("size", file.size);
    formData.append("inside", selected);
    const res = await UploadFileTest(token, formData, setProgressList, 0)
    const max_chunk_size = res['max-chunk-size']  //in bytes
    const key = res['key'];
    console.log(key);
    const totalChunks = Math.ceil(file.size / max_chunk_size);
    setProgressList(new Array(totalChunks).fill(1));
    for (let i = 0; i < totalChunks; i++) {
        const start = i * max_chunk_size;
        const end = Math.min(file.size, start + max_chunk_size);
        const chunk = file.slice(start, end);

        const chunkForm = new FormData();
        chunkForm.append("key", key);
        chunkForm.append('index', i);
        chunkForm.append('file', chunk);

        const result = await UploadFileTest(token, chunkForm, setProgressList, i);
        console.log('uploaded on server');
        pingToUploadOnGit(token, result['chunkId'], i).then((res) => {
            console.log('uploaded on git');
            if (res === totalChunks - 1) {
                pingToGetFileData(token, key).then((fileData) => {
                    setFiles((prev) => [{ ...fileData, url: URL.createObjectURL(file) }, ...prev])
                })
            }
        });
    }
}

export async function pingForCleanUp(token) {
    await axios.get(`${API_BASE_URL}/storage/cleanup/`, {
        headers: {
            'Authorization': `Token ${token}`,
        }
    });
}

export async function pingToGetFileData(token, key) {
    const response = await axios.get(`${API_BASE_URL}/storage/get/file/${key}/`, {
        headers: {
            'Authorization': `Token ${token}`,
        }
    });
    return response.data;
}

export async function pingToUploadOnGit(token, chunkId, index) {
    const response = await axios.get(`${API_BASE_URL}/storage/upload/${chunkId}/`, {
        headers: {
            'Authorization': `Token ${token}`,
        }
    });
    return index;
}
export async function UploadFileTest(token, formData, setProgressList, index) {
    console.log('UploadFileTest');
    try {
        const response = await axios.post(`${API_BASE_URL}/storage/upload/`, formData, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            onUploadProgress: (progressEvent) => {
                progressHandler(setProgressList, index, (progressEvent.progress * 100).toFixed(0));
                // setProgress((progressEvent.progress * 100).toFixed(0));
            },
        });
        if (response.status === 200) {
            return response.data
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}



export async function uploadFileInChunks1(file, token, setFiles, selected, setProgressList) {
    return new Promise((resolve, reject) => {
        const fileKey = (Date.now() / 1000).toFixed(0);
        console.log(fileKey);
        const formData = new FormData();
        formData.append("fileKey", fileKey);
        formData.append("filename", file.name);
        formData.append("size", file.size);
        formData.append("inside", selected);
        UploadFile(token, formData, setProgressList, 0).then((res) => {
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
                        setFiles((prev) => [{ ...fileData, url: URL.createObjectURL(file) }, ...prev])
                        setProgressList([]);
                        resolve();
                    }
                });
            }
        })

    })
}