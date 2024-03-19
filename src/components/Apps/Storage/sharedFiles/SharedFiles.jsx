import React, { useContext } from 'react'
import StorageContext from '../../../Contexts/StorageContext';
import SharedFile from './SharedFile';
import DownloadIcon from '../../../../images/storage/DownloadIcon';
import { removeShare, sharedFileDownloader } from './CRUD';
import { DeleteIcon } from '../../../../images/DeleteIcon';
import VariableContext from '../../../Contexts/VariableContext';

export default function SharedFiles() {
    const { sharedToMe, sharedByMe, setSharedByMe, token } = useContext(StorageContext);
    const { notify } = useContext(VariableContext);
    return (
        <div>
            <div className='text-success'>Shared To Me</div>
            <div className='row m-0 pt-0 mx-1'>
                {sharedToMe && sharedToMe.map((file) => <SharedFile key={file.sharedId} {...{ file, ActionFunction: DownloadFunction, token, notify }} />)}
            </div >
            <hr />
            <div className='text-primary'>Shared By Me</div>
            <div className='row m-0 pt-0 mx-1'>
                {sharedByMe && sharedByMe.map((file) => <SharedFile key={file.sharedId} {...{ file, ActionFunction: RevokeFunction, token, notify, setSharedByMe }} />)}
            </div >
        </div>
    )
}

function DownloadFunction({ token, file, setProgress, notify }) {
    return (
        <div className='col-1 pt-1' style={{ width: '2rem' }} onClick={() => sharedFileDownloader(token, file.id, file.title, setProgress, notify)}>
            <DownloadIcon />
        </div>
    )
}

function RevokeFunction({ token, file, setSharedByMe, notify }) {
    return (
        <div className='col-1 pt-1' style={{ width: '2rem' }} onClick={() => removeShare(token, file.sharedId, setSharedByMe, notify)}>
            <DeleteIcon />
        </div>
    )
}
