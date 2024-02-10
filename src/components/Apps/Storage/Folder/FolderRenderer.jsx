import React from 'react'
import Folder from './Folder'
import { useEffect } from 'react'

export default function FolderRenderer({ folders, selected, setCut }) {
    let folderId = parseInt(selected);
    folderId = folderId ? folderId : null;
    const filterdFolders = folders.filter((folder) => folder.inside === folderId);

    return (
        <div className='row m-0 px-1'>
            {filterdFolders.map((folder) => {
                return <Folder key={folder.id} {...{ folder,setCut }} />
            })}
        </div>
    )
}
