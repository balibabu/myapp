import axios from "axios";
import { API_BASE_URL } from "../global/variables";

export async function getUserList(token){
    try {
        const response=await axios.get(`${API_BASE_URL}/chat/users/`,{
            headers:{
                'Authorization':`Token ${token}`,
            },
        });
        if(response.status===200){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}