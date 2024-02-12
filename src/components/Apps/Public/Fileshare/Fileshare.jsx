import React, { useState } from 'react'
import { API_BASE_URL } from '../../../../http/_baseURL';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { copyToClipboard } from '../../../../utility/utilities';
import ProgressUI from './ProgressUI';
import Info from './Info';

export default function Fileshare() {
    const [file, setFile] = useState(null);
    const [fileKey, setFileKey] = useState('');
    const [genKey, setGenKey] = useState('');
    const [copy, setCopy] = useState('copy');
    const [progress, setProgress] = useState(0);

    const handleInputChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    async function uploadHandler() {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const key = await UploadFile(formData, setProgress);
        setGenKey(key);
    }
    async function downloadHandler() {
        if (fileKey.length > 0) {
            const response = await axios.get(`${API_BASE_URL}/user/test/?key=${fileKey}`, {
                onDownloadProgress: (progressEvent) => {
                    setProgress((progressEvent.progress * 100).toFixed(1));
                }, responseType: 'blob'
            });
            const filename = response.headers['content-disposition']
            setProgress(0);
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
            {progress !== 0 && <ProgressUI {...{ progress }} />}
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
            <Info />
        </div>
    )
}


export async function UploadFile(formData, setProgress) {
    console.log('UploadFile');
    try {
        const response = await axios.post(`${API_BASE_URL}/user/test/`, formData, {
            onUploadProgress: (progressEvent) => {
                setProgress((progressEvent.progress * 100).toFixed(1));
            },
        });
        setProgress(0);
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}