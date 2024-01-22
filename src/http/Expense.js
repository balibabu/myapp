import axios from "axios";
import { API_BASE_URL } from "./_baseURL";

export default async function GetExpenseList(token){
    try {
        const response = await axios.get(`${API_BASE_URL}/expense/`, {
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

export async function AddExpense(token, newExpense) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/expense/`,
            {...newExpense},
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


export async function DeleteExpenseItem(token,id){
    try {
        const response=await axios.delete(`${API_BASE_URL}/expense/id/${id}/`,{
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if(response.status===204){
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
