import axios from "axios";
import { API_BASE_URL } from "../global/variables";


export async function GetTodoList(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/todo/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
       if(response.status===200){
        return response.data;
       }
    } catch (error) {
        console.log(error);
    }
}

export async function AddTodo(token, title) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/todo/`,
            { title: title },
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