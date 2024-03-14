import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { downloadFile } from '../../../../http/Storage';
import AuthContext from '../../../Contexts/AuthContext';
import StorageContext from '../../../Contexts/StorageContext';
import IntelligentSize from '../extra/IntelligentSize';
import Progress from '../../../Shared/Progress';
import blobTypeForIframe from './fileTypes';
import convertUtcToLocal from '../../../../utility/AutoLocalTime';


export default function OpenFile() {
    const [fileUrl, setFileUrl] = useState('');
    const [progress, setProgress] = useState();
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const { files } = useContext(StorageContext);
    const foundFile = files.find((file) => file.id === parseInt(id));

    async function proceed() {
        const data = await downloadFile(token, id, setProgress);
        const typ = blobTypeForIframe(foundFile.title);
        const blob = new Blob([data], { type: typ })
        const url = URL.createObjectURL(blob);
        setFileUrl(url);
    }

    return (
        <>
            {fileUrl.length > 0 ?
                <div style={{ height: '100dvh' }}>
                    <iframe src={fileUrl} title={foundFile.title} width='99%' height='99%'></iframe>
                </div>
                :
                <>
                    <div className='text-center'>
                        <div className='text-white'>
                            <div>{foundFile.title}</div>
                            <div>uploaded on: {convertUtcToLocal(foundFile.timestamp)}</div>
                            <div>Size : {IntelligentSize(foundFile.size)}</div>
                        </div>
                        {progress ?
                            <>
                                <div className='px-5'>
                                    <Progress {...{ title: 'please wait while your file is being ready', progress, height: '3rem', css: 'mx-5' }} />
                                </div>
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
