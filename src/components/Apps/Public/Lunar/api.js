import axios from "axios";
import { API_BASE_URL } from "../../../../http/_baseURL";

export async function getMoonData(setData) {
    try {
        const currentDate = new Date();
        const day = currentDate.getDate() - 1;
        const month = currentDate.getMonth();
        const response = await axios.get(`${API_BASE_URL}/lunar/${month}/${day}/`);
        setData(response.data)
    } catch (error) {
        console.error(error);
    }
}