import React, { useState } from 'react'
import CreateFolder from './Folder/CreateFolder'
import UploadFileModal from './File/UploadFileModal';

export default function AddButton({ selected, file, setFile, setProgress }) {
    const [folderModal, setFolderModal] = useState(false);
    const [fileModal, setFileModal] = useState(false);
    return (
        <div>
            <button style={floatingButtonStyle} data-bs-toggle="dropdown" className="btn btn-success btn-lg">+</button>
            <ul className="dropdown-menu dropdown-menu-end">
                <li><span className="dropdown-item " onClick={() => setFolderModal(!folderModal)}>Create Folder</span></li>
                <li><span className="dropdown-item " onClick={() => setFileModal(!fileModal)}>Upload File</span></li>
            </ul>
            <CreateFolder {...{ folderModal, setFolderModal, selected }} />
            <UploadFileModal {...{ file, setFile, setProgress, fileModal, setFileModal,selected }} />
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