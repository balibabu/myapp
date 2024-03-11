import axios from "axios";
import { API_BASE_URL } from "./_baseURL";
import progressHandler from "../components/Apps/Photo/utility/progressHandler";

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


export async function uploadImages(formData, token, setProgressList, index) {
    console.log('uploadImages');
    try {
        const response = await axios.post(`${API_BASE_URL}/photu/upload/`, formData, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            onUploadProgress: (progressEvent) => {
                progressHandler(setProgressList, index, (progressEvent.progress * 100).toFixed(1))
                // setProgress((progressEvent.progress * 100).toFixed(1));
            },
        });
        progressHandler(setProgressList, index, undefined);
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


export async function downloadImage(token, id, typ = 0, setProgress = () => { }) {
    console.log('downloadImage');
    try {
        const response = await axios.get(`${API_BASE_URL}/photu/download/${id}/${typ}/`, {
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

export async function pingServerAboutThumbnails(token) {
    console.log('pingServerAboutThumbnails');
    const res = await axios.get(`${API_BASE_URL}/photu/thumbnails/ping/`, {
        headers: {
            'Authorization': `Token ${token}`,
        },
    })
    console.log(res.data);
}

export async function deletePhotos(token, id) {
    console.log('deletePhotos');
    const res = await axios.delete(`${API_BASE_URL}/photu/delete/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
        },
    })
    if (res.status === 204) {
        return true;
    }
    console.log(res);
    return false;
}