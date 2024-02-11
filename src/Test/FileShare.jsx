import React, { useState } from 'react'
import axios from "axios";
import { API_BASE_URL } from '../http/_baseURL';
import { saveAs } from 'file-saver';

export default function FileShare() {
    const [file, setFile] = useState(null);
    const handleInputChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    function uploadHandler() {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        UploadFile(formData);
    }
    async function downloadHandler() {
        const response = await axios.get(`${API_BASE_URL}/user/test/?key=1707643919`, { responseType: 'blob' });
        const filename = response.headers['content-disposition']
        saveAs(new Blob([response.data]), filename);
    }

    return (
        <div>
            <input type='file' onChange={handleInputChange} />
            <button onClick={uploadHandler}>upload</button>
            <button onClick={downloadHandler}>download</button>
        </div>
    )
}


export async function UploadFile(formData) {
    console.log('UploadFile');
    try {
        const response = await axios.post(`${API_BASE_URL}/user/test/`, formData);
        if (response.status === 200) {
            console.log(response.data);
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}