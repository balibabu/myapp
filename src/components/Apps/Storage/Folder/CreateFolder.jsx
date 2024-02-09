import React, { useContext, useState } from 'react'
import CustomModal from '../../../../utility/CustomModal'
import { createFolder } from '../../../../http/Folder';
import AuthContext from '../../../Contexts/AuthContext';
import StorageContext from '../../../Contexts/StorageContext';

export default function CreateFolder({ folderModal, setFolderModal, selected }) {
    const [folder, setFolder] = useState('new folder');
    const { token } = useContext(AuthContext);
    const { setFolders } = useContext(StorageContext);

    async function createHandler() {
        let folderInfo = { title: folder }
        if (selected !== 'null') {
            folderInfo['inside'] = selected;
        }
        const res = await createFolder(token, folderInfo);
        setFolders((prev) => [...prev, res]);
        setFolderModal(false);
        setFolder('new folder');
    }
    return (
        <CustomModal isModalOpen={folderModal} setIsModalOpen={setFolderModal}>
            <div className="input-group">
                <span className="input-group-text">Title</span>
                <input type="text" className="form-control"
                    value={folder}
                    onChange={(e) => setFolder(e.target.value)} />
                <button className='btn btn-success' onClick={createHandler}>Create</button>
            </div>
        </CustomModal>
    )
}
