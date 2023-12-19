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

export async function getMessages(token,userId){
    try {
        const response=await axios.get(`${API_BASE_URL}/chat/messages/${userId}/`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        });
        if(response.status===200){
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function sendMessage(token, data) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/chat/send-message/`,
            {...data},
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

export async function getMessagesFromUniqueUser(token){
    try {
        const response=await axios.get(`${API_BASE_URL}/chat/latest-messages/`,{
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