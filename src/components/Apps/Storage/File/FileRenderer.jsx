import React from 'react'
import FileItem from './FileItem';

export default function FileRenderer({ files, selected,setCut }) {
    let folderId = parseInt(selected);
    folderId = folderId ? folderId : null;
    const filterdFiles = files.filter((file) => file.inside === folderId);
    return (
        <div className='row m-0 pt-0'>
            {filterdFiles.map((file) => <FileItem key={file.id} file={file} setCut={setCut}/>)}
        </div >
    )
}
