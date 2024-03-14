import React, { useContext } from 'react'
import FileItem from './FileItem';
import VariableContext from '../../../Contexts/VariableContext';

export default function FileRenderer({ files, selected, setCut }) {
    const { notify } = useContext(VariableContext);
    let folderId = parseInt(selected);
    folderId = folderId ? folderId : null;
    const filterdFiles = files.filter((file) => file.inside === folderId);
    return (
        <div className='row m-0 pt-0'>
            {filterdFiles.map((file) => <FileItem key={file.id} {...{ notify, file, setCut }} />)}
        </div >
    )
}
