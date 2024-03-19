import React from 'react'
import Folder from './Folder'
import { useEffect } from 'react'
import SharedFolder from '../sharedFiles/SharedFolder';

export default function FolderRenderer({ folders, selected, setCut }) {
    let folderId = parseInt(selected);
    folderId = folderId ? folderId : null;
    const filterdFolders = folders.filter((folder) => folder.inside === folderId);

    return (
        <div className='row m-0 px-1'>
            {folderId === null && <SharedFolder {...{ title: 'Shared', stroke: 'lime' }} />}
            {filterdFolders.map((folder) => {
                return <Folder key={folder.id} {...{ folder, setCut }} />
            })}
        </div>
    )
}
