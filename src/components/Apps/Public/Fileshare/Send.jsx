import React, { useState } from 'react'
import Progress from '../../../Shared/Progress';
import Zipping from './Zipping';
import { UploadFile } from '../../../../http/FileShare';

export default function Send({ setWork, setFileShareSendProgress, setHistory }) {
    const [zipping, setZipping] = useState(0);
    const [files, setFiles] = useState([]);

    async function sendHandler() {
        const formData = new FormData();
        const res = await Zipping(files, setZipping);
        formData.append("file", res, 'compressed.zip');
        const key = await UploadFile(formData, setFileShareSendProgress);
        setHistory((prev) => {
            const added = prev + `;${files.length} files - ${key}`
            localStorage.setItem('shared', added);
            return added;
        })
        setWork((prev) => [false, prev[1]])
    }

    return (
        <div className='mt-4 z-3'>
            <div className="d-flex justify-content-center">
                <div className='col-lg-4 col-8'>
                    {zipping !== 0 ?
                        <div className='col-12'>
                            <Progress {...{ title: 'compressing', progress: zipping, height: '2rem', bg: 'warning', css: 'fs-6' }} />
                        </div> :
                        <div className='input-group'>
                            <input type="file" className="form-control" multiple onChange={(e) => setFiles(e.target.files)} />
                            {files.length > 0? <button className="btn btn-primary" onClick={sendHandler}>Proceed</button>:<button className='btn btn-info' onClick={()=>setWork((prev) => [false, prev[1]])}>cancel</button>}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
