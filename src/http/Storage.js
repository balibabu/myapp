import axios from "axios";
import { API_BASE_URL, MEDIA_BASE_URL } from "./_baseURL";
import progressHandler from "../components/Apps/Photo/utility/progressHandler";

export async function UploadFile(token, formData, setProgressList, index) {
    console.log('UploadFile - MEDIA_BASE_URL');
    try {
        const response = await axios.post(`${MEDIA_BASE_URL}/storage/upload/`, formData, {
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

export async function getFiles(token) {
    console.log('getFiles');
    try {
        const response = await axios.get(`${API_BASE_URL}/storage/files/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
        alert('something is not right');
        return []
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function deleteFile(token, id) {
    console.log('deleteFile');
    try {
        const response = await axios.delete(`${API_BASE_URL}/storage/delete/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (response.status === 204) {
            return true;
        }
        alert('something is not right');
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}


export async function downloadFile(token, storageId, setProgress) {
    console.log('downloadFile - MEDIA_BASE_URL');
    setProgress(5);
    try {
        const response = await axios.get(`${MEDIA_BASE_URL}/storage/download/${storageId}/`, {
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

export async function updateFile(file, token) {
    console.log('updateFile')
    try {
        const response = await axios.put(`${API_BASE_URL}/storage/file/${file.id}/`, file, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getGitIfos(token) {
    console.log('getGitIfos');
    try {
        const response = await axios.get(`${API_BASE_URL}/storage/gits/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
        alert('something is not right');
        return []
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getFilesAndFolders(token) {
    console.log('getFilesAndFolders');
    try {
        const response = await axios.get(`${API_BASE_URL}/storage/filesAndFolders/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
        alert('something is not right');
        return {}
    } catch (error) {
        console.log(error);
    }
}