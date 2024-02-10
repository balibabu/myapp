import axios from "axios";
import { API_BASE_URL } from "./_baseURL";
import { saveAs } from 'file-saver';

export async function UploadFile(token, formData, setProgress) {
    console.log('UploadFile');
    try {
        const response = await axios.post(`${API_BASE_URL}/storage/upload/`, formData, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            onUploadProgress: (progressEvent) => {
                setProgress((progressEvent.progress * 100).toFixed(1));
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


export async function downloadFile(token, storageId, filename, setProgress) {
    console.log('downloadFile');
    try {
        const response = await axios.get(`${API_BASE_URL}/storage/download/${storageId}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            onDownloadProgress: (progressEvent) => {
                setProgress((progressEvent.progress * 100).toFixed(1));
            },
            responseType: 'blob',
        });
        if (response.status === 200) {
            saveAs(new Blob([response.data], { type: response.headers['content-type'] }), filename);
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateFile(file,token){
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