import axios from "axios";
import { API_BASE_URL } from "./_baseURL";

export async function GetNoteList(token) {
    console.log('GetNoteList')
    try {
        const response = await axios.get(`${API_BASE_URL}/note/`, {
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


export async function AddNote(token, note) {
    console.log('AddNote')
    try {
        const response = await axios.post(
            `${API_BASE_URL}/note/`,
            { ...note },
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

export async function UpdateNote(token, newNote) {
    console.log('UpdateNote')
    try {
        const response = await axios.put(`${API_BASE_URL}/note/id/${newNote.id}/`, {
            ...newNote
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

export async function DeleteNote(token, id) {
    console.log('DeleteNote')
    try {
        const response = await axios.delete(`${API_BASE_URL}/note/id/${id}/`, {
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


export async function GetNoteDetail(token, id) {
    console.log('GetNoteDetail')
    try {
        const response = await axios.get(`${API_BASE_URL}/note/id/${id}/`, {
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