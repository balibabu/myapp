import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { downloadFile } from '../../../../http/Storage';
import AuthContext from '../../../Contexts/AuthContext';
import StorageContext from '../../../Contexts/StorageContext';
import IntelligentSize from '../extra/IntelligentSize';
import Progress from '../../../Shared/Progress';
import blobTypeForIframe from './fileTypes';
import convertUtcToLocal from '../../../../utility/AutoLocalTime';
import { saveAs } from 'file-saver';


export default function OpenFile() {
    const [progress, setProgress] = useState();
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const { files, setFiles } = useContext(StorageContext);
    const [file, setFile] = useState({});

    useEffect(() => {
        const foundFile = files.find((file) => file.id === parseInt(id));
        setFile(foundFile);
    }, [])


    async function proceed() {
        setProgress(0.1);
        const data = await downloadFile(token, id, setProgress);
        const typ = blobTypeForIframe(file.title);
        if (typ === undefined) {
            saveAs(new Blob([data]), file.title);
            return;
        }
        const blob = new Blob([data], { type: typ })
        const url = URL.createObjectURL(blob);
        setFile((prev) => {
            const updatedFile = { ...prev, url };
            setFiles((prev) => prev.map((file) => file.id === updatedFile.id ? updatedFile : file));
            return updatedFile;
        });
    }

    return (
        <>
            {file.url ?
                <div style={{ height: '100dvh' }}>
                    <iframe src={file.url} title={file.title} width='99%' height='99%'></iframe>
                </div>
                :
                <>
                    <div className='text-center'>
                        <div className='text-white'>
                            <div>{file.title}</div>
                            <div>uploaded on: {convertUtcToLocal(file.timestamp)}</div>
                            <div>Size : {IntelligentSize(file.size)}</div>
                        </div>
                        {progress ?
                            <>
                                <Progress {...{ title: 'please wait while your file is being ready', progress, height: '3rem', css: 'mx-4' }} />
                            </>
                            :
                            <>
                                <button className='btn btn-primary px-5' onClick={proceed}>open</button>
                            </>
                        }
                    </div>
                </>
            }
        </>
    )
}
