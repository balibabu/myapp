import axios from "axios";
import { API_BASE_URL } from "../global/variables";

export async function UploadFile(token, formData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/storage/upload/`, formData, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (response.status === 201) {
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