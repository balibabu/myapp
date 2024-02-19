import React, { useState } from 'react'
import { copyToClipboard } from '../../../../utility/utilities';
import ProgressUI from './ProgressUI';
import Info from './Info';
import { UploadFile, downloadHandler } from '../../../../http/FileShare';
import ProgressButton from '../../../Shared/ProgressButton';
import Download from './Download';
import JSZip from 'jszip';
import Zipping from './Zipping';
import { Route, Routes } from 'react-router-dom';

export default function Fileshare() {
    const [history, setHistory] = useState(localStorage.getItem('shared'));
    const [file, setFile] = useState(null);
    const [fileKey, setFileKey] = useState('');
    const [genKey, setGenKey] = useState('');
    const [copy, setCopy] = useState('copy');
    const [progress, setProgress] = useState(0);

    const handleInputChange = (event) => {
        const selectedFile = event.target.files;
        setFile([...selectedFile]);
    };


    async function uploadHandler() {
        const formData = new FormData();
        const res=await Zipping(file,setProgress);
        formData.append("file", res,'compressed.zip');
        const key = await UploadFile(formData, setProgress);
        setHistory((prev) => {
            const added = prev + `;${file.length} files - ${key}`
            localStorage.setItem('shared', added);
            return added;
        })
        setGenKey(key);
        setFile(null);
    }
    const onCopy = () => {
        copyToClipboard(genKey);
        setCopy('copied');
        setTimeout(() => {
            setCopy('copy');
        }, 1000);
    }

    return (
        <>
            <div className='position-relative m-0' style={{ height: '100dvh' }}>
                <div className='col-8 position-absolute start-50 top-50 translate-middle'>
                    <ProgressButton {...{ progress: 0, titles: ['Send', 'Sending', 'Processing'], css: 'mb-3', height: '150px', bg: 'primary' }} />
                    <Download />
                </div>
            </div>
            {/* <Old {...{ file, handleInputChange, copy, progress, downloadHandler, fileKey, setProgress, setFileKey, uploadHandler, genKey, setHistory, history, onCopy }} /> */}
        </>
    )
}


function clearHistory(setHistory) {
    localStorage.setItem('shared', '')
    setHistory('');
}

function Old({ file, handleInputChange, copy, progress, downloadHandler, fileKey, setProgress, setFileKey, uploadHandler, genKey, setHistory, history, onCopy }) {
    return (
        <div className='col-md-8'>
            {progress !== 0 && <ProgressUI {...{ progress }} />}
            <div className='input-group mt-2'>
                <input type="text" className='form-control' placeholder='enter key' value={fileKey} onChange={(e) => setFileKey(e.target.value)} />
                <button className='btn btn-success' onClick={() => downloadHandler(fileKey, setProgress)}>Download</button>
            </div>
            <div className="input-group mt-2">
                <label className="form-control " htmlFor="fileshareinput">{file ? file.name : 'Select a File Here'}</label>
                <button type="button" className="btn btn-primary form-control" onClick={uploadHandler}>Share</button>
            </div>
            <input className='form-control opacity-0' style={{ height: '1px' }} type='file' id='fileshareinput' onChange={handleInputChange} multiple />
            {genKey &&
                <pre style={{ backgroundColor: "black" }} className='rounded-3 text-primary d-flex justify-content-between align-items-center ps-2'>
                    <code>
                        {genKey}
                    </code>
                    <button className='btn btn-info' onClick={onCopy}>{copy}</button>
                </pre>
            }
            <div className='text-info'>
                <div className='fs-2'>History <button className='btn btn-warning btn-sm' onClick={() => clearHistory(setHistory)}>clear</button></div>
                {history && history.split(';').slice(1).map((hist, index) => {
                    const [file, code] = hist.split('-');
                    return <div className='' key={index}>{file} - {code}</div>
                })}
            </div>
            <Info />
        </div>

    );
}
