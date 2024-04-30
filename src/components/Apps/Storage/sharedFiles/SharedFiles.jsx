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


            {/* <table>
                <tbody>
                    <tr><td><label htmlFor='startDate'>From</label></td><td><input type="date" id="startDate" value={startDate.toISOString().split('T')[0]} onChange={onDateChangeHandler} className='form-control p-0 px-1 mx-2 mt-1 bg-secondary' style={{ cursor: 'pointer' }} /></td></tr>
                    <tr><td><label htmlFor='endDate'>To</label></td><td><input type="date" id="endDate" value={endDate.toISOString().split('T')[0]} onChange={onDateChangeHandler} className='form-control p-0 px-1 mx-2 m-1 bg-secondary' style={{ cursor: 'pointer' }} /></td></tr>
                </tbody>
            </table> */}

            <div className='m-3 rounded-3 overflow-hidden'>
                <table className='table table-striped '>
                    <tbody>
                        <tr>
                            <th>SN</th>
                            <th>File</th>
                            <th>shared with</th>
                        </tr>
                        {sharedByMe && sharedByMe.map((file, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{file.title}</td>
                                <td>{file.access.map((access, i) => (<span>{access.sharedWith || 'anyone'}, </span>))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



