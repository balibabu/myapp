import { API_BASE_URL } from "./_baseURL";
import { saveAs } from 'file-saver';
import axios from 'axios';

export async function UploadFile(formData, setProgress) {
    console.log('UploadFile');
    try {
        const response = await axios.post(`${API_BASE_URL}/utility/file/share/`, formData, {
            onUploadProgress: (progressEvent) => {
                setProgress((progressEvent.progress * 100).toFixed(0));
            },
        });
        setProgress(0);
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}


export async function downloadHandler(fileKey, setProgress) {
    if (fileKey.length > 0) {
        const response = await axios.get(`${API_BASE_URL}/utility/file/share/?key=${fileKey}`, {
            onDownloadProgress: (progressEvent) => {
                setProgress((progressEvent.progress * 100).toFixed(0));
            }, responseType: 'blob'
        });
        const filename = response.headers['content-disposition']
        setProgress(0);
        if (response.data.size === 15) {
            alert('sorry the file has been deleted');
        }else{
            saveAs(new Blob([response.data]), filename);
        }
    }
}