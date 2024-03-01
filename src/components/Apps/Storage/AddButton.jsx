import React, { useContext, useState } from 'react'
import CreateFolder from './Folder/CreateFolder'
import UploadFileModal from './File/UploadFileModal';
import isMovable from './Folder/FolderMoveValidator';
import { updateFolder } from '../../../http/Folder';
import { updater } from './Folder/CRUD';
import StorageContext from '../../Contexts/StorageContext';
import { updaterFile } from './File/FileCRUD';

export default function AddButton({ selected, file, setFile, setProgress, cut, setCut, token }) {
    const [folderModal, setFolderModal] = useState(false);
    const [fileModal, setFileModal] = useState(false);
    const { folders, setFolders, setFiles } = useContext(StorageContext);

    const pasteHandler = () => {
        if(cut[1]==='file'){
            updaterFile({ ...cut[0], inside: eval(selected) }, token, setFiles);
        }else{
            if (isMovable(cut[0], folders, eval(selected))) {
                updater(setFolders, token, { ...cut[0], inside: eval(selected) });
            } else {
                alert('sorry, moving folder inside it\'s children is not possible');
            }
        }
        setCut(false);
    }

    return (
        <div>
            <button style={floatingButtonStyle} data-bs-toggle="dropdown" className="btn btn-success btn-lg">+</button>
            <ul className="dropdown-menu dropdown-menu-end">
                <li><span className="dropdown-item " onClick={() => setFolderModal(!folderModal)}>Create Folder</span></li>
                <li><span className="dropdown-item " onClick={() => setFileModal(!fileModal)}>Upload File</span></li>
                {cut && <li><span className="dropdown-item " onClick={pasteHandler}>Paste</span></li>}
            </ul>
            <CreateFolder {...{ folderModal, setFolderModal, selected }} />
            <UploadFileModal {...{ file, setFile, setProgress, fileModal, setFileModal, selected }} />
        </div>
    )
}


const floatingButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '10px',
    fontWeight: "bolder",
    borderRadius: "10px",
}