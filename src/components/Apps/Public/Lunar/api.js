import axios from "axios";
import { API_BASE_URL } from "../../../../http/_baseURL";

export async function getMoonData(setData) {
    try {
        const response = await axios.get(`${API_BASE_URL}/lunar/`);
        setData(response.data)
    } catch (error) {
        console.error(error);
    }
}