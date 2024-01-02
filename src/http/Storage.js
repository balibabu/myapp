import axios from "axios";
import { API_BASE_URL } from "../global/variables";
import { saveAs } from 'file-saver';

export async function UploadFile(token, formData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/storage/upload/`, formData, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (response.status === 200) {
            console.log(response);
            return response.data
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getFiles(token){
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


export async function deleteFile(token,id){
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


export async function downloadFile1(token, storageId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/storage/download/${storageId}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            responseType: 'blob',  // Set the response type to 'blob'
        });

        if (response.status === 200) {
            // Create a Blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element and simulate a click to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = response.headers['content-disposition'].split('=')[1];  // Extract filename
            document.body.appendChild(link);
            link.click();

            // Cleanup: remove the link and revoke the Blob URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function downloadFile(token, storageId, filename) {
    try {
        const response = await axios.get(`${API_BASE_URL}/storage/download/${storageId}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            responseType: 'blob',
        });

        if (response.status === 200) {
            // Save the Blob to a file using FileSaver.js
            saveAs(new Blob([response.data], { type: response.headers['content-type'] }), filename);

            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getGitIfos(token){
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