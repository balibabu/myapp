import axios from "axios";
import { API_BASE_URL } from "./_baseURL";

export async function getBlogs() {
    try {
        const response = await axios.get(`${API_BASE_URL}/blog/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export async function createBlog(token, data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/blog/create/`, data, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export async function deleteBlog(token, id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/blog/delete/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function readBlog(token, id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/blog/read/${id}`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateBlog(token, id, data) {
    try {
        const response = await axios.put(`${API_BASE_URL}/blog/update/${id}/`, data, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}