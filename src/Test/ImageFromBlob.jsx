import React, { useState } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../http/_baseURL';

export default function ImageFromBlob() {
    const [img, setImg] = useState();
    async function donloadImg() {
        const loadedImg = await loadImg();
        console.log(loadedImg);
        setImg(URL.createObjectURL(loadedImg));
    }
    return (
        <>
            <button onClick={donloadImg}>butto</button>
            <img src={img} alt='image' />
        </>
    )
}

async function loadImg() {
    const response = await axios.get(`${API_BASE_URL}/storage/download/5/`, {
        headers: {
            'Authorization': `Token bddc0464cff80cff8752398ee5cf1c8e9b069477`,
        },
        responseType: 'blob',
    });
    if (response.status === 200) {
        return new Blob([response.data], { type: response.headers['content-type'] });
    }
}