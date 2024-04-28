import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../../../http/_baseURL';
import IntelligentSize from '../../extra/IntelligentSize';
import { downloadSharedFilePublicKey } from './CRUD';
import Multiprogress from '../../extra/Multiprogress';
import VariableContext from '../../../../Contexts/VariableContext';

export default function PublicUrlPage() {
    const { key } = useParams();
    const [file, setFile] = useState('loading');
    const [progressList, setProgressList] = useState([45, 35]);
    const [started, setStarted] = useState(false);
    const { notify } = useContext(VariableContext);

    useEffect(() => {
        getFileInfo(key, setFile);
    }, [])

    function downloadbtnHandler() {
        downloadSharedFilePublicKey(key, setProgressList, file.title);
        notify('Please Wait', 'File Downloading started')
        setStarted(true);
    }

    return (
        <div>
            {file === 'loading' ? <>Please Wait</> : <>
                {
                    file === undefined ?
                        <>File Not Found</>
                        :
                        <div style={{ color: '#ccc' }} className='p-3'>
                            <div className='fs-1'>{file.title}</div>
                            <div>size: {IntelligentSize(file.size)} [{file.size} bytes]</div>
                            <div>Owner: {file.owner}</div>
                            {started ?
                                <Multiprogress {...{ progressList, fontSize: '.7rem', css: '', height: '.8rem', h2: '.9rem', bg2: 'success' }} />
                                :
                                <button className='btn btn-primary' onClick={downloadbtnHandler}>Download</button>
                            }
                        </div>
                }
            </>}
        </div>
    )
}


async function getFileInfo(anyoneKey, setFile) {
    try {
        const res = await axios.get(`${API_BASE_URL}/storage/shared/file-info/${anyoneKey}/`);
        if (res.status === 200) {
            setFile(res.data);
        }
    } catch (error) {
        setFile();
        console.log(error);
    }
}
