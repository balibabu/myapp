import axios from "axios";
import { API_BASE_URL } from "./_baseURL";

export async function getFolders(token) {
    console.log('getFolders')
    try {
        const response = await axios.get(`${API_BASE_URL}/storage/folder/`, {
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

export async function createFolder(token, folderInfo) {
    console.log('createFolder')
    try {
        const response = await axios.post(`${API_BASE_URL}/storage/folder/`, folderInfo, {
            headers: {
                'Authorization': `Token ${token}`,
            }
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