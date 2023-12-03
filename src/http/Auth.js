import axios from "axios";
import { API_BASE_URL } from "../global/variables";

export async function Login(username, password) {
    const response = await axios.post(`${API_BASE_URL}/user/login/`, {
        username,
        password,
    });
    if(response.ok){
        localStorage.setItem('token', response.data.token);
        return true;
    }
    return false;
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