import React, { useContext, useEffect, useState } from 'react'
import StorageContext from '../../../Contexts/StorageContext';
import SharedFile from './SharedFile';
import DownloadIcon from '../../../../images/storage/DownloadIcon';
import { sharedFileDownloader } from './CRUD';
import VariableContext from '../../../Contexts/VariableContext';
import FileItem from '../File/FileItem';

export default function SharedFiles() {
    const { sharedToMe, files, token } = useContext(StorageContext);
    const { notify } = useContext(VariableContext);
    const [sharedByMe, setSharedByMe] = useState([]);
    useEffect(() => {
        const sharedFiles = files.filter((file) => file.access !== undefined);
        setSharedByMe(sharedFiles);
        console.log(sharedToMe);
    }, [files])

    return (
        <div>
            <div className='text-success'>Shared To Me</div>
            <div className='row m-0 pt-0 mx-1'>
                {sharedToMe && sharedToMe.map((file) => <SharedFile key={file.sharedId} {...{ file, token, notify }} />)}
            </div >
            <hr />



            <div className='text-primary'>Shared By Me</div>
            <div className='row m-0 pt-0 mx-1'>
                {sharedByMe && sharedByMe.map((file) => <FileItem key={file.id} {...{ notify: () => { }, file, setCut: () => { } }} />)}
            </div >
        </div>
    )
}



