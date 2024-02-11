import React, { useState } from 'react'
import { API_BASE_URL } from '../../../../http/_baseURL';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { copyToClipboard } from '../../../../utility/utilities';

export default function Fileshare() {
    const [file, setFile] = useState(null);
    const [fileKey, setFileKey] = useState('');
    const [genKey, setGenKey] = useState('');
    const [copy, setCopy] = useState('copy');

    const handleInputChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    async function uploadHandler() {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const key = await UploadFile(formData);
        setGenKey(key);
    }
    async function downloadHandler() {
        if (fileKey.length > 0) {
            const response = await axios.get(`${API_BASE_URL}/user/test/?key=${fileKey}`, { responseType: 'blob' });
            const filename = response.headers['content-disposition']
            saveAs(new Blob([response.data]), filename);
        }
    }
    const onCopy = () => {
        copyToClipboard(genKey);
        setCopy('copied');
        setTimeout(() => {
            setCopy('copy');
        }, 1000);
    }

    return (
        <div>
            <div className='input-group mt-2'>
                <input type="text" className='form-control' placeholder='enter key' value={fileKey} onChange={(e) => setFileKey(e.target.value)} />
                <button className='btn btn-success' onClick={downloadHandler}>Download</button>
            </div>
            <div className="input-group mt-2">
                <label className="form-control " htmlFor="fileshareinput">{file ? file.name : 'Select a File Here'}</label>
                <button type="button" className="btn btn-primary form-control" onClick={uploadHandler}>Share</button>
            </div>
            <input className='form-control opacity-0' style={{ height: '1px' }} type='file' id='fileshareinput' onChange={handleInputChange} />
            {genKey &&
                <pre style={{ backgroundColor: "black" }} className='rounded-3 text-primary d-flex justify-content-between align-items-center ps-2'>
                    <code>
                        {genKey}
                    </code>
                    <button className='btn btn-info' onClick={onCopy}>{copy}</button>
                </pre>
            }
        </div>
    )
}


export async function UploadFile(formData) {
    console.log('UploadFile');
    try {
        const response = await axios.post(`${API_BASE_URL}/user/test/`, formData);
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}