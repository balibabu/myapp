import axios from "axios";
import { API_BASE_URL, MEDIA_BASE_URL } from "../../../../http/_baseURL";
import { saveAs } from 'file-saver';
import { Confirm } from "../../../../utility/utilities";


export async function shareFile(token, storageId, setSharedByMe, shareWithUserId, anyone, notify) {
    const data = await allowFilePermission(token, storageId, shareWithUserId, anyone);
    if (data) {
        setSharedByMe((prev) => [...prev, data]);
        notify('File Shared', 'view permission granted', 'success');
    } else {
        notify('Something went wrong', 'check console for details', 'danger');
    }
}



const initiatedTask = new Set();
export async function sharedFileDownloader(token, storageId, filename, setProgress, notify) {
    if (initiatedTask.has(storageId)) {
        notify('Storage Download', 'your file is not ready for download yet', 'danger');
        return
    }
    notify('Storage Download', 'downloading will start soon when your file is ready', 'success');
    initiatedTask.add(storageId);
    const data = await downloadSharedFile(token, storageId, setProgress);
    saveAs(new Blob([data]), filename);
    initiatedTask.delete(storageId);
    setProgress(0);
}

export async function removeShare(token, sharedId, setSharedByMe, notify) {
    if (!Confirm('are you sure? you want to remove the permission')) { return }
    const status = await removeShareAPI(token, sharedId);
    if (status) {
        notify('File Permission', 'permission revoked', 'success');
        setSharedByMe((prev) => [...prev.filter((file) => file.sharedId !== sharedId)]);
    } else {
        notify('File Permission', 'failed to revoke permission', 'danger');
    }
}


export async function removeShareAPI(token, id) {
    console.log('removeShareAPI');
    try {
        const response = await axios.delete(`${API_BASE_URL}/storage/revoke/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });

        if (response.status === 204) {
            return true;
        } else {
            console.error(`Request failed with status ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}





export async function allowFilePermission(token, fileId, shareWithUserId, anyone) {
    console.log('allowFilePermission');
    try {
        const response = await axios.post(`${API_BASE_URL}/storage/share/`,
            { file: fileId, anyone, sharedWith: shareWithUserId }, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function downloadSharedFile(token, storageId, setProgress) {
    console.log('downloadSharedFile - MEDIA_BASE_URL');
    try {
        const response = await axios.get(`${MEDIA_BASE_URL}/storage/dsf/${storageId}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            onDownloadProgress: (progressEvent) => {
                setProgress((progressEvent.progress * 100).toFixed(0));
            },
            responseType: 'blob',
        });
        if (response.status === 200) {
            // saveAs(new Blob([response.data], { type: response.headers['content-type'] }), filename);
            return response.data;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

