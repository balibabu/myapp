import axios from "axios";
import { API_BASE_URL } from "./_baseURL";

export async function getPhotos(token) {
    console.log('getPhotos');
    try {
        const response = await axios.get(`${API_BASE_URL}/photu/`, {
            headers: {
                'Authorization': `Token ${token}`,
            }
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


export async function uploadImages(formData, token, setProgress = () => { }) {
    console.log('uploadImages');
    try {
        const response = await axios.post(`${API_BASE_URL}/photu/upload/`, formData, {
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

export async function getAThumbnail(token, uname, setProgress = () => { }) {
    console.log('getAThumbnail');
    try {
        const response = await axios.get(`${API_BASE_URL}/photu/thumbnail/${uname}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            onDownloadProgress: (progressEvent) => {
                setProgress((progressEvent.progress * 100).toFixed(1));
            },
            responseType: 'blob',
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


export async function downloadImage(token, id, setProgress = () => { }) {
    console.log('downloadImage');
    try {
        const response = await axios.get(`${API_BASE_URL}/photu/download/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            onDownloadProgress: (progressEvent) => {
                setProgress((progressEvent.progress * 100).toFixed(1));
            },
            responseType: 'blob',
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

export async function pingServerAboutThumbnails(token){
    console.log('pingServerAboutThumbnails');
    const res=await axios.get(`${API_BASE_URL}/photu/thumbnails/ping/`,{
        headers: {
            'Authorization': `Token ${token}`,
        },
    })
    console.log(res.data);
}