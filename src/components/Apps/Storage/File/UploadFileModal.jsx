import React, { useContext, useEffect, useState } from 'react'
import { uploadFile, uploadFileInChunks } from './FileCRUD';
import { PrivateDetailForm } from '../extra/PrivateDetailForm';
import FilePresence from '../extra/FilePresence';
import CustomModal from '../../../../utility/CustomModal';
import DragDrop from './DragDrop';
import AuthContext from '../../../Contexts/AuthContext';
import StorageContext from '../../../Contexts/StorageContext';

export default function UploadFileModal({ file, setFile, fileModal, setFileModal, selected }) {
    const { token } = useContext(AuthContext);
    const { setFiles, setProgressList } = useContext(StorageContext);

    useEffect(() => {
        if (file) {
            setFileModal(true);
        }
    }, [file])


    const onUploadClick = async (file) => {
        setFileModal(false);
        if (!file) { return; }
        uploadFileInChunks(file, token, setFiles, selected, setProgressList);
        setFile(null);
    };

    return (
        <div>
            <CustomModal isModalOpen={fileModal} setIsModalOpen={setFileModal} top='35'>
                <DragDrop file={file} setFile={setFile} setIsModalOpen={setFileModal} onUploadClick={onUploadClick} />
            </CustomModal>
        </div>
    )
}



