import axios from "axios";
import { API_BASE_URL } from "./_baseURL";

export async function UploadProfile(url) {
    alert('profile updated locally, implement the backend for permanent changes');
}

export async function ClipSync(token) {
    let clipboardContent = 'other device doesnt support clipboard';
    try {
        clipboardContent = await navigator.clipboard.readText();
    } catch (error) {
        console.log('not supported');
    }
    try {
        const response = await axios.post(`${API_BASE_URL}/user/clip/sync/`,
            { clip: clipboardContent },
            {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            return response.status;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}