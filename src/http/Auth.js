import axios from "axios";
import { API_BASE_URL } from "./_baseURL";

export async function getUserInfo(token){
    console.log('getUserInfo');
    try {
        const response = await axios.get(`${API_BASE_URL}/user/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if(response.status===200){
            return response.data.username;
        }else{
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function Login(username, password) {
    console.log('Login');
    try {
        const response = await axios.post(`${API_BASE_URL}/user/login/`, {
            username,
            password,
        });
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            return response.data.token;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export async function Register(username, email, password) {
    console.log('Register');
    try {
        const response = await axios.post(`${API_BASE_URL}/user/register/`, {
            username: username,
            email: email,
            password: password,
        });
        if (response.data.status === 'success') {
            return true;
        } else if (response.data.status === 'error') {
            alert(response.data.message);
            return false;
        }
        console.log(response);
        return false;
    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred');
        return false;
    }
}


export async function Logout() {
    console.log('Logout');
    try {
        const response = await axios.post(`${API_BASE_URL}/user/logout/`);
        console.log(response.data);
        localStorage.removeItem('token');
    } catch (error) {
        console.error("Logout failed:", error);
    }
}