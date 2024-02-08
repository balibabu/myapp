import axios from "axios";
import { API_BASE_URL } from "./_baseURL";


export async function GetTodoList(token) {
    console.log('GetTodoList');
    try {
        const response = await axios.get(`${API_BASE_URL}/todo/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        // return []
    }
}

export async function AddTodo(token, data) {
    console.log('AddTodo');
    try {
        const response = await axios.post(
            `${API_BASE_URL}/todo/`,
            data,
            {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            }
        );

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            console.error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function UpdateTodoItem(token, newItem) {
    console.log('UpdateTodoItem');
    try {
        const response = await axios.put(`${API_BASE_URL}/todo/id/${newItem.id}/`, {
            ...newItem
        }, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function DeleteTodoItem(token, id) {
    console.log('DeleteTodoItem');
    try {
        const response = await axios.delete(`${API_BASE_URL}/todo/id/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function getCompletedTodoLlist(token) {
    console.log('getCompletedTodoLlist');
    try {
        const response = await axios.get(`${API_BASE_URL}/todo/completed/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}