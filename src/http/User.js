import axios from "axios";
import { API_BASE_URL } from "./_baseURL";

export async function UploadProfile(url) {
    alert('profile updated locally, implement the backend for permanent changes');
}

export async function ClipSync(token, showToast) {
    const clipboardContent = await navigator.clipboard.readText();
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
            navigator.clipboard.writeText(response.data);
            showToast('synced','success');
        } else {
            showToast('smt went wrong check console for details','success');
            console.error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}