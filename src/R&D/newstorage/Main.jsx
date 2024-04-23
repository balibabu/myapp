import axios from 'axios'
import React, { useState } from 'react'
import { MEDIA_BASE_URL } from '../../http/_baseURL';
import { saveAs } from 'file-saver';


export default function Main() {
    const [file, setFile] = useState();
    const [f1, setF1] = useState();
    const [f2, setF2] = useState();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }
    async function apitester() {
        const response2 = await axios.get(`${MEDIA_BASE_URL}/storage/test/chunks/22/`, {
            headers: {
                'Authorization': `Token b9217cb28159153c7aaff248053b65a5d74bb253`,
            }
        });
        const blobs = []
        for (const f of response2.data) {
            const chunk = await donwloadChunk(f);
            blobs.push(chunk)
        }
        const finalBlob = new Blob(blobs);
        saveAs(finalBlob,'testing.png');
    }
    
    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={apitester}>click</button>

        </div>
    )
}


async function donwloadChunk(id) {
    const response = await axios.get(`${MEDIA_BASE_URL}/storage/test/download/chunk/${id}/`, {
        headers: {
            'Authorization': `Token b9217cb28159153c7aaff248053b65a5d74bb253`,
        },
        responseType: 'blob',
    });
    return response.data;
}