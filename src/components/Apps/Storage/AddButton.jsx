import React, { useContext, useState } from 'react'
import CreateFolder from './Folder/CreateFolder'
import UploadFileModal from './File/UploadFileModal';
import isMovable from './Folder/FolderMoveValidator';
import { updater } from './Folder/CRUD';
import StorageContext from '../../Contexts/StorageContext';
import { updaterFile } from './File/FileCRUD';
import VariableContext from '../../Contexts/VariableContext';

export default function AddButton({ selected, file, setFile, cut, setCut, token }) {
    const [folderModal, setFolderModal] = useState(false);
    const [fileModal, setFileModal] = useState(false);
    const { folders, setFolders, setFiles } = useContext(StorageContext);
    const { notify } = useContext(VariableContext);

    const pasteHandler = async () => {
        if (cut[1] === 'file') {
            await updaterFile({ ...cut[0], inside: eval(selected) }, token, setFiles);
            notify('File Moved', 'successfuly', 'success');
        } else {
            if (isMovable(cut[0], folders, eval(selected))) {
                await updater(setFolders, token, { ...cut[0], inside: eval(selected) });
                notify('Folder Moved', 'successfuly', 'success');
            } else {
                notify('Folder Moved Unsuccess', 'moving folder inside it\'s children is not possible', 'danger');
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
            <CreateFolder {...{ folderModal, setFolderModal, selected,notify }} />
            <UploadFileModal {...{ file, setFile, fileModal, setFileModal, selected,notify }} />
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