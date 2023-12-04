import axios from "axios";
import { API_BASE_URL } from "../global/variables";

export async function Login(username, password) {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/login/`, {
            username,
            password,
        });
        if (response.status===200) {
            localStorage.setItem('token', response.data.token);
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}


export async function Logout() {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/logout/`);
        console.log(response.data);
        localStorage.removeItem('token');
    } catch (error) {
        console.error("Logout failed:", error);
    }
}