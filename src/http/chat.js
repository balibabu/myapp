import axios from "axios";
import { API_BASE_URL } from "../global/variables";

// chat/ users/ [name='user-list']
// chat/ send-message/<int:userid>/ [name='send-message']
// chat/ conversations/ [name='latest_messages']
// chat/ conversations/<int:userid>/ [name='get_all_msg_with_user_x']
// chat/ greet/ [name='greet']


export async function getConversationsList(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/chat/conversations/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export async function getUserList(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/chat/users/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export async function getMessages(token, userId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/chat/conversations/${userId}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function sendMessage(token, content, receiverid) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/chat/send-message/${receiverid}/`,
            { content:content },
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



export async function getLatestMessages(token,last_msgid,userid){
    try {
        const response = await axios.get(`${API_BASE_URL}/chat/new-msg/${last_msgid}/${userid}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export async function getMessagesFromUniqueUser(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/chat/latest-messages/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}